import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

const DEMO_COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
];

const DEMO_ROWS = [
  { name: 'Alice Müller', role: 'Admin', status: 'Active' },
  { name: 'Bob Janssen', role: 'Editor', status: 'Active' },
  { name: 'Charlie Bakker', role: 'Viewer', status: 'Inactive' },
];

/**
 * Main configurator story for io-table.
 */
export const tableStory: Story<'io-table'> = {
  state: {
    properties: {
      caption: 'Team members',
      captionHidden: false,
      sortable: false,
      selectable: false,
      sticky: false,
      size: 'md',
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-table' as const,
        properties: {
          ...attrs,
          columns: DEMO_COLUMNS,
          rows: DEMO_ROWS,
        },
        children: [],
      },
    ];
  },
};

export const tablePropDefinitions: PropDefinition[] = [
  {
    name: 'caption',
    type: 'string',
    defaultValue: 'Team members',
  },
  {
    name: 'captionHidden',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'sortable',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'selectable',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'sticky',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
];

/** Basic table story */
export const tableStoryBasic: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: {
        caption: 'Team members',
        columns: DEMO_COLUMNS,
        rows: DEMO_ROWS,
      },
      children: [],
    },
  ],
};

/** Sortable table story */
export const tableStorySortable: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: {
        caption: 'Sortable team members',
        sortable: true,
        columns: DEMO_COLUMNS,
        rows: DEMO_ROWS,
      },
      children: [],
    },
  ],
};

/** Selectable table story */
export const tableStorySelectable: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: {
        caption: 'Selectable team members',
        selectable: true,
        columns: DEMO_COLUMNS,
        rows: DEMO_ROWS,
      },
      children: [],
    },
  ],
};

/** Full featured table story */
export const tableStoryFull: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: {
        caption: 'Full featured table',
        sortable: true,
        selectable: true,
        columns: DEMO_COLUMNS,
        rows: DEMO_ROWS,
      },
      children: [],
    },
  ],
};

/** Size variants */
export const tableStorySizes: Story<'io-table'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg'] as const).map((size) => ({
      tag: 'io-table' as const,
      properties: {
        caption: `Size: ${size}`,
        size,
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
        ],
        rows: [{ name: 'Alice', role: 'Admin' }],
      },
      children: [],
    })),
};
