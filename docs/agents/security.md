# SECURITY_AGENT

## What it does
- Runs dependency audit and writes JSON/Markdown security reports
- Runs gitleaks secret scanning in isolated job
- Runs CodeQL static analysis in isolated job

## When it runs
- Pull requests (report mode)
- Weekly schedule (enforced gate)
- Manual dispatch

## Disable or override
- Disable job(s) in `.github/workflows/agent-security.yml`
- Override config via `node agents/security/index.js --config=<path>`
- Change gating behavior with `--enforce=true|false`

## Debug failures
1. Reproduce locally: `npm ci && node agents/security/index.js --enforce=true`
2. Download `security-agent-report` artifact
3. For secret scan/CodeQL issues, open the workflow run and inspect each job log
