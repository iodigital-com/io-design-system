import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const scrollerStory: Story<'io-scroller'> = {
  state: {
    properties: {
      orientation: 'horizontal',
      showScrollbar: false,
      label: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-scroller' as const,
      properties: {
        orientation: (properties?.orientation as string) ?? 'horizontal',
        showScrollbar: (properties?.showScrollbar as boolean) === true,
        ...(properties?.label ? { label: properties.label as string } : {}),
      },
    },
  ],
};

export const scrollerStoryDefault: Story<'io-scroller'> = {
  state: { properties: { orientation: 'horizontal', showScrollbar: false } },
  generator: () => [
    {
      tag: 'io-scroller' as const,
      properties: { orientation: 'horizontal', showScrollbar: false },
    },
  ],
};

export const scrollerStoryVertical: Story<'io-scroller'> = {
  state: { properties: { orientation: 'vertical', showScrollbar: false } },
  generator: () => [
    {
      tag: 'io-scroller' as const,
      properties: { orientation: 'vertical', showScrollbar: false },
    },
  ],
};

export const scrollerStoryShowScrollbar: Story<'io-scroller'> = {
  state: { properties: { orientation: 'horizontal', showScrollbar: true } },
  generator: () => [
    {
      tag: 'io-scroller' as const,
      properties: { orientation: 'horizontal', showScrollbar: true },
    },
  ],
};

export const scrollerPropDefinitions: PropDefinition[] = [
  {
    name: 'orientation',
    type: 'select',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
    description: 'Scroll axis. horizontal overflows left/right, vertical overflows top/bottom.',
  },
  {
    name: 'showScrollbar',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, the native scrollbar is visible. Defaults to hidden.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible aria-label for the scroll region. Defaults to a generic description.',
  },
];
