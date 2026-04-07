# VISTADEL FAQ

Frequently asked questions about the VISTADEL framework, organized by topic.

---

## Getting Started

**What is VISTADEL?**
VISTADEL is a 7-phase app development framework built by INT Inc. based on 50+ real client projects. The acronym stands for: Vision → Integration → Stack → Testing → AI Implementation → Deployment → Evolution → Launch. It gives teams a repeatable structure for shipping production-grade applications with less guesswork and fewer expensive mistakes.

**Who is VISTADEL for?**
VISTADEL works for three audiences: (1) INT team members using it as a delivery methodology, (2) INT clients learning how to work with INT on a project, and (3) any founder, engineer, or team building an app and wanting a tested framework to follow. See [TIER-3-PUBLIC.md](../TIER-3-PUBLIC.md) for community use.

**Do I have to follow all 8 phases in order?**
For new projects, yes — the phases are designed to build on each other. Skipping Phase I (Integration) before Phase S (Stack) means making database and architecture decisions without understanding your data flows and compliance requirements. That said, experienced teams often run phases in parallel (e.g., Phase S and Phase T overlap naturally).

**How long does the full VISTADEL process take?**
It depends heavily on project scope and compliance requirements. Simple apps: 8–12 weeks. Mid-complexity (e.g., Martensen IP HubSpot implementation): 10–14 weeks. Complex/regulated (e.g., Accolade HIPAA, Destwin SOC 2): 16–20+ weeks. Most of the variance comes from Phase D's audit/compliance observation periods, not the development work.

**What makes VISTADEL different from Agile/Scrum?**
Agile/Scrum describes *how* you work (sprints, stand-ups, retrospectives). VISTADEL describes *what* to do and in what order, especially for the front-end decisions (validation, architecture, compliance) that Agile frameworks are silent about. VISTADEL phases run inside a Scrum cadence — they're complementary, not competing.

**Is VISTADEL only for software projects?**
VISTADEL was designed for app development but the Vision, Integration, and Evolution phases apply to any complex product or service launch. Phase S (Stack) and Phase T (Testing) are software-specific.

**How much does it cost to use VISTADEL?**
The public framework is free under MIT License. INT's Customization Service — where INT helps you execute VISTADEL on your specific project — is a paid service. Contact contact@intinc.com for pricing.

**Can I use VISTADEL with my existing team and tools?**
Yes. VISTADEL is stack-agnostic in its framework. Phase S recommends INT's default stack (Claude, Next.js, Supabase, n8n) but explicitly documents when and how to deviate. The phases work with any modern web stack.

---

## Phase V: Vision

**Why do I need 5 interviews? Can I start with 3?**
Three interviews is not enough to identify patterns — you'll find one person's unique situation and mistake it for a trend. Five interviews is the minimum to start seeing themes. Ten is better. The cost of 2 extra interviews (a few hours) is orders of magnitude less than the cost of building the wrong thing.

**What if users say they want something I know is technically infeasible?**
This is exactly why you interview before building. When users request something infeasible, dig into the *why* — what outcome are they seeking? There's almost always a feasible way to achieve the same outcome. "I want a magic button that does everything automatically" often means "I want to reduce manual steps." That's solvable.

**How do I write a good problem statement?**
A good problem statement includes: who has the problem, what the problem is, in what context it occurs, and what the consequence of not solving it is. Bad: "We want to improve efficiency." Good: "Field technicians at construction sites spend 90 minutes per day logging completed work into 3 separate systems on slow 4G connections, causing billing delays of 2–3 days."

**What's the difference between a problem statement and a solution statement?**
A problem statement describes pain. A solution statement describes relief. "We need a mobile app" is a solution statement — it presupposes the answer. "Technicians lose 90 minutes per day on manual logging" is a problem statement. VISTADEL Phase V requires a problem statement before any solution thinking.

---

## Phase I: Integration

**How detailed do my data flow diagrams need to be?**
Detailed enough that a new developer joining the team can understand what data moves where, who can access it, and what happens if a step fails. A good DFD can be on one page — don't over-engineer it. The goal is clarity, not completeness for its own sake.

**Do I really need to check for HIPAA/GDPR/SOC 2 in Phase I if we're a small startup?**
Yes — especially for HIPAA. Retrofitting HIPAA compliance after you've built a healthcare product can cost 10x more than designing for it from the start. More importantly, HIPAA violations can result in personal liability for officers. Don't skip this step regardless of company size.

**What if I don't know whether a regulation applies to my project?**
When in doubt, assume it applies and design for compliance. The downside of building HIPAA controls you don't need is minor overhead. The downside of missing HIPAA controls you do need is fines, liability, and a painful retrofit. See [Phase I](../phases/I-integration.md) for the compliance quick reference table.

