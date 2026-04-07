# Phase V: Vision

## Status
✅ **Complete**

## Purpose

Prove you're building something people actually want—before writing a single line of code.

Phase V is where most projects fail before they start. Teams skip validation, fall in love with their solution, and build for six months only to discover nobody wanted it. VISTADEL forces you to slow down here so you can speed up everywhere else.

**What you'll produce in Phase V:**
- A one-page Problem Definition
- 2–3 User Personas backed by real interview data
- A Success Metrics framework (quantified, measurable)
- An MVP Scope with explicit exclusions

**When you're done with Phase V**, you should be able to explain your app in one sentence, show written proof that real people have this problem, and say exactly what the first version will and will not do.

---

## Core Workflow

### Step 1: Frame the Problem (Day 1–2)

Before interviewing anyone, write down your current best guess at the problem. This is your "problem hypothesis"—it will change, and that's the point.

**Problem Hypothesis Template:**
```
[User type] struggle with [specific pain] when [context].
This causes [consequence].
We believe [our solution] will help them [achieve outcome].
We'll know we're right when [measurable signal].
```

**Example (Martensen IP):**
```
IP attorneys struggle with tracking leads and follow-up when managing a high volume of 
inbound inquiries. This causes lost business and inconsistent client experience.
We believe a unified CRM with automated workflows will help them convert 40% more leads.
We'll know we're right when sales admin time drops by at least 30%.
```

**Common mistake:** Writing the solution in the problem statement. "We need a mobile app that does X" is not a problem statement. "Field technicians lose 2 hours/day switching between 4 tools on-site" is a problem statement.

---

### Step 2: User Interviews (Day 2–5)

**Minimum:** 5 interviews before making any decisions. 10 is better. 3 is not enough.

**Who to interview:**
- The person who experiences the problem daily (primary user)
- The person who pays for the solution (economic buyer)
- The person who says no (blocker/skeptic)

**Interview Script:**

```
Opening (2 min):
"I'm trying to understand [problem area]. I'm not selling anything—I want to understand 
how you work today. Tell me about your typical [day/week] when it comes to [topic]."

Core questions (20 min):
1. "Walk me through the last time you [did the task we're focused on]."
2. "What's the hardest part of that?"
3. "What do you do when that goes wrong?"
4. "How much time does this take you per week?"
5. "What tools do you use today? What do you wish they did differently?"
6. "If this problem were magically solved tomorrow, what would be different?"

Closing (5 min):
"Is there anything I haven't asked that you think is important?"
"Can you introduce me to 1–2 others who deal with this?"
```

**What to listen for:**
- Workarounds (spreadsheets, copy-paste, manual processes) = high-signal pain
- Emotional language ("it's so frustrating," "I hate when...") = high-priority pain
- Time estimates ("takes me 3 hours every Monday") = quantifiable impact
- Existing tools they mention (competitors or partial solutions)

---

### Step 3: Synthesize Findings (Day 5–6)

After interviews, run a synthesis session. Paste all notes into Claude and ask:

**Claude Prompt — Interview Synthesis:**
```
I conducted [N] user interviews about [problem area]. Here are my notes:

[Paste interview notes]

Please:
1. Identify the top 3 pain points mentioned most frequently
2. Group related pain points into themes
3. Note which pains had the strongest emotional language
4. List any surprising insights I might have missed
5. Suggest 2–3 problem statement framings based on the data
```

Create an affinity map: group similar quotes/observations into clusters. Each cluster is a potential problem to solve.

---

### Step 4: Define Success Metrics (Day 6–7)

Metrics before features. Every project needs to answer: **How will we know if this worked?**

**Three tiers of metrics:**

| Tier | Type | Example |
|------|------|---------|
| **Tier 1: Business** | Revenue, cost, efficiency | Sales admin time reduced by 30% |
| **Tier 2: Product** | Engagement, retention, adoption | 80% of users active after 30 days |
| **Tier 3: Technical** | Performance, reliability, security | 99.9% uptime, <200ms response time |

Pick 1–2 metrics per tier. Too many metrics = no focus.

**Anti-pattern:** Vanity metrics. "10,000 signups" is not a success metric if nobody uses the product after signing up.

---

### Step 5: Write User Personas (Day 7–8)

