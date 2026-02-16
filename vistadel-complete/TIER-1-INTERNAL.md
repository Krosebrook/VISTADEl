# TIER 1: Internal (INT Team)

## What is Tier 1?
Internal playbook for INT sales, pre-sales, delivery, and project teams.

**Use case:** "Here's how we build. Here's our process. Here's why we're different."

**Audience:** INT team members, INT leadership, INT sales discussions (internal facing)

---

## Branch Structure
```
vistadel-complete/
├── main (public, Tier 2 + 3)
└── tier-1-internal/ (private, INT only)
```

---

## What's Included in Tier 1

### 1. All 8 Phases (Full Depth)
- Core content (3,000–3,500 words per phase)
- 4 worked examples per phase (segment-specific: law, healthcare, SaaS, eCommerce, manufacturing)
- Decision trees
- Claude prompts
- Templates
- Error handling guides

### 2. Case Studies (Full Details)
- **Martensen IP** (Professional Services): Full HubSpot implementation story, sales metrics, onboarding process
- **Accolade** (Healthcare): HIPAA compliance journey, multi-tenant architecture decisions
- **Destwin** (SaaS): SOC 2 path, security controls, audit preparation
- **RadioMall** (eCommerce): Multi-system integration, inventory sync, real-time updates
- **Gardien Products** (Manufacturing): Cloud migration, WiFi infrastructure, operational resilience

### 3. INT Stack Deep Dive
- Claude API integration (keys, function calling, cost modeling for 10K/100K users)
- Next.js patterns (API routes, middleware, auth strategies)
- Supabase setup (RLS implementation, migrations, triggers)
- n8n workflows (automation patterns, error handling)
- Integration architecture diagrams

### 4. Sales Talking Points
- "Why 7 phases?" → competitive advantage
- "How long does each phase take?" → timeline expectations
- "What makes us different from [competitor]?" → positioning
- "How do we guarantee success?" → confidence builders

### 5. Client Personas (Detailed)
- Law firms (Martensen archetype)
- Healthcare companies (Accolade archetype)
- SaaS startups (Destwin archetype)
- eCommerce platforms (RadioMall archetype)
- Manufacturers (Gardien archetype)

### 6. Pricing/Cost Scenarios (Internal)
- Cost at 1K, 10K, 100K users (per phase)
- INT service margins
- Customization service revenue models
- Timeline/budget tradeoffs

### 7. Team Playbook
- Which team members own which phase
- Handoff protocol (sales → delivery → support)
- Success metrics per phase
- Risk escalation paths

---

## What's NOT in Tier 1

- Anything that reveals INT's internal processes
- Profit margins or cost-plus calculations
- Team salaries or headcount
- Client contracts or NDAs

---

## Access Control

**Who has access:**
- INT leadership (Diane, Dave, Stacy)
- INT sales team
- INT delivery/project managers
- INT operations

**Who doesn't:**
- Clients
- Partners
- Public

**How:** Private GitHub branch `tier-1-internal/` + gated Notion workspace

---

## Updating Tier 1

When Tier 2/3 phases are updated:
1. Update Tier 1 to match
2. Add internal notes/talking points
3. Update sales guidance if competitive landscape changes
4. Review quarterly for accuracy

---

## Files & Locations

| Content | Location | Audience |
|---------|----------|----------|
| Phase content | `phases/*.md` | All INT team |
| Case studies (detailed) | `case-studies/TIER-1/*.md` | All INT team |
| Stack guide (full) | `stack-guide/TIER-1-full.md` | Tech team |
| Sales deck | `sales-materials/vistadel-sales-deck.pptx` | Sales team |
| Talking points | `sales-materials/talking-points.md` | All INT team |
| Pricing scenarios | `operations/pricing-scenarios.xlsx` | Leadership + operations |
| Team playbook | `operations/team-playbook.md` | All INT team |

---

**Last updated:** February 2025  
**Owner:** Kyle (AI SME) + INT Leadership
