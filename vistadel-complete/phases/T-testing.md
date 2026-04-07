# Phase T: Testing

## Status
✅ **Complete**

## Purpose

Build a testing strategy before you write production code—not after.

Testing is not a phase you do at the end. It is a discipline you establish at the beginning. Projects that start writing tests in Phase D (Deployment) discover they've built an untestable architecture. Phase T sets the testing strategy, test plan, and initial test suite structure while the codebase is still small enough to shape.

**What you'll produce in Phase T:**
- A Test Plan (what to test, how, and what coverage targets)
- Unit test foundations for core business logic
- Integration test patterns for third-party services
- A CI/CD test pipeline setup
- Security and compliance test checklists

---

## Core Workflow

### Step 1: Create the Test Plan (Day 1–2)

The test plan answers three questions: What do we test? How do we test it? How do we know it's enough?

**Test Plan Template:**

| Test Type | What It Covers | Tool | Target Coverage | Who Writes It |
|-----------|---------------|------|----------------|---------------|
| Unit | Business logic functions | Jest / Vitest | 80%+ | Developer |
| Integration | API endpoints, DB queries | Jest + Supertest | Key flows only | Developer |
| E2E | Critical user journeys | Playwright | Top 3–5 journeys | QA / Developer |
| Security | Auth, access control, input validation | OWASP ZAP + manual | All auth flows | Developer + Review |
| Load | Performance at expected peak | k6 | P95 <500ms at 10x peak | DevOps / Developer |
| Compliance | HIPAA audit trails, SOC2 controls | Custom + manual | 100% of required controls | Compliance-aware dev |

---

### Step 2: The Testing Pyramid

Allocate your testing effort following the pyramid:

```
         /\
        /E2E\       ← 10% of tests — slow, brittle, high-value
       /------\
      / Integr \    ← 20% of tests — medium speed, catches real bugs
     /----------\
    /    Unit    \  ← 70% of tests — fast, cheap, run on every commit
   /--------------\
```

**Anti-pattern:** Inverting the pyramid (writing mostly E2E tests). This results in slow CI, flaky tests, and low confidence in fast iteration.

---

### Step 3: Unit Tests — Business Logic (Day 2–4)

Unit tests should cover pure functions and business logic—anything that doesn't require a database or external service.

**Example — Lead scoring function (Martensen IP):**
```javascript
// src/lib/leadScoring.js
export function scoreLeadQuality(lead) {
  let score = 0;
  if (lead.companySize > 50) score += 20;
  if (lead.budget === 'enterprise') score += 30;
  if (lead.timeline === 'immediate') score += 25;
  if (lead.source === 'referral') score += 25;
  return Math.min(score, 100);
}

// src/lib/__tests__/leadScoring.test.js
import { scoreLeadQuality } from '../leadScoring';

describe('scoreLeadQuality', () => {
  it('returns 0 for a minimal lead', () => {
    expect(scoreLeadQuality({})).toBe(0);
  });
  it('caps score at 100', () => {
    expect(scoreLeadQuality({
      companySize: 100,
      budget: 'enterprise',
      timeline: 'immediate',
      source: 'referral',
    })).toBe(100);
  });
  it('scores referral leads higher', () => {
    const base = scoreLeadQuality({ source: 'organic' });
    const referral = scoreLeadQuality({ source: 'referral' });
    expect(referral).toBeGreaterThan(base);
  });
});
```

---

### Step 4: Integration Tests — API & Database (Day 4–6)

Integration tests verify that your API routes and database interactions work correctly together.

