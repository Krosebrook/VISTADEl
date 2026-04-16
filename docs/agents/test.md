# TEST_AGENT

## What it does
- Starts the app with `npm start`
- Polls `http://127.0.0.1:5000/health`
- Fails if startup/health check does not succeed within the configured timeout
- Writes `agents/test/output/test-report.json`

## When it runs
- Pull requests
- Push to `main`
- Manual dispatch

## Disable or override
- Disable in `.github/workflows/agent-test.yml`
- Override config via `node agents/test/index.js --config=<path>`

## Debug failures
1. Reproduce locally: `npm ci && node agents/test/index.js`
2. Check report artifact `test-agent-report`
3. Review startup logs captured in `logSample`
