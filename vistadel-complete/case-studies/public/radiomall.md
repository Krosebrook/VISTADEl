# Case Study: RadioMall

**eCommerce + Streaming: Building a Unified Platform**

## Overview
- **Client:** RadioMall (online marketplace for radio/electronics equipment with integrated streaming)
- **Challenge:** Two completely separate platforms — eCommerce store and streaming/broadcast service — needed to merge into a unified experience. Users had separate accounts on each, inventory was out of sync, and sellers were managing listings across multiple systems.
- **Solution:** VISTADEL V → L with Next.js + Supabase (realtime) + Stripe + Cloudflare R2 + Claude
- **Outcome:** 35% increase in conversion rate, 50% reduction in inventory discrepancies, 45,000 unified user accounts, platform DAU 2x pre-merger baseline

---

## VISTADEL Phases This Story Spans

### Phase V: Vision
**Problem:** RadioMall's seller community was churning because managing inventory across the eCommerce site, a standalone streaming platform, and third-party marketplaces was a full-time job. Buyers were frustrated that their streaming account didn't connect to their purchase history.

**Validation:** 9 interviews — 5 buyers, 4 sellers.

**Top findings:**
- Sellers: "I spend 3 hours every Sunday syncing inventory across 4 platforms."
- Buyers: "I wish I could buy the equipment I see talked about on the shows directly."
- Sellers: "When I run out of stock, it takes me 2 days to update all my listings."

**MVP Promise:** "One account. Search equipment and stream shows in the same place. Sellers manage all listings from one dashboard."

### Phase I: Integration
**Most complex integration challenge:** Two separate databases with 2,400 overlapping user accounts needed deduplication before unification.

**Data inventory findings:**
- eCommerce DB: 18,000 user accounts, 52,000 product listings, 8-year order history
- Streaming DB: 12,000 user accounts, show archives, listener analytics
- Overlap: ~2,400 users had both accounts with different email addresses (same person, different accounts)

**Key design decision:** Phase I identified that real-time inventory sync was required (not batch), because stale inventory was the #1 seller complaint. This changed the database choice.

### Phase S: Stack
**Stack selected:** Next.js + Supabase + Stripe + Cloudflare R2 (media/images) + Claude

**Key decisions:**
- **Supabase Realtime for inventory:** Supabase's PostgreSQL logical replication-based realtime subscriptions allow the frontend to subscribe to inventory changes. When a seller updates stock, all product pages showing that item update within 200ms.
- **Supabase over Firebase:** PostgreSQL's full-text search (`tsvector`) was sufficient for 52K SKUs. Saved ~$200/month vs. Elasticsearch. Tested at 3x scale — still fast enough.
- **Stripe for payments:** Marketplace payments with Stripe Connect allow RadioMall to take a platform fee and pay sellers automatically. PCI-DSS handled by Stripe.
- **Cloudflare R2 for media:** Product photos + show audio files. 50% cheaper than S3 at RadioMall's storage volume.

**Key discovery:** Rather than build a custom streaming infrastructure, Phase S revealed an existing CDN-based streaming provider with a well-documented API. Integration took 1 week instead of the estimated 8 weeks to build custom. Saved the project timeline.

### Phase T: Testing
**Critical user journeys for E2E testing:**
1. Buyer: search → filter → product page → add to cart → checkout → confirmation email
2. Seller: login → create listing → photo upload → publish → receive order notification → mark shipped
3. Realtime sync: seller updates inventory → buyer's cart shows updated availability within 5 seconds
4. Account merge: user claims both eCommerce + streaming accounts → single merged account with full history

**Performance test:** Inventory sync under load — 200 concurrent sellers updating listings simultaneously. Target: all updates reflected in buyer views within 3 seconds. Achieved: 1.8 seconds P95.

### Phase A: AI Implementation
**Claude use cases:**
1. **Product description enrichment:** Sellers upload basic specs (make, model, year, condition). Claude generates a compelling description optimized for search. Average seller saves 15 minutes per listing. 32% of listings now use AI-generated descriptions.
2. **Customer support triage:** Claude classifies incoming support tickets and drafts initial responses. Human agents review before sending. Response time: 4 hours → 45 minutes.
3. **Inventory analysis:** Weekly Claude analysis of slow-moving inventory → automated email to sellers with pricing suggestions based on comparable recent sales.
4. **Search relevance improvement:** Claude analyzes zero-result searches weekly and recommends synonym expansions to the search dictionary.

### Phase D: Deployment
**Deployment challenge:** Two separate user bases needed to be merged without breaking active sessions.

**Migration strategy:**
1. Read-only freeze on streaming platform accounts (30-minute maintenance window, 2am Sunday)
2. Account deduplication script run against both databases
3. 2,400 duplicate accounts merged with email notification to users
4. DNS cutover to unified platform
5. 48-hour parallel read access to old streaming platform as fallback

**Result:** Migration completed in 22 minutes (8 minutes under the planned window). 47 users contacted support about the account merge — all resolved within 4 hours.

### Phase E: Evolution
**Data-driven improvements (first 90 days):**

| Metric | Pre-Merge | Month 1 | Month 3 | Intervention |
|--------|-----------|---------|---------|-------------|
| Search-to-PDP conversion | 6% | 8% | 14% | Added photo zoom + specs table |
| Cart abandonment | 74% | 69% | 58% | Progress indicator + trust badges |
| Seller re-list rate | 45% | 52% | 68% | Bulk re-list + saved templates feature |
| Site speed P95 | 2.8s | 2.1s | 0.9s | Next.js image optimization + CDN tuning |

