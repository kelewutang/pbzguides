export const contentAreas = {
  guides: {
    label: 'Guides',
    title: 'Phantom Blade Zero guides',
    description: 'English-language guides and practical reference for Phantom Blade Zero.',
    homepageDescription: 'Release information, pre-orders, platforms, PC requirements, and official story and world coverage.',
    emptyTitle: 'No guides published yet',
    emptyDescription: 'The first sourced articles are being prepared. There are no walkthroughs or gameplay recommendations to browse yet.',
  },
  weapons: {
    label: 'Weapons',
    title: 'Phantom Blade Zero weapons',
    description: 'Source-aware English reference for Phantom Blade Zero weapons.',
    homepageDescription: 'The confirmed weapon system, Phantom Edges, upgrades, and reforging.',
    emptyTitle: 'No weapon entries published yet',
    emptyDescription: 'Verified weapon reference entries will appear here when their terminology and evidence have been reviewed.',
  },
  bosses: {
    label: 'Bosses',
    title: 'Phantom Blade Zero bosses',
    description: 'Source-aware English reference for Phantom Blade Zero boss encounters.',
    homepageDescription: 'Officially revealed encounters, beginning with Seven Stars; not a complete roster.',
    emptyTitle: 'No boss entries published yet',
    emptyDescription: 'Verified encounter reference entries will appear here when there is enough evidence to publish them responsibly.',
  },
  combat: {
    label: 'Combat',
    title: 'Phantom Blade Zero combat',
    description: 'English-language combat systems and mechanics reference for Phantom Blade Zero.',
    homepageDescription: 'Combat-system and difficulty-mode reference from currently published official details.',
    emptyTitle: 'No combat topics published yet',
    emptyDescription: 'Combat topics will be added as their mechanics and terminology can be supported by reliable evidence.',
  },
  characters: {
    label: 'Characters',
    title: 'Phantom Blade Zero characters',
    description: 'Source-aware English reference for Phantom Blade Zero characters.',
    homepageDescription: 'Confirmed profiles for Soul, Mó Yuan, The Hunt, and future verified characters.',
    emptyTitle: 'No character entries published yet',
    emptyDescription: 'Verified character reference entries will appear here as names, context and source support are reviewed.',
  },
} as const;

export type ContentArea = keyof typeof contentAreas;
export const contentAreaKeys = Object.keys(contentAreas) as ContentArea[];
