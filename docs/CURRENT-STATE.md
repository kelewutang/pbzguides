# Current state — 2026-09-08

## Resume here

Phase 2A information architecture is committed and merged to `main` at baseline `0798ea9`. The current checkout is `/home/mok/projects/pbzguides` on `content/release-date-guide`; the Phase 2B release-date pilot changes are intentionally uncommitted. The remote is `https://github.com/kelewutang/pbzguides.git`.

Production identity is https://pbzguides.com. There is no connected Netlify site. Use Node 24.19.0 and npm. If Node is not on PATH, use `/home/mok/.nvm/versions/node/v24.19.0/bin` or load nvm.

## Completed

- Astro static directory output, strict TypeScript configuration, native responsive CSS, shared shell and no production runtime JavaScript.
- Central identity/config, canonical metadata, robots, OG/X tags, optional image metadata, safe optional JSON-LD and an empty reviewed-alternate map.
- Homepage, custom 404, robots and sitemap. `dist` is removed before every production build, and the content layer is forced to refresh.
- Primary navigation and category landing pages for `/guides/`, `/weapons/`, `/bosses/`, `/combat/` and `/characters/`. Empty categories have no factual entries or fake counts.
- Five separate Astro Content Collections with a common limited metadata contract. Only `published` entries can generate a category card, detail page or sitemap URL; `draft` and `withdrawn` entries cannot.
- Shared static detail route, breadcrumb component and optional evidence metadata component. This is a presentation foundation, not a game database.
- Build verification checks the current per-area published detail route projection; the hygiene regression confirms temporary published entries for all five areas disappear from HTML and sitemap after one becomes draft and the rest are removed.
- Phase 2B content pilot: `src/content/guides/phantom-blade-zero-release-date.md` is the first real published factual guide, at `/guides/phantom-blade-zero-release-date/`. It uses only S-GAME, PlayStation, and Steam source records; evidence status is `confirmed`, and it was last verified on 2026-09-08. S-GAME and PlayStation list October 29, 2026, while Steam currently displays October 28, 2026. The page records this discrepancy without assigning an unsupported cause.

## Source and evidence boundary

The release-date guide is the only real content source; future entries need title, description, stable lowercase kebab-case slug, status and updatedAt. Optional `seo`, `evidenceStatus` (`confirmed`, `observed`, `unverified`), `lastVerified`, `sources` and `alternateLanguage` are reserved for reviewed content. Do not invent values to satisfy the schema. `alternateLanguage` does not emit `hreflang`.

The Chinese repository remains a read-only architecture reference. Its content, assets, hosting identity, routes and knowledge schema have not been copied. English categories and future content must follow English player/search intent, never automatic parity with Chinese routes.

## Actual validation

- `npm ci`: passed; 186 packages installed and 0 vulnerabilities reported. npm warned that esbuild postinstall remains pending explicit allowlisting; no policy bypass was added.
- `npm run build`: passed. Final output: 8 HTML pages: `/`, `/404`, `/guides/`, `/guides/phantom-blade-zero-release-date/`, `/weapons/`, `/bosses/`, `/combat/` and `/characters/`; `/robots.txt` and `/sitemap.xml` are also generated. The sitemap contains 7 canonical indexable URLs: `/`, `/guides/`, `/guides/phantom-blade-zero-release-date/`, `/weapons/`, `/bosses/`, `/combat/` and `/characters/`. The 404 page remains excluded. The verifier checked language, H1, metadata, canonicals, JSON-LD, internal links, robots, 404 exclusion, no runtime scripts and per-area published-route projection.
- `npm run test:build-hygiene`: passed. It created temporary generic published fixtures in every content family, confirmed their pages and sitemap URLs, then changed one to draft and removed the other four. The next normal build removed every fixture artifact. Final cleanup build passed.
- Phase 2B passed factual-accuracy, official-source, October 28/October 29 discrepancy, early-access wording, SEO, and build/regression audits. Its only prior Gate failure was this stale handoff documentation.
- `git diff --check`: passed. Browser/mobile/keyboard QA, measured Core Web Vitals, Netlify HTTP routing, preview indexing, DNS and production behavior remain unverified.

## Intentionally unresolved facts

- Why Steam currently displays October 28, 2026 while S-GAME and PlayStation list October 29, 2026.
- The exact unlock time.
- Any early-access policy not confirmed by official sources.

## Intentionally deferred

The next recommended phase is to review the published pilot's source and editorial model, then approve a small English search-intent-led content batch. Final launch inventory; weapon, boss and character taxonomies; relations; item and location systems; tier lists; best builds; spoiler policy; version model; cross-language mappings and `x-default`; final social previews; visual redesign; Netlify setup and deployment remain deferred.
