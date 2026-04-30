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
    description: 'Visual and ARIA orientation. "horizontal" renders an <hr>; "vertical" renders a div[role=separator]. Has no visual effect when label is set — label always produces a horizontal flex layout.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Optional text centered between two lines (e.g. "or", "and"). Overrides the visual layout to flex-row regardless of orientation. The orientation prop still sets aria-orientation on the labeled wrapper.',
  },
];
