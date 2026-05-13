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

---

## Day 4 - 2026-05-10

**Hours Worked :** 0

**What I did:**
- No project development work completed today

**What I learned:**
- Maintaining consistent progress across multiple days is important for long-term project quality and sustainability
- Large frontend integration work requires uninterrupted focused time, especially when combining App Router architecture, client components, and backend integration flows

**What I'm stuck on:**
- No technical blockers today
- Frontend implementation and component integration still remain pending from the previous day's planned tasks

**Plans for tommorow:**
- Continue with the planned frontend UI development for:
  - audit input
  - audit result visualization
  - recommendation cards
- Integrate Gemini API for AI-generated audit summaries
- Complete email capture and transactional email flow using Resend
- Start implementing report generation and shareable audit pages
- Add rate limiting for basic abuse protection
- Continue improving frontend stability and modular component structure

**Reason for no work today:**
- University tests and academic preparation occupied the full day

---

## Day 5 - 2026-05-11

**Hours Worked :** 2

**What I did:**
- Implemented Gemini-powered AI-generated audit summaries with graceful fallback handling
- Added prompt engineering documentation in `PROMPTS.md`
- Integrated Supabase lead storage for audit submissions
- Integrated Resend transactional email workflow for audit confirmation emails
- Added Upstash Redis based API rate limiting for abuse prevention
- Improved backend modularity by separating audit, lead, email, and rate-limiting logic into dedicated utility files

**What I learned:**
- AI features become significantly more reliable when deterministic fallback systems are implemented alongside them
- Building production-style backend architecture requires careful separation of concerns between APIs, services, and database layers
- Sometimes initial implementation plans do not work efficiently in practice, and a clearer architectural approach becomes necessary while progressing through the project
- Normalized relational database design improves scalability and maintainability for complex result structures like audit reports and tool-level optimizations

**What I'm stuck on:**
- Frontend implementation and UI integration are still pending
- Shareable audit page rendering and Open Graph metadata integration still need frontend work

**Plans for tommorow:**
- Complete all frontend UI work including:
  - audit input flow
  - audit result visualization
  - recommendation cards
  - shareable audit report page
- Implement frontend integration with backend APIs
- Add Open Graph and Twitter metadata for shareable reports
- Implement tests for backend audit logic and APIs
- Add CI workflow configuration
- Complete `ARCHITECTURE.md`
- Complete `REFLECTION.md`
- Finalize overall frontend polish and responsive design

---

## Day 6 - 2026-05-12

**Hours Worked :** 6

**What I did:**
- Built the first complete frontend prototype for the application with core pages and reusable UI components
- Added branding assets and SVG logos for supported AI providers and integrations
- Improved audit engine recommendation logic for both subscription-based tools and API-based tools
- Fixed same-vendor recommendation handling where valid cheaper alternatives were not being surfaced correctly
- Refactored tool usage data structures and updated audit input/output handling for cleaner matching logic
- Added normalized audit result IDs to support publicly shareable audit URLs and easier audit retrieval
- Improved API pricing calculations for monthly and annual spend estimation in the audit engine
- Enhanced cross-vendor matching logic to generate more realistic optimization recommendations
- Refined audit summaries and savings calculations for edge cases where users were already on optimized plans
- Continued modularizing matching and pricing utilities to keep recommendation logic maintainable and scalable

**What I learned:**
- Recommendation systems become significantly more reliable when same-vendor and cross-vendor logic are handled separately instead of through a shared generic matcher
- Small inconsistencies in pricing models or capability matching can completely change optimization results, so deterministic validation is critical
- Designing reusable frontend components early makes later backend integration much easier and cleaner
- Publicly shareable audit systems require careful separation between internal audit storage and public-facing identifiers

**What I'm stuck on:**
- Frontend and backend integration still needs complete end-to-end testing
- Shareable audit pages still need final metadata validation and production-level polish
- Automated test coverage for audit engine edge cases is still pending

**Plans for tomorrow:**
- Complete shareable public audit page flow
- Add and verify Open Graph/Twitter metadata rendering
- Write automated tests for audit engine recommendation scenarios
- Add GitHub Actions workflow for linting and tests
- Complete remaining documentation files including architecture and reflection notes

---

## Day 7 — 2026-05-13

**Hours worked:** 8

**What I did:**  
Today was focused on final polishing, debugging, deployment verification, CI setup, and completing all remaining documentation for the Credex assignment.

I completed and refined several important markdown files including:
- GTM.md
- ECONOMICS.md
- USER_INTERVIEWS.md
- README.md improvements with screenshots
- Final documentation cleanup

I also worked heavily on the engineering side of the project:
- fixed runtime issues in the recommendation cards
- resolved production build issues
- improved audit engine handling
- reviewed Open Graph preview behavior
- cleaned TypeScript types and naming consistency
- verified environment variables and deployment readiness

A major part of today was learning and setting up GitHub Actions and the CI pipeline. I configured lint and test checks to run automatically on pushes, and spent a lot of time debugging failing lint/type errors.

I also learned Vitest and wrote tests for the audit engine logic. This helped me better understand how to test business logic separately from UI components.

Another important thing I realized today is how smooth Next.js deployment on Vercel is. Once environment variables and build issues are handled correctly, deployment becomes surprisingly simple and developer-friendly.

I also refined the positioning of the product after user feedback. Initially, I thought students could also be a strong audience, but I realized the product is much more valuable for startups and small teams actively paying for multiple AI subscriptions.

Finally, I reviewed the overall project structure, commits, deployment, CI status, and documentation to ensure the submission looked like a real product instead of only an assignment project.

**What I learned:**  
Today I learned several practical engineering concepts that I had not used deeply before.

I learned:
- how GitHub Actions and CI pipelines work
- how automated lint and test checks improve code quality
- how to use Vitest for testing business logic
- how strict TypeScript typing helps catch hidden runtime problems
- how deployment pipelines work with Next.js and Vercel

I also learned that debugging production and lint errors can sometimes take more time than building features themselves. Small type mismatches and undefined values caused multiple build failures, and fixing them required carefully tracing data flow across components and utility functions.

Another major learning was understanding the importance of balancing:
- product thinking,
- engineering quality,
- deployment stability,
- documentation,
- and user experience

within a limited timeline.

**What I'm stuck on:**  
The biggest blocker today was resolving linting and type-related issues. I had to make many TypeScript fixes and refactor parts of the codebase because `pnpm lint` and production builds were failing repeatedly.

Some runtime issues only appeared during production builds and not during local development, which made debugging slower.

I also spent significant time understanding CI pipeline failures and fixing workflow-related issues until all checks passed successfully.

Another challenge was balancing feature improvements with documentation work near the submission deadline.

**Plan for tomorrow:**  
Today is the final submission day, so there are no further development plans after completing the final review and submission process.

---