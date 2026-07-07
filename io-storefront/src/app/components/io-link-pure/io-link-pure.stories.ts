import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import { IO_ICON_NAMES } from '@/app/components/io-icon/icon-names';

export const linkPureStory: Story<'io-link-pure'> = {
  state: {
    properties: {
      href: '#',
      icon: 'arrow-right',
      size: 'md',
      alignLabel: 'start',
      active: false,
      stretch: false,
      disabled: false,
      hideLabel: false,
      label: 'Read the docs',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Read the docs', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    const iconValue = attrs['icon'] === 'none' ? null : (attrs['icon'] as string | undefined);
    return [
      {
        tag: 'io-link-pure' as const,
        properties: {
          href: (attrs['href'] as string) ?? '#',
          size: (attrs['size'] as string) ?? 'md',
          alignLabel: (attrs['alignLabel'] as string) ?? 'start',
          active: (attrs['active'] as boolean) ?? false,
          stretch: (attrs['stretch'] as boolean) ?? false,
          disabled: (attrs['disabled'] as boolean) ?? false,
          hideLabel: (attrs['hideLabel'] as boolean) ?? false,
          icon: iconValue,
        },
        children: [label as string],
      },
    ];
  },
};

export const linkPureStoryDefault: Story<'io-link-pure'> = {
  state: { properties: { href: '#', icon: 'arrow-right' } },
  generator: () => [
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right' },
      children: ['Read the docs'],
    },
  ],
};

export const linkPureStoryIconEnd: Story<'io-link-pure'> = {
  state: { properties: { href: '#', icon: 'arrow-right', alignLabel: 'end' } },
  generator: () => [
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right', alignLabel: 'end' },
      children: ['Read the docs'],
    },
  ],
};

export const linkPureStoryActive: Story<'io-link-pure'> = {
  state: { properties: { href: '#', icon: 'layout-dashboard', active: true } },
  generator: () => [
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'layout-dashboard', active: true },
      children: ['Dashboard'],
    },
  ],
};

export const linkPureStorySizes: Story<'io-link-pure'> = {
  state: { properties: { href: '#', icon: 'arrow-right' } },
  generator: () => [
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right', size: 'xs' },
      children: ['Extra small'],
    },
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right', size: 'sm' },
      children: ['Small'],
    },
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right', size: 'md' },
      children: ['Medium'],
    },
  ],
};

export const linkPureStoryDisabled: Story<'io-link-pure'> = {
  state: { properties: { href: '#', icon: 'arrow-right', disabled: true } },
  generator: () => [
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right', disabled: true },
      children: ['Disabled link'],
    },
  ],
};

export const linkPureStoryIconOnly: Story<'io-link-pure'> = {
  state: { properties: { href: '#', icon: 'arrow-right', hideLabel: true } },
  generator: () => [
    {
      tag: 'io-link-pure' as const,
      properties: { href: '#', icon: 'arrow-right', hideLabel: true },
      children: ['Go to next page'],
    },
  ],
};

export const linkPurePropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Read the docs',
  },
  {
    name: 'href',
    type: 'string',
    defaultValue: '#',
  },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...IO_ICON_NAMES],
    defaultValue: 'arrow-right',
    description: 'Lucide icon rendered alongside the label. none hides the icon.',
  },
  {
    name: 'alignLabel',
    type: 'select',
    options: ['start', 'end'],
    defaultValue: 'start',
    description: 'Icon position relative to the label.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'md'],
    defaultValue: 'md',
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks this link as the current navigation item. Applies active visual treatment and sets aria-current="page".',
  },
  {
    name: 'stretch',
    type: 'boolean',
    defaultValue: false,
    description: 'Makes the link fill its container width, pushing label and icon to opposite ends.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually hides the label while keeping it accessible. Use for icon-only links.',
  },
  {
    name: 'external',
    type: 'boolean',
    defaultValue: false,
    description: 'Automatically sets target="_blank" and rel="noopener noreferrer".',
  },
  {
    name: 'target',
    type: 'string',
    defaultValue: '_self',
    description: 'Link target. Overridden to "_blank" when external is true.',
  },
  {
    name: 'rel',
    type: 'string',
    description: 'Rel attribute. Overridden to "noopener noreferrer" when external is true.',
  },
  {
    name: 'download',
    type: 'string',
    description: 'Downloadable file name. Enables download behavior on click.',
  },
  {
    name: 'iconSource',
    type: 'string',
    description: 'Custom SVG source string for a non-library icon. Takes precedence over icon.',
  },
];
