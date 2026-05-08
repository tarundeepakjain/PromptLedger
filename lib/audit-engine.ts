import { pricingData } from "./pricing"
import { 
    AuditInput,
    AuditResult,
    ToolAuditResult } 
from "./types"

export function generateAudit(data: AuditInput): AuditResult {

  let totalCurrentMonthlySpend = 0
  let totalOptimizedMonthlySpend = 0
  const toolResults: ToolAuditResult[] = []

  for (const tool of data.tools) {
    totalCurrentMonthlySpend += tool.monthlySpend

    const optimizedMonthlySpend = tool.monthlySpend
    const monthlySavings = tool.monthlySpend - optimizedMonthlySpend
    const annualSavings = monthlySavings * 12

    const result: ToolAuditResult = {
      currentTool: tool.tool,
      currentPlan: tool.plan,
      recommendedTool: tool.tool,
      recommendedPlan: tool.plan,
      currentMonthlySpend: tool.monthlySpend,
      optimizedMonthlySpend,
      monthlySavings,
      annualSavings,
      reason: "Current setup appears optimized."
    }

    toolResults.push(result)

    totalOptimizedMonthlySpend += optimizedMonthlySpend
  }

  const totalMonthlySavings = totalCurrentMonthlySpend - totalOptimizedMonthlySpend

  const totalAnnualSavings = totalMonthlySavings * 12

  const result:AuditResult = {
    totalCurrentMonthlySpend,
    totalOptimizedMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    summary: "Your current AI stack appears well optimized.",
    toolResults,
  }
  return result
}