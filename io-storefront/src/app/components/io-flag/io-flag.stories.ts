import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const flagStory: Story<'io-flag'> = {
  state: {
    properties: {
      name: 'nl',
      size: 'md',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-flag' as const,
      properties: properties ?? {},
    },
  ],
};

export const flagStoryEU: Story<'io-flag'> = {
  state: { properties: {} },
  generator: () =>
    (['nl', 'de', 'fr', 'es', 'it', 'be', 'at', 'pl', 'pt', 'se', 'dk', 'fi'] as const).map((name) => ({
      tag: 'io-flag' as const,
      properties: { name, size: 'md' as const },
    })),
};

export const flagStorySizes: Story<'io-flag'> = {
  state: { properties: {} },
  generator: () =>
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-flag' as const,
      properties: { name: 'gb' as const, size },
    })),
};

export const flagPropDefinitions: PropDefinition[] = [
  {
    name: 'name',
    type: 'select',
    options: [
      'at', 'be', 'bg', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gr', 'hr', 'hu',
      'ie', 'it', 'lt', 'lu', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'se', 'si', 'sk',
      'gb', 'us', 'tr', 'no', 'ch', 'au', 'ca', 'jp', 'cn', 'in', 'br', 'za', 'ae',
    ],
    defaultValue: 'nl',
    description: 'ISO 3166-1 alpha-2 country code (lowercase).',
  },
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl', 'inherit'],
    defaultValue: 'md',
    description: 'Visual size — aligned with io-icon size scale.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label for the flag image. Defaults to the country name derived from the ISO code. Pass an empty string to treat the flag as decorative.',
  },
];
