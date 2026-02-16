const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { marked } = require('marked');

const WORKSPACE = path.join(__dirname, '..');
const CONTENT_DIR = path.join(WORKSPACE, 'vistadel-complete');

function extractArchives() {
  const zipFile = path.join(WORKSPACE, 'zipFile.zip');
  const tarFile = path.join(WORKSPACE, 'vistadel-skeleton.tar.gz');

  if (fs.existsSync(CONTENT_DIR) && fs.existsSync(path.join(CONTENT_DIR, 'README.md'))) {
    console.log('Content already extracted.');
    return;
  }

  if (fs.existsSync(zipFile)) {
    console.log('Extracting zipFile.zip...');
    execSync(`unzip -o "${zipFile}" -d "${WORKSPACE}/extracted_zip"`, { stdio: 'inherit' });
    const nestedTar = path.join(WORKSPACE, 'extracted_zip', 'vistadel-skeleton.tar.gz');
    if (fs.existsSync(nestedTar)) {
      console.log('Extracting nested vistadel-skeleton.tar.gz...');
      execSync(`tar -xzf "${nestedTar}" -C "${WORKSPACE}"`, { stdio: 'inherit' });
    }
  }

  if (!fs.existsSync(CONTENT_DIR) && fs.existsSync(tarFile)) {
    console.log('Extracting vistadel-skeleton.tar.gz...');
    execSync(`tar -xzf "${tarFile}" -C "${WORKSPACE}"`, { stdio: 'inherit' });
  }

  if (!fs.existsSync(CONTENT_DIR) || !fs.existsSync(path.join(CONTENT_DIR, 'README.md'))) {
    console.error('WARNING: vistadel-complete content directory not found after extraction.');
  } else {
    console.log('Content extracted successfully.');
  }
}

extractArchives();

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

function readMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return marked(content);
  } catch (err) {
    return null;
  }
}

const phases = [
  { id: 'V', slug: 'vision', title: 'Vision', file: 'V-vision.md', tagline: 'Validate the problem before building', icon: '🔭' },
  { id: 'I', slug: 'integration', title: 'Integration', file: 'I-integration.md', tagline: 'Map data flows & compliance', icon: '🔗' },
  { id: 'S', slug: 'stack', title: 'Stack', file: 'S-stack.md', tagline: 'Choose tools strategically', icon: '🧱' },
  { id: 'T', slug: 'testing', title: 'Testing', file: 'T-testing.md', tagline: 'Prevent breakage, build confidence', icon: '🧪' },
  { id: 'A', slug: 'ai-implementation', title: 'AI Implementation', file: 'A-ai-implementation.md', tagline: 'Use Claude to move 10x faster', icon: '🤖' },
  { id: 'D', slug: 'deployment', title: 'Deployment', file: 'D-deployment.md', tagline: 'Ship reliably, monitor health', icon: '🚀' },
  { id: 'E', slug: 'evolution', title: 'Evolution', file: 'E-evolution.md', tagline: 'Prioritize improvements intelligently', icon: '📈' },
  { id: 'L', slug: 'launch', title: 'Launch', file: 'L-launch.md', tagline: 'Release, learn, iterate', icon: '🎯' },
];

const caseStudies = [
  { slug: 'martensen-ip', title: 'Martensen IP', subtitle: 'Law Firm', file: 'martensen-ip.md', industry: 'Professional Services', color: '#1e40af' },
  { slug: 'accolade', title: 'Accolade', subtitle: 'Healthcare', file: 'accolade.md', industry: 'Healthcare', color: '#059669' },
  { slug: 'destwin', title: 'Destwin', subtitle: 'SaaS', file: 'destwin.md', industry: 'SaaS', color: '#7c3aed' },
  { slug: 'radiomall', title: 'RadioMall', subtitle: 'eCommerce', file: 'radiomall.md', industry: 'eCommerce', color: '#dc2626' },
  { slug: 'gardien-products', title: 'Gardien Products', subtitle: 'Manufacturing', file: 'gardien-products.md', industry: 'Manufacturing', color: '#d97706' },
];

const tiers = [
  { id: 1, slug: 'internal', title: 'Internal', subtitle: 'INT Team', file: 'TIER-1-INTERNAL.md', description: "Here's how we build. Here's our process.", color: '#1e40af' },
  { id: 2, slug: 'client', title: 'Client-Facing', subtitle: 'INT Clients', file: 'TIER-2-CLIENT.md', description: "Here's how to work with us.", color: '#059669' },
  { id: 3, slug: 'public', title: 'Public', subtitle: 'Community', file: 'TIER-3-PUBLIC.md', description: "Here's how to ship fast with modern tools.", color: '#7c3aed' },
];

app.get('/', (req, res) => {
  res.render('index', { phases, caseStudies, tiers, activePage: 'home' });
});

app.get('/phases', (req, res) => {
  res.render('phases', { phases, activePage: 'phases' });
});

app.get('/phases/:slug', (req, res) => {
  const phase = phases.find(p => p.slug === req.params.slug);
  if (!phase) return res.status(404).render('404');
  const content = readMarkdown(path.join(CONTENT_DIR, 'phases', phase.file));
  res.render('phase-detail', { phase, content, phases, activePage: 'phases' });
});

app.get('/case-studies', (req, res) => {
  res.render('case-studies', { caseStudies, activePage: 'case-studies' });
});

app.get('/case-studies/:slug', (req, res) => {
  const study = caseStudies.find(s => s.slug === req.params.slug);
  if (!study) return res.status(404).render('404');
  const content = readMarkdown(path.join(CONTENT_DIR, 'case-studies', 'public', study.file));
  res.render('case-study-detail', { study, content, caseStudies, activePage: 'case-studies' });
});

app.get('/tiers', (req, res) => {
  res.render('tiers', { tiers, activePage: 'tiers' });
});

app.get('/tiers/:slug', (req, res) => {
  const tier = tiers.find(t => t.slug === req.params.slug);
  if (!tier) return res.status(404).render('404');
  const content = readMarkdown(path.join(CONTENT_DIR, tier.file));
  res.render('tier-detail', { tier, content, tiers, activePage: 'tiers' });
});

app.get('/contributing', (req, res) => {
  const content = readMarkdown(path.join(CONTENT_DIR, 'CONTRIBUTING.md'));
  res.render('contributing', { content, activePage: 'contributing' });
});

app.get('/build-status', (req, res) => {
  const content = readMarkdown(path.join(CONTENT_DIR, 'BUILD-STATUS.md'));
  res.render('build-status', { content, activePage: 'build-status' });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`VISTADEL server running on http://0.0.0.0:${PORT}`);
});
