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

function run(command, args) {
  try {
    const stdout = execFileSync(command, args, { encoding: 'utf8' });
    return { code: 0, stdout };
  } catch (error) {
    return { code: error.status || 1, stdout: error.stdout?.toString() || '' };
  }
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || '{}');
  } catch (_) {
    return fallback;
  }
}

function writeFile(targetPath, content) {
  const absolute = path.resolve(process.cwd(), targetPath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, content);
}

function summarizeOutdated(outdated) {
  return Object.entries(outdated).map(([name, item]) => ({
    name,
    current: item.current,
    wanted: item.wanted,
    latest: item.latest,
    location: item.location
  }));
}

function toMarkdown(summary) {
  const lines = [
    '# Dependency Agent Report',
    '',
    `- Timestamp: ${summary.timestamp}`,
    `- Mode: ${summary.mode}`,
    `- Outdated count: ${summary.outdated.length}`,
    ''
  ];

  if (summary.outdated.length > 0) {
    lines.push('## Outdated Packages', '');
    for (const item of summary.outdated) {
      lines.push(`- ${item.name}: ${item.current} -> ${item.wanted} (latest ${item.latest})`);
    }
    lines.push('');
  }

  lines.push('## Safety Notes', '', '- Updates are generated through npm update (respects semver ranges).', '- Review and run npm start smoke test before merging update PR.', '');
  return lines.join('\n');
}

function main() {
  const args = parseArgs(process.argv);
  const configPath = args.config || 'agents/dependency/.agentrc.json';
  const config = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), configPath), 'utf8'));
  const mode = args.mode || 'report';

  if (mode === 'update') {
    const updateResult = run('npm', ['update']);
    if (updateResult.code !== 0) {
      console.error('npm update failed');
      process.exit(updateResult.code);
    }
  }

  const outdatedResult = run('npm', ['outdated', '--json']);
  const outdated = parseJson(outdatedResult.stdout, {});

  const summary = {
    timestamp: new Date().toISOString(),
    mode,
    outdated: summarizeOutdated(outdated)
  };

  writeFile(config.jsonReportPath, JSON.stringify(summary, null, 2) + '\n');
  writeFile(config.markdownReportPath, toMarkdown(summary));

  console.log(`Dependency agent completed with ${summary.outdated.length} outdated package(s).`);
}

main();
