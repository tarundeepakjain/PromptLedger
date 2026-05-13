## 1. The Hardest Bug

The hardest bug this week was in the audit engine's recommendation logic. The symptom was simple: cross-vendor recommendations were never appearing. A user on Claude Pro would only ever be recommended a different Claude plan, and a user on Cursor Pro would never see GitHub Copilot as an alternative — even when it was clearly cheaper and capability-compatible.

I spent roughly two hours on this. My first hypothesis was that the `canHandleUseCase` filter was too strict and was ruling out valid candidates from other vendors. I added console logs to the matching functions and manually tested with a hardcoded audit input for a 2-person team on Claude Pro with a `research` use case. The same-vendor results came back fine. The alternative tool results came back empty.

My second hypothesis was a data problem — maybe the `aiPlans` registry entries for cross-vendor tools were missing the relevant `useCases` array entries. I walked through every entry manually. The data looked correct.

It was only when I printed the full execution path that I saw it: the recommendation builder was structured as:

```typescript
if (alternativeTool && alternativePrice < sameVendorPrice) {
  // use alternative
} else if (sameVendorPlan) {
  // use same vendor
}
```

The problem was that `findCheapestSameVendorPlan` was being called and returning a result before `findCheapestAlternativeTool` had any chance to run in a meaningful comparison. Because the `else if` branch fired on any non-null `sameVendorPlan`, the cross-vendor path was structurally unreachable in most cases — `alternativeTool` was always being compared against `sameVendorPrice` even when `alternativeTool` itself was null at evaluation time.

The fix was to always call both functions, then compare their results explicitly:

```typescript
const sameVendorPlan = findCheapestSameVendorPlan(...)
const alternativeTool = findCheapestAlternativeTool(...)

if (alternativeTool && (alternativeTool.monthlyPrice ?? Infinity) < (sameVendorPlan?.monthlyPrice ?? Infinity)) {
  // use alternative
} else if (sameVendorPlan) {
  // use same vendor
}
```

Once both branches ran independently and their results were compared on equal terms, cross-vendor recommendations started appearing correctly. The lesson was that logic bugs in recommendation systems are easy to miss with happy-path testing — you need tests for every branch, including the ones you assume will "just work."

---

## 2. A Decision I Reversed

The first design I committed to was a conditional-based audit engine — essentially a large set of hardcoded rules like: "if the tool is Cursor and the team size is under 3, recommend Hobby; if it's GitHub Copilot and the plan is Enterprise and the team is small, recommend Individual." This felt natural at first because the requirements listed specific tools and plans.

I reversed this decision on Day 2 after trying to add even one new tool (Windsurf) to the system. The conditionals cascaded. Adding Windsurf meant adding new branches for team-size checks, use-case filtering, and cross-vendor comparisons with every other existing tool. It was clear this would be unmaintainable at the scale the assignment required.

I replaced it with the capability registry architecture described in ARCHITECTURE.md. Each tool plan is a typed data entry with `capabilityLevel`, `useCases`, `minTeamSize`, `maxTeamSize`, and `monthlyPrice`. The matching functions filter candidates against the submitted audit input using these fields — no tool-specific conditionals anywhere.

I also reversed my initial type definitions midway through. My first `ToolAuditResult` interface didn't include `currentMonthlySpend` and `optimizedMonthlySpend` as separate fields — I was only tracking savings. When I integrated with Supabase and needed to display per-tool spend breakdowns in the UI, I had to restructure both the interface and the database schema. Starting with a leaner type and expanding it was more disruptive than designing the full shape upfront would have been.

---

## 3. What I Would Build in Week 2

If I had a second week, the priority list would be:

**Benchmark mode.** Right now the audit tells a team whether they're overpaying relative to cheaper alternatives. What it doesn't tell them is how their spend compares to teams of the same size and in the same industry. A "companies your size spend $X per developer on average" callout would significantly increase the audit's persuasiveness, especially for the finance stakeholders who are the real decision-makers in a software procurement conversation. I'd build this by storing anonymised aggregate data from completed audits and surfacing percentile comparisons.

