# Case Study: Destwin

**SaaS Startup: Path to SOC 2 Type II Compliance**

## Overview
- **Client:** Destwin (B2B SaaS platform for destination and group travel management)
- **Challenge:** Enterprise customers were requiring SOC 2 Type II certification before signing contracts — an estimated $2.4M in deals was blocked
- **Solution:** VISTADEL full-cycle implementation with compliance-first architecture using Next.js + Supabase + Vercel + Claude
- **Outcome:** SOC 2 Type II passed in 5 months, $2.4M in enterprise contracts unblocked, 3 new enterprise logos in Q1 post-certification

---

## VISTADEL Phases This Story Spans

### Phase V: Vision
**Problem:** Destwin's product was technically sound, but enterprise procurement teams were rejecting contracts because of missing security certification. Sales was losing deals to competitors who had SOC 2. The cost of inaction was quantifiable: 3 deals totaling $2.4M in ARR were explicitly conditional on SOC 2 Type II.

**Validation:** 7 interviews — 4 enterprise travel managers (prospects), 3 Destwin sales/ops team.

**MVP Promise:** "SOC 2 Type II certified within 5 months, with evidence collection automated so ongoing compliance doesn't require dedicated headcount."

**Success metrics:**
- SOC 2 Type II: pass audit within 5 months
- Enterprise contracts unblocked: ≥$2M ARR
- Ongoing compliance overhead: <4 hours/month

### Phase I: Integration
**SOC 2 requires mapping all data flows to trust service criteria (TSC).** Every flow was tagged to: Security, Availability, Processing Integrity, Confidentiality, or Privacy.

**Key findings:**
- 3 workflows were writing user data to vendor systems without documented consent flows → redesigned before any code written
- Logging was inconsistent across services → unified logging required before audit period
- No formal change management process → needed to implement before 6-month audit observation window began

### Phase S: Stack
**Stack selected for maximum SOC 2 coverage with minimal custom controls:**

- **Vercel for hosting:** SOC 2 Type II certified. Every Vercel deployment is in scope, but Vercel handles the infrastructure controls. Removes ~40% of typical infrastructure control burden.
- **Supabase for DB + Auth:** Logs all database access and authentication events automatically — both are required for SOC 2 evidence. Supabase has SOC 2 Type II certification.
- **Stripe for payments:** PCI-DSS compliance entirely Stripe's responsibility when using Stripe.js.
- **GitHub for version control:** Change management evidence (PR history, approvals) auto-generated.

**Stack choice principle:** Every time we can use a SOC 2-certified vendor, we reduce our own audit surface area. Build only what must be custom.

### Phase T: Testing
**SOC 2 control categories and how each was tested:**

| Control Area | Test Method | Frequency |
|-------------|-------------|-----------|
| Logical access | Automated: failed login lockout, session expiry, role enforcement | Every PR |
| Change management | Manual: PR review log, deployment approval trail | Each deploy |
| Incident response | Tabletop exercise + documented runbook | Quarterly |
| Availability | Uptime monitoring alerts tested + load test | Monthly |
| Vendor risk | Automated: npm audit, Snyk dependency scan | Weekly |

### Phase A: AI Implementation
**Claude was central to the compliance implementation:**
1. **Security policy drafting:** Claude wrote initial drafts of all 8 required security policies (acceptable use, change management, incident response, access control, etc.). Legal team reviewed and finalized. Saved approximately 40 hours of policy writing.
2. **Control gap analysis:** Claude reviewed the codebase against SOC 2 control requirements and produced a gap list that became the sprint backlog for compliance work.
3. **Evidence collection automation:** n8n + Claude pipeline generates weekly compliance evidence summaries from GitHub, Vercel, and Supabase logs.

### Phase D: Deployment
**SOC 2 deployment controls (required for audit evidence):**
- Every production deployment linked to a Jira ticket (change management record)
- Two-person approval required for production deployments
- Automated rollback if error rate exceeds 2% within 30 minutes of deploy
- All deployment history exported quarterly as audit evidence

**Audit observation period:** SOC 2 Type II requires 6 months of control operation evidence. The 6-month clock started on Day 1 of Phase D — meaning deployment controls had to be in place before the first production deploy.

### Phase E: Evolution
**Post-certification expansion:**

**Month 1 post-certification priority (RICE-scored):**
1. Multi-currency support (EU enterprise expansion): RICE 800 — 4 prospects explicitly requesting EUR/GBP
2. Vendor portal (self-serve RFP responses): RICE 650 — reduces manual email loops with vendors
3. Slack notifications: RICE 120 — low business impact despite user requests

**Result of RICE prioritization:** Team shipped EU currency support in sprint 3 (previously "always on the backlog"), directly enabling 2 EU pilot contracts.

### Phase L: Launch
**GA launch after 6-week closed beta with 8 enterprise accounts.**

