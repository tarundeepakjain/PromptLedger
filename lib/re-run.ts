import { supabase } from "./supabase"
import { estimateAudit } from "./pricing-monitor"
import {
  AuditInput,
  AuditResult,
  ToolAuditResult
} from "./types"

export async function reRunAudit(id:string){

    if(!supabase) return null
  const { data: storedAudit,error: storedAuditError } = await supabase
    .from("stored_audits")
    .select("*")
    .eq("id",id)
    .single()

  if(storedAuditError || !storedAudit){
    throw new Error("Stored audit not found")
  }

  const input = storedAudit.input as AuditInput
  const email: string = storedAudit.email
  const newAudit: AuditResult = await estimateAudit(input)

  const { error: auditUpdateError } = await supabase
    .from("audits")
    .update({
      total_current_monthly_spend:newAudit.totalCurrentMonthlySpend,
      total_optimized_monthly_spend:newAudit.totalOptimizedMonthlySpend,
      total_monthly_savings:newAudit.totalMonthlySavings,
      total_annual_savings:newAudit.totalAnnualSavings,
      summary:newAudit.summary
    })
    .eq("id",id)

  if(auditUpdateError){
    throw new Error("Failed to update audits table")
  }

  const { data:updatedAudit ,error: storedUpdateError } = await supabase
    .from("stored_audits")
    .update({
      output:newAudit,
      timestamp:new Date().toISOString()
    })
    .eq("id",id)
    .select("*")
    .single()

  if(storedUpdateError){
    throw new Error("Failed to update stored audits")
  }

  const { error: deleteError } = await supabase
    .from("audit_tool_results")
    .delete()
    .eq("audit_id",id)

  if(deleteError){
    throw new Error("Failed to delete previous tool results")
  }

  const toolResults = newAudit.toolResults.map((tool:ToolAuditResult)=>{
    return {
      audit_id:id,
      currentTool:tool.currentTool,
      currentPlan:tool.currentPlan,
      recommendedTool:tool.recommendedTool,
      recommendedPlan:tool.recommendedPlan,
      currentMonthlySpend:tool.currentMonthlySpend,
      optimizedMonthlySpend:tool.optimizedMonthlySpend,
      monthlySavings:tool.monthlySavings,
      annualSavings:tool.annualSavings,
      reason:tool.reason
    }
  })

  const { error: insertError } = await supabase
    .from("audit_tool_results")
    .insert(toolResults)

  if(insertError){
    throw new Error("Failed to insert new tool results")
  }

    return {
    oldAudit: storedAudit.output,
    newAudit: newAudit
    }
}