# CLAUDE.md — AI Assistant Context for VISTADEL

This file gives Claude (and other AI assistants) the context needed to work effectively in this repository.

---

## What Is This Project?

**VISTADEL** is a 8-phase app development framework built by INT Inc. It helps teams ship production-grade applications faster, safer, and with less guesswork.

**V**ision → **I**ntegration → **S**tack → **T**esting → **A**I Implementation → **D**eployment → **E**volution → **L**aunch

The repository contains two things:
1. **A Node.js/Express website** (`src/`) that renders the framework documentation.
2. **Markdown documentation** (`vistadel-complete/`) that is the actual framework content.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Server | Express.js 5 |
| Templating | EJS |
| Markdown rendering | `marked` + `sanitize-html` |
| Security headers | `helmet` |
| Compression | `compression` (gzip) |
| Logging | `pino` (structured JSON) |
| Port | 5000, bound to `0.0.0.0` |

---

## Project Structure

```
/
├── CLAUDE.md              ← you are here
├── ROADMAP.md             ← project roadmap
├── README.md              ← project overview
├── CONTRIBUTING.md        ← how to contribute (root alias)
├── package.json
├── src/
│   ├── server.js          ← Express server (routes, caching, security)
│   ├── views/             ← EJS templates
│   │   ├── partials/      ← head, nav, footer
│   │   ├── index.ejs
│   │   ├── phases.ejs
│   │   ├── phase-detail.ejs
│   │   ├── case-studies.ejs
│   │   ├── case-study-detail.ejs
│   │   ├── tiers.ejs
│   │   ├── tier-detail.ejs
│   │   ├── contributing.ejs
│   │   ├── build-status.ejs
│   │   └── 404.ejs
│   └── public/
│       └── css/style.css  ← all styling
└── vistadel-complete/     ← markdown content (source of truth)
    ├── phases/            ← V I S T A D E L phase files
    ├── case-studies/
    │   └── public/        ← public case study markdown
    ├── faq/
    ├── troubleshooting/
    ├── CONTRIBUTING.md
    ├── BUILD-STATUS.md
    ├── TIER-1-INTERNAL.md
    ├── TIER-2-CLIENT.md
    └── TIER-3-PUBLIC.md
```

---

## Running the App

```bash
npm install
npm start
# Server starts on http://localhost:5000
```

No build step is required — the server reads markdown files at runtime, converts them with `marked`, sanitizes with `sanitize-html`, and caches the result in memory.

---

## Key Routes

| Route | Template | Content Source |
|-------|----------|----------------|
| `/` | `index.ejs` | Static (phase/tier/case-study metadata) |
| `/phases` | `phases.ejs` | Static metadata |
| `/phases/:slug` | `phase-detail.ejs` | `vistadel-complete/phases/<file>.md` |
| `/case-studies/:slug` | `case-study-detail.ejs` | `vistadel-complete/case-studies/public/<file>.md` |
| `/tiers/:slug` | `tier-detail.ejs` | `vistadel-complete/<TIER-N>.md` |
| `/contributing` | `contributing.ejs` | `vistadel-complete/CONTRIBUTING.md` |
| `/build-status` | `build-status.ejs` | `vistadel-complete/BUILD-STATUS.md` |
| `/health` | JSON | — |
| `/sitemap.xml` | XML | Auto-generated |

---

## Adding a New Phase or Case Study

1. Add a markdown file in `vistadel-complete/phases/` or `vistadel-complete/case-studies/public/`.
2. Add a metadata entry to the `phases` or `caseStudies` array in `src/server.js`.
3. The route and sitemap entry are automatically generated from the metadata arrays.

---

## Security Conventions

- **Slug validation:** All route parameters are validated against `/^[a-z0-9-]+$/` before use.
- **HTML sanitization:** All markdown is sanitized through `sanitize-html` before rendering — never pass raw markdown directly to a template.
- **No stack traces exposed:** The 500 error handler sends a plain HTML page with no error details.
- **Helmet:** Applied globally; CSP allows `'unsafe-inline'` styles only (no external scripts).
- **Content caching:** Markdown is cached in-memory after first read. Restart the server to clear the cache.

---

## Coding Conventions

- **No TypeScript** — plain Node.js/CommonJS (`require`/`module.exports`).
- **No test runner configured** — validate manually by running the server and checking routes.
- **Logging:** Use `logger.info / logger.warn / logger.error / logger.fatal` (pino) — never `console.log`.
- **Error handling:** Always use `next(err)` in Express middleware to bubble errors to the error handler.
- **EJS templates:** Pass only the data a template needs — avoid passing the entire config object.

---

## Content Conventions (Markdown)

- Each phase doc lives in `vistadel-complete/phases/` and follows the pattern:  
  `<Letter>-<name>.md` (e.g., `V-vision.md`).
- Each phase should include: Purpose, Core Workflow, Examples (real company names), Decision Trees, Templates, Error Handling, References.
- Code examples must be tested before inclusion.
- Compliance assumptions (HIPAA, SOC 2, PCI-DSS, GDPR) must be explicitly stated.
- Claude prompts must be tested before inclusion.
- Tone: Educational, practical, honest about tradeoffs — never promotional.

---

## Frequently Needed Commands

```bash
# Start the server
npm start

# Check for dependency vulnerabilities
npm audit

# Update dependencies
npm update
```

---

## Three Tiers of Usage

| Tier | Audience | Location |
|------|----------|----------|
| Tier 1 (Internal) | INT team | `TIER-1-INTERNAL.md` |
| Tier 2 (Client) | INT clients | `TIER-2-CLIENT.md` |
| Tier 3 (Public) | Community | `TIER-3-PUBLIC.md` |

---

## Questions?

- **Framework questions:** See `vistadel-complete/faq/faq.md`
- **Technical issues:** `vistadel-complete/troubleshooting/troubleshooting.md`
- **INT-specific:** contact@intinc.com
- **Community:** Open a GitHub Issue