**Example — Patient record access (Accolade / HIPAA):**
```javascript
// Test that RLS prevents cross-tenant data access
describe('Patient data isolation (RLS)', () => {
  it('coordinator A cannot read coordinator B patients', async () => {
    const { data, error } = await supabaseClientForCoordinatorA
      .from('patients')
      .select('*')
      .eq('assigned_coordinator_id', coordinatorB.id);
    
    expect(data).toHaveLength(0); // RLS blocks the query
    expect(error).toBeNull(); // Not an error — just returns empty
  });

  it('audit log is created on patient record access', async () => {
    await supabaseClientForCoordinator
      .from('patients')
      .select('*')
      .eq('id', patientId);
    
    const { data: auditLog } = await adminSupabase
      .from('audit_logs')
      .select('*')
      .eq('entity_id', patientId)
      .eq('action', 'SELECT');
    
    expect(auditLog).toHaveLength(1);
    expect(auditLog[0].user_id).toBe(coordinatorId);
  });
});
```

---

### Step 5: E2E Tests — Critical User Journeys (Day 6–8)

E2E tests use Playwright to simulate real user interactions. Keep these focused on your 3–5 most critical paths.

**Critical journeys to always E2E test:**
1. User registration and login
2. The primary value action (submit RFP, create listing, file a report)
3. Payment flow (if applicable)
4. Admin can manage users/data

**Example — Playwright E2E (RadioMall checkout):**
```javascript
// e2e/checkout.spec.js
import { test, expect } from '@playwright/test';

test('buyer can purchase a listing', async ({ page }) => {
  await page.goto('/listings/vintage-receiver-123');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout-button"]');
  
  // Fill payment form
  await page.fill('[data-testid="card-number"]', '4242424242424242');
  await page.fill('[data-testid="card-expiry"]', '12/28');
  await page.fill('[data-testid="card-cvc"]', '123');
  
  await page.click('[data-testid="submit-payment"]');
  
  await expect(page.locator('[data-testid="success-message"]'))
    .toContainText('Order confirmed');
  await expect(page.locator('[data-testid="order-id"]')).toBeVisible();
});
```

---

### Step 6: Security Testing (Day 8–9)

**Auth and access control tests (every project):**
- [ ] Unauthenticated users cannot access protected routes
- [ ] Users cannot access other users' data (horizontal privilege escalation)
- [ ] Regular users cannot access admin endpoints (vertical privilege escalation)
- [ ] Expired/revoked tokens are rejected
- [ ] Password reset tokens are single-use and expire

**Input validation tests:**
- [ ] SQL injection attempts are rejected
- [ ] XSS payloads in user input are sanitized on output
- [ ] File upload accepts only expected MIME types
- [ ] API rate limiting is enforced

**Claude Prompt — Security Test Generation:**
```
Here is my API endpoint spec: [paste endpoint definitions]

Generate a security test checklist for each endpoint:
1. Authentication bypass attempts
2. Authorization/privilege escalation tests
3. Input validation edge cases (empty, null, very long, special characters)
4. Rate limiting tests
5. Any endpoint-specific security concerns (file uploads, payment flows, PHI access)
```

---

### Step 7: Load Testing (Day 9–10)

Use k6 to establish baseline performance and verify the system handles peak load.