**Persona Template:**
```
## [Persona Name] — [Role]

**Age:** [range]  
**Context:** [Where they work, company size, team]  
**Goals:** [What they're trying to achieve]  
**Pains:** [What frustrates them today]  
**Tools they use:** [Current toolstack]  
**Tech comfort:** [Low / Medium / High]  
**Success looks like:** [One sentence — what does winning mean for them?]

**Representative quote:**  
"[A real or synthesized quote that captures their worldview]"
```

Keep personas to 2–3. More than 3 means you haven't focused your target user yet.

---

### Step 6: Scope the MVP (Day 8–10)

**MoSCoW Method:**

| Category | Definition | Approach |
|----------|-----------|----------|
| **Must Have** | Without this, the product doesn't work | Build in MVP |
| **Should Have** | Important but not launch-blocking | Post-MVP v1.1 |
| **Could Have** | Nice to have, low effort | Backlog |
| **Won't Have** | Explicitly out of scope | Document and park |

**Rule:** If everything is "Must Have," you haven't scoped. Must Haves should be ≤40% of all features identified.

**Claude Prompt — MVP Scoping:**
```
Here is our problem statement: [paste]
Here are the top pain points from user interviews: [paste]
Here are feature ideas the team has brainstormed: [paste list]

Please help us apply MoSCoW prioritization:
1. Which features are truly must-haves for the core value proposition?
2. Which features do users want but won't prevent adoption if missing at launch?
3. Which features are nice-to-have but add complexity without proportional value?
4. Are there any features that are out of scope for this product entirely?
```

---

## Worked Examples

### Martensen IP (Law Firm)

**Problem Hypothesis:** IP attorneys are losing qualified leads because follow-up is manual and inconsistent.

**Interview findings (8 interviews — 5 attorneys, 3 marketing):**
- "I had a lead call last Tuesday and still haven't followed up. It's been 6 days." (Attorney)
- "Marketing sends leads but we don't know what happens to them." (Marketing manager)
- "I spend 2 hours every Monday updating a spreadsheet nobody reads." (Associate attorney)

**Personas defined:**
1. **The Partner** — brings in clients, hates admin, needs pipeline visibility
2. **The Associate** — handles day-to-day follow-up, overwhelmed by volume
3. **The Marketing Manager** — generates leads, frustrated by lack of feedback loop

**Success metrics:**
- Leads captured per month: baseline 12, target 17 (+42%)
- Sales admin time per week: baseline 8h, target 3h (-62%)
- User adoption at 30 days: target 80%

**MVP scope:** Unified contact record, automated follow-up sequences, pipeline dashboard. **Not in MVP:** AI lead scoring, advanced analytics, mobile app.

---

### Accolade (Healthcare)

**Problem Hypothesis:** Care coordinators can't see a complete patient picture across multiple providers, leading to gaps in care and compliance risk.

**Interview findings (10 interviews — 4 coordinators, 3 clinical staff, 3 admin):**
- "I'm looking at 3 different systems to get a complete picture of one patient."
- "When a patient transfers, we lose 30 minutes of context every time."
- "Our HIPAA audit last year flagged 12 data handling issues we didn't know existed."

**Personas defined:**
1. **The Care Coordinator** — manages patient journeys across providers, data-heavy role
2. **The Clinical Director** — needs compliance visibility and population-level insights
3. **The Compliance Officer** — responsible for HIPAA, audits, and data governance

**Success metrics:**
- Patient record completeness: baseline 65%, target 95%
- Care coordinator time per patient handoff: baseline 32 min, target 8 min
- HIPAA compliance score: target 100% on next audit

**MVP scope:** Unified patient record view, secure data sharing between providers, audit trail. **Not in MVP:** Patient-facing portal, predictive analytics, billing integration.

---

### Destwin (SaaS)

**Problem Hypothesis:** Enterprise travel buyers can't get real-time pricing and availability across all vendors in one place, causing lost bookings and manual reconciliation.

**Interview findings (7 interviews — 4 enterprise travel managers, 3 operations leads):**
- "I'm on 5 different vendor sites to price a single group trip."
- "By the time I get quotes back, the availability has changed."
- "Our enterprise customers require SOC 2 before signing. That's a hard blocker for us."

