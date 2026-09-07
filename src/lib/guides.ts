import { getCollection } from 'astro:content';
export async function publishedGuides() {
  const entries = await getCollection('guides');
  const slugs = new Set<string>();
  for (const entry of entries) {
    if (slugs.has(entry.data.slug)) throw new Error(`Duplicate guide slug: ${entry.data.slug}`);
    slugs.add(entry.data.slug);
  }
  return entries.filter(entry => entry.data.status === 'published').sort((a, b) => a.data.slug.localeCompare(b.data.slug, 'en'));
}
export const guidePath = (slug: string) => `/guides/${slug}/`;
