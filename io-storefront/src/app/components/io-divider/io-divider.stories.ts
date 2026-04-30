import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const dividerStory: Story<'io-divider'> = {
  state: {
    properties: {
      orientation: 'horizontal',
      label: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-divider' as const,
      properties: {
        orientation: (properties?.orientation as string) ?? 'horizontal',
        ...(properties?.label ? { label: properties.label as string } : {}),
      },
    },
  ],
};

export const dividerStoryHorizontal: Story<'io-divider'> = {
  state: { properties: {} },
  generator: () => [{ tag: 'io-divider' as const, properties: {} }],
};

export const dividerStoryVertical: Story<'io-divider'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-divider' as const,
      properties: { orientation: 'vertical' },
    },
  ],
};

export const dividerStoryLabeled: Story<'io-divider'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-divider' as const,
      properties: { label: 'or' },
    },
  ],
};

export const dividerPropDefinitions: PropDefinition[] = [
  {
    name: 'orientation',
    type: 'string',
    defaultValue: 'horizontal',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
  },
];
