# Phase E: Evolution

## Status
✅ **Complete**

## Purpose

Improve the product systematically—based on evidence, not instinct.

Phase E begins the day after launch and never ends. It is the discipline of turning user behavior, support tickets, and system metrics into a prioritized roadmap. Teams that skip this phase either build features nobody uses or let technical debt accumulate until it blocks progress entirely.

**What you'll produce in Phase E:**
- A feature prioritization framework (RICE or similar)
- A feedback collection system
- A technical debt register
- A living roadmap

---

## Core Workflow

### Step 1: Establish Feedback Loops (Week 1–2 post-launch)

You cannot prioritize what you cannot measure. Set up these feedback channels before optimizing anything:

**Quantitative:**
- Product analytics (Vercel Analytics, PostHog, or Mixpanel) — what users actually do
- Error monitoring (Sentry) — what's breaking
- Performance monitoring — where the app is slow
- Support ticket volume and categories — what users complain about

**Qualitative:**
- In-app feedback widget (simple: thumbs up/down + text box)
- User interviews (monthly, at least 2)
- Support ticket themes (review weekly)
- Net Promoter Score (quarterly)

**Claude Prompt — Feedback Synthesis:**
```
Here are 30 days of support tickets and user feedback for our application:
[paste data]

Analyze and:
1. Group issues into themes
2. Estimate frequency of each theme
3. Identify which issues are blocking users vs. causing frustration
4. Suggest the top 3 improvements with highest user impact
5. Flag any patterns that suggest a UX problem vs. a feature gap
```

---

### Step 2: Prioritize with RICE (Month 1)

RICE is a scoring framework: Reach × Impact × Confidence ÷ Effort.

| Factor | Definition | Scale |
|--------|-----------|-------|
| **Reach** | How many users affected per month? | Number of users |
| **Impact** | How much does it move key metrics? | 0.25 / 0.5 / 1 / 2 / 3 |
| **Confidence** | How confident are you in R and I estimates? | 100% / 80% / 50% |
| **Effort** | How many person-months to build? | Person-months |

**RICE Score = (Reach × Impact × Confidence) / Effort**

Higher score = higher priority.

**Example RICE table:**

| Feature | Reach | Impact | Confidence | Effort | RICE Score |
|---------|-------|--------|-----------|--------|-----------|
| Fix slow search (>3s) | 800 | 2 | 100% | 0.5 | 3,200 |
| Add bulk listing upload | 200 | 1 | 80% | 2 | 80 |
| Mobile app | 400 | 2 | 50% | 8 | 50 |
| Email notification preferences | 600 | 0.5 | 100% | 0.5 | 600 |

The slow search fix has a RICE score 64x higher than the mobile app. Build it first.

---

### Step 3: Manage Technical Debt (Monthly)

Technical debt is real debt: it accrues interest in the form of slower development and more bugs.

**Technical Debt Register format:**

| ID | Description | Impact | Effort | Risk if Ignored | Priority |
|----|-------------|--------|--------|----------------|---------|
| TD-001 | No database indexes on `orders.user_id` | High (slow queries at 50K+ rows) | Low (2h) | Performance degradation | P1 |
| TD-002 | Inline SQL in 6 service functions | Medium (security risk, hard to test) | Medium (2 days) | Injection risk | P1 |
| TD-003 | Deprecated API version still in use | Low (works today) | Low (4h) | Breaking change if vendor deprecates | P2 |

**Rule:** Every sprint, allocate 20% of capacity to technical debt. Don't wait for a "tech debt sprint"—they never happen.

---

### Step 4: Scaling Inflection Points

Know when your architecture needs to change before it breaks.

| Scale Trigger | Symptom | Recommended Action |
|--------------|---------|-------------------|
| **1K → 10K users** | DB queries slowing | Add indexes; review N+1 query patterns |
| **10K → 100K users** | API response times increasing | Add Redis caching layer; review database connection pooling |
| **100K → 1M users** | Database CPU spiking | Read replicas; consider partitioning; evaluate CDN for static data |
| **Any time** | Bundle size growing | Code splitting; lazy loading; image optimization |
| **Any time** | Build times > 10 min | Optimize CI; cache dependencies; parallelise tests |

---

## Worked Examples

### Martensen IP (Post-Launch Evolution)

**Month 1 feedback themes:**
- "The mobile experience is hard to use" (mentioned by 6/8 attorneys)
- "I want to see deal value totals at the top of my pipeline view" (mentioned 4x)
- "Email templates are great but I can't customize per client" (mentioned 3x)

