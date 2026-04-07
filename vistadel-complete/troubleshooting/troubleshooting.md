# VISTADEL Troubleshooting Guide

This guide covers common failure modes at each VISTADEL phase, with symptoms, root causes, and step-by-step fixes.

---

## Phase V: Vision

### Can't find patterns after 5+ interviews

**Symptom:** Each interviewee describes a different problem. No clear theme.

**Cause:** Target user is too broad, or questions are too general.

**Fix:** Narrow user to a specific role and context. Re-run interviews focused on one specific workflow. Use Claude to cluster your notes and surface themes.

**Prevention:** Define your target user before the first interview, not after.

---

### Interviews confirm everything you hypothesize

**Symptom:** Every interviewee agrees your solution sounds great.

**Cause:** You are asking leading questions ("Would you use a tool that solves X?").

**Fix:** Stop asking about your solution. Ask about behavior: "Tell me about the last time this was a problem for you."

**Prevention:** Use the Phase V interview script. Remove all questions about your solution.

---

### MVP scope keeps growing

**Symptom:** The "Must Have" list now has 30–40 items.

**Fix:** Run forced ranking. Draw a line at the top 5. Ask for each: "Can we launch with a manual workaround for this?" If yes, it is not a Must Have.

**Prevention:** Set a cap of 5–8 Must Haves before starting the MoSCoW session.

---

## Phase I: Integration

### Integration map is growing uncontrollably

**Symptom:** Every user journey reveals more systems. Scope is expanding.

**Fix:** Separate MVP integrations from future ones. Score each: Low / Medium / High effort. Defer High-effort non-MVP integrations. Consider batch/ETL for legacy systems (see Gardien Products case study).

**Prevention:** Define MVP scope in Phase V before starting Phase I.

---

### Compliance requirement discovered late

**Symptom:** You are in Phase S when someone mentions "we have healthcare clients."

**Fix:** Stop Phase S work. Run the compliance checklist retroactively. Audit all vendor choices for BAA availability. Expect to redo some Phase S decisions. This is painful but necessary — architectural compliance fixes in Phase D are 10x more painful.

**Prevention:** Complete the compliance checklist as the first output of Phase I.

---

## Phase S: Stack

### Analysis paralysis — team cannot agree on tools

**Symptom:** Weeks of tool debate, nothing decided.

**Cause:** Decisions are based on preference, not criteria.

**Fix:** Run the Stack Scorecard from Phase S. Agree on criteria weights before scoring options. The scores decide — not arguments.

**Prevention:** Agree on evaluation criteria before discussing any specific options.

---

### Wrong stack choice discovered mid-build

**Symptom:** Deep in Phase T, the database does not support a required query, or a vendor lacks a needed BAA.

**Fix:** If less than 2 weeks of work is affected, migrate now. If more, design an incremental migration path. Never work around a fundamental limitation — it gets worse over time.

**Prevention:** Rigorous Phase I (surface all requirements) and Phase S (score against those requirements).

---

## Phase T: Testing

### Test suite takes 20+ minutes

**Symptom:** CI is slow. Developers skip local test runs.

**Fix:** Audit test distribution. Move behavior testable at unit level out of E2E. Parallelize E2E tests. Move load tests to a nightly run only.

**Prevention:** Follow the testing pyramid: 70% unit / 20% integration / 10% E2E.

---

### Flaky tests causing CI failures

**Symptom:** Tests pass locally, fail in CI intermittently.

**Fix:** Replace sleep/timeout calls with proper `waitFor` assertions. Mock all external service calls. Make each test self-contained with its own setup and teardown.

**Prevention:** Run tests in random order to surface order dependencies early.

---

### Low test coverage approaching launch

**Symptom:** Launch in 2 weeks, coverage at 30%.

**Fix:** Prioritize in order: auth flows → payment flows → data access control (RLS) → critical user journeys. Add smoke tests. Skip cosmetic edge cases for now.

**Prevention:** Write tests alongside code from day one. Make "tests must pass" a hard CI gate.

---

## Phase A: AI Implementation

### Claude giving inconsistent or hallucinated outputs

**Symptom:** Same input produces different outputs. Outputs sometimes contain incorrect information.

**Fix:** Add few-shot examples to the prompt. Ask for structured JSON output and validate the schema. Provide facts as context rather than expecting Claude to recall them.

