import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const badgeStory: Story<'io-badge'> = {
  state: {
    properties: {
      variant: 'blue',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-badge' as const,
      properties: properties ?? {},
      children: ['Badge'],
    },
  ],
};

export const badgeStoryVariants: Story<'io-badge'> = {
  state: { properties: { variant: 'blue' } },
  generator: () =>
    (['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'] as const).map(
      (variant) => ({ tag: 'io-badge' as const, properties: { variant }, children: [variant] }),
    ),
};

export const badgePropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'],
    defaultValue: 'blue',
  },
];
