import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(1), description: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    status: z.enum(['draft', 'published']).default('draft'),
    updatedAt: z.coerce.date(),
    sources: z.array(z.object({ label: z.string().min(1), url: z.string().url().refine(value => /^https?:\/\//.test(value)) })).min(1),
  }),
});
export const collections = { guides };
