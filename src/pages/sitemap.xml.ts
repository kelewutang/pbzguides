import { pages } from '../data/pages';
import { contentAreaKeys } from '../data/content-areas';
import { contentPath, publishedEntriesForAllAreas } from '../lib/content';
import { absoluteUrl, xml } from '../lib/seo';
export async function GET() {
  const publishedEntries = await publishedEntriesForAllAreas();
  const entries = [
    ...Object.values(pages).map((page) => ({ path: page.path, updated: undefined as string | undefined })),
    ...contentAreaKeys.map((area) => ({ path: contentPath(area), updated: undefined as string | undefined })),
    ...publishedEntries.flatMap(({ area, entries: areaEntries }) => areaEntries.map((entry) => ({ path: contentPath(area, entry.data.slug), updated: entry.data.updatedAt.toISOString() }))),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(entry => `<url><loc>${xml(absoluteUrl(entry.path))}</loc>${entry.updated ? `<lastmod>${entry.updated}</lastmod>` : ''}</url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
