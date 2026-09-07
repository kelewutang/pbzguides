import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { site } from '../src/config/site.ts';
import { contentAreaKeys } from '../src/data/content-areas.ts';
const read = path => readFile(`dist/${path}`, 'utf8');
const expectedPublishedContentRoutes = JSON.parse(await readFile('.astro/published-content-routes.json', 'utf8'));
const sitemap = await read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const publishedContentRoutes = Object.fromEntries(contentAreaKeys.map((area) => [area, urls
  .map((url) => new URL(url).pathname)
  .filter((pathname) => new RegExp(`^/${area}/[^/]+/$`).test(pathname))
  .sort()]));
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URL');
assert(urls.includes(`${site.url}/`));
for (const area of contentAreaKeys) assert(urls.includes(`${site.url}/${area}/`), `Missing ${area} category URL from sitemap`);
assert.deepEqual(publishedContentRoutes, expectedPublishedContentRoutes, 'Published detail sitemap routes do not match Astro’s current source projection');
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : `${dir}/${entry.name}`))).flat(); }
const files = await walk('dist');
const htmlFiles = files.filter(path => path.endsWith('.html'));
assert.equal(htmlFiles.length, urls.length + 1, 'Unexpected HTML route outside sitemap/404');
for (const path of htmlFiles) {
  const html = await readFile(path, 'utf8');
  assert.match(html, /<html lang="en"/);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: one H1`);
  for (const field of ['description', 'robots', 'twitter:card', 'twitter:title', 'twitter:description']) assert(html.includes(`name="${field}"`), `${path}: ${field}`);
  for (const field of ['og:title', 'og:description', 'og:site_name', 'og:type']) assert(html.includes(`property="${field}"`));
  assert(!/<script(?![^>]*type="application\/ld\+json")/.test(html), 'Unexpected runtime JavaScript');
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(json);
  for (const [, href] of html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const file = href.endsWith('/') ? `dist${href}index.html` : `dist${href}`;
    assert(files.includes(file), `${path}: broken internal link ${href}`);
  }
}
for (const url of urls) {
  const pathname = new URL(url).pathname;
  assert.equal(new URL(url).origin, site.url);
  assert(!pathname.includes('404'));
  const html = await read(`${pathname.slice(1)}index.html`);
  assert(html.includes(`rel="canonical" href="${url}"`));
  assert(html.includes('content="index, follow"'));
}
const error = await read('404.html');
assert(error.includes('noindex, follow'));
assert(!error.includes('rel="canonical"'));
assert((await read('robots.txt')).includes(`Sitemap: ${site.url}/sitemap.xml`));
console.log(`PASS: ${htmlFiles.length} HTML pages, ${urls.length} canonical sitemap URLs, metadata, internal links, JSON-LD, publication-route projection, 404 isolation, no runtime JavaScript.`);