**Prevention:** Test prompts with 20+ varied inputs including adversarial ones before deploying to production.

---

### Claude API costs exceeding budget

**Symptom:** Monthly API bill is significantly above projection.

**Fix:** Log token counts per call type. Switch high-volume simple tasks to Claude Haiku. Trim prompt lengths. Add response caching for repeated inputs.

**Prevention:** Create a cost model in Phase A before deploying AI features. Set up token usage logging and budget alerts from day one.

---

### Suspected prompt injection from user input

**Symptom:** AI outputs behaving unexpectedly. Users appear to be submitting manipulative inputs.

**Fix:** Add input sanitization and length limits. Move all instructions to the `system` message; user content goes only in the `user` message. Add a defensive instruction to the system prompt.

**Prevention:** Never concatenate user input into instruction text. See Phase A for the secure prompt pattern.

---

## Phase D: Deployment

### Deployment fails in production but works in staging

**Symptom:** 500 errors in production; staging is fine.

**Fix:** Check environment variables first (missing or wrong values). Check if database migrations applied correctly. Review your error tracker (Sentry) for the stack trace. If unable to identify quickly, roll back and investigate.

**Prevention:** Use an environment variable checklist before every production deploy. Validate env vars in the health check endpoint.

---

### Database migration causing downtime

**Symptom:** Migration is running; app is slow or erroring. Users are affected.

**Fix:** Try a LOCK_TIMEOUT of 2 seconds to fail fast rather than lock indefinitely. If already causing issues: terminate the migration, communicate the incident, restore from last known good state.

**Prevention:** Test every migration on staging with a production-size dataset. For tables over 1M rows, use CREATE INDEX CONCURRENTLY and multi-step column rename patterns.

---

## Phase E: Evolution

### Feature backlog overwhelming — nothing ships

**Symptom:** 80 backlog items. Priorities shift every sprint. Users frustrated by slow progress.

**Fix:** Run RICE scoring on every item (Reach × Impact × Confidence ÷ Effort). Sort by score. Top RICE item goes into the next sprint by default.

**Prevention:** Apply RICE scoring to every new feature request when it arrives, not at sprint planning.

---

### Performance degrading as user base grows

**Symptom:** P95 response times rising as user count grows.

**Fix:** Enable query logging and identify slowest queries with EXPLAIN ANALYZE. Check for missing indexes on frequently filtered columns. Look for N+1 query patterns. Check database connection pool limits. Add a caching layer for hot, rarely-changing data.

**Prevention:** Load test at 10x current users at every major scale milestone. Review database indexes monthly.

---

## Phase L: Launch

### Low user activation after launch

**Symptom:** Many signups, few reaching first value. Activation under 20%.

**Fix:** Watch session recordings to find the drop-off point. Interview 3 users who did not complete onboarding. Reduce onboarding to the minimum required for first value. Add progress indicators.

**Prevention:** Define the "first value moment" in Phase V. Design onboarding backward from that moment.

---

### Post-launch bugs overwhelming the team

**Symptom:** Bug reports flooding in the first week. Team in firefighting mode.

**Fix:** Triage immediately: P1 (blocking, data loss risk) / P2 (annoying but workaround exists) / P3 (cosmetic). Fix P1s first with status communication. Batch P2/P3 into a single hotfix release.

**Prevention:** Always soft launch (alpha → beta → GA). Phased rollouts catch issues before they affect all users.

---

## General Troubleshooting Patterns

### When to escalate

| Situation | Action |
|-----------|--------|
| Bug reproducible, fix testable in staging | Solve yourself |
| Root cause unclear after 2 hours | Escalate to team |
| Production incident affecting users | Escalate immediately |
| Compliance concern identified | Escalate to compliance advisor |
| Security incident suspected | Follow incident response runbook |

### Document what you learn

When you solve a hard problem, document it in GitHub Discussions:
1. What was the symptom?
2. What was the root cause?
3. What was the fix?
4. How do you prevent it?

The community benefits from your experience.

### Community resources

- **GitHub Discussions:** Framework questions and improvement suggestions
- **GitHub Issues:** Bug reports in the VISTADEL framework itself
- **INT support:** contact@intinc.com (for INT clients)

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
