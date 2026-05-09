## Day 1 - 2026-05-07

**Hours Worked :** 3

**What I did:**
- Set up the Next.js project using TypeScript and Tailwind CSS
- Initialized the repository structure and configured the local development environment
- Read the assignment carefully and analyzed the MVP requirements
- Researched official pricing pages for all required AI tools
- Completed `PRICING_DATA.md` with verified pricing references and API pricing data for the audit engine

**What I learned:**
- Difference between subscription-based AI products and direct API pricing models
- How enterprise pricing differs from public pricing tiers
- Importance of defensible pricing logic for audit recommendations
- Better understanding of how the audit engine should compare plans, alternatives, and overspending patterns

**What I'm stuck on:**
- Nothing currently blocked. Initial setup and pricing research completed successfully.

**Plans for tommorow:**
- Analyze how the audit engine should evaluate overspending scenarios
- Design the structure and logic for audit recommendations
- Start implementing the core audit engine and spend evaluation flow

---

## Day 2 - 2026-05-08

**Hours Worked :** 4

**What I did:**
- Focused primarily on designing the audit engine architecture instead of direct feature implementation
- Implemented the initial audit-engine flow assuming the provided user input is already valid and optimized
- Designed a capability-based recommendation system instead of using large conditional chains
- Reworked the earlier `pricing.ts` approach and replaced it with structured capability registries using `aiPlans` and `api_direct`
- Classified AI tools based on:
  - supported use cases
  - capability level
  - deployment type
  - enterprise suitability
  - pricing metadata
- Planned comparison logic for:
  - same-tool different-plan optimization
  - cross-tool recommendations
  - API-to-API comparisons
- Started building the matching and recommendation layer for the audit engine

**What I learned:**
- Large conditional-based recommendation systems become difficult to scale and maintain
- Capability-based optimization creates more defensible and realistic audit recommendations
- Subscription products and direct APIs should be treated as separate operational categories
- Real procurement-style optimization focuses on capability-fit and operational efficiency rather than benchmark comparisons
- Pricing metadata alone is insufficient for intelligent recommendations without workload classification

**What I'm stuck on:**
- Initially started implementing recommendation logic using direct conditionals and pricing comparisons, but later realized that a capability-driven architecture would produce cleaner and more scalable audit logic
- Designed a hierarchical capability model where:
  - level 4 can handle level 3/2/1 workloads
  - level 3 can handle level 2/1 workloads
  - level 2 can handle level 1 workloads
- Still refining how aggressive cross-tool recommendations should be while keeping recommendations operationally defensible

**Plans for tommorow:**
- Complete the core audit-engine matching layer
- Implement:
  - `canHandleUseCase`
  - `hasEnoughCapability`
  - `isTeamCompatible`
  - `findCheapestValidAlternative`
- Connect audit input with capability registries and recommendation logic
- Start building the email capture and transaction email flow
- Begin implementing the frontend UI for audit input and result visualization
- Continue focusing primarily on completing a strong and defensible audit engine MVP

---

## Day 3 - 2026-05-09

**Hours Worked :** 4

**What I did:**
- Completed the backend implementation of the audit engine and recommendation pipeline
- Created `matching.ts` and implemented the core matching utilities for audit evaluation
- Implemented recommendation flow for:
  - same-vendor cheaper plan recommendations
  - alternative-tool recommendations
  - API-to-API optimization comparisons
- Connected the audit engine with a working Next.js API route using `/api/audit`
- Structured the audit pipeline to generate:
  - optimized spend
  - monthly savings
  - annual savings
  - recommendation reasoning
- Refined the capability-based recommendation hierarchy and recommendation priority order
- Improved type safety across the engine by refining interfaces inside `types.ts`
- Fixed multiple small type and comparison bugs during implementation
- Initialized and started documenting `ARCHITECTURE.md`
- Documented:
  - audit engine flow
  - capability hierarchy
  - registry separation
  - recommendation priorities
  - system architecture decisions
- Set up Supabase for backend persistence and initialized the database client configuration
- Planned the backend flow for:
  - email capture
  - transactional emails
  - report generation
  - rate limiting

**What I learned:**
- Separating matching logic into reusable utility functions makes the audit engine much easier to extend and debug
- Strong typing becomes increasingly important once recommendation paths and multiple plan registries are introduced
- Same-vendor optimization should be prioritized before cross-vendor recommendations because migration cost is a real operational factor
- Capability-aware filtering creates more defensible recommendations than simple price comparison
- API routes in Next.js App Router are straightforward once the request/response flow is understood
- Designing the audit engine architecture and recommendation hierarchy required significantly more thinking and system design work than direct implementation

**What I'm stuck on:**
- No major blockers today
- Faced a few small issues related to nullable pricing types and API pricing comparisons, but they were resolved quickly during implementation
- Still refining how the audit summaries and email/report flow should integrate cleanly with the backend pipeline

**Plans for tommorow:**
- Integrate Gemini API for AI-generated audit summaries
- Complete email capture and transactional email flow using Resend
- Start implementing report generation and shareable audit pages
- Add rate limiting for basic abuse protection
- Begin frontend UI development for:
  - audit input
  - audit result visualization
  - recommendation cards
- Continue improving the audit engine and recommendation quality where needed