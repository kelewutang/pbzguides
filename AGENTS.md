# Working rules

Read README.md and docs/CURRENT-STATE.md, PROJECT.md, ARCHITECTURE.md and DEVELOPMENT-RULES.md before changing this project.

- Work only in this independent English repository. Chinese repository `/home/mok/projects/yingzhirenling-site` is read-only reference; never modify or run its build.
- Keep Astro static output, npm, native CSS and minimal progressive JavaScript. Do not add frameworks, databases, CMS or dependencies without a demonstrated need.
- Inspect branch, remote and worktree before editing. Do not stage, commit, push or deploy without explicit authorization.
- Do not invent game facts, names, sources, rights or Chinese equivalents. Publication requires editorial review; a source URL alone does not verify a claim.
- Content and config are source of truth. Never edit generated `.astro/`, `dist/` or `node_modules/` as source.
- Never print, store or commit secrets. Never copy .env or hosting identity from the Chinese site.
- Keep changes scoped. Run `npm ci`, `npm run build` and `git diff --check`; document actual results and unverified behavior in CURRENT-STATE.md.
- User instructions take precedence over these conventions. Record unresolved product decisions rather than inventing policies.
