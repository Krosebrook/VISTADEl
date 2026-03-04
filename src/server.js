const express = require('express');
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { marked } = require('marked');
const helmet = require('helmet');
const compression = require('compression');
const sanitizeHtml = require('sanitize-html');
const pino = require('pino');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const WORKSPACE = path.join(__dirname, '..');
const CONTENT_DIR = path.join(WORKSPACE, 'vistadel-complete');

function extractArchives() {
  const zipFile = path.join(WORKSPACE, 'zipFile.zip');
  const tarFile = path.join(WORKSPACE, 'vistadel-skeleton.tar.gz');

  if (fs.existsSync(CONTENT_DIR) && fs.existsSync(path.join(CONTENT_DIR, 'README.md'))) {
    logger.info('Content already extracted.');
    return;
  }

  if (fs.existsSync(zipFile)) {
    logger.info('Extracting zipFile.zip...');
    execFileSync('unzip', ['-o', zipFile, '-d', path.join(WORKSPACE, 'extracted_zip')], { stdio: 'inherit' });
    const nestedTar = path.join(WORKSPACE, 'extracted_zip', 'vistadel-skeleton.tar.gz');
    if (fs.existsSync(nestedTar)) {
      logger.info('Extracting nested vistadel-skeleton.tar.gz...');
      execFileSync('tar', ['-xzf', nestedTar, '-C', WORKSPACE], { stdio: 'inherit' });
    }
  }

  if (!fs.existsSync(CONTENT_DIR) && fs.existsSync(tarFile)) {
    logger.info('Extracting vistadel-skeleton.tar.gz...');
    execFileSync('tar', ['-xzf', tarFile, '-C', WORKSPACE], { stdio: 'inherit' });
  }

  if (!fs.existsSync(CONTENT_DIR) || !fs.existsSync(path.join(CONTENT_DIR, 'README.md'))) {
    logger.error('WARNING: vistadel-complete content directory not found after extraction.');
  } else {
    logger.info('Content extracted successfully.');
  }
}

extractArchives();

const markdownCache = new Map();

function readMarkdown(filePath) {
  if (markdownCache.has(filePath)) {
    return markdownCache.get(filePath);
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const html = marked(raw);
    const sanitized = sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'br',
        'del', 'input', 'details', 'summary', 'sup', 'sub'
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title', 'width', 'height'],
        a: ['href', 'title', 'target', 'rel'],
        input: ['type', 'checked', 'disabled'],
        th: ['align'],
        td: ['align'],
        code: ['class'],
        pre: ['class'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    });
    markdownCache.set(filePath, sanitized);
    return sanitized;
  } catch (err) {
    return null;
  }
}

const SLUG_PATTERN = /^[a-z0-9-]+$/;
function isValidSlug(slug) {
  return slug && slug.length <= 100 && SLUG_PATTERN.test(slug);
}

const app = express();
const PORT = 5000;

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

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

function allRoutes() {
  const routes = ['/', '/phases', '/case-studies', '/tiers', '/contributing', '/build-status'];
  phases.forEach(p => routes.push('/phases/' + p.slug));
  caseStudies.forEach(s => routes.push('/case-studies/' + s.slug));
  tiers.forEach(t => routes.push('/tiers/' + t.slug));
  return routes;
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /\nSitemap: ' + req.protocol + '://' + req.get('host') + '/sitemap.xml');
});

app.get('/sitemap.xml', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const urls = allRoutes().map(r => `  <url><loc>${baseUrl}${r}</loc></url>`).join('\n');
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

app.get('/', (req, res) => {
  res.render('index', { phases, caseStudies, tiers, activePage: 'home' });
});

app.get('/phases', (req, res) => {
  res.render('phases', { phases, activePage: 'phases' });
});

app.get('/phases/:slug', (req, res, next) => {
  if (!isValidSlug(req.params.slug)) return res.status(404).render('404', { activePage: '' });
  const phase = phases.find(p => p.slug === req.params.slug);
  if (!phase) return res.status(404).render('404', { activePage: '' });
  const content = readMarkdown(path.join(CONTENT_DIR, 'phases', phase.file));
  res.render('phase-detail', { phase, content, phases, activePage: 'phases' });
});

app.get('/case-studies', (req, res) => {
  res.render('case-studies', { caseStudies, activePage: 'case-studies' });
});

app.get('/case-studies/:slug', (req, res, next) => {
  if (!isValidSlug(req.params.slug)) return res.status(404).render('404', { activePage: '' });
  const study = caseStudies.find(s => s.slug === req.params.slug);
  if (!study) return res.status(404).render('404', { activePage: '' });
  const content = readMarkdown(path.join(CONTENT_DIR, 'case-studies', 'public', study.file));
  res.render('case-study-detail', { study, content, caseStudies, activePage: 'case-studies' });
});

app.get('/tiers', (req, res) => {
  res.render('tiers', { tiers, activePage: 'tiers' });
});

app.get('/tiers/:slug', (req, res, next) => {
  if (!isValidSlug(req.params.slug)) return res.status(404).render('404', { activePage: '' });
  const tier = tiers.find(t => t.slug === req.params.slug);
  if (!tier) return res.status(404).render('404', { activePage: '' });
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
  logger.warn({ path: req.path, method: req.method }, '404 Not Found');
  res.status(404).render('404', { activePage: '' });
});

app.use((err, req, res, next) => {
  logger.error({ err, path: req.path }, 'Unhandled error');
  res.status(500).send(`<!DOCTYPE html><html><head><title>500 Server Error</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc;color:#334155;}div{text-align:center;}h1{font-size:3rem;color:#0f172a;margin-bottom:8px;}p{color:#64748b;}a{color:#3b82f6;}</style></head><body><div><h1>500</h1><p>Something went wrong. Please try again later.</p><a href="/">Back to Home</a></div></body></html>`);
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled rejection');
});

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`VISTADEL server running on http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
});
