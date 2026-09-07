import { getCollection } from 'astro:content';
import { contentAreaKeys, type ContentArea } from '../data/content-areas';

const loaders = {
  guides: () => getCollection('guides'),
  weapons: () => getCollection('weapons'),
  bosses: () => getCollection('bosses'),
  combat: () => getCollection('combat'),
  characters: () => getCollection('characters'),
};

export const contentPath = (area: ContentArea, slug?: string) => slug ? `/${area}/${slug}/` : `/${area}/`;

export async function entriesFor(area: ContentArea) {
  const entries = await loaders[area]();
  const slugs = new Set<string>();

  for (const entry of entries) {
    if (slugs.has(entry.data.slug)) throw new Error(`Duplicate ${area} slug: ${entry.data.slug}`);
    slugs.add(entry.data.slug);
  }

  return entries;
}

export async function publishedEntriesFor(area: ContentArea) {
  return (await entriesFor(area))
    .filter((entry) => entry.data.status === 'published')
    .sort((a, b) => a.data.slug.localeCompare(b.data.slug, 'en'));
}

export async function publishedEntriesForAllAreas() {
  const entries = await Promise.all(contentAreaKeys.map(async (area) => ({ area, entries: await publishedEntriesFor(area) })));
  return entries;
}
