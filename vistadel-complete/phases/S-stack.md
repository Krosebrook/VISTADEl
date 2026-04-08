# Phase S: Stack

## Status
✅ **Complete**

## Purpose

Choose your tools strategically—before you're emotionally invested in any of them.

Stack decisions made in Phase S echo through every subsequent phase. The wrong database choice discovered in Phase D means a painful migration. The wrong hosting choice discovered at 10,000 users means a re-architecture under pressure. Phase S is where you make these decisions deliberately, with evidence, using a scoring framework rather than team preference.

**What you'll produce in Phase S:**
- A Stack Scorecard (evaluated against your specific requirements)
- An Architecture Decision Record (ADR) for each major choice
- A cost model at 1K, 10K, and 100K users
- A "not using" list with documented reasons

---

## Core Workflow

### Step 1: Extract Technical Requirements (Day 1–2)

Before evaluating tools, convert your Phase V and Phase I outputs into technical requirements.

**Requirements extraction template:**

| Requirement | Source | Priority | Constraint |
|-------------|--------|----------|-----------|
| Multi-tenant data isolation | Phase I: Compliance | Must Have | HIPAA/SOC2 |
| Real-time updates | Phase V: User interviews | Should Have | <500ms latency |
| Payment processing | Phase I: Data flow | Must Have | PCI-DSS |
| Email notifications | Phase V: MVP scope | Must Have | — |
| Mobile app | Phase V: Won't Have | Won't Have | Post-MVP |

---

### Step 2: Score Stack Options (Day 2–4)

Use the VISTADEL Stack Scorecard: five weighted criteria evaluated for each option.

**Stack Scorecard Criteria:**

| Criterion | Description |
|-----------|-------------|
| **Time-to-Value** | How fast can you ship with this tool? |
| **Cost at Scale** | What's the cost at 10K and 100K users? |
| **Compliance Fit** | Does it satisfy HIPAA/SOC2/PCI requirements? |
| **Team Familiarity** | How much does your team already know this? |
| **Ecosystem & Longevity** | Is it maintained, well-documented, widely used? |

Score each option 1–5 per criterion, multiply by weight (1–3), total the scores.

**Example — Database Decision (Accolade):**

| | Supabase | Firebase | Postgres (self-hosted) |
|--|---------|----------|----------------------|
| Time-to-Value (×3) | 5→15 | 5→15 | 2→6 |
| Cost at Scale (×2) | 4→8 | 3→6 | 5→10 |
| Compliance Fit (×3) | 5→15 | 2→6 | 5→15 |
| Team Familiarity (×2) | 3→6 | 4→8 | 3→6 |
| Ecosystem (×2) | 4→8 | 4→8 | 5→10 |
| **Total** | **52** | **43** | **47** |

Supabase wins because compliance fit (HIPAA BAA available, Row Level Security for multi-tenancy) is the top-weighted criterion for this project.

---

### Step 3: The INT Default Stack

INT Inc. has tested the following stack across 50+ projects. It is the starting point—not a mandate. Deviate with documented reasons.

**INT Default Stack:**

| Layer | INT Choice | Why | Alternatives |
|-------|-----------|-----|-------------|
| **Frontend** | Next.js (React) | SSR for SEO, API routes, Vercel integration | Remix, SvelteKit, plain React |
| **Database** | Supabase (Postgres) | RLS multi-tenancy, HIPAA BAA, realtime, auth built-in | PlanetScale, Neon, Firebase, Mongo |
| **Auth** | Supabase Auth | Built into DB, OAuth/SSO, RLS integration | Auth0, Clerk, NextAuth |
| **AI** | Claude (Anthropic) | Best reasoning for business logic, long context | GPT-4o, Gemini, Llama (self-hosted) |
| **Automation** | n8n | Visual workflows, self-hostable, 400+ integrations | Zapier, Make, custom workers |
| **Email** | Resend or SendGrid | Developer-friendly APIs, reliable deliverability | Postmark, Mailchimp, SES |
| **Payments** | Stripe | Best DX, webhooks, subscriptions, PCI handled | Braintree, Square, Paddle |
| **Hosting** | Vercel + Supabase | Zero-config deploys, auto-scaling, edge network | AWS, Railway, Fly.io, Render |
| **Monitoring** | Sentry + Vercel Analytics | Error tracking + performance, easy setup | Datadog, New Relic, Grafana |

**When to deviate:**
- **Manufacturing/IoT:** Add TimescaleDB for time-series sensor data
- **High-scale eCommerce:** Add Redis for caching, Elasticsearch for product search
- **Legacy system integration:** Add ETL layer (n8n or custom scripts)
- **Self-hosted requirement:** Replace Vercel with AWS/GCP, replace Supabase with self-hosted Postgres

---

### Step 4: Cost Modeling (Day 4–5)

| Service | 1K users/mo | 10K users/mo | 100K users/mo |
|---------|------------|-------------|--------------|
| Supabase | $25 (Pro) | $25–$599 | $599+ |
| Vercel | $20 (Pro) | $20–$200 | $200–$1,000+ |
| Claude API | ~$5–50 | ~$50–500 | ~$500–5,000 |
| Stripe | 2.9%+30¢/txn | 2.9%+30¢/txn | 2.5%+30¢/txn |
| SendGrid | $0–$20 | $20–$80 | $80–$400 |
| **Estimated Total** | **~$100–200** | **~$300–1,500** | **~$2,000–10,000** |

