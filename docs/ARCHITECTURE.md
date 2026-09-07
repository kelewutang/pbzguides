# Architecture

PBZ Guides uses Astro 7.2.8, Node 24.19.0, npm, strict TypeScript configuration and native CSS. `npm run build` removes `dist/`, runs `astro build --force`, then verifies the static artifact before a future independent Netlify deployment. There is no adapter, SSR, frontend framework, runtime data request or production client JavaScript.

## Sources of truth

- `src/config/site.ts`: site identity, production origin, title template, descriptions, social defaults, language and dormant page-specific alternate URLs.
- `src/data/pages.ts` and `src/data/content-areas.ts`: homepage metadata plus the single route, label and category-copy definition for guides, weapons, bosses, combat and characters.
- `src/content/{guides,weapons,bosses,combat,characters}/*.md`: future English editorial bodies and frontmatter. No placeholder article is shipped.
- `src/content.config.ts`: five typed Astro Content Collections sharing current common metadata: stable slug, title, description, status, updatedAt, optional SEO overrides, evidence status, verification date, sources and future language mapping. Separate collections preserve their namespaces; no game taxonomy or relationship model is implied.
- `src/lib/content.ts`: duplicate-slug guard and shared published-only projection for category indexes, detail routes and sitemap.
- `src/components/SEO.astro`: static head output; optional schema object serialized with `<` escaping; optional image metadata only when an actual asset is configured.
- `src/components/CategoryLanding.astro`, `ContentCard.astro`, `Breadcrumbs.astro` and `ContentMetadata.astro`: reusable category, card, navigation and optional verification presentation.
- `src/layouts/BaseLayout.astro`: English document, shared shell and CSS. `ContentDetailLayout.astro` plus `src/pages/[area]/[slug].astro` provide the shared static detail architecture, including an optional future page-schema handoff to the existing SEO component.
- `src/styles/global.css`: restrained charcoal/steel layout, responsive navigation and visible keyboard focus. No external font or image request.
- `scripts/clean-dist.mjs`: removes the previous static artifact before every production build. `astro build --force` refreshes the persisted content layer.
- `scripts/verify-dist.mjs`: checks emitted routes, canonical URLs, metadata, JSON-LD, internal links, robots, no runtime JavaScript and the per-area published route manifest.
- `scripts/test-build-hygiene.mjs`: verifies that every content family generates a temporary published page, then removes it when source becomes draft or is deleted.

## Content and publication

Astro Content Collections follow the [official collection API](https://docs.astro.build/en/guides/content-collections/). `status` is `draft`, `published` or `withdrawn`; only `published` is projected to category indexes, detail routes and sitemap. `evidenceStatus` may be `confirmed`, `observed` or `unverified`. `sources`, `lastVerified`, `seo` and `alternateLanguage` are deliberately optional so no fake evidence or language URLs are needed. `alternateLanguage` is stored only for later review; it does not emit `hreflang`.

Shared fields are intentionally limited to metadata common to current content. They model English editorial documents, not a copied Chinese Fact knowledge model. Future weapon, boss or character taxonomies, structured entities and relation systems need separate approval. Markdown is trusted repository-authored content, never untrusted user input. Editorial review must check source relevance and version context; schema validation cannot prove facts.

## Routing and SEO

The initial URL contract is:

```text
/
/guides/                 /guides/{slug}/
/weapons/                /weapons/{slug}/
/bosses/                 /bosses/{slug}/
/combat/                 /combat/{slug}/
/characters/             /characters/{slug}/
```

Directory-style trailing-slash URLs are the English convention. There is no `/en/`, `/wiki/`, date-based URL or historical redirect layer. Sitemap uses the same published projection; 404, drafts and withdrawn entries are absent. Cleaning and the per-area route manifest prevent deleted or unpublished artifacts from surviving in `dist/`. 404 is noindex and has no canonical. Netlify's catch-all returns status 404 and is not an SPA rewrite.

All normal pages emit title, description, canonical, robots, OG and X metadata. The homepage emits WebSite JSON-LD. Detail pages have a reusable breadcrumb foundation suitable for future BreadcrumbList JSON-LD. No fabricated image, account, publisher affiliation, translation or SearchAction is emitted. Alternate mappings remain empty until reviewed reciprocal URLs exist; `x-default` remains undecided.

## Netlify

`netlify.toml` runs `npm ci && npm run build` and publishes `dist`, with Node pinned. A future setup must create a new Netlify site tied only to this repository. No `.netlify` site identity, token or Chinese hosting configuration is copied. Preview indexing headers, DNS, domain redirects and actual HTTP normalization must be reviewed in the independent hosted site before launch.