**RICE prioritization:**
1. Mobile-responsive pipeline view: RICE 420 → build in sprint 1
2. Deal value summary widget: RICE 200 → sprint 2
3. Per-client email template variables: RICE 90 → backlog

**Technical debt discovered Month 2:** HubSpot API calls were not rate-limited in the sync script. At 15+ concurrent users, the sync would hit HubSpot's API limit and silently fail. Fixed with a queue-based approach (n8n + rate limiting).

---

### Accolade (Healthcare — Scaling to 100K Patients)

**Scale milestones hit and responses:**

- **10K patients:** RLS policies causing slow queries on `patient_assignments` table → added composite index on `(coordinator_id, status)`. Query time dropped from 800ms to 45ms.
- **50K patients:** Supabase connection pooler hitting limits during peak hours → upgraded to PgBouncer transaction mode. Eliminated connection timeout errors.
- **100K patients:** Added read replicas for reporting queries to stop analytics from impacting coordinator workflows.

**Evolution principle applied:** Never optimize prematurely. Each change was triggered by a measured performance threshold being crossed, not anticipated in advance.

---

### Destwin (SaaS — Feature Expansion Post-SOC 2)

**SOC 2 compliance unlocked $2.4M in contracts. Evolution then focused on expansion.**

**Month 3 priorities (RICE-scored):**
1. Multi-currency support (EU expansion): RICE 800 — enterprise customers asking for EUR/GBP
2. Vendor portal (self-serve responses to RFPs): RICE 650 — reduces manual email back-and-forth
3. Slack integration: RICE 120 — nice to have, low business impact

**Roadmap discipline:** Destwin's team started with 40 feature requests in month 1. RICE scoring reduced active development focus to 3 items per sprint. Result: features shipped 2x faster because context-switching dropped.

---

### RadioMall (eCommerce — Conversion Optimization)

**Data-driven evolution post-launch:**

| Metric | Month 1 | Month 3 | Change Made |
|--------|---------|---------|------------|
| Search-to-PDP conversion | 8% | 14% | Added photo zoom + specs table |
| Cart abandonment | 72% | 58% | Added progress indicator + trust badges |
| Seller re-list rate | 45% | 68% | Added bulk re-listing and saved templates |
| Site speed (P95) | 2.1s | 0.9s | Implemented Next.js image optimization + CDN |

---

### Gardien Products (Manufacturing — Continuous Improvement)

**Evolution focus: expanding from reporting to prediction.**

**Phase 1 (post-launch, 0–3 months):** Fix what's broken. Three sensor types had intermittent sync failures — root cause was timeout misconfiguration in n8n.

**Phase 2 (3–6 months):** Improve what's slow. Report generation was still taking 8 minutes despite automation. Rewrote report queries with materialized views → 45 seconds.

**Phase 3 (6–12 months):** Add new value. Added predictive maintenance scoring using Claude to analyze equipment runtime patterns. Pilot on 2 production lines → 18% reduction in unplanned downtime.

---

## Decision Tree: Build vs. Buy vs. Wait

```
Is this request coming from multiple users independently?
├── NO → Log it, don't build yet. One user's request ≠ market need.
└── YES → continue

Does it directly improve a key business metric?
├── NO → Low priority — put in backlog
└── YES → continue

Can you buy this as a SaaS integration in <2 weeks?
├── YES → Buy it. Don't build commodity features.
└── NO → continue

What's the RICE score?
├── > 500 → Build now (next sprint)
├── 100–500 → Schedule (next 60 days)
└── < 100 → Backlog (revisit quarterly)
```

---

## Phase Gate Checklist

- [ ] Product analytics configured and reporting baseline metrics
- [ ] Feedback collection system live (in-app + interviews planned)
- [ ] Support ticket themes reviewed and categorized
- [ ] RICE framework applied to all feature requests (no "gut feel" prioritization)
- [ ] Technical debt register created and reviewed monthly
- [ ] 20% sprint capacity allocated to tech debt / improvements
- [ ] Performance monitoring shows no P95 regressions from new features
- [ ] Scaling plan documented (what changes at 10x current users?)
- [ ] Roadmap shared with stakeholders and updated monthly

---

## References

- [RICE Prioritization](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) — Intercom's original post
- [PostHog](https://posthog.com) — open-source product analytics
- [Sentry](https://sentry.io) — error monitoring and performance
- [Martin Fowler — Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html)
- *Continuous Delivery* — Jez Humble & David Farley

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
**Phase:** E of 8