**Personas defined:**
1. **The Enterprise Travel Manager** — books complex group travel, needs speed and accuracy
2. **The Vendor/Supplier** — needs to receive RFPs and respond quickly
3. **The IT/Security Officer** — must approve vendors; SOC 2 is required

**Success metrics:**
- Time to first quote: baseline 4 hours, target 15 minutes
- Vendor response rate: baseline 45%, target 80%
- Enterprise contracts unlocked by SOC 2: target $2M in first year

**MVP scope:** Multi-vendor RFP engine, real-time availability, basic SOC 2 controls. **Not in MVP:** Mobile app, consumer-facing features, international currencies.

---

### RadioMall (eCommerce)

**Problem Hypothesis:** Radio/electronics buyers can't find niche inventory across fragmented online marketplaces, and sellers can't manage listings in multiple places.

**Interview findings (9 interviews — 5 buyers, 4 sellers):**
- "I spend 3 hours searching 6 sites to find a specific vintage receiver."
- "I list on 4 platforms and the inventory sync is a nightmare."
- "When I combine equipment shopping with streaming, I'd pay more for a unified platform."

**Personas defined:**
1. **The Collector/Buyer** — enthusiast, price-sensitive, values discovery and authenticity
2. **The Dealer/Seller** — small business, multi-platform, inventory-management pain
3. **The Hobbyist** — buys and streams, values community and content

**Success metrics:**
- Search-to-purchase conversion: baseline 1.2%, target 3.5%
- Seller multi-platform sync time: baseline 45 min/week, target 5 min/week
- Platform DAU: target 5,000 within 60 days of launch

**MVP scope:** Unified search/listings, seller inventory management, basic streaming integration. **Not in MVP:** AI price recommendations, mobile app, international shipping.

---

### Gardien Products (Manufacturing)

**Problem Hypothesis:** Facility managers can't see real-time production status across multiple sites, causing delayed responses to line stoppages and manual reporting.

**Interview findings (6 interviews — 3 operations managers, 2 supervisors, 1 COO):**
- "I get production reports 2 days after the fact. By then, the problem is already a crisis."
- "We have no WiFi on the factory floor—operators write on paper and we key it in manually."
- "Our reporting takes the operations team 3 days every week."

**Personas defined:**
1. **The Operations Manager** — needs real-time floor visibility and exception alerts
2. **The Shift Supervisor** — captures data on the floor, hates double-entry
3. **The COO** — needs weekly executive dashboards without waiting for manual compilation

**Success metrics:**
- Time-to-alert on line stoppage: baseline 4 hours, target 5 minutes
- Reporting time per week: baseline 3 days, target 2 hours
- Floor data accuracy: target 98%

**MVP scope:** Real-time production dashboard, floor data capture (tablet-based), automated weekly report. **Not in MVP:** Predictive maintenance, ERP integration, mobile app for workers.

---

## Decision Tree: Should I Move to Phase I?

```
START: Is Phase V complete?
│
├─ Can you explain the problem in one sentence?
│   ├─ YES → continue
│   └─ NO → do more interviews, re-run synthesis
│
├─ Do you have written notes from at least 5 interviews?
│   ├─ YES → continue
│   └─ NO → conduct more interviews first
│
├─ Do you have 1–2 quantified success metrics?
│   ├─ YES → continue
│   └─ NO → define metrics before proceeding
│
├─ Do you have a written MVP scope with explicit "Won't Haves"?
│   ├─ YES → continue
│   └─ NO → run MoSCoW session
│
└─ Could a new team member understand the problem and target user from your docs?
    ├─ YES → ✅ MOVE TO PHASE I
    └─ NO → clean up documentation first
```

---

## Claude Prompts for Phase V

### Prompt 1: Analyze Interview Notes
```
I'm building [brief description]. I conducted [N] user interviews. Here are my notes:

[paste notes]

Analyze these notes and:
1. List the top 5 pain points by frequency of mention
2. Identify any surprising or counter-intuitive findings
3. Flag any assumptions in my problem hypothesis that the interviews contradict
4. Suggest a one-sentence problem statement based on what you found
5. Recommend who I should interview next to fill gaps
```

