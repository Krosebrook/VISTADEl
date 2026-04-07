# Case Study: Gardien Products

**Manufacturing: Cloud-First Operations**

## Overview
- **Client:** Gardien Products (industrial products manufacturer, 200+ employees, 4 facilities)
- **Challenge:** Legacy on-premise systems, no WiFi on factory floors, manual reporting consuming 3 days per week, and zero real-time visibility into production across facilities
- **Solution:** VISTADEL V → L with Next.js + Supabase + n8n + TimescaleDB + Claude, paired with factory-floor WiFi infrastructure upgrade
- **Outcome:** 3 days/week of manual reporting reduced to 2 hours automated, 99.2% WiFi uptime across all facilities, 22% reduction in production downtime, $180K annual operational savings

---

## VISTADEL Phases This Story Spans

### Phase V: Vision
**Problem:** Operations managers at Gardien Products were managing production across 4 facilities using a mix of a 20-year-old on-premise ERP, paper logbooks on the factory floor, and spreadsheets emailed to headquarters. The COO spent Sunday evenings preparing the Monday morning operations review from manually compiled data.

**Validation:** 6 interviews — 3 operations managers, 2 shift supervisors, 1 COO.

**Top findings:**
- "I get production reports 2 days after the fact. By then, the problem is already a crisis." (Operations Manager)
- "We have no WiFi on the factory floor. Operators write counts on paper and I key them in Monday morning." (Shift Supervisor)
- "Our reporting takes my team 3 days every week — and it's still full of errors." (Operations Director)

**MVP Promise:** "Real-time production dashboard across all 4 facilities, with automated weekly reporting that requires no manual data entry."

**Success metrics:**
- Reporting time per week: baseline 3 days → target 2 hours
- Time-to-alert on line stoppage: baseline 4 hours → target 15 minutes
- Production data accuracy: target 98%+

### Phase I: Integration
**Most significant Phase I finding:** The on-premise ERP system (20+ years old) had no API, no webhook support, and a proprietary database format. This was the highest-risk integration in the project.

**Decision made in Phase I:** Rather than attempt a real-time ERP integration (estimated 12 weeks), the solution was a nightly CSV export from ERP → n8n transformation pipeline → Supabase insert. Limitations accepted: ERP financial data available next morning, not real-time. Production floor data would be real-time via new tablet-based capture.

**Data flows mapped:**
1. Floor sensor/tablet → production event → Supabase → dashboard (real-time)
2. ERP nightly export → n8n → Supabase → analytics (next-day)
3. Supabase aggregations → n8n → automated report → email delivery

**Network architecture decision (from Phase I):** Factory floor devices need network segmentation from corporate IT network. IoT/operational devices on separate VLAN, never directly accessible from corporate systems.

### Phase S: Stack
**Key deviations from INT default stack:**

1. **TimescaleDB extension added:** Standard PostgreSQL tables were too slow for 10,000+ sensor events per hour. TimescaleDB (a Postgres extension, supported by Supabase) provides hypertable partitioning for time-series data — query time for production summaries dropped from 8 seconds to 180ms.

2. **PWA instead of native app for floor tablets:** Factory floor tablets run a Progressive Web App built in Next.js. Benefits:
   - No app store management
   - Works on the cheap Android tablets already present on the floor ($80/unit vs. $400 for iOS)
   - Offline capability (data queues locally when WiFi drops, syncs on reconnect)
   - Updates deploy silently without interrupting active shifts

3. **Self-hosted n8n on Railway:** ERP integration script runs nightly as an n8n workflow. Self-hosted keeps factory operational data off third-party automation servers.

**WiFi infrastructure (not a software decision, but critical):** Phase S identified that no software solution could work without factory floor WiFi. INT coordinated with a network infrastructure partner to deploy industrial-grade WiFi access points (Cisco Meraki) with factory-floor-appropriate enclosures. This was a 3-week parallel workstream.

### Phase T: Testing
**Unique testing challenges for manufacturing context:**

1. **Offline sync testing:** Factory floors experience intermittent WiFi. Critical test: tablets queue data entries during WiFi outage and sync correctly on reconnect. Tested with 100 simulated outages of varying duration (30 seconds to 4 hours).

