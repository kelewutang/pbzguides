# Development rules

1. Inspect repository branch, remote, status and local instructions; keep Chinese reference read-only.
2. State scope and verifiable success conditions. Keep reversible changes minimal; record important unresolved decisions.
3. Core headings, article bodies, sources and SEO must exist in built HTML. JavaScript can only progressively enhance.
4. Guides start as draft. Use stable lowercase hyphenated slugs, real editorial dates and actual HTTP(S) source URLs. Avoid H1 in Markdown (layout supplies it). Review facts and source support before marking published. Do not use model memory as evidence.
5. Do not auto-translate/import Chinese data or treat a published article as proof that every claim is confirmed. Design future per-claim evidence and version handling separately when needed.
6. Run `npm ci` and `npm run build`; inspect output and `git diff --check`. Production builds must remove prior `dist/` output first, so it contains only the current publishable source projection; inspect that deleted, withdrawn or draft guides leave no HTML page or sitemap URL. For route/redirect changes, verify actual HTTP status and chain in the relevant hosting environment. If unavailable, explicitly record unverified status.
7. Test draft exclusion with a temporary generic fixture when changing the publication pipeline; delete fixtures and rebuild clean before handoff. Do not publish fake game content for tests.
8. Update CURRENT-STATE.md after each phase. Do not stage, commit, push, connect hosting or deploy unless explicitly authorized. Never expose secrets.

Before launch: real reviewed content, indexing decision, independent Netlify setup, preview noindex headers, domain/DNS and redirect checks, keyboard/mobile browser QA, accessibility and measured Core Web Vitals. No claim of accessibility conformance or CWV success without measurement.
