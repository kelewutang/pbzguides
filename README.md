# PBZ Guides

Independent English guide/reference website for Phantom Blade Zero. Production identity: https://pbzguides.com. Phase 1 establishes the foundation; no game guides are published.

## Local development

Use Node 24.19.0 (`nvm use`) and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`build` generates static Astro output and validates HTML, SEO, internal links, sitemap and 404 isolation. Netlify publishes `dist`. No Netlify site has been created or connected; no deployment is authorized in this phase.

Routes: `/`, `/guides/`, and custom `404.html`; machine endpoints `/sitemap.xml`, `/robots.txt`. Directory routes use trailing slashes. A future published article generates `/guides/{slug}/`.

Start with [Current state](docs/CURRENT-STATE.md), then [Project](docs/PROJECT.md), [Architecture](docs/ARCHITECTURE.md) and [Development rules](docs/DEVELOPMENT-RULES.md).
