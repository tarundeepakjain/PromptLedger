> Note: Work below reflects actual development progression throughout the day. Several related tasks were committed together after testing, debugging, and cleanup rather than immediately after each implementation step.

## 2026-05-20 18:05 — Started Round 2 planning

Read the full assignment carefully before touching code. Spent time understanding evaluation criteria instead of jumping into implementation. Realized this round is mostly about engineering judgment, incremental extension of existing codebase, and communication quality.

---

## 2026-05-20 18:40 — Finalized persistence architecture

Considered multiple approaches:
- modifying existing audits table directly
- creating separate re-audit tables
- storing full pricing snapshots inside every audit
- pricing version normalization

Decided to:
- keep Round 1 tables mostly untouched
- add `stored_audits`
- add normalized `pricing_version` table
- store `pricing_version` references instead of duplicating pricing JSON per audit

Main reason: simpler change tracking and cleaner reviewer-facing architecture.

---

## 2026-05-20 19:30 — Added audit persistence flow

Refactored audit creation pipeline so generated audits are persisted with:
- email
- input snapshot
- output snapshot
- pricing version reference

Initially hit issues around JSON equality checks and Supabase json/jsonb handling.

---

## 2026-05-20 20:05 — Hit pricing snapshot comparison blocker

Tried direct JSON equality checks in Supabase using `.eq("snapshot", snapshot)`.

Postgres/Supabase returned:
`invalid input syntax for type json`

Spent time debugging serialization differences between JS objects and jsonb storage.

Temporary fix was using:
`JSON.stringify(snapshot)`

Not ideal production architecture, but acceptable for current time constraints.

---

## 2026-05-20 20:45 — Reworked pricing version lifecycle

Realized pricing changes only originate from `ai-tools.ts`.

Changed architecture from:
- periodic polling mindset

to:
- source-controlled pricing versioning

Implemented:
`getOrCreatePricingVersion()`

Flow now:
- read pricing from `ai-tools.ts`
- find matching stored snapshot
- reuse existing version if unchanged
- otherwise create new pricing version

This reduced duplicate snapshot storage and simplified future detection logic.

---

## 2026-05-20 21:30 — Split pure audit estimation from persistence

Originally `generateAudit()` handled:
- audit generation
- saving results
- pricing version management
- summary generation

This made pricing detection harder because detection only needs estimation.

Refactored architecture:
- `estimateAudit()` → pure business logic
- `generateAudit()` → persistence + orchestration

This made pricing re-evaluation much cleaner and easier to reason about.

---

## 2026-05-20 22:20 — Implemented pricing monitoring system

Created:
`pricing-monitor.ts`

Implemented:
- current pricing version detection
- audit re-evaluation
- change comparison logic
- affected audit detection

Important architecture decision:
rerun updates existing stored audit after showing old vs new diff. This avoids repeatedly notifying users about already-refreshed audits.

---

## 2026-05-20 23:10 — Implemented detect-changes API + automation workflow

Added:
`/api/detect-changes`

Initially considered cron polling but decided against frequent scheduled scans because pricing changes are relatively infrequent in this system.

Switched to GitHub Actions workflow triggered specifically on changes to:
`ai-tools.ts`

Reasoning:
pricing updates are source-controlled in this project, so event-driven detection is cleaner and avoids unnecessary scheduled computation.

---

## 2026-05-21 00:15 — Verified end-to-end detection flow locally

Successfully tested:
1. Create audit
2. Persist pricing version
3. Modify pricing in `ai-tools.ts`
4. Trigger detect-changes endpoint
5. Receive affected audit list

Core Round 2 backend architecture now functioning end-to-end. Remaining work:
- email notifications
- rerun endpoint
- diff UI
- PR/reflection docs

---

## 2026-05-21 00:30 - 07:30 slept

---

## 2026-05-21 08:20 — Implemented audit diff generation layer

Started work on user-facing change visibility after realizing raw “audit changed” notifications were not actionable enough.

