# VISTADEL Framework Website

## Overview
A web application that presents the VISTADEL (Vision, Integration, Stack, Testing, AI Implementation, Deployment, Evolution, Launch) 7-phase app development framework. Built for INT Inc. and the community.

## Tech Stack
- **Runtime:** Node.js 20
- **Server:** Express.js
- **Templating:** EJS
- **Markdown:** marked + sanitize-html (for safe rendering of .md content)
- **Security:** helmet (security headers, CSP)
- **Performance:** compression (gzip), in-memory markdown cache
- **Logging:** pino (structured JSON logging)
- **Port:** 5000 (bound to 0.0.0.0)

## Project Structure
```
src/
  server.js          - Express server, routes, markdown rendering, security
  views/             - EJS templates
    partials/        - Shared components (head, nav, footer)
    index.ejs        - Landing page
    phases.ejs       - Phases listing
    phase-detail.ejs - Individual phase with sidebar
    case-studies.ejs - Case studies listing
    case-study-detail.ejs - Individual case study
    tiers.ejs        - Tiers listing
    tier-detail.ejs  - Individual tier
    contributing.ejs - Contributing guide
    build-status.ejs - Build status tracker
    404.ejs          - Not found page
  public/
    css/style.css    - All styling (with focus-visible, responsive)
vistadel-complete/   - Source markdown content (phases, case studies, tiers)
```

## Key Pages
- `/` - Landing page with hero, phases overview, tiers, case studies, features
- `/phases` - All 8 VISTADEL phases
- `/phases/:slug` - Phase detail with sidebar nav
- `/case-studies` - All 5 case studies
- `/case-studies/:slug` - Case study detail
- `/tiers` - 3 usage tiers
- `/tiers/:slug` - Tier detail
- `/contributing` - How to contribute
- `/build-status` - Development progress
- `/health` - Health check endpoint
- `/robots.txt` - SEO robots file
- `/sitemap.xml` - Auto-generated sitemap

## Security Features
- Helmet middleware (CSP, X-Frame-Options, HSTS, etc.)
- HTML sanitization on all markdown content (XSS prevention)
- Slug validation on route parameters
- Error handling middleware (no stack traces exposed)
- Graceful shutdown on SIGTERM
- Global uncaught exception/rejection handlers

## Recent Changes
- Mar 4, 2026: Production-readiness audit - applied all 18 fixes (security headers, XSS sanitization, error handling, caching, accessibility, SEO, code cleanup)
- Feb 16, 2026: Initial build - extracted nested zip/tar.gz archives and built complete website

## User Preferences
- None recorded yet