### Phase L: Launch
**Pre-launch:** Built a waitlist of 2,400 emails over 6 weeks with a "one platform, coming soon" landing page.

**Launch day:** Email to 2,400 waitlist → 1,100 activated (46% — strong for eCommerce). First listing published 8 minutes after launch. First sale within 3 hours.

**Day 7 retention:** 31% (industry average for eCommerce: ~25%). Attributed to niche audience quality — radio enthusiasts, not casual browsers.

---

## Key Learnings

### What Worked
1. **Account deduplication in Phase I:** Identifying 2,400 duplicate users before building prevented a messy post-launch data cleanup
2. **Realtime inventory from day one:** Sellers noticed immediately and called it the single best feature. Zero inventory sync complaints in month 1.
3. **Third-party streaming API:** Phase S discovery of the existing CDN provider saved 8 weeks of infrastructure work
4. **AI product descriptions:** Sellers adopted them faster than any other feature — immediate visible value with zero learning curve

### What Was Challenging
1. **Old platform nostalgia:** 15% of users preferred the old streaming interface. Handled with a transition FAQ and 30-day side-by-side access period.
2. **Seller photo quality:** AI descriptions are only as good as the product photos. 20% of listings had low-quality photos that required seller outreach.
3. **Stripe Connect onboarding:** Sellers needed to complete Stripe identity verification before receiving payouts. 8% of sellers abandoned this step. Fixed with better in-app guidance.

---

## Metrics & Outcomes

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| **Search-to-purchase conversion** | 1.2% | 3.5% (target) → 4.1% actual | +242% |
| **Inventory sync errors/week** | ~40 | ~2 | -95% |
| **Unified user accounts** | 30K (separate) | 45K (merged) | +50% |
| **Seller listing time per item** | 25 min | 10 min (with AI assist) | -60% |
| **Platform DAU** | ~800 | ~1,900 | +137% |
| **Support response time** | 4 hours | 45 min | -81% |

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| V: Vision | 1 week | ✓ Complete |
| I: Integration | 2 weeks | ✓ Complete |
| S: Stack | 1 week | ✓ Complete |
| T: Testing | 2 weeks | ✓ Complete |
| A: AI Implementation | 2 weeks | ✓ Complete |
| D: Deployment + Migration | 2 weeks | ✓ Complete |
| E: Evolution | Ongoing | 🟡 Active |
| **Total to Launch** | **14 weeks** | — |

---

## How RadioMall Used Claude (AI Your BI℠)

### Phase V: Vision
**Claude synthesized interview notes** from 9 user interviews → identified "inventory sync" and "unified account" as the two highest-frequency pain points in under 10 minutes. The synthesis also surfaced a third insight the team had missed: buyers wanted to buy products they discovered through listening — a cross-sell opportunity the team hadn't planned for.

### Phase A: AI Implementation
**Seller product description pipeline:**
```
Input: {make: "Kenwood", model: "TS-590SG", year: 2019, condition: "excellent", 
        accessories: ["original mic", "manual"], asking_price: 850}

Claude output: "The Kenwood TS-590SG is widely regarded as one of the best 
HF/50MHz transceivers in its class, combining exceptional receiver performance 
with a clean transmit signal that operators consistently praise on air. 
This 2019 unit presents in excellent condition with original microphone and 
manual included — rare to find together. At $850, this is strong value for a 
radio that routinely sells for $1,000+ new. Ships within 2 business days."
```

### Phase E: Evolution
**Weekly inventory analysis prompt:**
```
Here are RadioMall's 50 slowest-moving listings (unsold >60 days):
[data]

For each listing:
1. How does the asking price compare to recent sold comps?
2. Is the description missing key searchable terms?
3. What's the recommended action (reprice, relist, remove)?

Format as a CSV the seller can review.
```

---

## Client Testimonial

> "We'd been running two separate platforms for 6 years and everyone told us merging them was a 2-year project. VISTADEL's Phase I integration mapping showed us exactly which problems were hard and which ones we'd been overthinking. 14 weeks later, we had one platform and our sellers were sending us thank-you emails about the inventory sync. That doesn't happen." — **Founder, RadioMall**

---

## Key Takeaways for eCommerce Platforms

1. **Deduplication first:** If you're merging databases, invest in Phase I data mapping before writing a line of code
2. **Realtime sync is a competitive differentiator:** Users notice immediately and attribute it to product quality
3. **Buy before you build:** The streaming CDN discovery in Phase S saved 8 weeks. Always check "does this already exist?" before designing custom infrastructure
4. **AI product descriptions compound:** Small time savings per listing multiply across thousands of sellers. It's the highest-ROI feature that took the least engineering time.
5. **Niche audiences are high-value:** RadioMall's 31% Day 7 retention beats broad eCommerce benchmarks because enthusiast audiences return by habit

---

## Files & Resources

- **Account deduplication script:** Referenced in deployment runbook
- **Stripe Connect seller onboarding guide:** `stack-guide/stripe-connect.md`
- **AI product description prompt library:** `stack-guide/claude-api.md#product-descriptions`

---

**Status:** ✓ Complete (Launched Q3 2024)
**INT Team Lead:** INT Engineering Team
**Contact:** eCommerce practice → contact@intinc.com
