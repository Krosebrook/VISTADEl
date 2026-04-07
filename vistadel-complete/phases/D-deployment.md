# Phase D: Deployment

## Status
✅ **Complete**

## Purpose

Ship reliably—and be able to roll back in 5 minutes if something goes wrong.

Deployment is not just "pushing to production." It is a repeatable, documented process that includes environment configuration, database migrations, health checks, monitoring, and a tested rollback procedure. Projects that treat deployment as an afterthought discover this at the worst possible moment: during a live incident.

**What you'll produce in Phase D:**
- A multi-environment setup (dev → staging → production)
- A CI/CD pipeline that tests before deploying
- A deployment checklist and runbook
- A rollback procedure you've tested
- Health checks and alerting configured

---

## Core Workflow

### Step 1: Environment Setup (Day 1–2)

Three environments minimum:

| Environment | Purpose | Who Deploys | Data |
|-------------|---------|-------------|------|
| **Development** | Local development, feature work | Each developer, automatically | Synthetic/seed data |
| **Staging** | Pre-production validation, QA, demo | CI/CD on merge to `main` | Anonymized copy of production data |
| **Production** | Live users | CI/CD with manual approval gate | Real user data |

**Environment variables:**
- Never commit secrets to git. Use `.env.local` (gitignored) locally.
- Use Vercel environment variables for hosting
- Use GitHub Actions secrets for CI/CD
- Rotate secrets quarterly and immediately on any team member departure

**.env structure:**
```bash
# .env.example (commit this — no real values)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
DATABASE_URL=
```

---

### Step 2: CI/CD Pipeline (Day 2–4)

**GitHub Actions workflow (Vercel + Supabase):**
```yaml
# .github/workflows/deploy.yml
name: Test and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
        env:
          TEST_BASE_URL: ${{ secrets.STAGING_URL }}

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Staging
        run: npx vercel --token=${{ secrets.VERCEL_TOKEN }} --env=staging

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval in GitHub
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Production
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

### Step 3: Database Migrations (Day 4–5)

Database migrations are the highest-risk part of deployment. A migration that runs in staging in 200ms may lock a production table for 5 minutes on real data.

**Migration rules:**
1. **Always run on staging first** with a production-size data copy
2. **Additive migrations are safe** (adding columns, adding tables)
3. **Destructive migrations need a plan** (renaming columns, dropping tables → multi-step migration)
4. **Test the rollback:** For every migration, have a tested rollback script

**Multi-step column rename (safe pattern):**
```sql
-- Step 1 (deploy): Add new column, keep old
ALTER TABLE users ADD COLUMN full_name TEXT;
UPDATE users SET full_name = first_name || ' ' || last_name;

-- Step 2 (next deploy): Update app code to use full_name, not first_name/last_name

-- Step 3 (final deploy): Drop old columns after confirming no references
ALTER TABLE users DROP COLUMN first_name;
ALTER TABLE users DROP COLUMN last_name;
```

**Supabase migration with Supabase CLI:**
```bash
# Create migration file
supabase migration new add_full_name_column

# Apply to local
supabase db reset

# Apply to staging
supabase db push --db-url $STAGING_DATABASE_URL

