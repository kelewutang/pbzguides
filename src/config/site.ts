export const site = {
  name: 'PBZ Guides',
  url: 'https://pbzguides.com',
  language: 'en',
  defaultTitle: 'Phantom Blade Zero Guides',
  titleTemplate: '%s | PBZ Guides',
  description: 'Independent English-language guides and reference covering Phantom Blade Zero release information, systems, combat, characters, weapons, bosses, story, and world.',
  openGraph: { locale: 'en_US', type: 'website', image: undefined as string | undefined, imageAlt: undefined as string | undefined },
  social: { card: 'summary' as 'summary' | 'summary_large_image', account: undefined as string | undefined },
  // Only add reviewed, reciprocal, page-specific language mappings.
  alternates: {} as Record<string, { language: string; url: string }[]>,
};
