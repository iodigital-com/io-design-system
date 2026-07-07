import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { IoPaginationIntl } from '@iodigital-com/components';

// Default: page 1 of 5
export const paginationStory: Story<'io-pagination'> = {
  state: { properties: { page: 1, totalPages: 5, compact: false } },
  generator: ({ properties } = {}) => {
    let intl: IoPaginationIntl | undefined;
    try {
      if (properties?.intl && typeof properties.intl === 'string') {
        intl = JSON.parse(properties.intl as string);
      }
    } catch {
      intl = undefined;
    }

    return [
      {
        tag: 'io-pagination' as const,
        properties: {
          page: properties?.page ?? 1,
          totalPages: properties?.totalPages ?? 5,
          compact: (properties?.compact as boolean) ?? false,
          ...(intl ? { intl } : {}),
        },
      },
    ];
  },
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
  { name: 'totalItems', type: 'number', defaultValue: 0, description: 'Total items in the dataset (Pattern B). Provide with perPage to let the component derive totalPages.' },
  { name: 'perPage', type: 'number', defaultValue: 10, description: 'Items shown per page (Pattern B). Provide with totalItems to derive the page count.' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Reduces button height to ~32px for dense UI contexts like toolbars and sidebars.' },
  { name: 'showLastPage', type: 'boolean', defaultValue: false, description: 'When true, always renders the last page button at the trailing edge of the range.' },
  { name: 'perPageOptions', type: 'string', defaultValue: '', description: 'JSON array of numbers (e.g. [10, 25, 50]) that renders a per-page selector before the previous arrow button. Selecting an option emits `change` with the new perPage value. Absent (default) hides the selector.' },
  { name: 'showPageJump', type: 'boolean', defaultValue: false, description: 'When true, renders a "Go to page" input that emits `change` on Enter. Validates the entered value against totalPages and ignores out-of-range input.' },
  { name: 'showRange', type: 'boolean', defaultValue: false, description: 'When true, renders a "Showing X–Y of N" range indicator before the nav controls. Requires totalItems and perPage (Pattern B).' },
  { name: 'prevLabel', type: 'string', defaultValue: 'Previous page', description: 'aria-label for the previous button.' },
  { name: 'nextLabel', type: 'string', defaultValue: 'Next page', description: 'aria-label for the next button.' },
  { name: 'intl', type: 'string', defaultValue: '', description: 'JSON object (IoPaginationIntl) to localise nav/page/prev/next labels. Example: {"root":"Paginación","page":"Página","prev":"Anterior","next":"Siguiente"}' },
];
