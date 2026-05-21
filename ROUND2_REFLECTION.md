## 1. What was the most uncomfortable trade-off you made because of the time pressure?

The biggest trade-off I made was choosing overwrite-based audit updates instead of implementing immutable audit history versioning.

Initially, I wanted every pricing-triggered rerun to create a separate historical audit snapshot so users could compare older recommendations over time. From an architecture perspective, that approach was cleaner because it preserved historical state and made future analytics easier. I explored the idea briefly while designing the rerun flow and pricing version system.

However, once I mapped the actual implementation cost, I realized it would require:
- historical audit tables
- snapshot linking
- more complex retrieval logic
- additional UI handling
- more testing around rollback and comparison behavior

Under the Round 2 time constraints, I decided that preserving notification freshness and end-to-end reliability mattered more than historical completeness.

The final implementation overwrites outdated audit snapshots after diff generation while still surfacing meaningful user-facing changes through a dedicated diff layer. I was uncomfortable with the compromise because I normally prefer append-only historical systems, but for this scope it allowed me to ship a complete working pipeline instead of a partially finished architecture.

---

## 2. If we extended the deadline by another 24 hours right now, what’s the first thing you’d do?

The first thing I would do is implement automated integration testing around the full pricing-change pipeline.

Most of my testing during Round 2 was manual because the architecture evolved quickly while I was building it. I repeatedly tested the flow end-to-end by:
1. creating audits
2. modifying pricing data
3. detecting affected audits
4. rerunning audits
5. generating diffs
6. triggering notifications
7. verifying updated UI state

That process helped uncover several issues like stale cached pricing reads, duplicate notification triggers, and incorrect diff comparisons. However, those checks were still dependent on manual verification.

If I had another 24 hours, I would prioritize building a dedicated integration test suite that validates the entire rerun lifecycle automatically. Specifically, I would test:
- pricing snapshot changes
- affected audit detection
- diff correctness
- notification triggering
- audit overwrite behavior

I would do this before adding any new features because Round 2 shifted from feature building into orchestration reliability very quickly, and automated regression coverage would have increased confidence in every future change.

---

## 3. Looking back at your Round 1 codebase as a now-experienced user of it, what’s one thing your Round 1 self made harder for your Round 2 self?

One thing my Round 1 self underestimated was how important comparison-friendly data structures would become once pricing versioning and rerun flows were introduced in Round 2.

Overall, the Round 1 architecture actually helped a lot during this round. In particular, keeping pricing definitions centralized inside `ai-tools.ts` turned out to be a very strong decision because it made pricing updates, reruns, and pricing snapshot generation much easier to implement. I could modify pricing data in a single place and reuse it consistently across the audit engine and pricing monitor flows.

The harder part was that the original audit result structures were primarily designed for generating recommendations, not for comparing recommendation history over time. Once I started implementing audit reruns and pricing-change notifications, I realized I needed much more explicit comparison logic between old and new audit states.

That became especially visible when generating user-facing diffs for:
- recommendation swaps
- savings deltas
- optimized spend changes
- unchanged recommendation detection

Initially, some comparisons incorrectly flagged unchanged recommendations because object equality checks were reference-based instead of value-based.

So the challenge was not that the Round 1 codebase was poorly structured overall, but that it was optimized for one-time audit generation rather than long-term audit evolution and historical comparison workflows.