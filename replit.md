# VISTADEL Framework Website

## Overview
A web application that presents the VISTADEL (Vision, Integration, Stack, Testing, AI Implementation, Deployment, Evolution, Launch) 7-phase app development framework. Built for INT Inc. and the community.

## Tech Stack
- **Runtime:** Node.js 20
- **Server:** Express.js
- **Templating:** EJS
- **Markdown:** marked (for rendering .md content)
- **Port:** 5000 (bound to 0.0.0.0)

## Project Structure
```
src/
  server.js          - Express server, routes, markdown rendering
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
    css/style.css    - All styling
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

## Recent Changes
- Feb 16, 2026: Initial build - extracted nested zip/tar.gz archives and built complete website

## User Preferences
- None recorded yet
