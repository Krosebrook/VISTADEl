# Changelog

All notable changes to VISTADEL are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned (Q3 2026)
- Stack guide deep dives (`claude-api.md`, `nextjs-patterns.md`, `supabase-setup.md`, `n8n-workflows.md`, `cost-modeling.md`)
- Video scripts (5 key concept videos)
- Additional community-contributed case studies
- Notion database templates
- Google Docs fillable templates

---

## [1.0.0] — April 2026

### Added
- All 8 VISTADEL phases authored and published (`V I S T A D E L`)
- 5 public case studies: Martensen IP, Accolade, Destwin, RadioMall, Gardien Products
- 3-tier content model (Internal / Client-Facing / Public)
- Express.js + EJS website serving all framework content
- In-memory markdown caching (marked + sanitize-html)
- Security hardening: Helmet, HTML sanitization, slug validation, no stack trace exposure
- SEO: `/sitemap.xml`, `/robots.txt`
- Performance: gzip compression
- Structured logging with pino
- Health check endpoint (`/health`)
- FAQ guide (`vistadel-complete/faq/faq.md`)
- Troubleshooting guide (`vistadel-complete/troubleshooting/troubleshooting.md`)
- Full contribution guide (`vistadel-complete/CONTRIBUTING.md`)
- `CLAUDE.md` — AI assistant context document
- `ROADMAP.md` — project roadmap
- `CHANGELOG.md` — this file
- `SECURITY.md` — vulnerability disclosure policy
- `CODE_OF_CONDUCT.md` — Contributor Covenant
- `CONTRIBUTING.md` — root-level contributing alias
- `.github/` — issue templates and PR template

### Fixed
- Production-readiness audit (March 4, 2026): 18 fixes applied covering security headers, XSS sanitization, error handling, caching, accessibility, and SEO

---

## [0.1.0] — February 16, 2025

### Added
- Initial repository skeleton
- Phase file stubs for all 8 VISTADEL phases
- Case study stubs
- Tier documentation stubs
- MIT License

---

**Built by INT Inc. For the Community.**  
Questions? [contact@intinc.com](mailto:contact@intinc.com) or open a [GitHub Issue](https://github.com/Krosebrook/VISTADEl/issues).
