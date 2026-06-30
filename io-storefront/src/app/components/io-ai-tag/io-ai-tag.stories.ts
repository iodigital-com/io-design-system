import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const aiTagStory: Story<'io-ai-tag'> = {
  state: {
    properties: {
      variant: 'generated',
      locale: 'en',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-ai-tag' as const,
      properties: properties ?? {},
    },
  ],
};

export const aiTagStoryVariants: Story<'io-ai-tag'> = {
  state: { properties: {} },
  generator: () =>
    (['abbreviation', 'generated', 'modified'] as const).map((variant) => ({
      tag: 'io-ai-tag' as const,
      properties: { variant, locale: 'en' as const },
    })),
};

export const aiTagStoryLocales: Story<'io-ai-tag'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-ai-tag' as const, properties: { variant: 'generated' as const, locale: 'en' as const } },
    { tag: 'io-ai-tag' as const, properties: { variant: 'generated' as const, locale: 'nl' as const } },
    { tag: 'io-ai-tag' as const, properties: { variant: 'modified' as const, locale: 'en' as const } },
    { tag: 'io-ai-tag' as const, properties: { variant: 'modified' as const, locale: 'nl' as const } },
  ],
};

export const aiTagPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['abbreviation', 'generated', 'modified'],
    defaultValue: 'generated',
    description: 'Controls which form of the AI disclosure is shown.',
  },
  {
    name: 'locale',
    type: 'select',
    options: ['en', 'nl'],
    defaultValue: 'en',
    description: 'BCP 47 locale code for the disclosure label language.',
  },
];
