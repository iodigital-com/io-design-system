import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const wordmarkStory: Story<'io-wordmark'> = {
  state: {
    properties: {
      size: 'md',
      mono: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-wordmark' as const,
      properties: properties ?? {},
      children: [],
    },
  ],
};

export const wordmarkStorySizes: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-wordmark' as const,
      properties: { size },
      children: [],
    })),
};

export const wordmarkStoryMono: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-wordmark' as const,
      properties: { size: 'lg', mono: false },
      children: [],
    },
    {
      tag: 'io-wordmark' as const,
      properties: { size: 'lg', mono: true },
      children: [],
    },
  ],
};

export const wordmarkPropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    description: 'Controls the overall font-size of the wordmark.',
  },
  {
    name: 'mono',
    type: 'boolean',
    defaultValue: false,
    description: 'Monochrome mode — both "io" and "digital" use the current text colour.',
  },
];
