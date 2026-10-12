# PBZ Guides

Independent English guide/reference website for Phantom Blade Zero. Production identity: https://pbzguides.com. The site currently has 17 published detail pages across five content areas, plus category hubs and homepage discovery.

## Local development

Use Node 24.19.0 (`nvm use`) and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`build` generates static Astro output and validates HTML, SEO, internal links, sitemap and 404 isolation. Netlify builds from `main` and publishes `dist` for the production domain. This documentation update does not trigger a deployment; see [Current state](docs/CURRENT-STATE.md) for the limits of verified production evidence.

Routes: `/`, `/guides/`, `/weapons/`, `/bosses/`, `/combat/`, `/characters/`, and custom `404.html`; machine endpoints `/sitemap.xml`, `/robots.txt`. Directory routes use trailing slashes. Published content generates one detail route below its own category, such as `/weapons/{slug}/`.

Content lives in separate Astro Content Collections for guides, weapons, bosses, combat and characters. `status: published` is the only publication state that can generate a detail route, appear in a category listing, or enter the sitemap. `draft` and `withdrawn` content is excluded. Source URLs, evidence status, verification date, SEO overrides and future language mapping are optional metadata; do not invent values merely to fill frontmatter.

Start with [Current state](docs/CURRENT-STATE.md), then [Project](docs/PROJECT.md), [Architecture](docs/ARCHITECTURE.md) and [Development rules](docs/DEVELOPMENT-RULES.md).
