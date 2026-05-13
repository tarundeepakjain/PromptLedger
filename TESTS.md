All automated tests are written using [Vitest](https://vitest.dev/) with the `jsdom` environment.

## Running Tests

```bash
pnpm test
```

To run in watch mode:

```bash
pnpm test:watch
```

---

## Test File: `tests/audit-engine/generate-audit.test.ts`

All five tests cover the core audit engine (`lib/audit-engine.ts`) and the matching utilities it depends on (`lib/matching.ts`, `lib/ai-tools.ts`).

---

### Test 1 — Same-vendor downgrade for oversized plan

**What it covers:**
Verifies that the audit engine correctly identifies when a team is on an enterprise subscription plan that is overkill for their team size, and recommends a cheaper plan from the same vendor.

Specifically: a team of 2 paying for GitHub Copilot Enterprise ($39/user/month × 2 = $78, but submitted as $1170 representing potential seats) should be downgraded to GitHub Copilot Individual ($10/user/month), yielding a monthly saving of $1160.

**Key assertions:**
- `recommendedTool` contains `"GitHubCopilot"` (same vendor)
- `recommendedPlan` contains `"Individual"` (cheaper plan)
- `totalMonthlySavings` equals `1160`

---

### Test 2 — Cross-vendor alternative recommendation

**What it covers:**
Verifies that the engine recommends a cheaper tool from a different vendor when no same-vendor downgrade is available or when a cross-vendor option is meaningfully cheaper.

A single user on Claude Max (20x) at $200/month for a `research` use case should be recommended a cheaper alternative from another vendor (e.g. Gemini Pro or ChatGPT Plus), not kept on a Claude plan.

**Key assertions:**
- `toolResults` has exactly 1 entry
- `recommendedTool` is not `"Claude"` (cross-vendor recommendation)
- `totalMonthlySavings` is greater than 0

This test directly exercises the bug that was fixed in the recommendation builder — the cross-vendor path must be reachable even when a same-vendor plan exists.

---

### Test 3 — API cost optimisation

**What it covers:**
Verifies that the engine correctly calculates monthly spend for token-based API usage and recommends a cheaper API model when one exists with sufficient capability for the submitted use case.

A team using OpenAI API GPT-5.5 (the most expensive model, $5/MTok input + $30/MTok output) with high token volumes should be recommended a cheaper model — either from OpenAI (GPT-5.4) or from a cross-vendor API provider (Gemini Flash, Anthropic Haiku) — based on capability matching.

**Key assertions:**
- `toolResults` has exactly 1 entry
- `totalMonthlySavings` is greater than 0

---

### Test 4 — Multi-tool audit correctness

**What it covers:**
Verifies that the engine correctly handles audits with multiple tools simultaneously, and that the aggregate savings totals are mathematically consistent with the per-tool results.

A team of 6 using Cursor Business, ChatGPT Team, and OpenAI API GPT-5.5 at high token volumes is submitted. The test confirms that three tool results are returned and that `totalAnnualSavings === totalMonthlySavings × 12`.

**Key assertions:**
- `toolResults.length` equals `3`
- `totalAnnualSavings` equals `totalMonthlySavings * 12`

---

### Test 5 — Credex surfacing for high-savings audits

**What it covers:**
Verifies that the AI-generated (or fallback) summary mentions Credex when the total monthly savings from the audit exceed $500/month, as specified in the assignment requirements and implemented in the summary generation logic.

Uses the same high-spend multi-tool input as Test 4, which reliably produces savings well above the $500/month threshold.

**Key assertions:**
- `summary` contains `"Credex"`

This test also indirectly validates the fallback summary path — if Gemini API is unavailable in the test environment, the hardcoded fallback for high-savings audits includes the Credex reference, so the assertion holds regardless.

---

## Coverage Notes

The five tests cover:

- Same-vendor plan downgrade (subscription)
- Cross-vendor tool recommendation (subscription)
- API cost calculation and optimisation
- Multi-tool aggregation and mathematical consistency
- Conditional Credex mention in audit summary

The matching utility functions (`canHandleUseCase`, `hasEnoughCapability`, `isTeamCompatible`, `findCheapestSameVendorPlan`, `findCheapestAlternativeTool`, `findCheapestSameVendorAPI`, `findCheapestAlternativeAPI`) are exercised indirectly through the engine tests. Direct unit tests for these utilities would be a meaningful addition in a future iteration.