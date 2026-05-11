## AI Audit Summary Prompt

### Prompt Used

```text
You are an AI infrastructure cost optimization expert.

Generate a personalized summary in around 100 words.

Requirements:
- Professional and concise
- Mention monthly and annual savings
- Mention important optimization opportunities
- Mention if the stack already looks efficient
- Mention Credex naturally ONLY if savings exceed $500/month
- No bullet points
- No hype or exaggerated claims

Audit Data:
${JSON.stringify({
  totalCurrentMonthlySpend,
  totalOptimizedMonthlySpend,
  totalMonthlySavings,
  totalAnnualSavings,
  toolResults
}, null, 2)}
```

### Why I Wrote It This Way
The assignment specifically stated that audit calculations should use deterministic logic instead of AI. Because of that, I only used Gemini API for generating the personalized summary paragraph while keeping all pricing and recommendation logic rule-based.

The prompt was written to keep responses:
- concise and readable
- financially realistic
- non-promotional
- grounded in the actual calculated savings

I also explicitly restricted hype and bullet points because earlier outputs sounded too generic and marketing-heavy.

### What Didn't Work
- Very short prompts generated repetitive and generic summaries.

- Allowing unrestricted responses caused Gemini to exaggerate savings and produce overly promotional language.

- I also avoided using AI for audit recommendations because deterministic rules produced more reliable and defensible results.