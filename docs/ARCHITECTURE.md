# Architecture

Astro 7.2.8, Node 24.19.0, npm, strict TypeScript configuration, native CSS. `npm run build` explicitly removes `dist/`, runs `astro build --force` to refresh the content layer, then verifies the static artifact → future independent Netlify site. No adapter, SSR, runtime data requests or frontend framework.

## Sources of truth

- `src/config/site.ts`: identity, production origin, title template, descriptions, social defaults, language and optional page-specific alternate URLs. Astro, robots and canonical utilities consume this configuration.
- `src/data/pages.ts`: current indexable landing-page paths and metadata; sitemap reuses it.
- `src/content/guides/*.md`: future editorial guide bodies and frontmatter. No placeholder article is shipped.
- `src/content.config.ts`: build-time schema. Explicit stable slug, title, description, updatedAt, draft/published status, HTTP(S) sources. Draft is default. Dates are editorial dates, not build timestamps.
- `src/lib/guides.ts`: duplicate slug guard and shared published-only projection for index, detail routes and sitemap.
- `src/components/SEO.astro`: static head output; optional schema object serialized with `<` escaping; optional image metadata only when an actual asset is configured.
- `src/layouts/BaseLayout.astro`: English document, shared navigation, skip link, footer and CSS.
- `src/components/GuideCard.astro`: reusable article/index card.
- `src/styles/global.css`: restrained charcoal/steel layout, system fonts, responsive navigation and visible keyboard focus. No external font/image requests.
- `public/`: public assets. Initial favicon is a simple typographic mark, not game artwork.
- `scripts/clean-dist.mjs`: removes the previous static artifact before every production build. `astro build --force` also refreshes the persisted content layer. Together they ensure a successful build is a projection only of current publishable source; deleted or unpublished guides must not remain deployable.
- `scripts/verify-dist.mjs`: checks emitted routes, canonical URLs, metadata, JSON-LD, internal links, robots, no runtime JS and that sitemap guide-detail routes equal Astro's current published-guide route projection.

Astro Content Collections follow the [official collection API](https://docs.astro.build/en/guides/content-collections/). They model English editorial documents, not a copied version of the Chinese Fact knowledge model. Any future structured entity contract needs a separate decision. Markdown is trusted repository-authored content, never untrusted user input. Editorial review must check source relevance and version context; schema validation cannot prove facts.

## Routing and SEO

Only `/` and `/guides/` are indexable today. Directory-style trailing-slash URLs are the initial English convention; future articles use `/guides/{slug}/`. No translated aliases or historic Chinese redirects. Sitemap is built from the same published projection; 404/drafts are absent. Production cleaning and route-projection verification prevent deleted or unpublished guide artifacts from surviving in `dist/`. 404 is noindex and has no canonical. Netlify catch-all returns status 404 and is not an SPA rewrite.

All normal pages emit title, description, canonical, robots, OG and X metadata. Home emits WebSite JSON-LD. Page schemas can be supplied through BaseLayout. No fabricated image, account, publisher affiliation, translation or SearchAction. Alternate mappings start empty; reviewed reciprocal equivalents must include language codes and self alternates before enabling. x-default remains undecided.

## Netlify

`netlify.toml`: `npm ci && npm run build`, publish `dist`, pinned Node. Future setup must create a new Netlify site tied only to this repository. No `.netlify` site identity, token or Chinese hosting configuration is copied. Preview indexing headers, DNS, domain redirects and actual HTTP normalization must be reviewed and checked on the new site before launch. Local Astro preview does not validate Netlify rules.
