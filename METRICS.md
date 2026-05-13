## North Star Metric

**Qualified lead conversion rate** — the percentage of completed audits that result in a Credex consultation booking (or email capture for high-savings cases).

### Why this metric

PromptLedger is a lead-generation asset for Credex. The product is only successful if it produces leads that convert into Credex customers. Raw audit completions are vanity — what matters is whether the people who complete audits (a) have real savings on the table, and (b) take the next step toward acting on them.

"Qualified" is defined specifically: an audit showing ≥ $500/month in potential savings where the user submits their email or clicks the Credex consultation CTA. This filters out low-savings audits (which are genuinely useful to the user but not valuable to Credex) and captures only the users for whom the commercial handoff is appropriate.

A healthy early benchmark: 8–12% of all completed audits convert to a qualified lead action.

---

## Input Metrics

Three input metrics drive the North Star:

### 1. Audit completion rate

**Definition:** Percentage of users who reach the results page out of users who interact with the form (select at least one tool).

**Why it matters:** If users start the form and abandon it, the audit is failing at the value delivery layer. A high drop-off at the configuration step suggests the form is too complex or the tool options are confusing. Target: > 70% completion from form interaction to results page.

**What to instrument:** Form step transitions (tool selection → configuration → submit), API response latency for the `/api/audit` route, and error rates on form submission.

---

### 2. Savings distribution of completed audits

**Definition:** The proportion of completed audits that fall into the ≥ $500/month savings bracket vs. the < $100/month bracket vs. the middle.

**Why it matters:** The audit is only commercially useful to Credex if it surfaces users with real savings. If the majority of audits show < $100/month savings, either the target users are already well-optimised (unlikely for the early audience) or the recommendation engine is too conservative. Tracking this distribution tells you whether the tool is reaching the right people.

**What to instrument:** Save the `totalMonthlySavings` value with every audit record (already done in Supabase). Run a weekly aggregation query against the `audits` table.

---

### 3. Shareable link distribution rate

**Definition:** Percentage of users who copy the shareable audit URL or click the X/LinkedIn share buttons on the results page.

**Why it matters:** The shareable URL is the primary organic growth loop. Every shared audit is a potential cold-impression for a new user who hasn't heard of PromptLedger. Tracking share rate tells you whether the results page is generating genuine word-of-mouth or whether users are completing audits and leaving without propagating the tool.

**What to instrument:** Click events on the "Copy" button and the X/LinkedIn share buttons in `ShareButtons` component. Track whether the share action happened before or after the email capture step.

---

## What to Instrument First

In order of priority:

1. **Audit submission and completion events** — the `/api/audit` POST with a result status, plus a client-side "results page loaded" event. This is the most important funnel step.
2. **Email capture submission** — the `/api/leads` POST, tagged with the `totalMonthlySavings` bracket of the associated audit.
3. **Credex CTA clicks** — the "Explore Credex" and "Contact Credex" buttons in the results page and email template. This is the final conversion event.
4. **Share button clicks** — copy link, X share, LinkedIn share.
5. **Form abandonment** — users who select tools but don't reach the results page.

A simple implementation using Vercel Analytics or a lightweight custom events table in Supabase would cover all five within a day of work.

---

## Pivot Trigger

**If qualified lead conversion rate stays below 3% after 500 completed audits, re-evaluate the product.**

At 3% conversion, 500 audits produce 15 qualified leads. If Credex's close rate on those leads is 20%, that's 3 customers from 500 audits. Depending on the average deal value, this may or may not be worth the ongoing maintenance cost of the tool.

The pivot decision should diagnose *where* the conversion breaks down:

- If audit completion rate is low (< 50%), the form is too complex — simplify.
- If savings distribution skews low (most audits < $100/month), the tool is reaching the wrong audience — revisit distribution channels.
- If completion rate and savings distribution are both healthy but email capture is low, the value proposition at the results page isn't landing — redesign the CTA.
- If email capture is fine but Credex CTA clicks are low, the handoff to Credex isn't compelling — test different messaging or lower the $500/month threshold.

DAU is explicitly not a useful North Star for this product. PromptLedger is a tool most teams will use once or twice a year when reviewing their AI spend. Repeat visits are not a signal of success; qualified leads are.