Built a dedicated diff utility that compares:
- old optimized spend
- new optimized spend
- recommended tool/plan changes
- total savings delta

Important decision:
did not attempt deep generic JSON diffing.

Instead implemented domain-specific comparison logic because:
- audit structure is stable
- reviewer readability matters more than generic abstractions
- domain-aware diffs produce cleaner notifications

This also reduced noisy output significantly.

---

## 2026-05-21 09:10 — Added stale audit rerun pipeline

Implemented rerun flow for outdated audits.

Flow:
1. load stored audit
2. fetch latest pricing version
3. rerun estimation logic
4. compute diff
5. persist updated audit snapshot

Initially considered immutable historical audit chains, but rejected it for Round 2 scope because:
- complexity increased quickly
- reviewer value was low relative to implementation time
- notification freshness mattered more than audit history preservation

Current architecture overwrites outdated snapshots after diff generation.

---

## 2026-05-21 10:00 - 12:00 break

---

## 2026-05-21 12:10 — Implemented email notification pipeline

Integrated Resend transactional email flow for:
- pricing change alerts
- updated savings opportunities
- rerun confirmations

Spent time simplifying email content structure because earlier versions were too verbose and looked AI-generated.

Final structure focuses on:
- previous savings
- new savings
- what changed
- CTA back to updated audit

Also added graceful handling for:
- missing email
- resend failures
- duplicate rerun attempts

---

## 2026-05-21 13:15 — Refactored pricing monitor responsibilities

Pricing monitor initially became too orchestration-heavy.

Split logic into:
- pricing detection
- audit rerun service
- diff generator
- notification service

Main motivation:
reduce deeply nested async flows and improve debugging clarity.

This also made future testing easier because business logic can now be validated independently from persistence and notification side effects.

---

## 2026-05-21 14:20 — Added reviewer-focused logging and debugging output

Added structured console logging around:
- pricing version creation
- audit reruns
- changed recommendation detection
- email notification attempts

Main goal was improving debugging visibility during local verification and making deployment debugging easier later.

Also added clearer error messages for malformed stored audits and unsupported pricing states.

---

## 2026-05-21 15:05 — Tested edge cases for pricing change detection

Verified scenarios including:
- unchanged pricing
- lower pricing producing new savings
- increased pricing removing previous recommendations
- tool recommendation swaps
- API pricing adjustments

Found a bug where unchanged recommendations still appeared as modified because object comparison was reference-based instead of value-based.

Fixed by switching comparison logic to explicit field-level checks.

---

## 2026-05-21 16:30 - 17:00 break

---

## 2026-05-21 18:10 — Built audit change summary UI

Started frontend work for displaying pricing-change impact to users.

Implemented:
- previous vs current savings cards
- recommendation change highlights
- updated optimization summary section

Focused on keeping UI readable and screenshot-friendly instead of exposing raw JSON diff output.

Also improved empty states for:
- no pricing changes
- already optimized audits
- stale audit refresh failures

---

## 2026-05-21 19:05 — Performed end-to-end regression testing

Ran full manual flow repeatedly:
1. create audit
2. persist pricing version
3. modify pricing source
4. detect affected audits
5. rerun audit
6. generate diff
7. send notification
8. verify updated UI state

Main focus shifted from feature implementation toward reliability and architecture cleanup.

Fixed multiple smaller issues:
- stale cached pricing reads
- duplicate notification triggers
- inconsistent diff formatting
- loading state race conditions

Also verified:
- Supabase persistence consistency
- audit overwrite flow after reruns
- email fallback handling
- updated pricing snapshot generation

---

## 2026-05-21 20:00 — Final cleanup and submission preparation

Cleaned unused utilities and removed experimental code paths created during debugging.

Reviewed architecture consistency across:
- audit persistence
- pricing versioning
- rerun orchestration
- notification flow

Performed final pass on:
- error handling
- async flow readability
- audit diff consistency
- reviewer-facing logs

Prepared repository for:
- documentation finalization
- deployment verification
- PR cleanup
- final submission
