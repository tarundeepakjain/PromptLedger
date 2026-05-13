# PromptLedger — AI Spend Audit Tool

PromptLedger is a free web app that audits your team's AI tooling spend — subscriptions like Cursor, Claude, ChatGPT, and GitHub Copilot, as well as direct API usage across Anthropic, OpenAI, and Gemini — and surfaces defensible, capability-aware recommendations to reduce overspending without downgrading your team's actual productivity.

Built as a lead-generation asset for [Credex](https://credex.rocks), the tool is designed to be genuinely useful on its own: no login, no paywall, instant results.

**Live URL:** _[https://prompt-ledger-liart.vercel.app/]_

---

## Screenshots


Suggested screenshots:
- Landing page with the audit form
- Tool configuration step (plan, seats, use case)
- Audit results page showing per-tool breakdown, hero savings numbers, and AI summary
- Shareable report URL with Open Graph preview

---

## Quick Start

### Prerequisites

- Node.js >= 20.9.0
- pnpm >= 11.0.7

### Install & Run Locally

```bash
git clone https://github.com/tarundeepakjain/prompt-ledger.git
cd prompt-ledger
pnpm install
```

Copy the environment variables file and fill in your keys:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_RESEND_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run Tests

```bash
pnpm test
```

### Lint

```bash
pnpm lint
```

### Deploy

The project is configured for one-click deployment on Vercel. Push to `main` and connect the repo in the Vercel dashboard. Set all environment variables from `.env.local` in the Vercel project settings.

Alternatively, deploy to Netlify, Cloudflare Pages, or Render — the app has no server-side runtime dependencies beyond standard Next.js.

---

## Decisions

Five meaningful trade-offs made during the build:

**1. Capability-level registry over conditional logic**
The audit engine started as a set of nested if-else chains comparing tool names directly. This broke down fast — adding a new tool meant touching multiple places, and cross-vendor comparisons were fragile. I replaced it with structured `aiPlans` and `api_direct` registries where every plan carries a `capabilityLevel` (1–4), supported `useCases`, and team size bounds. The engine filters and scores candidates against these fields rather than hardcoding comparisons. This made the recommendation logic significantly easier to test, extend, and reason about.

**2. Same-vendor recommendations as a separate pass before cross-vendor**
An early version of the engine checked same-vendor and cross-vendor alternatives in a single filtering pass, which caused a subtle bug: the `else if` structure meant that once a same-vendor candidate was found (even a suboptimal one), cross-vendor alternatives were never evaluated. Separating these into two explicit function calls — `findCheapestSameVendorPlan` and `findCheapestAlternativeTool` — and then comparing their results made the logic correct and transparent.

**3. Subscription products and API products as separate registries**
Combining ChatGPT Plus ($20/month flat) with OpenAI API (billed per token) into a single registry would have required the engine to make assumptions about token volume from flat-rate spend, or vice versa. These are operationally different procurement decisions. Keeping them separate means the engine never conflates them, and the form captures the right inputs for each type (monthly spend + seats vs. input/output token volumes).

**4. AI summary via Gemini with deterministic fallback**
The assignment required AI-generated summaries, but using AI for the audit math itself would produce unpredictable, undefensible output. I kept all pricing logic rule-based and used Gemini 1.5 Flash only for generating the plain-English summary paragraph from the structured audit result. A hardcoded fallback summary is always available if the API call fails or times out, so the audit result is never blocked on the AI layer.

**5. Lead capture after value is shown, not before**
The email gate appears only after the full audit results are displayed, not before. This was a deliberate product decision aligned with the assignment brief — capturing the lead after demonstrating value produces higher-quality submissions and doesn't penalise curious visitors. The shareable URL works without any email capture at all; the email flow adds the report delivery and the Credex consultation trigger.