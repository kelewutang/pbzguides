import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';
import { site } from './src/config/site.ts';

const contentAreas = ['guides', 'weapons', 'bosses', 'combat', 'characters'];
const publishedContentRouteManifest = {
  name: 'published-content-route-manifest',
  hooks: {
    'astro:build:done': async ({ pages }) => {
      const routes = Object.fromEntries(contentAreas.map((area) => [area, pages
        .map((page) => `/${page.pathname}`)
        .filter((pathname) => new RegExp(`^/${area}/[^/]+/$`).test(pathname))
        .sort()]));
      await writeFile(new URL('./.astro/published-content-routes.json', import.meta.url), `${JSON.stringify(routes, null, 2)}\n`);
    },
  },
};

export default defineConfig({ site: site.url, output: 'static', trailingSlash: 'always', build: { format: 'directory' }, integrations: [publishedContentRouteManifest] });
