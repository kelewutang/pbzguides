import { pages } from '../data/pages';
import { publishedGuides, guidePath } from '../lib/guides';
import { absoluteUrl, xml } from '../lib/seo';
export async function GET() {
  const entries = [...Object.values(pages).map(page => ({ path: page.path, updated: undefined as string | undefined })), ...(await publishedGuides()).map(guide => ({ path: guidePath(guide.data.slug), updated: guide.data.updatedAt.toISOString() }))];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(entry => `<url><loc>${xml(absoluteUrl(entry.path))}</loc>${entry.updated ? `<lastmod>${entry.updated}</lastmod>` : ''}</url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
