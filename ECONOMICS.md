All figures below are estimates. Inputs are marked as assumptions where exact data is unavailable. The goal is to show a realistic model with defensible reasoning, not precise projections.

---

## What Is a Converted Lead Worth to Credex?

Credex sells discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise, and others — at a meaningful discount to retail price. Based on publicly available pricing for these tools and a reasonable assumption that Credex sources credits at 20–35% below retail (typical for overforecast enterprise credits), the margin per deal depends heavily on deal size.

**Assumptions:**
- Average startup buying AI credits through Credex: $500–$2,000/month in AI spend being optimised through credits
- Credex margin on credits: ~25% (conservative estimate)
- Average monthly gross profit per customer: $125–$500
- Average customer retention: 8–12 months before churn or renegotiation

**Estimated LTV per converted Credex customer:**

| Scenario | Monthly Spend Managed | Credex Margin | Retention | LTV |
|---|---|---|---|---|
| Conservative | $500/mo | 25% | 8 months | **$1,000** |
| Base case | $1,000/mo | 25% | 10 months | **$2,500** |
| Optimistic | $2,000/mo | 25% | 12 months | **$6,000** |

For the purposes of this model, the base case LTV of **$2,500 per converted customer** is used.

---

## Customer Acquisition Cost by Channel

PromptLedger is the acquisition mechanism. CAC is therefore the cost of running and distributing the tool, divided by customers acquired through it.

**Channel 1: Organic social (Reddit, X, LinkedIn) — $0 paid**

Cost: founder time only. Estimated 3–5 hours/week of content and community engagement.
At a founder hourly opportunity cost of ~$50/hour, weekly cost = ~$200.
Monthly cost = ~$800.

If organic social drives 400 completed audits/month → 40 qualified leads (10% rate) → 8 Credex customers (20% close rate):

**CAC via organic social = $800 / 8 = $100**

**Channel 2: Product Hunt / Hacker News launch — $0 paid**

One-time effort. Estimated 10 hours of prep and engagement.
Cost: ~$500 in opportunity cost.
Expected yield from a successful launch: 500–1,000 audits, 50–100 qualified leads, 10–20 Credex customers.

**CAC via launch = $500 / 15 (midpoint) = ~$33**

**Channel 3: Credex existing customer list (unfair channel)**

Cost: one email send to existing customers. Near zero marginal cost.
If 10% of existing customers try the tool, and 30% of those discover additional savings and re-engage with Credex for a new credit package:

**CAC via existing list ≈ $0–$20 (email send cost only)**

**Blended CAC estimate across all channels: $50–$100**

At a base case LTV of $2,500 and a blended CAC of $75, the **LTV:CAC ratio is approximately 33:1** — well above the 3:1 threshold typically used to assess acquisition channel health.

---

## Conversion Funnel

The full funnel from tool visitor to Credex customer:

| Stage | Rate | Notes |
|---|---|---|
| Visitor → Audit started | 40% | Users who interact with the form |
| Audit started → Completed | 70% | Drop-off at configuration step |
| Completed → Qualified (≥$500/mo savings) | 20% | Estimated based on typical AI spend distribution |
| Qualified → Email captured | 50% | Email gate appears after results |
| Email captured → Credex CTA clicked | 30% | High-savings banner + email CTA |
| CTA clicked → Consultation booked | 40% | Credex sales conversion |
| Consultation → Credit purchase | 50% | Credex close rate assumption |

**End-to-end: 1,000 visitors → 400 audits → 280 completed → 56 qualified → 28 email captures → 8 Credex CTAs → 3 consultations → 1–2 customers**

This means PromptLedger needs to drive roughly **500–700 completed audits** to reliably produce one paying Credex customer. At a blended CAC of $75 per customer and LTV of $2,500, this funnel is profitable from the first customer.

---

## What Would Have to Be True for $1M ARR in 18 Months

Credex ARR = (number of active customers) × (average monthly revenue per customer) × 12

Target: $1,000,000 ARR
Average monthly revenue per customer: $250 (25% margin on $1,000/month managed spend)
Required active customers: **333**

**Working backwards from the funnel:**

To acquire 333 customers in 18 months = ~18–19 new customers per month.

At 1 customer per 600 completed audits (end-to-end funnel):
Required completed audits per month = **~11,000**

At 70% completion rate from audit starts:
Required audit starts per month = **~15,700**

At 40% of visitors starting an audit:
Required monthly visitors = **~39,000**

**Is 39,000 monthly visitors achievable in 18 months?**

This requires meaningful paid distribution or a viral coefficient above 1.0 from the shareable URL. Organic social and launch events alone will not sustain this. The model for $1M ARR requires:

- A sustained content marketing programme (SEO targeting the search queries listed in GTM.md)
- At least one paid acquisition channel tested and validated (LinkedIn ads to founder audiences, estimated CPL $15–$40)
- The Credex existing customer channel actively distributing PromptLedger to warm prospects
- A referral mechanism built into the product (share link → reward) to increase the viral coefficient

**The math works if the distribution scales. The bottleneck is not the funnel conversion rate — it's top-of-funnel volume.**

A more conservative 18-month target grounded in the $0-budget GTM plan: **$150,000–$250,000 ARR**, representing 50–83 active Credex customers acquired primarily through organic distribution and the existing Credex customer list. This is achievable and creates the proof-of-concept needed to justify investment in paid acquisition for the $1M ARR push.