import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
import { site } from './src/config/site.ts';

const publishedGuideRouteManifest = {
  name: 'published-guide-route-manifest',
  hooks: {
    'astro:build:done': async ({ pages }) => {
      const routes = pages.map(page => `/${page.pathname}`).filter(pathname => /^\/guides\/[^/]+\/$/.test(pathname));
      await writeFile(new URL('./.astro/published-guide-routes.json', import.meta.url), `${JSON.stringify(routes, null, 2)}\n`);
    },
  },
};

export default defineConfig({ site: site.url, output: 'static', trailingSlash: 'always', build: { format: 'directory' }, integrations: [publishedGuideRouteManifest] });
