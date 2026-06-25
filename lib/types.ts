export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed"

export interface ToolUsage{
    tool:string
    plan:string
    monthlySpend?:number
    seats?:number
    useCase: UseCase
    inputTokens?: number
    outputTokens?: number
}

export interface AuditInput{
    teamSize:number
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
  id?: string,
  totalCurrentMonthlySpend: number
  totalOptimizedMonthlySpend: number
  totalMonthlySavings: number
  totalAnnualSavings: number
  summary?: string
  toolResults: ToolAuditResult[]
}

export interface aiPlan {
  tool: string
  plan: string
  useCases: UseCase[]
  capabilityLevel: number
  minTeamSize: number
  maxTeamSize: number
  monthlyPrice: number | null
}

export interface apiPlan {
  tool: string
  plan: string
  useCases: UseCase[]
  capabilityLevel: number
  inputPricePerMTok: number 
  outputPricePerMTok: number 
  enterpriseReady: boolean
}

export interface FormState {
  teamSize: number;
  selectedTools: string[];
  toolEntries: ToolUsage[];
}

export interface AuditEmail {
  email: string,
  companyName: string,
  role: string,
  teamSize: number,
  monthlySavings: number,
  annualSavings: number,
  auditUrl: string
}

export interface AuditRequestBody {
  email: string
  teamSize: number
  tools: ToolUsage[]
}

export interface AffectedAudit {
  id: string
  email: string
  oldAudit: AuditResult
  newAudit: AuditResult
  oldPricingVersion: string
  newPricingVersion: string
}