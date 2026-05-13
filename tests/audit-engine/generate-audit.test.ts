import { describe, it, expect } from "vitest"
import { generateAudit } from "@/lib/audit-engine"

describe("Audit Engine", () => {

  it("downgrades GithubCopilot Enterprise to Individual for small teams", async () => {

    const result = await generateAudit({
      teamSize: 2,
      tools: [
        {
          tool: "GitHubCopilot",
          plan: "Enterprise",
          monthlySpend: 1170,
          seats: 2,
          useCase: "coding"
        }
      ]
    })

    expect(result.toolResults[0].recommendedTool).toContain("GitHubCopilot")

    expect(result.toolResults[0].recommendedPlan).toContain("Individual")

    expect(result.totalMonthlySavings).toBe(1160)

  })

  it("recommends cheaper cross-vendor alternative for Claude Max", async () => {

    const result = await generateAudit({
      teamSize: 2,
      tools: [
        {
          tool: "Claude",
          plan: "Max_20x",
          monthlySpend: 200,
          seats: 2,
          useCase: "research"
        }
      ]
    })

    expect(result.toolResults.length).toBe(1)

    expect(result.toolResults[0].recommendedTool).not.toBe("Claude")

    expect(result.totalMonthlySavings).toBeGreaterThan(0)

  })

  it("optimizes expensive OpenAI API model usage", async () => {

    const result = await generateAudit({
      teamSize: 5,
      tools: [
        {
          tool: "OpenAIAPI",
          plan: "GPT5_5",
          inputTokens: 40000000,
          outputTokens: 12000000,
          useCase: "coding"
        }
      ]
    })

    expect(result.toolResults.length).toBe(1)

    expect(result.totalMonthlySavings).toBeGreaterThan(0)

  })

  it("handles multiple tools in one audit correctly", async () => {

    const result = await generateAudit({
      teamSize: 6,
      tools: [
        {
          tool: "Cursor",
          plan: "Business",
          monthlySpend: 240,
          seats: 6,
          useCase: "coding"
        },
        {
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 150,
          seats: 6,
          useCase: "mixed"
        },
        {
          tool: "OpenAIAPI",
          plan: "GPT5_5",
          inputTokens: 60000000,
          outputTokens: 20000000,
          useCase: "coding"
        }
      ]
    })

    expect(result.toolResults.length).toBe(3)

    expect(result.totalAnnualSavings).toBe(
      result.totalMonthlySavings * 12
    )

  })

  it("shows Credex optimization summary for high savings audits", async () => {

    const result = await generateAudit({
      teamSize: 6,
      tools: [
        {
          tool: "Cursor",
          plan: "Business",
          monthlySpend: 240,
          seats: 6,
          useCase: "coding"
        },
        {
          tool: "ChatGPT",
          plan: "Team",
          monthlySpend: 150,
          seats: 6,
          useCase: "mixed"
        },
        {
          tool: "OpenAIAPI",
          plan: "GPT5_5",
          inputTokens: 60000000,
          outputTokens: 20000000,
          useCase: "coding"
        }
      ]
    })

    expect(result.summary).toContain("Credex")

  })

})