# Apply to production (after staging validation)
supabase db push --db-url $PRODUCTION_DATABASE_URL
```

---

### Step 4: Deployment Strategies (Day 5–6)

**Blue-Green Deployment:**
- Two identical environments (blue = current, green = new)
- Deploy to green, validate, then switch traffic
- Instant rollback: flip traffic back to blue
- Best for: high-stakes deployments, data migrations, zero-downtime requirements
- Used by: Martensen IP (Salesforce → HubSpot data migration cutover)

**Rolling Deployment:**
- Gradually replace old instances with new ones
- No traffic switch needed; Kubernetes/Vercel handles automatically
- Best for: stateless applications, minor updates
- Used by: Destwin, RadioMall standard deployments

**Canary Deployment:**
- Route 5% of traffic to new version, monitor, then increase
- Best for: risky changes to core flows where you want production validation with limited blast radius
- Used by: Accolade (new patient intake flows)

---

### Step 5: Health Checks and Monitoring (Day 6–7)

**Health check endpoint:**
```javascript
// app/api/health/route.js (Next.js)
export async function GET() {
  const checks = {};
  
  // Check database connectivity
  try {
    const { error } = await supabase.from('_health').select('1').single();
    checks.database = error ? 'unhealthy' : 'healthy';
  } catch {
    checks.database = 'unhealthy';
  }
  
  // Check external dependencies
  checks.stripe = await pingStripe();
  checks.uptime = process.uptime();
  checks.timestamp = new Date().toISOString();
  
  const allHealthy = Object.values(checks).every(v => v === 'healthy' || typeof v === 'number' || typeof v === 'string' && v.includes('T'));
  
  return Response.json(checks, { status: allHealthy ? 200 : 503 });
}
```

**Minimum monitoring stack:**
- **Uptime monitoring:** Vercel built-in + Better Uptime or UptimeRobot (free tier)
- **Error tracking:** Sentry (free tier covers most projects)
- **Performance:** Vercel Analytics (Core Web Vitals)
- **Database:** Supabase Dashboard → query performance, connection pooling

**Alerts you must configure before launch:**
- [ ] Error rate spikes above 1% → immediate Slack/email alert
- [ ] P95 response time exceeds 2s → warning alert
- [ ] Database connection pool exhaustion → immediate alert
- [ ] Failed deployments → immediate alert
- [ ] SSL certificate expiring in 30 days → warning alert

---

## Worked Examples

### Martensen IP (Law Firm)

**Deployment challenge:** Migrating 5 years of Salesforce data to HubSpot with minimal downtime.

**Strategy used:** Blue-green for the data migration cutover.
1. Week 1–2: Both systems run in parallel (new data enters HubSpot, Salesforce read-only)
2. Day of cutover: final Salesforce export → HubSpot import → DNS switch
3. Week 3: Salesforce in read-only mode as fallback for 2 weeks

**Timeline:** Migration ran on a Friday at 5pm. By Monday morning, 100% of team was on HubSpot with no reported data loss.

**Key lesson:** The parallel-run period caught 3 data mapping errors that would have caused lost leads post-cutover.

---

### Accolade (Healthcare — Zero Downtime Required)

**Deployment challenge:** HIPAA-regulated system cannot have data inconsistency during migration.

**Strategy:** Canary deployments for feature releases + blue-green for schema migrations.

**HIPAA-specific deployment requirements:**
- Every deployment logged with: who deployed, what changed, when, from which commit
- Rollback procedure documented and tested quarterly
- No production access without MFA
- All production deployments require second-person approval

**Result:** 18 months post-launch, zero unplanned downtime events exceeding 5 minutes.

---

### Destwin (SaaS)

**CI/CD approach:** GitHub Actions → Vercel Preview (for PRs) → Vercel Production (on merge to main, after manual approval).

**SOC 2 deployment controls:**
- Every deployment has a linked Jira ticket (change management evidence)
- Automated rollback triggered if error rate exceeds 2% within 30 minutes of deploy
- Staging environment seeded with production-like data (anonymized) for pre-deploy validation

---

### RadioMall (eCommerce)

**Deployment challenge:** eCommerce + streaming platform—two previously separate systems now deploying together.

**Solution:** Separate deployment pipelines that share one production database.
- Frontend (Next.js): Vercel, auto-deploys on merge to main
- API services: Railway, deploy on tagged releases
- Database: Supabase, migrations applied manually with admin approval

**Zero-downtime challenge:** Product listings must never show "out of stock" incorrectly during a deploy. Solution: inventory updates use database-level transactions, not application-level caching.

---

### Gardien Products (Manufacturing)

**Deployment challenge:** Factory floor tablets cannot be disrupted during production shifts (6am–10pm).

**Deployment schedule:** All production deploys happen between 10pm–5am. Maintenance window communicated to operations team 24 hours in advance.

**Progressive Web App update strategy:** PWA caches the application shell. New versions are delivered silently and activate at next browser refresh—no forced reload during active shift.

---

## Deployment Checklist (Pre-Launch)

**Infrastructure:**
- [ ] All environment variables set in production (no dev values)
- [ ] SSL certificate configured and auto-renewing
- [ ] Custom domain configured and DNS propagated
- [ ] Database connection pooling configured (not direct connections)
- [ ] Static assets served via CDN, not application server
- [ ] CORS headers configured (allow only your domains)

**Application:**
- [ ] All database migrations applied to production
- [ ] Seed data removed from production
- [ ] Debug/verbose logging disabled in production
- [ ] Error messages don't expose stack traces to users
- [ ] Rate limiting configured on all public API endpoints

**Monitoring:**
- [ ] Health check endpoint responding
- [ ] Uptime monitoring configured and alerting
- [ ] Error tracking (Sentry) configured and receiving events
- [ ] On-call contact list created and tested

**Rollback:**
- [ ] Previous deployment version tagged in git
- [ ] Database rollback script written and tested
- [ ] Rollback procedure documented in runbook
- [ ] Rollback procedure tested on staging

---

## Phase Gate Checklist

- [ ] Three environments exist (dev, staging, production)
- [ ] CI/CD pipeline deploys automatically on merge to main
- [ ] All tests must pass before deployment proceeds
- [ ] Production deployments require manual approval
- [ ] Database migration strategy documented and tested
- [ ] Health check endpoint live and monitored
- [ ] Error tracking configured
- [ ] Uptime monitoring configured with alerts
- [ ] Rollback procedure documented and tested
- [ ] Deployment checklist completed before go-live

---

## References

- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Supabase CLI — Migrations](https://supabase.com/docs/reference/cli/supabase-migration)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Sentry Docs](https://docs.sentry.io) — error tracking
- [k6 Cloud](https://k6.io) — load testing before launch
- *Site Reliability Engineering* — Google SRE Book (free online)

---

**Last updated:** April 2026
**Owner:** INT Inc. + Community
**Phase:** D of 8