**Claude Prompt — Cost Modeling:**
```
I'm building [description] with this stack: [list services].
Estimate monthly costs at 1,000 / 10,000 / 100,000 users.
Assume [X] DB reads/writes per user/day, [Y] API calls, [Z] emails/month.
For each tier, identify the biggest cost driver and any pricing cliff edges.
```

---

### Step 5: Architecture Decision Records (Day 5–6)

For every major stack decision, write a short ADR.

**ADR Template:**
```markdown
## ADR-001: [Decision Title]
**Date:** [Date] | **Status:** Accepted
**Context:** [What problem? What constraints?]
**Decision:** [What did we choose?]
**Options Considered:** Option A (pros/cons), Option B (pros/cons)
**Rationale:** [Why the winner won. Reference scorecard.]
**Consequences:** [What does this make easier? Harder?]
**Revisit Trigger:** [When would we reconsider this?]
```

---

## Worked Examples

### Martensen IP (Law Firm)
**Stack chosen:** HubSpot Sales + Marketing Hubs (not a custom build)

Phase V interviews revealed the core pain was process + tooling adoption, not a missing product. HubSpot already solved 90% of the problem. Custom build would have cost 6x more and taken 4x longer.

**Cost:** HubSpot Pro ($1,600/mo) vs. estimated custom build (~$8,000/mo). Easy decision.

---

### Accolade (Healthcare — HIPAA)
**Stack chosen:** Next.js + Supabase + n8n (self-hosted) + Claude

- **Supabase over Firebase:** Firebase doesn't offer a HIPAA BAA. Decision made in 10 minutes.
- **n8n self-hosted over Zapier:** n8n keeps PHI off third-party servers. Zapier can't guarantee this.
- **RLS for multi-tenancy:** Supabase Row Level Security enforces patient isolation at the database layer—even if application code has a bug, PHI can't leak across tenants.

---

### Destwin (SaaS — SOC 2)
**Stack chosen:** Next.js + Supabase + Vercel + Claude + Stripe

- **Vercel for hosting:** SOC 2 Type II certified. Removes infrastructure controls from Destwin's audit scope.
- **Supabase for auth + DB:** Logs all DB access and all login events—both feed directly into SOC 2 evidence collection.
- **Stripe for payments:** PCI-DSS compliance entirely Stripe's responsibility.

**Infrastructure cost at 10K users:** ~$265/month + Stripe fees.

---

### RadioMall (eCommerce)
**Stack chosen:** Next.js + Supabase + Stripe + Cloudflare R2 + Claude

**Key decision — search:** Considered Elasticsearch, but inventory was ~50K SKUs max. Supabase full-text search (PostgreSQL `tsvector`) was sufficient and saved $200/month.

**Key decision — streaming:** Integrated a third-party CDN-based streaming API instead of building infrastructure. Saved 8 weeks of development.

---

### Gardien Products (Manufacturing)
**Stack chosen:** Next.js + Supabase + n8n + TimescaleDB extension + Claude

**Key deviation:** Added TimescaleDB (Postgres extension) for time-series sensor data. Standard Postgres was too slow for 10,000 sensor events per hour.

**ERP integration:** Legacy ERP had no API. Solution: nightly CSV export → n8n transformation → Supabase insert. Not ideal but avoided a 12-week integration detour.

---

## Decision Trees

### Which Database?
```
Needs HIPAA compliance?
├── YES → Does vendor offer BAA? Supabase ✓, Firebase ✗
└── NO → Needs real-time subscriptions?
    ├── YES → Supabase or Firebase Firestore
    └── NO → Relational data? → Supabase/Postgres ✅
              Document data? → MongoDB/Firebase
              Time-series? → Add TimescaleDB to Postgres
```

### SaaS vs. Build?
```
Does a SaaS product solve 80%+ of the need?
├── YES → Use SaaS. Configure, don't build.
│         Exception: SaaS costs >2x custom build at scale
└── NO → Is this a core differentiator?
    ├── YES → Build it
    └── NO → Find a SaaS. Don't build commodity infrastructure.
```

---

## Phase Gate Checklist

- [ ] Technical requirements extracted from Phase V and Phase I
- [ ] Stack scorecard completed for all major decisions
- [ ] INT default stack evaluated (accepted or deviation documented)
- [ ] Cost model created at 1K, 10K, 100K users
- [ ] ADR written for every major architectural decision
- [ ] Compliance-relevant choices validated (HIPAA BAA, PCI scope, SOC 2)
- [ ] "Won't use" list documented with reasons
- [ ] Team has working local development environment
- [ ] No production code written yet (starts in Phase T)

---

## References

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com)
- [n8n Docs](https://docs.n8n.io)
- [ADR GitHub](https://adr.github.io) — Architecture Decision Records format
- *Designing Data-Intensive Applications* — Martin Kleppmann

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
**Phase:** S of 8
