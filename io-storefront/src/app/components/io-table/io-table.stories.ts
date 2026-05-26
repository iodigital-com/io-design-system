import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const HEAD_LABELS = ['Name', 'Role', 'Status'];
const HEAD_KEYS = ['name', 'role', 'status'] as const;

const DEMO_ROWS = [
  ['Alice Müller', 'Admin', 'Active'],
  ['Bob Janssen', 'Editor', 'Active'],
  ['Charlie Bakker', 'Viewer', 'Inactive'],
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildHead(
  labels: string[],
  keys: string[] = [],
  sortable = false,
  selectable = false,
): ElementConfig<HTMLTagOrComponent> {
  const cells: ElementConfig<HTMLTagOrComponent>[] = labels.map((label, i) => ({
    tag: 'io-table-head-cell' as const,
    properties: sortable && keys[i] ? { sortable: true, sortKey: keys[i] } : {},
    children: [label],
  }));

  return {
    tag: 'io-table-head' as const,
    children: [
      {
        tag: 'io-table-head-row' as const,
        properties: selectable ? { selectable: true } : {},
        children: cells,
      },
    ],
  };
}

function buildBody(
  rows: string[][],
  selectable = false,
): ElementConfig<HTMLTagOrComponent> {
  const bodyRows: ElementConfig<HTMLTagOrComponent>[] = rows.map((cells) => ({
    tag: 'io-table-body-row' as const,
    properties: selectable ? { selectable: true } : {},
    children: cells.map((value) => ({
      tag: 'io-table-body-cell' as const,
      children: [value],
    })),
  }));

  return {
    tag: 'io-table-body' as const,
    children: bodyRows,
  };
}

// ---------------------------------------------------------------------------
// Configurator story
// ---------------------------------------------------------------------------

export const tableStory: Story<'io-table'> = {
  state: {
    properties: {
      caption: 'Team members',
      captionHidden: false,
      sticky: false,
      size: 'md',
      striped: false,
      bordered: false,
      compact: false,
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-table' as const,
        properties: {
          caption: attrs.caption ?? 'Team members',
          captionHidden: attrs.captionHidden ?? false,
          sticky: attrs.sticky ?? false,
          size: attrs.size ?? 'md',
          striped: attrs.striped ?? false,
          bordered: attrs.bordered ?? false,
          compact: attrs.compact ?? false,
        },
        children: [
          buildHead(HEAD_LABELS, [...HEAD_KEYS]),
          buildBody(DEMO_ROWS),
        ],
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
  {
    name: 'striped',
    type: 'boolean',
    defaultValue: false,
    description: 'Adds alternating row background colours for improved row scanning.',
  },
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: false,
    description: 'Adds visible borders between all cells and rows.',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Reduces row padding to display more rows in the same vertical space.',
  },
];

// ---------------------------------------------------------------------------
// Named stories
// ---------------------------------------------------------------------------

export const tableStoryBasic: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: { caption: 'Team members' },
      children: [
        buildHead(HEAD_LABELS),
        buildBody(DEMO_ROWS),
      ],
    },
  ],
};

export const tableStorySortable: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: { caption: 'Sortable team members' },
      children: [
        buildHead(HEAD_LABELS, [...HEAD_KEYS], true),
        buildBody(DEMO_ROWS),
      ],
    },
  ],
};

export const tableStorySelectable: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: { caption: 'Selectable team members' },
      children: [
        buildHead(HEAD_LABELS, [], false, true),
        buildBody(DEMO_ROWS, true),
      ],
    },
  ],
};

export const tableStoryFull: Story<'io-table'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-table' as const,
      properties: { caption: 'Full featured table' },
      children: [
        buildHead(HEAD_LABELS, [...HEAD_KEYS], true, true),
        buildBody(DEMO_ROWS, true),
      ],
    },
  ],
};

export const tableStorySizes: Story<'io-table'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg'] as const).map((size) => ({
      tag: 'io-table' as const,
      properties: { caption: `Size: ${size}`, size },
      children: [
        buildHead(['Name', 'Role']),
        buildBody([['Alice', 'Admin']]),
      ],
    })),
};
