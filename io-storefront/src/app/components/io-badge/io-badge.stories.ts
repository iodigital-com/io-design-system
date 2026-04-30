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

export const badgeStorySizes: Story<'io-badge'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-badge' as const, properties: { variant: 'blue', size: 'sm' }, children: ['Small'] },
    { tag: 'io-badge' as const, properties: { variant: 'blue', size: 'md' }, children: ['Medium'] },
  ],
};

export const badgePropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md'],
    defaultValue: 'md',
    description: 'Adjusts badge density for compact or standard layouts.',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'],
    defaultValue: 'blue',
    description: 'Sets visual style and semantic meaning of the badge.',
  },
];