2. **Load testing at peak data volume:** Production lines generate events in bursts (shift changeover, end-of-line counts). Load tested at 5x expected peak: 50,000 events per hour for 15 minutes. TimescaleDB insertion rate: 95,000 events/second. No degradation.

3. **ERP export validation:** Nightly CSV export compared against manual counts for 30 days before go-live. Discrepancy rate identified: 1.2% (mostly due to timing windows). Acceptable threshold set at 2%. Validation script runs nightly and alerts operations if threshold is exceeded.

### Phase A: AI Implementation
**Claude use cases:**
1. **Automated operations reports:** Narrative weekly report generated from production data every Monday at 5:30am. Delivered to COO inbox by 6am. Replaces the 3-day manual process.
2. **Anomaly explanation:** When a production metric spikes more than 2 standard deviations from the 30-day rolling average, Claude generates a plain-English explanation with historical context: "Line 3 output dropped 22% between 2pm–4pm Tuesday. In 14 of the last 18 similar drops, the cause was shift changeover overlap during peak season."
3. **Predictive maintenance (Phase 2, 6 months post-launch):** Claude analyzes equipment runtime logs and flags patterns correlated with upcoming maintenance needs. Pilot on 2 production lines — 18% reduction in unplanned downtime in pilot period.

**Data design for AI:** Production data is anonymized at the equipment level (Machine ID: "Line-3-Press-A", not equipment serial numbers) before Claude processing. No worker identification data is sent to Claude.

### Phase D: Deployment
**Deployment schedule:** All production software deploys happen 10pm–5am. Operations team notified 24 hours in advance via automated Slack message.

**WiFi infrastructure deployment:** Coordinated with manufacturing schedule. Two production lines shut down for 4-hour installation window per facility. All 4 facilities completed over 3 weekends.

**PWA update strategy:** New versions cache silently and activate at next browser reload — no forced interruption during active shifts. Shift supervisors informed of new features via in-app notification at shift start.

**Go-live sequence:**
- Facility A (pilot): Week 1 → validate, fix issues
- Facility B: Week 3 → incorporate learnings from A
- Facilities C and D: Week 5 → parallel rollout

### Phase E: Evolution
**Phase 1 (0–3 months): Fix what's broken**
Three sensor types had intermittent sync failures — root cause was a 30-second timeout in n8n that didn't match the sensor's 45-second reporting interval. Fixed with a configuration change. Sync reliability went from 94% to 99.8%.

**Phase 2 (3–6 months): Improve what's slow**
Report generation was still taking 8 minutes despite automation. Root cause: materialized view used for report aggregations was rebuilding from scratch nightly. Rewrote as incremental materialized view refresh. Generation time: 8 minutes → 45 seconds.

**Phase 3 (6–12 months): Add new value**
Predictive maintenance scoring added. Claude analyzes 90-day equipment runtime pattern and assigns a maintenance probability score (0–100). Score updates weekly. Facilities team uses score to prioritize planned maintenance windows. Pilot result: 18% reduction in unplanned stoppages on pilot lines.

### Phase L: Launch
**Phased by facility with clear go/no-go criteria.**

**Pilot launch criteria for Facility A (3 weeks):**
- Daily active users ≥ 80% of shift supervisors
- Data entry errors < 2% (validated against paper logs)
- COO satisfaction with dashboard quality (qualitative)

All three criteria met at week 3. Rollout to remaining facilities approved.

**COO's reaction at 6-week mark:** "I used to spend Sunday evening preparing for Monday. Now I just read the report on my phone. That's not a small thing — that was my whole weekend."

---

## Key Learnings

### What Worked
1. **Phase I ERP finding:** Identifying the "no API" problem early prevented a 12-week detour — the nightly CSV solution was decided in Phase I before a single sprint was planned
2. **TimescaleDB discovery:** Adding this extension during Phase S saved the entire real-time dashboard from performance failure
3. **PWA for floor tablets:** Offline capability was not in the original scope but Phase I identified intermittent WiFi risk — the PWA solved it without adding native app development
4. **Pilot-first rollout:** Facility A pilot caught the sync timeout bug before it affected 3 additional facilities