**Beta findings that changed the GA launch:**
- Onboarding was 12 steps → reduced to 5 (completion rate went from 31% → 67%)
- Pricing page caused confusion → simplified from 3 tiers to 2
- Enterprise sign-up required a demo call → added self-serve for <50 users

**GA metrics (30 days):**
- 340 signups
- 12 converted to paid
- 3 enterprise pilots (total pipeline: $480K)

---

## Key Learnings

### What Worked
1. **SOC 2-certified vendor selection:** Choosing Vercel + Supabase + Stripe removed ~60% of typical SOC 2 controls from custom scope
2. **Starting the audit clock early:** Beginning the 6-month observation period at Phase D meant certification was ready when sales needed it
3. **AI for policy drafting:** Claude's security policy drafts were 80% ready for legal review — not production-ready but dramatically faster than starting from scratch
4. **Evidence automation:** n8n pipeline collecting weekly compliance evidence eliminated the "audit scramble" — all evidence was pre-organized when auditors arrived

### What Was Challenging
1. **Vendor questionnaires:** Enterprise prospects sent security questionnaires before SOC 2 was complete. Answering honestly ("SOC 2 in progress, available Q3") while maintaining sales momentum required careful account management.
2. **Change management culture:** Developers initially resisted the "link every deploy to a ticket" requirement. Solved by making it a PR template field that blocked merge if empty.
3. **Audit prep cost:** Even with automation, the final audit preparation required ~60 hours of team time. Budget for this.

---

## Metrics & Outcomes

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| **ARR blocked by SOC 2** | $2.4M | $0 | -100% |
| **Contracts signed post-cert** | — | 3 enterprise | +$2.4M |
| **Time to SOC 2 Type II** | N/A | 5 months | — |
| **Ongoing compliance overhead** | — | ~3 hrs/month | Under target |
| **Onboarding completion (beta → GA)** | 31% | 67% | +36 pts |
| **Security incidents** | — | 0 | — |

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| V: Vision | 1 week | ✓ Complete |
| I: Integration | 2 weeks | ✓ Complete |
| S: Stack | 1 week | ✓ Complete |
| T: Testing | 3 weeks | ✓ Complete |
| A: AI Implementation | 2 weeks | ✓ Complete |
| D: Deployment + Audit Period | 2 weeks + 6 months | ✓ Complete |
| E: Evolution | Ongoing | 🟡 Active |
| **Total to SOC 2 Certification** | **20 weeks** | — |

---

## How Destwin Used Claude (AI Your BI℠)

### Phase I: Integration
**Claude performed control gap analysis:** Given the SOC 2 TSC requirements and Destwin's data flow documentation, Claude produced a 47-item gap list. The list became the compliance sprint backlog — organized by TSC category, estimated effort, and priority.

### Phase A: AI Implementation
**Claude wrote security policy first drafts:** 8 required policies, each 1,500–3,000 words. Claude's drafts incorporated Destwin's specific stack (Vercel, Supabase, Stripe) and industry context. Legal team reviewed and approved with minor edits. Total policy writing time: 12 hours (down from typical 60+ hours).

### Phase E: Evolution
**Weekly compliance report (automated):**
```
Week of [date]:
- 47 production deployments (all linked to Jira tickets ✓)
- 0 failed authentication anomalies
- 2 vendor security questionnaires received and answered
- Next control review: Access review due in 14 days
```
Report generated automatically every Monday by n8n + Claude. Compliance officer reviews in 15 minutes.

---

## Client Testimonial

> "SOC 2 felt impossible. We'd been putting it off for 2 years because it felt like a 12-month, $200K project. VISTADEL showed us we could do it in 5 months by choosing the right stack and automating evidence collection. The day we passed the audit, we called our three blocked enterprise prospects. Two signed that week." — **CEO, Destwin**

---

## Key Takeaways for B2B SaaS Startups

1. **SOC 2-certified vendors reduce your scope:** Every certified vendor you use is dozens of controls you don't have to implement yourself
2. **Start the audit clock at first production deploy:** You can't retroactively create 6 months of evidence — plan the timeline backward from your target certification date
3. **Evidence automation is worth building:** Manual audit prep is a time tax you pay forever. Automate it once.
4. **Claude accelerates policy writing, not replaces review:** Use AI for first drafts, legal for sign-off
5. **RICE-score your post-certification roadmap:** Compliance unlocks revenue; stay focused on the features that unlock the next growth phase

---

## Files & Resources

- **SOC 2 control matrix:** Available through INT compliance practice
- **Evidence automation pipeline:** `stack-guide/n8n-workflows.md`
- **Security policy templates:** Available for INT clients (Tier 2)
- **Audit prep timeline:** Referenced in Phase D deployment runbook

---

**Status:** ✓ Complete (SOC 2 Type II certified Q3 2024)
**INT Team Lead:** INT Engineering + Compliance Team
**Contact:** SaaS practice → contact@intinc.com
