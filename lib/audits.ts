import { supabase } from "./supabase"

export async function getAuditResult(id:string) {

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

    toolResults: toolResults.map((tool:any) => ({
      currentTool:tool.current_tool,
      currentPlan:tool.current_plan,
      recommendedTool:tool.recommended_tool,
      recommendedPlan:tool.recommended_plan,
      currentMonthlySpend:tool.current_monthly_spend,
      optimizedMonthlySpend:tool.optimized_monthly_spend,
      monthlySavings:tool.monthly_savings,
      annualSavings:tool.annual_savings,
      reason:tool.reason
    }))
  }
}