#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function parseArgs(argv) {
  const args = {};
  for (const item of argv.slice(2)) {
    if (!item.startsWith('--')) continue;
    const [key, value] = item.slice(2).split('=');
    args[key] = value ?? true;
  }
  return args;
}

function loadConfig(configPath) {
  const absolute = path.resolve(process.cwd(), configPath || 'agents/test/.agentrc.json');
  return JSON.parse(fs.readFileSync(absolute, 'utf8'));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(url, timeoutMs, intervalMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        const payload = await response.json().catch(() => ({}));
        return { ok: true, status: response.status, payload };
      }
    } catch (_) {}
    await sleep(intervalMs);
  }
  return { ok: false, status: null, payload: null };
}

function writeReport(reportPath, data) {
  const absolute = path.resolve(process.cwd(), reportPath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, JSON.stringify(data, null, 2) + '\n');
}

async function main() {
  const args = parseArgs(process.argv);
  const config = loadConfig(args.config);
  const url = `http://${config.host}:${config.port}${config.path}`;

  const child = spawn('node', ['src/server.js'], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env
  });

  let logs = '';
  child.stdout.on('data', (chunk) => {
    logs += chunk.toString();
    process.stdout.write(chunk.toString());
  });
  child.stderr.on('data', (chunk) => {
    logs += chunk.toString();
    process.stderr.write(chunk.toString());
  });

  const health = await waitForHealth(url, config.startupTimeoutMs, config.pollIntervalMs);

  child.kill('SIGTERM');
  await new Promise((resolve) => child.once('exit', resolve));

  const report = {
    timestamp: new Date().toISOString(),
    url,
    success: health.ok,
    status: health.status,
    payload: health.payload,
    logSample: logs.split('\n').slice(-20)
  };
  writeReport(config.reportPath, report);

  if (!health.ok) {
    console.error(`Smoke test failed for ${url}`);
    process.exit(1);
  }

  console.log(`Smoke test passed for ${url}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
