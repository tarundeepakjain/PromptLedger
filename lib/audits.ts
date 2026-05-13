import { supabase } from "./supabase"
import { ToolAuditResult } from "./types"

export async function getAuditResult(id:string) {

  if(!supabase) return null 
  
  const { data: audit, error: auditError } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single()

  if (auditError || !audit) {
    throw new Error("Audit not found")
  }

  const {data: toolResults, error: toolResultsError} = await supabase
    .from("audit_tool_results")
    .select("*")
    .eq("audit_id", audit.id)

  if (toolResultsError) {
    throw toolResultsError
  }

  return {
    totalCurrentMonthlySpend:audit.total_current_monthly_spend,

    totalOptimizedMonthlySpend:audit.total_optimized_monthly_spend,

    totalMonthlySavings:audit.total_monthly_savings,

    totalAnnualSavings:audit.total_annual_savings,

    summary: audit.summary ?? undefined,

    toolResults: toolResults.map((tool: ToolAuditResult) => ({
      currentTool:tool.currentTool,
      currentPlan:tool.currentPlan,
      recommendedTool:tool.recommendedTool,
      recommendedPlan:tool.recommendedPlan,
      currentMonthlySpend:tool.currentMonthlySpend,
      optimizedMonthlySpend:tool.optimizedMonthlySpend,
      monthlySavings:tool.monthlySavings,
      annualSavings:tool.annualSavings,
      reason:tool.reason
    }))
  }
}