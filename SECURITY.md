# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes    |
| < 1.0   | ❌ No     |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues.**

If you discover a security vulnerability in VISTADEL, please report it responsibly:

1. **Email:** [contact@intinc.com](mailto:contact@intinc.com) with the subject line `[SECURITY] VISTADEL Vulnerability Report`
2. **Include:**
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Any suggested fix (optional but appreciated)

You will receive an acknowledgement within **48 hours** and a resolution timeline within **7 business days**.

---

## Security Measures in This Repository

The VISTADEL website (`src/server.js`) implements the following security controls:

| Control | Implementation |
|---------|---------------|
| **Security headers** | `helmet` middleware (CSP, X-Frame-Options, HSTS, etc.) |
| **XSS prevention** | All markdown rendered through `sanitize-html` before output |
| **Path traversal prevention** | Slug parameters validated against `/^[a-z0-9-]+$/` before file path use |
| **No stack trace exposure** | 500 error handler returns a plain HTML page with no internal details |
| **Dependency management** | Run `npm audit` regularly; update dependencies per `ROADMAP.md` |
| **No secrets in code** | Use environment variables; never commit API keys or credentials |

---

## Responsible Disclosure

We ask that you:

- Give us reasonable time to address the issue before public disclosure
- Do not exploit the vulnerability beyond what is necessary to demonstrate it
- Do not access, modify, or delete data that is not your own

We commit to:

- Acknowledging your report promptly
- Working to fix confirmed vulnerabilities in a timely manner
- Crediting you in the changelog (if you wish)
- Not pursuing legal action against good-faith reporters

---

## Scope

This policy covers:

- The VISTADEL Express.js website (`src/`)
- The framework documentation rendered by the website
- The repository itself (dependency vulnerabilities, secrets exposure)

**Out of scope:**

- Vulnerabilities in third-party services (Replit, GitHub)
- Social engineering or phishing
- Denial-of-service attacks

---

**Last Updated:** April 2026  
**Owner:** INT Inc. — [contact@intinc.com](mailto:contact@intinc.com)
