import { supabase } from "./supabase"
import { Lead } from "./types"

export async function saveLead(data:Lead) {
  if(!supabase) return null
  
  const { data: savedLead, error } = await supabase
    .from("audit_leads")
    .insert([
      {
        email: data.email,
        company_name: data.companyName,
        role: data.role,
        team_size: data.teamSize,
        monthly_savings: data.monthlySavings,
        annual_savings: data.annualSavings
      }
    ])
    .select()

  if (error) {
    throw error
  }

  return savedLead
}