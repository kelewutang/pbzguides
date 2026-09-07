import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const httpUrl = z.string().url().refine((value) => /^https?:\/\//.test(value), 'Expected an HTTP(S) URL.');

const contentMetadata = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(['draft', 'published', 'withdrawn']).default('draft'),
  updatedAt: z.coerce.date(),
  seo: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
  }).optional(),
  evidenceStatus: z.enum(['confirmed', 'observed', 'unverified']).optional(),
  lastVerified: z.coerce.date().optional(),
  sources: z.array(z.object({ label: z.string().min(1), url: httpUrl })).optional(),
  alternateLanguage: z.object({ language: z.string().min(2), url: httpUrl }).optional(),
});

const collection = (base: string) => defineCollection({
  loader: glob({ pattern: '**/*.md', base }),
  schema: contentMetadata,
});

export const collections = {
  guides: collection('./src/content/guides'),
  weapons: collection('./src/content/weapons'),
  bosses: collection('./src/content/bosses'),
  combat: collection('./src/content/combat'),
  characters: collection('./src/content/characters'),
};