**How do I map integrations with systems that have no documentation?**
Call the vendor's technical support and ask for their API documentation, webhook capabilities, and rate limits. If they have no API, document that as a finding — it usually means you'll need a batch/ETL approach (like Gardien Products' nightly ERP CSV export) rather than real-time integration.

---

## Phase S: Stack

**Do I have to use the INT stack (Claude + Next.js + Supabase + n8n)?**
No. The INT default stack is a starting point with documented reasons. Phase S explicitly describes when and why to deviate. The only requirement is that deviations are documented in Architecture Decision Records (ADRs) with rationale. "We always use Django" without further reasoning is not an ADR.

**How do I decide between building custom vs. using a SaaS product?**
The VISTADEL rule: if a SaaS product solves 80%+ of your need, use it. The exception is if the SaaS costs more than 2x a custom build at your projected scale. See the "SaaS vs. Build" decision tree in [Phase S](../phases/S-stack.md). Martensen IP is the best example: HubSpot off-the-shelf was faster and cheaper than a custom CRM.

**How do I estimate cloud costs before building?**
Use the INT cost model template in Phase S. Start with usage assumptions (DB reads/writes per user/day, API calls, emails/month), then calculate against each service's pricing tier. The biggest gotchas: Claude API token costs scale with usage (not seats), and Supabase/Vercel have pricing cliffs at certain bandwidth/storage thresholds.

**Why does VISTADEL recommend Supabase over Firebase?**
For most projects, Supabase offers: (1) HIPAA BAA availability (Firebase does not offer this), (2) Row Level Security for multi-tenant data isolation, (3) real PostgreSQL for complex queries and full-text search, (4) self-hostable for regulated environments. Firebase is a strong choice for purely mobile apps or when the team has deep Firebase expertise and compliance is not a factor.

---

## Phase T: Testing

**What code coverage target should I aim for?**
70%+ overall is a reasonable target, but coverage percentage is a proxy metric, not the goal. 100% coverage with tests that don't test meaningful behavior is worthless. Focus on: (1) all critical paths covered, (2) all error conditions tested, (3) all auth/access control rules verified. See [Phase T](../phases/T-testing.md) for the testing pyramid approach.

**Do I need load testing for an MVP with 100 users?**
You need a baseline, not a full load test. Run k6 against your staging environment for 15 minutes at 2–3x expected peak. This catches obvious bottlenecks (missing indexes, N+1 queries) before they become production incidents. The actual load test can wait until you're approaching growth stage.

**How do I test HIPAA compliance controls?**
Every HIPAA control requires automated test evidence. The key tests: (1) cross-tenant data isolation (RLS test), (2) audit log creation on every PHI access, (3) failed login lockout, (4) session expiry. See [Phase T](../phases/T-testing.md) for the full compliance test matrix.

**What should I do if my test suite is slow (>15 minutes in CI)?**
This is usually caused by too many E2E tests or too few unit tests. Audit your test distribution against the testing pyramid (70% unit / 20% integration / 10% E2E). Move behavior that can be tested at unit level out of E2E. Parallelize E2E tests using Playwright's built-in concurrency. A 15-minute CI pipeline kills developer velocity.

---

## Phase A: AI Implementation

**What is "AI Your BI℠"?**
AI Your BI℠ is INT Inc.'s registered approach to using Claude for business intelligence throughout the development lifecycle. It means using Claude not just as a coding assistant but as an analytical layer: synthesizing user research, performing compliance gap analysis, generating insights from business data, and augmenting human judgment in decision-making. It's woven through all 8 VISTADEL phases.

**Is it safe to send our business data to Claude?**
With appropriate precautions, yes. Anthropic offers a zero-data-retention option for API calls — request data is not used for training. For regulated data (PHI, PII), always anonymize or tokenize before sending to any external API. See the privacy design in the Accolade case study for the de-identification pattern.

**How do I prevent prompt injection attacks?**
Separate user-controlled content from instructions using the system/user message distinction in the Claude API. Never concatenate user input directly into your instruction text. Validate and sanitize user inputs before including them in any prompt. See [Phase A](../phases/A-ai-implementation.md) for the safe vs. dangerous prompt pattern.

**How do I handle Claude giving inconsistent outputs?**
Use structured output with schema validation (Zod or similar). Ask Claude to respond in JSON with a defined schema and validate the response before using it. For high-stakes decisions, add a human review gate. For classification tasks, use few-shot examples in the prompt to anchor the output format.

**What does Claude cost at scale?**
Rough estimates (verify current pricing at anthropic.com): Claude Haiku (fast/cheap) ~$0.25 input / $1.25 output per million tokens. Claude Sonnet (balanced) ~$3 / $15. Claude Opus (highest quality) ~$15 / $75. For most business applications, Claude Sonnet is the right starting point. Use Haiku for high-volume classification tasks, Opus for complex reasoning.

---

## Phase D: Deployment

**What's the minimum CI/CD setup I need?**
At minimum: tests must pass before any deployment, staging deploys happen automatically on merge to main, production requires manual approval. If you're using Vercel + GitHub, this is 30 minutes to configure. See the GitHub Actions workflow in [Phase D](../phases/D-deployment.md).

**How do I handle database migrations safely?**
Three rules: (1) always test migrations on staging with a production-size data copy first, (2) make migrations additive where possible (add columns, don't rename them in one step), (3) test the rollback before the migration runs. See the multi-step column rename pattern in Phase D.

**Do I need blue-green deployment for a small app?**
Not necessarily. For stateless applications with rolling deployments (Vercel handles this automatically), you don't need explicit blue-green setup. Blue-green becomes important when you have stateful migrations, large data operations, or zero-downtime requirements in regulated environments.

**How do I configure monitoring without a dedicated DevOps engineer?**
Sentry (free tier) for error tracking + Vercel Analytics for performance + UptimeRobot (free) for uptime monitoring covers 90% of what you need at MVP stage. Total setup time: ~2 hours. Add Datadog or New Relic when you have dedicated ops capacity or when business criticality justifies the cost.

---

## Phase E: Evolution

**How do I avoid building features nobody uses?**
Product analytics. PostHog or Mixpanel show you what users actually do — not what they say they do in surveys. Before building any new feature, verify that the use case you're addressing is real and frequent in your analytics data. RICE score everything. Features with RICE scores under 100 go to the backlog, not the sprint.

**How much technical debt is too much?**
A good rule: if technical debt is actively blocking new feature development, it's already too much. Allocate 20% of sprint capacity to tech debt every sprint — don't accumulate it for a "debt sprint" that never comes. Keep a technical debt register and review it monthly.

**When should I refactor vs. rebuild?**
Refactor when: the core data model is sound, the issues are in implementation details, and the feature set is well-understood. Rebuild when: the core data model is wrong, the codebase is blocking more than 30% of new features, or the technology stack is end-of-life. Rebuilds take 3x longer than teams estimate — avoid them.

---

## Phase L: Launch

**What's the difference between "deployed" and "launched"?**
Deployed means code is in production. Launched means real users are getting value. A deploy with no announcement, no onboarding, and no user activation is not a launch. Phase L is about ensuring the user journey from "hear about it" to "get first value" is smooth and supported.

**How do I get the first users for a brand-new product?**
Build a waitlist during development (even a simple landing page with an email form). For B2B: direct outreach to your 5–10 target customers. For consumer: communities where your target user hangs out (forums, subreddits, LinkedIn groups). Don't launch publicly until you've validated with at least 5 real users in a soft launch.

**What metrics should I watch in the first 30 days?**
The minimum set: (1) activation rate (% of signups who reach first value), (2) Day 7 retention, (3) error rate, (4) P95 response time, (5) support ticket volume. Define your response action for each metric before launch — don't wait until something is wrong to decide what to do about it.

---

## Compliance & Security

**Does VISTADEL handle HIPAA compliance?**
VISTADEL integrates HIPAA requirements throughout all phases — particularly Phase I (data flow design), Phase S (stack selection with BAAs), Phase T (compliance test cases), and Phase D (deployment controls). Following VISTADEL doesn't automatically make you HIPAA compliant, but it dramatically reduces the risk of missing compliance requirements. Always work with a qualified HIPAA compliance advisor for final certification.

**What about SOC 2?**
SOC 2 requires 6 months of control operation evidence. VISTADEL builds SOC 2 controls into Phase S (certified vendor selection), Phase T (access control testing), and Phase D (change management evidence). The Destwin case study is the detailed SOC 2 implementation reference.

**How should I handle GDPR?**
GDPR applies to any EU users, regardless of where your company is headquartered. Key requirements: lawful basis for data processing, privacy policy, right to deletion, right to data portability, and a Data Protection Officer if processing at scale. Phase I should identify all EU user data flows and flag them for GDPR design.

---

## Contributing & Community

**How do I contribute to VISTADEL?**
See [CONTRIBUTING.md](../CONTRIBUTING.md). Short version: fork the repo, create a branch, make changes following the quality standards (real examples, tested code, explicit tradeoffs), submit a PR. Community PRs are welcome for all phases.

**Where do I ask questions about VISTADEL?**
- Framework questions: GitHub Discussions
- Bug reports: GitHub Issues
- INT-specific: contact@intinc.com
- Community: See the Discussions tab on this repository

**How is VISTADEL licensed?**
MIT License — free to use, modify, distribute, and attribute. See [LICENSE](../LICENSE).

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
