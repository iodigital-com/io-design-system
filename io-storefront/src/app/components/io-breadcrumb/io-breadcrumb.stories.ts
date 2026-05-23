import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

const defaultItems = JSON.stringify([
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Digital Strategy' },
]);

const slashItems = JSON.stringify([
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team' },
]);

const collapsedItems = JSON.stringify([
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Digital', href: '/digital' },
  { label: 'Strategy', href: '/strategy' },
  { label: 'Consulting' },
]);

export const breadcrumbStoryDefault: Story<'io-breadcrumb'> = {
  state: {
    properties: {
      items: defaultItems,
      separator: 'chevron',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {
        items: defaultItems,
        separator: 'chevron',
        ...properties,
      },
    },
  ],
};

export const breadcrumbStorySlash: Story<'io-breadcrumb'> = {
  state: {
    properties: {
      items: slashItems,
      separator: 'slash',
    },
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {
        items: slashItems,
        separator: 'slash',
      },
    },
  ],
};

export const breadcrumbStoryCollapsed: Story<'io-breadcrumb'> = {
  state: {
    properties: {
      items: collapsedItems,
      separator: 'chevron',
      'max-visible': 3,
    },
  },
  generator: () => [
    {
      tag: 'io-breadcrumb' as const,
      properties: {
        items: collapsedItems,
        separator: 'chevron',
        'max-visible': 3,
      },
    },
  ],
};

export const breadcrumbPropDefinitions: PropDefinition[] = [
  {
    name: 'separator',
    type: 'select',
    options: ['chevron', 'slash'],
    defaultValue: 'chevron',
    description: 'Style of separator rendered between breadcrumb items.',
  },
];
