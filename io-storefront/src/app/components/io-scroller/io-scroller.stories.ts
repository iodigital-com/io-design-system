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
  generator: ({ properties } = {}) => {
    const orientation = (properties?.orientation as string) ?? 'horizontal';
    const isVertical = orientation === 'vertical';
    const chipLabels = ['Technology', 'Design', 'Engineering', 'Product', 'Strategy', 'Marketing', 'Research', 'Data'];
    const linkLabels = ['Home', 'About', 'Products', 'Pricing', 'Blog', 'Careers', 'Contact', 'Help', 'Status'];

    return [
      {
        tag: 'io-scroller' as const,
        properties: {
          orientation,
          'show-scrollbar': (properties?.showScrollbar as boolean) === true,
          ...(isVertical ? { style: 'height: 160px; display: block;' } : {}),
          ...(properties?.label ? { label: properties.label as string } : {}),
        },
        children: isVertical
          ? linkLabels.map(label => ({
              tag: 'io-link' as const,
              properties: { href: '#', style: 'display: block; margin-bottom: var(--io-space-2)' },
              children: [label],
            }))
          : [
              {
                tag: 'div' as const,
                properties: { style: 'display: flex; gap: var(--io-space-2); padding: 2px;' },
                children: chipLabels.map(label => ({
                  tag: 'io-tag' as const,
                  properties: { style: 'flex-shrink: 0' },
                  children: [label],
                })),
              },
            ],
      },
    ];
  },
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
