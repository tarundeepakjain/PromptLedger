import { 
    AuditInput,
    AuditResult,
    ToolAuditResult,
    aiPlan,
    apiPlan
} from "./types"

import {
    findCurrentPlan,
    findCheapestSameVendorPlan,
    findCheapestAlternativeTool,
    findCheapestSameVendorAPI,
    findCheapestAlternativeAPI,
} from "./matching"

import { aiPlans,api_direct } from "./ai-tools"
import { supabase } from "./supabase"


async function getOrCreatePricingVersion() {

    if(!supabase) return null 

    const snapshot = {
        aiPlans,
        api_direct
    }

    const { data:existingVersion, error:findError } = await supabase
        .from("pricing_version")
        .select("id")
        .eq("snapshot", JSON.stringify(snapshot))
        .maybeSingle()

    if(findError){
        throw new Error(findError.message)
    }

    if(existingVersion){
        return existingVersion.id
    }

    const { data:newVersion, error:createError } = await supabase
        .from("pricing_version")
        .insert({
            snapshot:snapshot
        })
        .select("id")
        .single()

    if(createError){
        throw new Error(createError.message)
    }

    return newVersion.id
}

async function saveAuditResult(auditResult:AuditResult,email:string,auditInput:AuditInput) {

    if(!supabase){
        return null
    }

  const { data: audit, error: auditError } = await supabase
    .from("audits")
    .insert([
      {
        total_current_monthly_spend:auditResult.totalCurrentMonthlySpend,
        total_optimized_monthly_spend:auditResult.totalOptimizedMonthlySpend,
        total_monthly_savings:auditResult.totalMonthlySavings,
        total_annual_savings:auditResult.totalAnnualSavings,
        summary:auditResult.summary ?? null
      }
    ])
    .select()
    .single()

  if (auditError) {
    throw auditError
  }

  const toolResults = auditResult.toolResults.map((tool:ToolAuditResult) => ({
    audit_id: audit.id,
    currentTool: tool.currentTool,
    currentPlan: tool.currentPlan,
    recommendedTool: tool.recommendedTool,
    recommendedPlan: tool.recommendedPlan,
    currentMonthlySpend: tool.currentMonthlySpend,
    optimizedMonthlySpend: tool.optimizedMonthlySpend,
    monthlySavings: tool.monthlySavings,
    annualSavings: tool.annualSavings,
    reason: tool.reason
  }))

  const { error: toolResultsError } = await supabase
    .from("audit_tool_results")
    .insert(toolResults)

  if (toolResultsError) {
    throw toolResultsError
  }

    const pricing_id = await getOrCreatePricingVersion()
    const { error:createError } = await supabase
    .from("stored_audits")
    .insert({
        id: audit.id,
        input: auditInput,
        output: auditResult,
        pricing: pricing_id,
        email: email,
    })
    .select()

    if(createError){
        throw new Error(createError.message)
    }
  return audit
}

function calcAPISpend(plan: apiPlan, inputTokens: number, outputTokens: number): number {
    const cost = (plan.inputPricePerMTok * inputTokens) + (plan.outputPricePerMTok * outputTokens)
    return Math.round(cost * 100) / 100
}

export async function generateAudit(data: AuditInput,email: string): Promise<AuditResult>{

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

    try {
        const prompt = `
        You are an AI infrastructure cost optimization expert.

        Generate a personalized summary in around 100 words.

        Requirements:
        - Professional and concise
        - Mention monthly and annual savings
        - Mention important optimization opportunities
        - Mention if the stack already looks efficient
        - Mention Credex naturally ONLY if savings exceed $500/month
        - No bullet points
        - No hype or exaggerated claims

        Audit Data:
        ${JSON.stringify({
        totalCurrentMonthlySpend,
        totalOptimizedMonthlySpend,
        totalMonthlySavings,
        totalAnnualSavings,
        toolResults
        }, null, 2)}
        `

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                {
                    parts: [
                    {
                        text: prompt
                    }
                    ]
                }
                ]
            })
            }
        )

        if (response.ok) {
            const data = await response.json()
            const aiSummary = data?.candidates?.[0]?.content?.parts?.[0]?.text
            if (aiSummary) {
            summary = aiSummary.trim()
            }
        }

    } catch (error) {
        console.error("Gemini summary generation failed:", error)
    }

    const result: AuditResult = {
        totalCurrentMonthlySpend,
        totalOptimizedMonthlySpend,
        totalMonthlySavings,
        totalAnnualSavings,
        summary,
        toolResults
    }

    let audit = null
    try{
        audit = await saveAuditResult(result,email,data)
    }catch(error){
        console.error("Audit not saved publicly in supabase.",error)
    }

    return {
        ...result,
        id: audit?.id || null
    }
}