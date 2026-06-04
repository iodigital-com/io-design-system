import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const IO_ICON_NAMES = [
  'x',
  'check',
  'check-circle',
  'x-circle',
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
  'plus',
  'minus',
  'eye',
  'eye-off',
  'trash-2',
  'edit',
  'download',
  'upload',
  'settings',
  'user',
  'home',
  'calendar',
  'filter',
  'external-link',
  'copy',
  'loader',
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

export const iconPropDefinitions: PropDefinition[] = [
  {
    name: 'name',
    type: 'select',
    options: [...IO_ICON_NAMES],
    defaultValue: 'search',
    description: 'The icon to render. Must be one of the 32 registered icon names.',
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
