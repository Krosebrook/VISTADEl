#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function parseArgs(argv) {
  const args = {};
  for (const item of argv.slice(2)) {
    if (!item.startsWith('--')) continue;
    const [key, value] = item.slice(2).split('=');
    args[key] = value ?? true;
  }
  return args;
}

function toBool(value) {
  return value === true || value === 'true' || value === '1';
}

function runNpmAudit() {
  try {
    const stdout = execFileSync('npm', ['audit', '--json'], { encoding: 'utf8' });
    return JSON.parse(stdout);
  } catch (error) {
    const output = error.stdout?.toString() || '{}';
    return JSON.parse(output);
  }
}

function writeFile(targetPath, content) {
  const absolute = path.resolve(process.cwd(), targetPath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, content);
}

function buildMarkdown(summary, vulnerabilities) {
  return [
    '# Security Agent Report',
    '',
    `- Timestamp: ${new Date().toISOString()}`,
    `- Enforced: ${summary.enforced}`,
    `- Total vulnerabilities: ${summary.total}`,
    `- High: ${summary.high}`,
    `- Critical: ${summary.critical}`,
    `- Moderate: ${summary.moderate}`,
    '',
    '## Package Findings',
    '',
    ...Object.entries(vulnerabilities).map(([name, item]) => `- ${name}: severity=${item.severity}`),
    ''
  ].join('\n');
}

function main() {
  const args = parseArgs(process.argv);
  const configPath = args.config || 'agents/security/.agentrc.json';
  const config = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf8'));
  const enforced = toBool(args.enforce);

  const audit = runNpmAudit();
  const counts = audit?.metadata?.vulnerabilities || {};

  const summary = {
    timestamp: new Date().toISOString(),
    enforced,
    info: counts.info || 0,
    low: counts.low || 0,
    moderate: counts.moderate || 0,
    high: counts.high || 0,
    critical: counts.critical || 0,
    total: counts.total || 0
  };

  const output = {
    summary,
    vulnerabilities: audit.vulnerabilities || {}
  };

  writeFile(config.jsonReportPath, JSON.stringify(output, null, 2) + '\n');
  writeFile(config.markdownReportPath, buildMarkdown(summary, output.vulnerabilities));

  if (enforced && (summary.high > 0 || summary.critical > 0)) {
    console.error('Security gate failed: high/critical vulnerabilities detected.');
    process.exit(1);
  }

  console.log('Security agent completed.');
}

main();
