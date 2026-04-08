# Contributing to VISTADEL

Thanks for considering contributing! This framework is built on real client work and community feedback.

---

## How to Contribute

### 1. Small Changes (Typos, Clarity)
- Fork the repo
- Make changes in a branch: `fix/issue-description`
- Submit a PR with description

### 2. New Examples
- Submit an issue first: "I want to add example for [domain]"
- Include: domain, use case, why it's valuable
- Once approved, create the example and submit PR

### 3. New Content (Phase additions, new tools)
- Open a GitHub Discussion first
- Describe what you'd add and why
- Community feedback before you start writing

### 4. Bug Reports
- Create an issue: describe the bug, include context
- What phase? What tool? What's broken?

### 5. Ideas & Questions
- Use GitHub Discussions (not Issues)
- Tag by phase or topic

---

## Quality Standards

**Every PR must include:**

1. **Substance:** Real information, not theory
2. **Example:** At least one concrete example
3. **Testing:** Code examples must run
4. **Attribution:** Credit sources, cite tools
5. **Tradeoffs:** Explain why, not just how

**We reject PRs that:**
- Are theory-only (no examples)
- Have untested code
- Don't explain tradeoffs
- Are promotional (trying to sell something)
- Duplicate existing content

---

## Writing Standards

### Tone
- Helpful, not arrogant
- Practical, not theoretical
- Honest about tradeoffs
- Community-first

### Structure
Each phase/section includes:
1. **Purpose** (why this matters)
2. **Workflow** (how to do it)
3. **Examples** (real-world context)
4. **Decision trees** (when to choose A vs B)
5. **Templates** (fillable, reusable)
6. **Error handling** (what can go wrong)
7. **References** (where to learn more)

### Code Examples
- Must be tested and working
- Include context (what problem does it solve?)
- Add comments explaining key decisions
- Use consistent style with rest of repo

### Compliance & Security
- Explicitly state any compliance assumptions (HIPAA, SOC 2, PCI-DSS, GDPR) at the top of the relevant section
- Do not include real credentials, API keys, or secrets in any example — use placeholders like `YOUR_API_KEY`
- When showing authentication or data-handling patterns, call out security considerations inline

### AI Prompts
- All Claude (or other LLM) prompts must be tested before inclusion
- Include the expected output or outcome so readers can verify correctness
- Note any model version or behaviour assumptions

---

## Best Practices for Phase Documentation

When writing or updating a phase document:

1. **Start with the outcome** — what does success look like when this phase is complete?
2. **Be specific** — "5 user interviews minimum" beats "talk to users"
3. **Use real names** — case study companies are real (Martensen IP, Accolade, Destwin, RadioMall, Gardien Products). Reference them.
4. **Acknowledge failure modes** — every phase has common mistakes. Call them out.
5. **Include a decision tree** — when should someone skip or combine phases?
6. **Link forward and back** — each phase should reference the phase before and after it
7. **Include a template** — a fillable artefact the reader can use immediately

---

## PR Process

1. **Fork** the repo
2. **Create branch:** `feature/your-feature-name` or `fix/your-fix`
3. **Make changes** following the standards above
4. **Test:** Run all code examples, check all links, proofread
5. **Submit PR** with:
   - Clear title (what's changing?)
   - Description (why? what problem does it solve?)
   - Links to relevant phase/issue
6. **Wait for review** (2–5 business days)
7. **Iterate** based on feedback
8. **Merge!** 🎉

---

## Server / Website Changes

If your PR touches `src/server.js` or any EJS template:

- Start the server locally (`npm start`) and manually verify affected routes
- Do not expose stack traces or internal paths in error responses
- All markdown rendered to HTML must pass through `sanitize-html` — never render raw markdown directly
- Validate slug parameters before using them in file paths
- Use the pino `logger` (not `console.log`) for all server-side logging

---

## Code Review

**We look for:**
- Does it solve a real problem?
- Is it clear and actionable?
- Are there examples?
- Does the code work?
- Is it consistent with repo style?

**We might ask you to:**
- Add an example
- Clarify a decision
- Test your code
- Link related content
- Explain a tradeoff
- State a compliance assumption explicitly

---

## Attribution

**We credit:**
- Everyone who contributes (in CONTRIBUTORS.md)
- Case study companies (with permission)
- Tool creators (in references)
- Ideas from community (in discussions)

---

## Questions?

- **Contribution questions:** Open a GitHub Discussion
- **Content questions:** Comment on the relevant issue
- **General feedback:** GitHub Discussions
- **INT-specific:** contact@intinc.com

---

## License

By contributing, you agree your work will be shared under the MIT License.

---

**Thanks for building with us! 🙏**