**k6 script — API load test:**
```javascript
// load-tests/api-baseline.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp to 50 users
    { duration: '5m', target: 50 },   // Hold at 50 users
    { duration: '2m', target: 100 },  // Ramp to 100 users
    { duration: '5m', target: 100 },  // Hold at 100 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Less than 1% error rate
  },
};

export default function () {
  const res = http.get('https://staging.myapp.com/api/listings');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

---

## Worked Examples

### Martensen IP (Law Firm)
**Critical tests:** Lead form validation, workflow trigger accuracy, email deliverability, dashboard data accuracy.

**Testing approach:** HubSpot has its own test environment. All workflow automations were tested with synthetic leads in the HubSpot sandbox before going live. The data migration (Salesforce → HubSpot) required a custom validation script: 1,247 records checked for field mapping accuracy before cutover.

---

### Accolade (Healthcare — HIPAA)
**Compliance test requirements:** Every HIPAA control requires test evidence for audit.

| HIPAA Control | Test | Frequency |
|--------------|------|-----------|
| Access control (RLS) | Automated cross-tenant access test | Every PR |
| Audit logs | Automated: every PHI access creates log entry | Every PR |
| Encryption at rest | Manual: verify Supabase encryption settings | Quarterly |
| Minimum necessary access | Manual: review RLS policies with compliance officer | Quarterly |
| Breach detection | Load test with anomaly detection alert verification | Monthly |

---

### Destwin (SaaS — SOC 2)
**SOC 2 testing requirements:** Documented test evidence for each control.

| SOC 2 Control Category | How Tested |
|-----------------------|-----------|
| Logical access | Automated: failed login lockout, session expiry |
| Change management | Manual: PR review log, deployment approval trail |
| Incident response | Tabletop exercise, documented runbook |
| Availability | Uptime monitoring alerts tested monthly |
| Vendor risk | Automated: third-party dependency audit (npm audit, Snyk) |

---

### RadioMall (eCommerce)
**Critical user journeys for E2E:**
1. Buyer: search → product page → add to cart → checkout → confirmation
2. Seller: login → create listing → upload photos → publish → receive order notification
3. Admin: flag listing → review → approve/reject

**Performance target:** Search results in <800ms at 500 concurrent users. Verified with k6 load test against staging.

---

### Gardien Products (Manufacturing)
**Testing challenge:** Factory floor tablets operate in low-connectivity environments (intermittent WiFi). Tests needed to cover offline data capture and sync-on-reconnect flows.

**Offline sync test:**
```javascript
it('queues data entry when offline and syncs on reconnect', async () => {
  await page.setOffline(true);
  await page.fill('[data-testid="production-count"]', '127');
  await page.click('[data-testid="submit-shift-data"]');
  
  // Should show queued indicator
  await expect(page.locator('[data-testid="sync-status"]'))
    .toContainText('Queued for sync');
  
  await page.setOffline(false);
  await page.waitForTimeout(3000); // Wait for sync
  
  await expect(page.locator('[data-testid="sync-status"]'))
    .toContainText('Synced');
});
```

---

## Claude Prompts for Phase T

### Prompt 1: Generate Test Cases from User Stories
```
Here are the user stories for our application:
[paste user stories]

For each story, generate:
1. Happy path test cases (expected behavior)
2. Edge case test cases (boundary conditions, empty inputs)
3. Error case test cases (what should happen when things go wrong)
4. Security test cases (access control, input validation)

Format as: Given / When / Then
```

### Prompt 2: Review Test Coverage
```
Here is our current test suite:
[paste test file list or summary]

Review this and identify:
1. Critical paths that have no test coverage
2. Test cases that are testing implementation instead of behavior
3. Tests that are likely to be flaky (time-dependent, order-dependent)
4. Missing security test cases for the features described
5. Recommended additional tests ordered by risk priority
```

---

## Phase Gate Checklist

- [ ] Test plan written (what types, what tools, what targets)
- [ ] CI pipeline configured (tests run on every PR)
- [ ] Unit tests written for all core business logic functions
- [ ] Integration tests written for all critical API endpoints
- [ ] E2E tests written for top 3–5 user journeys
- [ ] Auth/access control tests passing
- [ ] Security checklist completed for MVP features
- [ ] Load test baseline established on staging environment
- [ ] Compliance tests completed (if HIPAA/SOC2 applies)
- [ ] Code coverage report generated and reviewed (target: 70%+)

---

## References

- [Jest Docs](https://jestjs.io/docs) — unit and integration testing
- [Playwright Docs](https://playwright.dev) — E2E testing
- [k6 Docs](https://k6.io/docs) — load testing
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — security testing
- [Supabase RLS Testing](https://supabase.com/docs/guides/auth/row-level-security) — testing RLS policies
- *The Art of Unit Testing* — Roy Osherove

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
**Phase:** T of 8
