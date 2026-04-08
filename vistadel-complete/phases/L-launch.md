# Phase L: Launch

## Status
✅ **Complete**

## Purpose

"Launched" means users are getting value—not just that code is in production.

Phase L is the culmination of all 7 previous phases. It is not a single moment; it is a coordinated set of activities: final readiness validation, communication to users, onboarding support, and the first 30 days of systematic learning. Teams that "launch" by quietly pushing to production and telling nobody miss the compounding value of early adopter momentum.

**What you'll produce in Phase L:**
- A Go/No-Go checklist (used the day before launch)
- A launch communication plan (who gets told, when, and how)
- An onboarding flow that gets users to first value quickly
- A 30-day monitoring plan with defined response actions

---

## Core Workflow

### Step 1: Go/No-Go Decision (48 Hours Before Launch)

Run through this checklist with your team. Any "NO" that cannot be resolved is a launch blocker.

**Technical Go/No-Go:**
- [ ] All tests passing in CI (unit, integration, E2E)
- [ ] Staging environment validated in the last 24 hours
- [ ] Database migrations applied and verified
- [ ] Performance tested under expected launch load (2–5x normal)
- [ ] Rollback procedure tested and ready
- [ ] All environment variables confirmed in production
- [ ] Health check endpoint returning 200
- [ ] SSL certificate valid and auto-renewing
- [ ] Monitoring and alerting configured and tested

**Compliance Go/No-Go (if applicable):**
- [ ] HIPAA: BAAs signed with all vendors
- [ ] HIPAA: Audit logging confirmed active
- [ ] SOC 2: Change management documentation complete
- [ ] PCI: No raw card data stored; Stripe integration tested
- [ ] GDPR: Privacy policy published; consent flows tested

**Business Go/No-Go:**
- [ ] Support team briefed on expected launch issues
- [ ] Rollout communication drafted and approved
- [ ] Executive team aware of launch day
- [ ] At least 5 real users confirmed for first-day access
- [ ] Success metrics baselined (before data = after data comparison)

---

### Step 2: Soft Launch Strategy

**Don't launch to everyone at once.** Soft launch reduces risk and generates early feedback before full exposure.

**Soft Launch Tiers:**

| Tier | Audience | % of Users | Duration | Goal |
|------|---------|------------|----------|------|
| **Alpha** | Internal team + 2–3 friendly clients | <1% | 1–2 weeks | Catch blocking bugs |
| **Beta** | Waitlist / power users / advocates | 5–10% | 2–4 weeks | Validate onboarding + collect feedback |
| **GA** | Full user base / public | 100% | Ongoing | Scale |

**Canary approach for risky features:** Roll out to 5% → monitor error rate + key metrics → expand to 25% → 100%.

---

### Step 3: Launch Day Communication

**Communication plan:**
- **Internal team:** Slack/email same day (celebrate the milestone, give on-call contacts)
- **Existing users/waitlist:** Personalized email 1 day before (build anticipation)
- **Public announcement:** Blog post + social (LinkedIn, Twitter/X) on launch day
- **Partners/integrations:** Direct outreach with specific value proposition

**Launch email template:**
```
Subject: [Product name] is live — here's how to get started

[Name],

[Product name] is officially live today. You've been waiting for this — 
here's what you can do starting now:

→ [Primary action 1]
→ [Primary action 2]
→ [Primary action 3]

[CTA button: Get Started]

If you run into anything, reply to this email or use the in-app chat.
We're monitoring closely and responding within 2 hours today.

[Signature]

P.S. [Personal note, relevant to this segment]
```

**Claude Prompt — Launch Announcement:**
```
Help me write a launch announcement for [product name].

Context:
- Product: [brief description]
- Key benefit: [one sentence]
- Target audience: [description]
- Launch date: [date]
- Top 3 features to highlight: [list]
- Tone: [professional/casual/excited]

Write versions for:
1. Email to existing waitlist (250 words)
2. LinkedIn post (150 words)
3. Short social media post (280 characters)
```

---

### Step 4: User Onboarding

The fastest path to retention is getting users to "first value" quickly. Define what first value looks like and build onboarding around it.

**First Value Definition:**
```
The user has [completed a specific action] and [experienced a concrete benefit].
```

**Examples:**
- Martensen IP: "Attorney has sent one automated follow-up email" (5-minute setup)
- Accolade: "Care coordinator has viewed one patient record in the new system" (2-minute setup)
- Destwin: "User has submitted one RFP and received at least one vendor response" (10-minute setup)
- RadioMall: "Seller has published one listing OR buyer has saved one search" (3-minute setup)

**Onboarding checklist pattern:**
```
Welcome to [product]!
Complete these steps to get started:

☐ [Step 1 — 1 minute] 
☐ [Step 2 — 2 minutes]
☐ [Step 3 — 3 minutes]
                              [Complete setup →]

3 of the 5 most successful users completed all steps in the first session.
```

---

### Step 5: First 30 Days Monitoring

Define what you'll watch and what you'll do when metrics are off-target.

**30-Day Monitoring Dashboard:**