**PDF export.** The results page is designed to be screenshotted and shared, but a properly formatted PDF report would make the audit shareable in contexts like Notion docs, finance reviews, and Slack channels where image screenshots lose fidelity. The Resend email already links to the live report — a PDF attachment would make it more portable.

**Better API cost modelling.** Right now the API audit input asks for monthly token volumes in millions. Most teams don't know these numbers off the top of their head. I'd add a "help me estimate" flow: ask how many requests per day, what's the typical prompt length, and what the output length is, then compute the MTok figures automatically. This would also let the engine model cost curves for teams whose usage is growing.

**Referral codes and sharing incentives.** The shareable audit URL exists, but there's no mechanism to reward people for spreading it. Even a lightweight "you shared this, here's a discount code for Credex" flow would create a viral loop without requiring a full user account system.

---

## 4. How I Used AI Tools

I used three AI tools during this project, each for different purposes.

**ChatGPT** was my primary resource for learning. This was my first project built in Next.js, and I used ChatGPT extensively to understand how App Router works — how layouts, pages, and API routes are structured, how server and client components differ, and how to correctly handle async params in dynamic routes. I also used it to find and evaluate third-party services I wasn't familiar with: it recommended Upstash Redis for rate limiting and helped me understand the tradeoff between Upstash's sliding window and fixed window rate limiters. I didn't trust it for precise pricing or API specifics — I always verified those against official documentation.

**Claude** was my go-to for frontend code. When I had a component structure in mind but the CSS wasn't behaving, or when I wanted to iterate quickly on the layout of the results page and recommendation cards, Claude produced cleaner, more structured Tailwind markup than I would have written from scratch. It was particularly useful for the `ResultsHero` stats grid and the email HTML template, which required a lot of inline styling and precise spacing.

**Gemini** was used both as a tool inside the product (for generating audit summaries) and occasionally as a second opinion when Claude and ChatGPT produced conflicting suggestions about TypeScript patterns.

**One specific time AI was wrong:** Early in the project, I asked ChatGPT to help me set up Supabase Row Level Security for the `audits` table. It generated a policy that it described as "allowing public read access to shared audit reports." When I tested it, authenticated users could read everything — but the policy did not correctly restrict unauthenticated access to only the columns I'd intended to expose. I caught this by testing the API route without credentials and observing that the full audit record, including internal fields, was returned. I scrapped the AI-generated RLS policy entirely and wrote a simpler one manually, confirmed by reading the Supabase documentation directly.

---

## 5. Self-Rating

**Discipline: 8/10**
I worked across five distinct calendar days with meaningful progress on each — the one day off (Day 4) was for university exams, documented honestly in the devlog. I didn't cram everything into the final day, and the commit history reflects this.

**Code Quality: 9/10**
The audit engine is cleanly separated into types, registries, matching utilities, and the engine itself. The API routes are thin. Components are modular and don't leak business logic. TypeScript is used throughout with explicit interfaces. The one area I'd improve is test coverage — five tests cover the audit engine, but the matching utilities themselves have no unit tests.

**Design Sense: 8/10**
The UI is dark-mode, typographically clean, and consistent across pages. The results page is designed to be shareable and screenshot-worthy. I avoided generic dashboard aesthetics. Where I leaned on Claude for frontend generation, I reviewed and adjusted the output rather than accepting it wholesale. I would rate myself lower on mobile responsiveness — the layout works but wasn't tested as thoroughly on small screens.

**Problem Solving: 9/10**
The cross-vendor bug took two hours but I solved it systematically — hypothesis formation, logging, isolating the problem to the control flow structure, and verifying the fix with targeted inputs. The registry architecture decision was the right call and I made it early enough that it didn't create technical debt. I handled the Supabase RLS issue properly by going back to primary sources.

**Entrepreneurial Thinking: 6/10**
I understood the product well enough to make good decisions — email gate after value delivery, honest "you're already efficient" output for low-savings audits, Credex surfaced only when savings exceed $500/month. But I didn't do the user interviews required by the assignment, and the GTM and economics documents are not complete. The tool works and looks credible, but I underinvested in the parts that would have made it genuinely launchable.