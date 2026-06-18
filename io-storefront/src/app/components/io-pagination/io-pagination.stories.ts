import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

// Default: page 1 of 5
export const paginationStory: Story<'io-pagination'> = {
  state: { properties: { page: 1, totalPages: 5, compact: false } },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-pagination' as const,
      properties: {
        page: properties?.page ?? 1,
        totalPages: properties?.totalPages ?? 5,
        compact: (properties?.compact as boolean) ?? false,
      },
    },
  ],
};

// Demonstrates ellipsis: active page in the middle of a large set
export const paginationStoryMidRange: Story<'io-pagination'> = {
  state: { properties: { page: 5, totalPages: 12 } },
  generator: () => [
    { tag: 'io-pagination' as const, properties: { page: 5, totalPages: 12 } },
  ],
};

// All 7 pages visible - no ellipsis needed (total <= 7)
export const paginationStoryFull: Story<'io-pagination'> = {
  state: { properties: { page: 3, totalPages: 7 } },
  generator: () => [
    { tag: 'io-pagination' as const, properties: { page: 3, totalPages: 7 } },
  ],
};

export const paginationPropDefinitions: PropDefinition[] = [
  { name: 'page', type: 'number', defaultValue: 1 },
  { name: 'totalPages', type: 'number', defaultValue: 5 },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Reduces button height to ~32px for dense UI contexts like toolbars and sidebars.' },
  { name: 'intl', type: 'string', description: 'JSON object (IoPaginationIntl) to localise nav/page/prev/next labels. Example: {"root":"Paginación","page":"Página","prev":"Anterior","next":"Siguiente"}' },
];
