import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const gridStory: Story<'io-grid'> = {
  state: {
    properties: {
      gap: 'md',
      columns: 12,
      align: 'start',
      justify: 'stretch',
    },
  },
  generator: ({ properties } = {}) => {
    const { gap = 'md', columns = 12, align = 'start', justify = 'stretch' } = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-grid' as const,
        properties: { gap, columns, align, justify },
        children: [
          { tag: 'io-grid-item' as const, properties: { colSpan: 6 }, children: ['Left column'] },
          { tag: 'io-grid-item' as const, properties: { colSpan: 6 }, children: ['Right column'] },
        ],
      },
    ];
  },
};

export const gridPropDefinitions: PropDefinition[] = [
  { name: 'gap', type: 'select', options: ['none', 'sm', 'md', 'lg'], defaultValue: 'md' },
  { name: 'columns', type: 'number', defaultValue: 12 },
  { name: 'align', type: 'select', options: ['start', 'center', 'end', 'stretch'], defaultValue: 'start' },
  { name: 'justify', type: 'select', options: ['start', 'center', 'end', 'stretch'], defaultValue: 'stretch' },
];

export const gridStoryHalves: Story<'io-grid'> = {
  state: { properties: { gap: 'md', columns: 12 } },
  generator: () => [
    {
      tag: 'io-grid' as const,
      properties: { gap: 'md' },
      children: [
        { tag: 'io-grid-item' as const, properties: { colSpan: 6 }, children: ['Half 1'] },
        { tag: 'io-grid-item' as const, properties: { colSpan: 6 }, children: ['Half 2'] },
      ],
    },
  ],
};

export const gridStoryThirds: Story<'io-grid'> = {
  state: { properties: { gap: 'md', columns: 12 } },
  generator: () => [
    {
      tag: 'io-grid' as const,
      properties: { gap: 'md' },
      children: [
        { tag: 'io-grid-item' as const, properties: { colSpan: 4 }, children: ['Third 1'] },
        { tag: 'io-grid-item' as const, properties: { colSpan: 4 }, children: ['Third 2'] },
        { tag: 'io-grid-item' as const, properties: { colSpan: 4 }, children: ['Third 3'] },
      ],
    },
  ],
};

export const gridStorySidebar: Story<'io-grid'> = {
  state: { properties: { gap: 'lg', columns: 12 } },
  generator: () => [
    {
      tag: 'io-grid' as const,
      properties: { gap: 'lg' },
      children: [
        { tag: 'io-grid-item' as const, properties: { colSpan: 3 }, children: ['Sidebar'] },
        { tag: 'io-grid-item' as const, properties: { colSpan: 9 }, children: ['Main content'] },
      ],
    },
  ],
};