| Metric | Day 1 | Day 7 | Day 30 | Alert Threshold |
|--------|-------|-------|--------|----------------|
| Signups/onboards | — | — | — | <50% of target → investigate |
| Onboarding completion | — | — | — | <40% → fix onboarding |
| Day 7 retention | — | — | — | <25% → rethink onboarding |
| Error rate | — | — | — | >1% → immediate fix |
| P95 response time | — | — | — | >2s → performance investigation |
| Support ticket volume | — | — | — | >10/day → staffing/FAQ review |

**Response playbook:**
- Error rate spikes → revert last deploy; investigate
- Onboarding completion drops → watch session recordings; add tooltips
- Low Day 7 retention → trigger user interview invitations; check activation point
- High support volume → add FAQ; add in-app guidance; improve error messages

---

## Worked Examples

### Martensen IP (Law Firm)

**Launch type:** Soft launch → managed rollout

**Day 1 rollout:** Managing partner + 2 power users (alpha). Week 1: full sales team of 5 attorneys. Week 2: all firm users.

**Result:** 87% active adoption within 30 days — unusually high for legal services. Key driver: the managing partner set an expectation that HubSpot was the firm's new operating system, not optional.

**First value moment:** First attorney used the automated follow-up feature within 4 hours of access. She emailed the project lead: "I just followed up with a lead from 3 weeks ago without thinking about it. This is what I needed."

**Month 1 finding:** Two attorneys were not using the system. Interviews revealed: one had a workflow that required a field HubSpot didn't have. Fix: added a custom property. Adoption went to 100%.

---

### Accolade (Healthcare)

**Launch type:** Phased rollout by care team

**Compliance launch gate:** HIPAA compliance officer signed formal approval before any patient data was entered. This documentation became part of the SOC 2 evidence package.

**Onboarding:** Each coordinator had a 30-minute onboarding call. Sessions recorded (with consent) for future training. Onboarding completion: 95%.

**First 30 days:** Zero critical incidents. One near-miss: a coordinator accidentally accessed a patient outside their caseload. Audit log caught it immediately. The incident was a false alarm (patient had been reassigned but not reflected in the assignment table). Bug fixed within 2 hours.

---

### Destwin (SaaS)

**Launch type:** Public GA after 6-week closed beta with 8 enterprise accounts.

**Beta findings that changed the GA launch:**
- Onboarding was too long (12 steps → reduced to 5 steps)
- Pricing page caused confusion (simplified from 3 tiers to 2)
- Enterprise sign-up required a demo call (added self-serve option for <50 users)

**GA launch metrics (30 days):**
- 340 signups
- 68 completed onboarding (20% → target was 25%, investigation ongoing)
- 12 converted to paid ($1,200–$8,000 ACV)
- 3 enterprise pilots (total pipeline: $480K)

---

### RadioMall (eCommerce)

**Launch type:** Community announcement + soft launch to radio enthusiast forums.

**Pre-launch:** Built a waitlist of 2,400 email addresses over 6 weeks with a coming-soon page and "be first to know" CTA.

**Launch day:** Email to 2,400 waitlist → 1,100 activated (46% — strong for eCommerce). First listing published within 8 minutes of opening. First sale within 3 hours.

**Day 7 retention:** 31% of signups returned. Industry average for eCommerce: 25%. Attributed to niche audience quality (enthusiasts, not casual browsers).

---

### Gardien Products (Manufacturing)

**Launch type:** Phased by facility → pilot plant first, then all sites.

**Pilot plant launch:** 3-week pilot with one facility (Facility A). Operations team trained over 2 days. Daily check-ins for week 1, weekly for weeks 2–3.

**Decision point (week 3):** Is the pilot successful enough to roll out to all 4 facilities? Criteria: (1) daily active users >80% of shift supervisors, (2) data entry errors <2%, (3) COO satisfied with dashboard. All three met. Rolled out to all facilities over 4 weeks.

**Outcome:** Manual reporting eliminated entirely within 6 weeks. COO's Monday morning report now arrives in her inbox at 6am, auto-generated. "I used to spend Sunday evening preparing for Monday. Now I just read the report on my phone."

---

## Phase Gate Checklist

- [ ] Go/No-Go checklist completed by full team
- [ ] Soft launch executed (alpha/beta phase completed before full rollout)
- [ ] Launch communication sent to all relevant audiences
- [ ] Onboarding flow live with first-value moment defined
- [ ] 30-day monitoring dashboard configured
- [ ] Response playbook written for top 3 failure scenarios
- [ ] First 5 users have accessed the system and provided feedback
- [ ] Post-launch retrospective scheduled (Week 2 post-launch)
- [ ] Phase E (Evolution) process activated: feedback collection, prioritization framework live

---

## References

- [Product Hunt Launch Guide](https://www.producthunt.com/stories/how-to-launch-on-product-hunt)
- [Onboarding Best Practices](https://www.appcues.com/blog/user-onboarding-best-practices) — Appcues
- [PostHog — Activation Metrics](https://posthog.com/blog/activation-metrics)
- *Obviously Awesome* — April Dunford (positioning for launches)
- *The Mom Test* — Rob Fitzpatrick (getting useful feedback from users)

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
**Phase:** L of 8
