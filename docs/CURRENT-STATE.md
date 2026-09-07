# Current state — 2026-09-07

## Resume here

Phase 1 foundation complete locally. Checkout `/home/mok/projects/pbzguides`; remote `https://github.com/kelewutang/pbzguides.git`; branch `main`, unborn (no commits). The remote was empty at initial clone. All authored files remain untracked; nothing staged, committed, pushed or deployed.

Production identity is https://pbzguides.com. There is no connected Netlify site. Use Node 24.19.0 and npm (installed environment: npm 11.17.0). If Node is not on PATH, use `/home/mok/.nvm/versions/node/v24.19.0/bin` or load nvm.

## Completed

- Astro 7.2.8 static directory output; strict TS configuration; reusable layout, navigation, footer and cards; native responsive CSS and no client JavaScript.
- Central identity/config, landing-page metadata, canonical, robots, OG/X tags, optional images, safe optional JSON-LD and empty reviewed-alternate map.
- Homepage `/`, guide index `/guides/`, custom `404.html`; generated `/robots.txt` and `/sitemap.xml`.
- Empty Markdown Content Collection with source/slug/date/publication validation; future published-only `/guides/{slug}/` pipeline shared with listing and sitemap.
- Netlify static build config and security headers; independent hosting setup remains pending.
- README, AGENTS and project/architecture/development/current-state documentation.

## Reference audit

Chinese repository `/home/mok/projects/yingzhirenling-site` was clean on `main` before work and remains clean after read-only inspection. Read AGENTS, CURRENT-STATE, PROJECT, ARCHITECTURE, package/config/Netlify files and source structure/BaseLayout. It demonstrates build-time knowledge projections, Fact-level trust, shared layouts, publication isolation and static SEO. No files/code/content/assets/config identity were copied. Its historical bridge, explicit per-entity rewrites, search and complete Fact/Entity schema are intentionally not reproduced.

## Actual validation

- `npm ci`: passed; 186 packages installed and 0 vulnerabilities reported. npm warned that esbuild postinstall remains pending explicit allowlisting; no policy bypass was added.
- `npm run build`: passed, including artifact validator. The production command removes `dist/`, forces Astro to refresh its persisted content layer, builds, and verifies the result. Final output: 3 HTML pages, 2 sitemap URLs. Checks cover language, H1, metadata, canonicals, JSON-LD, internal links, robots, 404 exclusion, no runtime scripts and sitemap guide routes against Astro's generated published-guide projection.
- `npm run test:build-hygiene`: passed. A temporary generic published fixture generated its detail page and sitemap URL; after its source was removed, the next normal production build removed both. The fixture and final `dist` output were cleaned afterward.
- Temporary generic fixtures: draft excluded from detail output and sitemap; published fixture generated detail/list/sitemap; javascript: source URL rejected by build. Fixtures removed and final clean build passed.
- Local dev homepage returned HTTP 200. Preview opened in Codex. This is not browser interaction or visual QA.
- `git diff --check`: passed (all new files untracked, so this check alone does not validate their whitespace).
- Empty collection warnings are expected with zero Markdown entries. npm reported esbuild postinstall not explicitly allowlisted; no policy bypass was added, and clean installation/build passed.
- Separate TypeScript typechecking, browser/mobile/keyboard QA, measured CWV, Netlify routing/status/redirect chains, preview indexing, DNS and real production behavior: UNVERIFIED. Static build passing does not prove these.

## Undecided / next phase

Approve English search-intent research and first sourced article briefs before category routes. Review structured knowledge sharing, English naming, schema/version granularity, spoiler policy, language equivalents/reciprocal hreflang and x-default. Configure real social account/image only when provided. Review indexing readiness before launch: current pages use index/follow but no launch is approved and the library is empty. Create a new independent Netlify site only when authorized, configure preview noindex and production domain, then verify hosted 404/canonical/redirect behavior and browser accessibility/performance. No Chinese site changes are permitted.
