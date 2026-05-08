export interface ToolUsage{
    tool:string,
    plan:string,
    monthlySpend:number,
    seats:number,
    useCase:
        | "coding"
        | "writing"
        | "research"
        | "data"
        | "mixed"
}

export interface AuditInput{
    teamSize:number,
    tools:ToolUsage[]
}

export interface ToolAuditResult {
  currentTool: string
  currentPlan: string

  recommendedTool: string
  recommendedPlan: string

  currentMonthlySpend: number
  optimizedMonthlySpend: number

  monthlySavings: number
  annualSavings: number

  reason: string
}

export interface AuditResult {
  totalCurrentMonthlySpend: number
  totalOptimizedMonthlySpend: number
  totalMonthlySavings: number
  totalAnnualSavings: number
  summary: string
  toolResults: ToolAuditResult[]
}