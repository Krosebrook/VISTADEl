# VISTADEL Roadmap

**Framework:** VISTADEL 7-Phase App Development  
**Maintainer:** INT Inc. + Community  
**Last Updated:** April 2026

---

## Vision

VISTADEL's goal is to become the de-facto open-source framework for shipping production-grade applications — combining human judgment, AI acceleration, and real-world battle-testing from 50+ client projects.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Complete |
| 🔄 | In progress |
| 🔜 | Planned (next quarter) |
| 🗓 | Planned (future) |
| 💡 | Under consideration |

---

## Phase 1 — Foundation (Complete ✅)

Core framework content and website.

- [x] All 8 VISTADEL phases authored (`V I S T A D E L`)
- [x] 5 real-world case studies (Martensen IP, Accolade, Destwin, RadioMall, Gardien Products)
- [x] 3-tier content model (Internal / Client / Public)
- [x] Express.js website with EJS rendering
- [x] Security hardening (Helmet, HTML sanitization, slug validation)
- [x] SEO: sitemap, robots.txt
- [x] Performance: gzip compression, in-memory markdown cache
- [x] Structured logging with pino
- [x] Health check endpoint (`/health`)
- [x] FAQ and Troubleshooting guides
- [x] Contributing guide
- [x] MIT License

---

## Phase 2 — Developer Experience (Q2 2026 🔜)

Make it easier to run, contribute, and extend the framework.

- [ ] Add a `.github/` directory with issue templates and PR template
- [ ] Add `CHANGELOG.md`
- [ ] Add `SECURITY.md` (vulnerability disclosure policy)
- [ ] Add `CODE_OF_CONDUCT.md` (Contributor Covenant)
- [ ] Add environment variable documentation (`.env.example`)
- [ ] Add Dockerfile for containerised deployment
- [ ] Add `npm test` script (basic smoke tests for routes)
- [ ] Add `npm run lint` script (ESLint)
- [ ] Add GitHub Actions CI workflow (lint + start-server smoke test)
- [ ] Add `CONTRIBUTORS.md` (attribution list)

---

## Phase 3 — Content Expansion (Q3 2026 🗓)

Deepen the framework with additional resources.

### Stack Guide (`vistadel-complete/stack-guide/`)
- [ ] `claude-api.md` — Claude API deep dive (keys, function calling, batch, cost modeling)
- [ ] `nextjs-patterns.md` — Next.js API routes, middleware, auth, SEO
- [ ] `supabase-setup.md` — RLS, migrations, triggers, real-time
- [ ] `n8n-workflows.md` — Automation, error handling, scaling
- [ ] `cost-modeling.md` — Cost at 1K / 10K / 100K users

### Video Scripts (`vistadel-complete/video-scripts/`)
- [ ] `01-vistadel-overview.md`
- [ ] `02-phase-vision.md`
- [ ] `03-phase-stack.md`
- [ ] `04-phase-ai.md`
- [ ] `05-deployment-launch.md`

### Additional Case Studies
- [ ] Add 2–3 new public case studies (community-contributed)
- [ ] Internal Tier 1 versions of all 5 case studies
- [ ] Client Tier 2 versions (anonymised) of all 5 case studies

---

## Phase 4 — Integrations & Templates (Q4 2026 🗓)

Bring the framework to where teams actually work.

### Notion
- [ ] Notion database schema for each phase
- [ ] Notion template for Phase V (Vision) validation
- [ ] Notion template for build-status tracking
- [ ] Public Notion workspace (duplicatable)

### Google Docs
- [ ] Fillable Phase V template
- [ ] Client onboarding checklist
- [ ] Sprint planning template

### Diagrams (`vistadel-complete/diagrams/`)
- [ ] Mermaid user journey diagrams (per phase)
- [ ] Data flow diagrams (per integration pattern)
- [ ] Architecture diagrams (INT stack)
- [ ] Decision trees (PNG + source)

---

## Phase 5 — Community Growth (Ongoing 🗓)

Grow the community around the framework.

- [ ] Launch GitHub Discussions (categories: phases, tools, case-studies, ideas)
- [ ] Publish "Hall of Fame" — projects built with VISTADEL
- [ ] Blog series (5 posts planned — see `TIER-3-PUBLIC.md`)
- [ ] Community Slack workspace
- [ ] Monthly changelog newsletter
- [ ] Hacktoberfest participation (`hacktoberfest` topic + labelled issues)

---

## Phase 6 — Platform Enhancements (Under Consideration 💡)

Improvements to the website experience.

- [ ] Dark mode toggle
- [ ] Full-text search across all phase content
- [ ] Interactive phase progress tracker (mark phases complete per project)
- [ ] Mermaid diagram rendering in the website
- [ ] Print-friendly CSS for phase docs
- [ ] Internationalisation (i18n) — Spanish first
- [ ] GitHub login + personalised bookmarks
- [ ] Versioned framework releases (semver tags)

---

## Near-Term Priorities (Next 90 Days)

| Priority | Item | Owner | Status |
|----------|------|-------|--------|
| 🔴 High | `.github/` issue + PR templates | Community | 🔜 |
| 🔴 High | `CHANGELOG.md` | INT Inc. | 🔜 |
| 🔴 High | `SECURITY.md` | INT Inc. | 🔜 |
| 🔴 High | `CODE_OF_CONDUCT.md` | INT Inc. | 🔜 |
| 🟡 Medium | GitHub Actions CI | Community | 🔜 |
| 🟡 Medium | Dockerfile | Community | 🔜 |
| 🟢 Low | Dark mode | Community | 💡 |
| 🟢 Low | Full-text search | Community | 💡 |

---

## How to Influence the Roadmap

1. **Vote** — React with 👍 on GitHub Issues for items you want prioritised.
2. **Propose** — Open a GitHub Discussion with your idea under the "Ideas" category.
3. **Build** — Submit a PR. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
4. **Sponsor** — Contact [contact@intinc.com](mailto:contact@intinc.com) to sponsor a roadmap item.

---

## Completed Milestones

| Milestone | Date |
|-----------|------|
| Initial skeleton created | Feb 16, 2025 |
| All 8 phases authored | April 2026 |
| Production-readiness audit (18 fixes) | Mar 4, 2026 |
| Website live on Replit | April 2026 |
| CLAUDE.md + ROADMAP.md added | April 2026 |

---

**Built by INT Inc. For the Community.**  
Questions? [contact@intinc.com](mailto:contact@intinc.com) or open a GitHub Issue.
