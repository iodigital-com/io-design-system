import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const badgeStory: Story<'io-badge'> = {
  state: {
    properties: {
      variant: 'blue',
      size: 'md',
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
  state: { properties: { variant: 'blue', size: 'md' } },
  generator: () =>
    (['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'] as const).map(
      (variant) => ({ tag: 'io-badge' as const, properties: { variant, size: 'md' }, children: [variant] }),
    ),
};

export const badgePropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md'],
    defaultValue: 'md',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'],
    defaultValue: 'blue',
  },
];