### What Was Challenging
1. **WiFi infrastructure timeline:** Network installation was a separate project with a separate contractor. INT had no control over the 3-week installation schedule. It became the critical path.
2. **Change resistance from floor supervisors:** Paper logbooks had been the process for 15 years. Two supervisors initially refused to use tablets. Resolved with individual training sessions and celebrating their early wins publicly.
3. **ERP data quality:** Nightly CSV exports contained ~1.2% data discrepancies due to ERP timing quirks. Required more validation logic than anticipated.

---

## Metrics & Outcomes

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| **Weekly reporting time** | 3 days (manual) | 2 hours (automated) | -87% |
| **Time-to-alert on line stoppage** | 4 hours | 8 minutes | -97% |
| **Production data accuracy** | ~85% (estimated) | 99.1% | +14 pts |
| **WiFi uptime (factory floor)** | 0% (no WiFi) | 99.2% | +99.2 pts |
| **Unplanned downtime (pilot lines)** | Baseline | -22% | -22% |
| **Annual operational savings** | — | $180,000 | — |

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| V: Vision | 1 week | ✓ Complete |
| I: Integration | 2 weeks | ✓ Complete |
| S: Stack | 2 weeks | ✓ Complete |
| T: Testing | 2 weeks | ✓ Complete |
| A: AI Implementation | 2 weeks | ✓ Complete |
| D: Deployment (4 facilities) | 6 weeks | ✓ Complete |
| E: Evolution | Ongoing | 🟡 Active |
| **Total to Full Rollout** | **18 weeks** | — |

---

## How Gardien Products Used Claude (AI Your BI℠)

### Phase A: Automated Report Generation
Every Monday at 5:30am, an n8n workflow queries Supabase for the previous week's production data and sends it to Claude with this prompt:

```
You are the operations analyst for a manufacturing company.
Write a weekly operations report from the data below.
Tone: professional, direct. Audience: COO and operations directors.
Highlight: top 3 wins, top 3 issues, any anomalies vs. prior 4-week average.
Data: [production summary by line, by facility, by day]
```

The COO receives the plain-English report in her inbox before her morning coffee. "It reads like a human wrote it. It knows what matters."

### Phase E: Anomaly Narratives
When production metrics deviate significantly, Claude provides context:
```
Input: Line 2-B output dropped 31% between 10am-12pm Thursday.
Historical context: [30-day rolling stats]

Claude output: "Line 2-B's Thursday morning drop is consistent with the 
pattern seen on 9 of the last 12 Thursdays — typically corresponds with 
the material delivery window for the secondary press. If this is a 
recurring operational constraint, a schedule adjustment may improve throughput 
by an estimated 8-12%."
```

---

## Client Testimonial

> "We've been talking about digitizing our operations for 5 years. Every time we started, we hit the ERP wall and gave up. VISTADEL's Phase I mapping showed us we didn't need to solve the ERP problem to get the value we actually wanted. We went from paper logbooks to real-time dashboards in 18 weeks, and the ROI was obvious by month 2." — **COO, Gardien Products**

---

## Key Takeaways for Manufacturers

1. **Don't let legacy ERP block modernization:** A nightly batch sync is unglamorous but practical. Get the real-time value from new data capture points, not from re-platforming your ERP.
2. **WiFi infrastructure is the critical path:** Software ships on schedule. Physical infrastructure has external dependencies. Map it in Phase I and plan the parallel workstream.
3. **PWA > native app for factory floors:** Cheaper devices, no app store, offline-capable, centrally deployed. Reconsider native apps for any operations context.
4. **Change management for floor workers:** Technical implementation is the easy part. Supervisor adoption requires individual attention, public wins, and patience.
5. **TimescaleDB for time-series manufacturing data:** If you're capturing events at scale, add this before you hit performance walls — it's a Postgres extension, not a migration.

---

## Files & Resources

- **TimescaleDB hypertable setup:** `stack-guide/supabase-setup.md#timescale`
- **n8n ERP export pipeline:** `stack-guide/n8n-workflows.md#erpintegration`
- **PWA offline sync pattern:** `stack-guide/nextjs-patterns.md#pwa`
- **Factory floor WiFi recommendation:** Available through INT infrastructure practice

---

**Status:** ✓ Complete (Fully rolled out Q4 2024)
**INT Team Lead:** INT Engineering + Infrastructure Team
**Contact:** Manufacturing practice → contact@intinc.com