### Prompt 2: Generate User Personas
```
Based on these interview notes: [paste]

Create 2–3 distinct user personas. For each persona include:
- Role and context
- Primary goals
- Top 3 frustrations (use actual quotes where possible)
- Current tools/workarounds
- What success looks like for them
- A representative quote

Make these feel like real people, not generic archetypes.
```

### Prompt 3: Validate Problem-Solution Fit
```
Our problem statement: [paste]
Our proposed solution: [paste]
Our success metrics: [paste]

Act as a skeptical investor. Challenge this:
1. Are we solving a real problem or a hypothetical one?
2. Is our solution the simplest way to solve it?
3. Are our success metrics meaningful or vanity metrics?
4. What assumptions are we making that could be wrong?
5. What's the fastest way to invalidate this idea before we build anything?
```

---

## Templates

### Template 1: Problem Definition (1 Page)
```markdown
# Problem Definition: [Project Name]

**Date:** [Date]  
**Version:** [v1.0]  
**Owner:** [Name]

## The Problem
[One paragraph: who has this problem, what is it, what's the consequence of not solving it]

## Who Has This Problem
**Primary user:** [Role, context, frequency]  
**Secondary user:** [Role, context, frequency]  
**Economic buyer:** [Who pays, their priorities]

## Evidence
- Interview 1 ([Name/role]): "[Key quote]"
- Interview 2 ([Name/role]): "[Key quote]"
- Interview 3 ([Name/role]): "[Key quote]"
[Continue for all interviews]

## Current Workarounds
[What do people do today? Spreadsheets? Manual processes? Duct-tape solutions?]

## Success Looks Like
- **Business metric:** [e.g., 30% reduction in time spent on X]
- **Product metric:** [e.g., 80% weekly active usage]
- **Technical metric:** [e.g., <200ms load time]

## MVP Promise
"[One sentence: what the first version will do]"

## Explicitly NOT in MVP
1. [Feature/capability]
2. [Feature/capability]
3. [Feature/capability]
```

### Template 2: User Persona
```markdown
## Persona: [Name] — [Role]

**Demographics:** [Age range, company size, industry]  
**Goals:** [What they want to achieve]  
**Pains:** [What frustrates them]  
**Tools today:** [Current toolstack]  
**Tech comfort:** Low / Medium / High  

**A day in their life:**
[2–3 sentences describing their relevant daily workflow]

**Representative quote:**
> "[Actual or synthesized quote]"

**Success looks like:**
[One sentence — what does winning mean for them]
```

---

## Common Errors in Phase V

| Error | Symptom | Fix |
|-------|---------|-----|
| **Skipping interviews** | Team argues about what users want | Conduct 5+ interviews before any other decision |
| **Leading questions** | Interviews confirm your hypothesis | Reframe questions to be open-ended, not yes/no |
| **Too many success metrics** | Can't prioritize what to build | Reduce to 2–3 core metrics max |
| **Scope creep in MVP** | "Must Have" list keeps growing | Force every feature through the "Can we launch without this?" test |
| **Building for yourself** | Team is the only user interviewed | Interview people who aren't on the team |
| **Vague problem statement** | "We want to improve efficiency" | Add: who, what, how much, in what context |

---

## Phase Gate Checklist

Before moving to Phase I, confirm all of these:

- [ ] Problem statement written and reviewed by 2+ team members
- [ ] 5+ user interviews conducted with notes
- [ ] Interview synthesis complete (themes, top pain points identified)
- [ ] 2–3 user personas documented
- [ ] 1–2 business success metrics defined (quantified)
- [ ] 1–2 product success metrics defined (quantified)
- [ ] MVP scope documented using MoSCoW method
- [ ] Explicit "Won't Have" list written and agreed upon
- [ ] Problem can be explained in one sentence by any team member
- [ ] No features have been designed or built yet

---

## References

- *The Mom Test* — Rob Fitzpatrick (best book on user interviews)
- *Competing Against Luck* — Christensen (Jobs-to-be-Done theory)
- [Anthropic Claude API docs](https://docs.anthropic.com) — for AI Your BI℠ prompts
- [JTBD.info](https://www.jtbd.info) — Jobs-to-be-Done framework
- [Nielsen Norman Group — User Interviews](https://www.nngroup.com/articles/user-interviews/)

---

**Last updated:** April 2026  
**Owner:** INT Inc. + Community  
**Phase:** V of 8
