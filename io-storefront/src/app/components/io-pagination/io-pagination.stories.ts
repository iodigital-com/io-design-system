import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

// Default: page 1 of 5
export const paginationStory: Story<'io-pagination'> = {
  state: { properties: { page: 1, 'total-pages': 5 } },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-pagination' as const,
      properties: {
        page: properties?.page ?? 1,
        'total-pages': properties?.['total-pages'] ?? 5,
      },
    },
  ],
};

// Demonstrates ellipsis: active page in the middle of a large set
export const paginationStoryMidRange: Story<'io-pagination'> = {
  state: { properties: { page: 5, 'total-pages': 12 } },
  generator: () => [
    { tag: 'io-pagination' as const, properties: { page: 5, 'total-pages': 12 } },
  ],
};

// All 7 pages visible - no ellipsis needed (total <= 7)
export const paginationStoryFull: Story<'io-pagination'> = {
  state: { properties: { page: 3, 'total-pages': 7 } },
  generator: () => [
    { tag: 'io-pagination' as const, properties: { page: 3, 'total-pages': 7 } },
  ],
};

export const paginationPropDefinitions: PropDefinition[] = [
  { name: 'page', type: 'number', defaultValue: 1 },
  { name: 'total-pages', type: 'number', defaultValue: 5 },
];
