import type { ContentArea } from './content-areas';

export const featuredContent = [
  { area: 'guides', slug: 'phantom-blade-zero-release-date' },
  { area: 'guides', slug: 'phantom-blade-zero-platforms' },
  { area: 'guides', slug: 'phantom-blade-zero-story' },
  { area: 'combat', slug: 'combat-system' },
  { area: 'weapons', slug: 'phantom-edges' },
  { area: 'characters', slug: 'soul' },
] as const satisfies ReadonlyArray<{ area: ContentArea; slug: string }>;
