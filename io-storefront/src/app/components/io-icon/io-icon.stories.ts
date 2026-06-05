import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const IO_ICON_NAMES = [
  // Navigation & UI
  'x',
  'check',
  'check-circle',
  'x-circle',
  'circle-check',
  'info',
  'alert-triangle',
  'alert-circle',
  'chevron-down',
  'chevron-up',
  'chevron-right',
  'chevron-left',
  'chevrons-up-down',
  'search',
  'arrow-right',
  'arrow-left',
  'arrow-down',
  'arrow-up',
  'plus',
  'minus',
  'eye',
  'eye-off',
  'trash-2',
  'edit',
  'download',
  'upload',
  'copy',
  'link',
  'external-link',
  'settings',
  'filter',
  'menu',
  'more-horizontal',
  'more-vertical',
  'user',
  'user-plus',
  'log-out',
  'home',
  'calendar',
  'clock',
  'bell',
  'mail',
  'phone',
  'map-pin',
  'star',
  'tag',
  'lock',
  'unlock',
  'refresh-cw',
  'check-square',
  'loader',
  // CRUD / Form actions
  'save',
  'save-all',
  'save-off',
  'pen-line',
  'pencil',
  'square-pen',
  'pen-off',
  'trash',
  'eraser',
  'copy-plus',
  'files',
  'square-check-big',
  // Text formatting
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'code',
  'code-2',
  'highlighter',
  'remove-formatting',
  // Headings
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  // Block structure
  'quote',
  'text-quote',
  'list',
  'list-ordered',
  'list-checks',
  'list-todo',
  'indent-increase',
  'indent-decrease',
  'separator-horizontal',
  // Insert
  'unlink',
  'image',
  'table',
  'paperclip',
  'square-code',
  // Table operations
  'table-cells-merge',
  'table-cells-split',
  'table-columns-split',
  'table-rows-split',
  'table-config',
  'table-properties',
  // History & alignment
  'undo-2',
  'redo-2',
  'align-left',
  'align-center',
  'align-right',
  'align-justify',
  'spell-check-2',
  'text-cursor',
] as const;

export type IoIconName = (typeof IO_ICON_NAMES)[number];

export const iconStory: Story<'io-icon'> = {
  state: {
    properties: {
      name: 'search',
      size: 'md',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-icon' as const,
      properties: properties ?? {},
    },
  ],
};

export const iconStoryAllIcons: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    IO_ICON_NAMES.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStorySizes: Story<'io-icon'> = {
  state: { properties: { name: 'search' } },
  generator: () =>
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-icon' as const,
      properties: { name: 'search', size, label: size },
    })),
};

export const iconStoryColour: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () => [
    {
      tag: 'io-icon' as const,
      properties: { name: 'check-circle', size: 'lg', label: 'Primary colour' },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'alert-triangle', size: 'lg', label: 'Warning colour' },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'info', size: 'lg', label: 'Info colour' },
    },
    {
      tag: 'io-icon' as const,
      properties: { name: 'x-circle', size: 'lg', label: 'Error colour' },
    },
  ],
};

const FORM_ICONS = [
  'save', 'save-all', 'save-off',
  'pen-line', 'pencil', 'square-pen', 'pen-off',
  'trash', 'eraser', 'copy-plus', 'files', 'square-check-big',
] as const;

const WYSIWYG_FORMAT_ICONS = [
  'bold', 'italic', 'underline', 'strikethrough',
  'code', 'code-2', 'highlighter', 'remove-formatting',
] as const;

const WYSIWYG_STRUCTURE_ICONS = [
  'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6',
  'quote', 'text-quote',
  'list', 'list-ordered', 'list-checks', 'list-todo',
  'indent-increase', 'indent-decrease', 'separator-horizontal',
] as const;

const WYSIWYG_INSERT_ICONS = [
  'link', 'unlink', 'image', 'table', 'paperclip', 'square-code',
] as const;

const WYSIWYG_TABLE_ICONS = [
  'table-cells-merge', 'table-cells-split',
  'table-columns-split', 'table-rows-split',
  'table-config', 'table-properties',
] as const;

const WYSIWYG_HISTORY_ICONS = [
  'undo-2', 'redo-2',
  'align-left', 'align-center', 'align-right', 'align-justify',
  'spell-check-2', 'text-cursor',
] as const;

export const iconStoryFormActions: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    FORM_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygFormat: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_FORMAT_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygStructure: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_STRUCTURE_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygInsert: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_INSERT_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygTables: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_TABLE_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconStoryWysiwygHistory: Story<'io-icon'> = {
  state: { properties: { size: 'md' } },
  generator: () =>
    WYSIWYG_HISTORY_ICONS.map((name) => ({
      tag: 'io-icon' as const,
      properties: { name, size: 'md', label: name },
    })),
};

export const iconPropDefinitions: PropDefinition[] = [
  {
    name: 'name',
    type: 'select',
    options: [...IO_ICON_NAMES],
    defaultValue: 'search',
    description: 'The icon to render. Must be one of the 105 registered icon names.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    description: 'Rendered size of the icon. Maps to design-token pixel values.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label. When set, the icon renders with role="img" and aria-label. Omit for decorative icons.',
  },
];
