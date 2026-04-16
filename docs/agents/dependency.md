# DEPENDENCY_AGENT

## What it does
- Runs `npm update` (semver-safe updates)
- Generates dependency status report (JSON + Markdown)
- Creates/updates a dependency maintenance PR

## When it runs
- Weekly schedule
- Manual dispatch

## Disable or override
- Disable `.github/workflows/agent-dependency.yml`
- Run report-only mode locally: `node agents/dependency/index.js --mode=report`
- Change behavior with `--mode=update|report`

## Debug failures
1. Reproduce locally: `npm ci && node agents/dependency/index.js --mode=update`
2. Inspect `dependency-agent-report` artifact
3. Check create-pull-request step logs for branch/permission issues
