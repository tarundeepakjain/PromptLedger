import { supabase } from "@/lib/supabase"
import {
   AuditInput,
   AuditResult,
   ToolAuditResult,
   aiPlan,
   apiPlan,
   AffectedAudit
} from "@/lib/types"
import { api_direct,aiPlans } from "./ai-tools"
import {
    findCurrentPlan,
    findCheapestSameVendorPlan,
    findCheapestAlternativeTool,
    findCheapestSameVendorAPI,
    findCheapestAlternativeAPI,
} from "./matching"

export async function getLatestPricingVersion(){

    if(!supabase) return null
    const snapshot = {
        aiPlans,
        api_direct
    }
   const { data, error } = await supabase
      .from("pricing_version")
      .select("*")
      .eq("snapshot",JSON.stringify(snapshot))
      .maybeSingle()

   if(error){
      throw new Error(error.message)
   }

   return data
}

export function hasAuditChanged(oldAudit: AuditResult,newAudit: AuditResult){
   if(oldAudit.totalMonthlySavings !== newAudit.totalMonthlySavings){
      return true
   }

   if(oldAudit.totalAnnualSavings !== newAudit.totalAnnualSavings){
      return true
   }

   if(JSON.stringify(oldAudit.toolResults) !== JSON.stringify(newAudit.toolResults)){
      return true
   }

   return false
}

function calcAPISpend(plan: apiPlan, inputTokens: number, outputTokens: number): number {
    const cost = (plan.inputPricePerMTok * inputTokens) + (plan.outputPricePerMTok * outputTokens)
    return Math.round(cost * 100) / 100
}

export async function estimateAudit(data: AuditInput): Promise<AuditResult>{

    let totalCurrentMonthlySpend = 0
    let totalOptimizedMonthlySpend = 0
    const toolResults: ToolAuditResult[] = []

    for(const tool of data.tools){

        const currentPlan = findCurrentPlan(tool.tool,tool.plan)
        if(!currentPlan){continue}

        let recommendedTool = tool.tool
        let recommendedPlan = tool.plan
        let currentMonthlySpend = 0
        let optimizedMonthlySpend = 0
        let reason = "Current setup appears optimized."

        //API
        if(tool.tool.includes("API")){

            const inputTokens = tool.inputTokens ?? 1
            const outputTokens = tool.outputTokens ?? 1

            currentMonthlySpend = calcAPISpend(currentPlan as apiPlan, inputTokens, outputTokens)
            optimizedMonthlySpend = currentMonthlySpend

            const sameVendorAPI = findCheapestSameVendorAPI(currentPlan as apiPlan, tool.useCase)
            const alternativeAPI = findCheapestAlternativeAPI(currentPlan as apiPlan, tool.useCase)

            const sameVendorPrice = sameVendorAPI
                ? calcAPISpend(sameVendorAPI, inputTokens, outputTokens)
                : Infinity

            const alternativePrice = alternativeAPI
                ? calcAPISpend(alternativeAPI, inputTokens, outputTokens)
                : Infinity

            if(alternativeAPI && alternativePrice < sameVendorPrice && alternativePrice < currentMonthlySpend){
                recommendedTool = alternativeAPI.tool
                recommendedPlan = alternativeAPI.plan
                optimizedMonthlySpend = alternativePrice
                reason = "A cheaper API provider offers similar capability for the reported workload."
            }else if(sameVendorAPI && sameVendorPrice < currentMonthlySpend){
                recommendedTool = sameVendorAPI.tool
                recommendedPlan = sameVendorAPI.plan
                optimizedMonthlySpend = sameVendorPrice
                reason = "A lower-cost API model from the same provider can handle the reported workload."
            }

        }else{
          //Subscription
            currentMonthlySpend = tool.monthlySpend ?? 0
            optimizedMonthlySpend = currentMonthlySpend

            const sameVendorPlan = findCheapestSameVendorPlan(currentPlan as aiPlan,data.teamSize,tool.useCase)
            const alternativeTool = findCheapestAlternativeTool(currentPlan as aiPlan,data.teamSize,tool.useCase)

            if(alternativeTool &&(alternativeTool.monthlyPrice ?? Infinity)<(sameVendorPlan?.monthlyPrice ?? Infinity)){
                recommendedTool = alternativeTool.tool
                recommendedPlan = alternativeTool.plan
                optimizedMonthlySpend = alternativeTool.monthlyPrice ?? currentMonthlySpend
                reason = "A cheaper alternative tool provides similar capability for the reported workflow."
            }else if(sameVendorPlan){
                recommendedTool = sameVendorPlan.tool
                recommendedPlan = sameVendorPlan.plan
                optimizedMonthlySpend = sameVendorPlan.monthlyPrice ?? currentMonthlySpend
                reason = "A lower-cost plan from the same vendor satisfies the reported usage."
            }
        }

        totalCurrentMonthlySpend += currentMonthlySpend

        const monthlySavings = Math.round((currentMonthlySpend - optimizedMonthlySpend) * 100) / 100
        const annualSavings = Math.round(monthlySavings * 12 * 100) / 100

        const result: ToolAuditResult = {
            currentTool: tool.tool,
            currentPlan: tool.plan,
            recommendedTool,
            recommendedPlan,
            currentMonthlySpend,
            optimizedMonthlySpend,
            monthlySavings,
            annualSavings,
            reason
        }

        toolResults.push(result)

        totalOptimizedMonthlySpend += optimizedMonthlySpend
    }

    totalCurrentMonthlySpend = Math.round(totalCurrentMonthlySpend * 100) / 100
    totalOptimizedMonthlySpend = Math.round(totalOptimizedMonthlySpend * 100) / 100

    const totalMonthlySavings = Math.round((totalCurrentMonthlySpend - totalOptimizedMonthlySpend) * 100) / 100
    const totalAnnualSavings = Math.round(totalMonthlySavings * 12 * 100) / 100

    let fallbackSummary = "Your current AI stack appears reasonably optimized."

    if (totalMonthlySavings >= 500) {
        fallbackSummary = "Your AI stack shows significant optimization potential. CredexCLA can help continuously monitor and reduce future AI spend."
    }else if (totalMonthlySavings < 100) {
        fallbackSummary = "Your current AI stack already appears reasonably cost-efficient for the reported workload."
    }
    let summary = fallbackSummary

    const result: AuditResult = {
        totalCurrentMonthlySpend,
        totalOptimizedMonthlySpend,
        totalMonthlySavings,
        totalAnnualSavings,
        summary,
        toolResults
    }

    return result
}

export async function detectPricingChanges(){

    if(!supabase) return null
   const latestPricingVersion = await getLatestPricingVersion()

   const { data:storedAudits, error } = await supabase
      .from("stored_audits")
      .select("*")

   if(error){
      throw new Error(error.message)
   }

   const affectedAudits: AffectedAudit[] = []

   for(const audit of storedAudits){
      if(audit.pricing === latestPricingVersion.id){
         continue
      }

      const oldAudit: AuditResult = audit.output
      const auditInput: AuditInput = audit.input

      const newAudit: AuditResult = await estimateAudit(auditInput)
      const changed = hasAuditChanged(oldAudit,newAudit)

      if(changed){
         affectedAudits.push({
            id:audit.id,
            email:audit.email,

            oldAudit,
            newAudit,

            oldPricingVersion:audit.pricing,
            newPricingVersion:latestPricingVersion.id
         })
      }
   }

   return affectedAudits
}