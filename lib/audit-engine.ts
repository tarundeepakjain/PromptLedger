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
    getTotalAPIPrice
} from "./matching"

export function generateAudit(data: AuditInput): AuditResult {

    let totalCurrentMonthlySpend = 0
    let totalOptimizedMonthlySpend = 0

    const toolResults: ToolAuditResult[] = []

    for(const tool of data.tools){

        totalCurrentMonthlySpend += tool.monthlySpend

        const currentPlan = findCurrentPlan(tool.tool,tool.plan)
        if(!currentPlan){continue}

        let recommendedTool = tool.tool
        let recommendedPlan = tool.plan
        let optimizedMonthlySpend = tool.monthlySpend
        let reason = "Current setup appears optimized."
      
        //API
        if(tool.tool.includes("API")){

            const sameVendorAPI = findCheapestSameVendorAPI(currentPlan as apiPlan,tool.useCase)

            if(sameVendorAPI){
                recommendedTool = sameVendorAPI.tool
                recommendedPlan = sameVendorAPI.plan
                optimizedMonthlySpend = getTotalAPIPrice(sameVendorAPI)
                reason ="A lower-cost API model from the same provider can handle the reported workload."
            }else{
                const alternativeAPI = findCheapestAlternativeAPI(currentPlan as apiPlan,tool.useCase)

                if(alternativeAPI){
                    recommendedTool = alternativeAPI.tool
                    recommendedPlan = alternativeAPI.plan
                    optimizedMonthlySpend = getTotalAPIPrice(alternativeAPI)
                    reason ="A cheaper API provider offers similar capability for the reported workload."
                }
            }
        }else{
          //Subscription
            const sameVendorPlan = findCheapestSameVendorPlan(currentPlan as aiPlan,data.teamSize,tool.useCase)

            if(sameVendorPlan){
                recommendedTool = sameVendorPlan.tool
                recommendedPlan = sameVendorPlan.plan
                optimizedMonthlySpend = sameVendorPlan.monthlyPrice ?? tool.monthlySpend
                reason = "A lower-cost plan from the same vendor satisfies the reported usage."
            }else{
                const alternativeTool = findCheapestAlternativeTool(currentPlan as aiPlan,data.teamSize,tool.useCase)

                if(alternativeTool){
                    recommendedTool = alternativeTool.tool
                    recommendedPlan = alternativeTool.plan
                    optimizedMonthlySpend = alternativeTool.monthlyPrice ?? tool.monthlySpend
                    reason = "A cheaper alternative tool provides similar capability for the reported workflow."
                }
            }
        }

        const monthlySavings = tool.monthlySpend - optimizedMonthlySpend
        const annualSavings = monthlySavings * 12

        const result: ToolAuditResult = {
            currentTool: tool.tool,
            currentPlan: tool.plan,
            recommendedTool,
            recommendedPlan,
            currentMonthlySpend: tool.monthlySpend,
            optimizedMonthlySpend,
            monthlySavings,
            annualSavings,
            reason
        }

        toolResults.push(result)

        totalOptimizedMonthlySpend += optimizedMonthlySpend
    }

    const totalMonthlySavings = totalCurrentMonthlySpend - totalOptimizedMonthlySpend

    const totalAnnualSavings = totalMonthlySavings * 12

    let summary = "Your current AI stack appears reasonably optimized."

    if(totalMonthlySavings >= 500){
        summary = "Your AI stack shows significant optimization potential. CredexCLA can help continuously monitor and reduce future AI spend."

    }else if(totalMonthlySavings < 100){
        summary = "Your current AI stack already appears reasonably cost-efficient for the reported workload."
    }

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