## What this PR does
Implemented a pricing change detection and re-audit system that identifies audits affected by updated AI tool pricing and notifies impacted users. Added manual GitHub Action-triggered detection for ai-tools.ts changes, rerun audit comparison flow, and automatic updating of stored audit snapshots after re-audit to prevent stale future notifications.

## Why
This helps startups keep their AI spend audits aligned with changing vendor pricing instead of relying on outdated recommendations, especially benefiting teams actively optimizing recurring AI costs. We assumed users care more about updated actionable savings than preserving historical diffs permanently, so old vs new audit diff previews are only available until the user applies the update, after which the existing audit snapshot in the database is replaced with the refreshed version.

## How it works
- Pricing definitions and optimization rules live in `ai-tools.ts`, `matching.ts`, and `audit-engine.ts`.
- When pricing data changes in `ai-tools.ts`, a manually triggered GitHub Action calls the pricing detection API i.e. `api/detect-changes` instead of running continuously.
- The detection flow generates a pricing snapshot, compares it with the latest stored version, and identifies audits using outdated pricing.
- Affected users receive notification emails prompting them to rerun their audits.
- On rerun, the system generates a fresh audit using updated pricing and shows an old vs new diff preview before applying changes.
- After the user applies the update, the existing audit row in the database is replaced with the refreshed audit output and latest pricing version, so stale audits are not repeatedly flagged in future detections.
- Diff previews are intentionally temporary and are not persisted after the update is applied.

## What I cut
- I did not persist historical diff previews after users applied updates because the simpler “replace existing audit snapshot” flow prevented repeated stale pricing alerts and reduced database complexity within the Round 2 time constraints.
- I did not build unsubscribe management for pricing update emails because the core value in this round was the pricing detection + rerun audit workflow, and the time/impact tradeoff favored shipping the re-audit system first.
- I did not build an admin dashboard for pricing versions, affected audits, or rerun monitoring because the assignment scope prioritized backend workflow correctness over internal operational tooling.
- I intentionally used a manually triggered GitHub Action instead of fully automated scheduled pricing crawlers to avoid false-positive detections and unnecessary notification spam during pricing data updates.
- I avoided using AI for pricing optimization decisions and kept the audit engine rule-based because deterministic pricing logic was more reliable and explainable for finance-related recommendations.

## How it works 
1. Create a normal audit from the deployed application using any supported AI tool stack and submit an email address.
2. The reviewer can verify that:
- the audit generates successfully
- recommendations and savings are rendered correctly
- the audit page persists after refresh/navigation
- a public shareable audit URL is generated (Round 1 feature)
3. Pricing definitions currently live inside:
```ts
ai-tools.ts
```
This file acts as the centralized pricing source used by:
- the audit engine
- pricing version generation
- rerun detection logic
4. During development, pricing changes were simulated by modifying values inside `ai-tools.ts` and pushing commits to GitHub.
5. A GitHub Actions workflow automatically triggers:
```bash
GET /api/detect-changes
```
after pricing-related updates are pushed.
6. The detection endpoint compares:
- the latest generated pricing snapshot
- against the previously stored pricing version
7. If pricing changes are detected:
- affected audits are identified
- audits are rerun automatically
- recommendation diffs are generated
- updated audit snapshots are persisted
- notification emails are triggered
8. Reviewer access is intentionally limited to deployed/public functionality only. Since reviewers cannot modify repository pricing data themselves, they may not always see active pricing-change reruns unless a pricing delta already exists in the deployed environment.
9. Reviewers can still verify the complete user-facing diff system by visiting:
```bash
/audit/diff-view/[id]
```
The audit `id` can be obtained from the public shareable audit URL generated during the Round 1 audit flow.
10. The diff view page shows:
- previous vs updated savings
- recommendation changes
- optimization summary updates
- pricing impact visibility
11. Email notifications currently send only to the developer-configured Resend email during Round 2 testing. External reviewer emails will not receive transactional emails during review.

## What's tested
- Manual end-to-end testing for:
  - audit creation
  - pricing version persistence
  - pricing change detection
  - affected audit identification
  - rerun pipeline execution
  - audit diff generation
  - updated audit persistence
  - notification triggering flow
  - updated frontend diff rendering
- Edge cases tested:
  - unchanged pricing
  - lower pricing producing new savings
  - increased pricing removing recommendations
  - recommendation swaps
  - API pricing changes
  - stale audit reruns
  - duplicate rerun prevention
- Verified graceful handling for:
  - resend failures
  - malformed stored audits
  - missing email states
  - unsupported pricing states
- Automated testing coverage for the new pricing-change orchestration layer was limited due to time constraints.
- If additional time were available, the first automated tests added would be:
  - pricing diff generation
  - affected audit detection
  - rerun pipeline integration
  - notification trigger conditions

## Open questions / risks
- Pricing data is currently updated manually through the pricing source configuration. In production, this would likely require automated vendor pricing syncs or scheduled validation checks.
- Email delivery is intentionally restricted to the developer Resend configuration for Round 2 testing. Production rollout would require verified broader transactional email handling and monitoring.
- The rerun pipeline currently prioritizes correctness and reviewer visibility over large-scale throughput optimization. If pricing changes affected very large audit volumes simultaneously, batching and queue-based processing would likely be needed.