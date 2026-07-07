import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import { IO_ICON_NAMES } from '@/app/components/io-icon/icon-names';

export const linkStory: Story<'io-link'> = {
  state: {
    properties: {
      variant: 'standalone',
      color: 'blue',
      href: '#',
      target: '_self',
      rel: '',
      external: false,
      download: '',
      disabled: false,
      icon: 'none',
      iconSource: undefined,
      hideLabel: false,
      label: 'Learn more',
      ariaCurrent: null,
      active: false,
      underline: '',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Learn more', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    if (attrs['icon'] === 'none') attrs['icon'] = null;
    const content = (label as string);
    return [
      {
        tag: 'io-link' as const,
        properties: {
          variant: (attrs['variant'] as string) ?? 'standalone',
          color: (attrs['color'] as string) ?? 'blue',
          href: (attrs['href'] as string) ?? '#',
          external: (attrs['external'] as boolean) ?? false,
          disabled: (attrs['disabled'] as boolean) ?? false,
          ...(attrs['icon'] != null ? { icon: attrs['icon'] } : {}),
          ...(attrs['iconSource'] ? { iconSource: attrs['iconSource'] } : {}),
          ...(attrs['hideLabel'] ? { hideLabel: true } : {}),
          ...(attrs['ariaCurrent'] != null ? { ariaCurrent: attrs['ariaCurrent'] } : {}),
          ...(attrs['target'] ? { target: attrs['target'] } : {}),
          ...(attrs['rel'] ? { rel: attrs['rel'] } : {}),
          ...(attrs['download'] ? { download: attrs['download'] } : {}),
          ...(attrs['active'] ? { active: true } : {}),
          ...(attrs['underline'] ? { underline: attrs['underline'] } : {}),
        },
        children: [content],
      },
    ];
  },
};

export const linkStoryStandalone: Story<'io-link'> = {
  state: { properties: { variant: 'standalone', color: 'blue', href: '#' } },
  generator: () => [
    {
      tag: 'io-link' as const,
      properties: { variant: 'standalone', color: 'blue', href: '#' },
      children: ['Learn more'],
    },
  ],
};

export const linkStoryInline: Story<'io-link'> = {
  state: { properties: { variant: 'inline', color: 'blue', href: '#' } },
  generator: () => [
    {
      tag: 'io-link' as const,
      properties: { variant: 'inline', color: 'blue', href: '#' },
      children: ['read our documentation'],
    },
  ],
};

export const linkStoryColors: Story<'io-link'> = {
  state: { properties: { variant: 'standalone', href: '#' } },
  generator: () => [
    {
      tag: 'io-link' as const,
      properties: { variant: 'standalone', color: 'blue', href: '#' },
      children: ['Blue link'],
    },
    {
      tag: 'io-link' as const,
      properties: { variant: 'standalone', color: 'black', href: '#' },
      children: ['Black link'],
    },
  ],
};

export const linkStoryDisabled: Story<'io-link'> = {
  state: { properties: { variant: 'standalone', color: 'blue', href: '#', disabled: true } },
  generator: () => [
    {
      tag: 'io-link' as const,
      properties: { variant: 'standalone', color: 'blue', href: '#', disabled: true },
      children: ['Disabled link'],
    },
  ],
};

export const iconLinkStory: Story<'io-link'> = {
  state: { properties: { variant: 'standalone', color: 'blue', href: '#', icon: 'arrow-right', hideLabel: false } },
  generator: () => [
    {
      tag: 'io-link' as const,
      properties: { variant: 'standalone', color: 'blue', href: '#', icon: 'arrow-right' },
      children: ['Read the docs'],
    },
    {
      tag: 'io-link' as const,
      properties: { variant: 'standalone', color: 'blue', href: '#', icon: 'arrow-right', hideLabel: true },
      children: ['Read the docs'],
    },
  ],
};

export const linkPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Learn more',
  },
  {
    name: 'href',
    type: 'string',
    defaultValue: '#',
    description: 'The URL the link navigates to. Required — a link without an href is not keyboard-focusable.',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['standalone', 'inline'],
    defaultValue: 'standalone',
  },
  {
    name: 'color',
    type: 'select',
    options: ['blue', 'black', 'white'],
    defaultValue: 'blue',
  },
  {
    name: 'target',
    type: 'select',
    options: ['_self', '_blank'],
    defaultValue: '_self',
    description: 'HTML target attribute. Overridden to "_blank" automatically when external=true.',
  },
  {
    name: 'rel',
    type: 'string',
    defaultValue: '',
    description: 'HTML rel attribute. When external is true, "noopener noreferrer" is applied automatically unless overridden.',
  },
  {
    name: 'external',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'download',
    type: 'string',
    defaultValue: '',
    description: 'Downloadable file name. When set, the link triggers a file download on click.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the link as the active/current navigation item. Applies the .link--active visual treatment and defaults aria-current to "page".',
  },
  {
    name: 'underline',
    type: 'select',
    options: ['always', 'hover', 'none'],
    defaultValue: '',
    description: 'Explicit underline override, decoupled from variant. When unset (default), the variant controls underline behaviour.',
  },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...IO_ICON_NAMES],
    defaultValue: 'none',
    description: 'Lucide icon shown before the link text. none hides the icon.',
  },
  {
    name: 'iconSource',
    type: 'string',
    defaultValue: '',
    description: 'Raw SVG markup for a custom icon. Takes precedence over the icon prop.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually hides the link text while keeping it accessible to screen readers. Use with icon for icon-only links.',
  },
  {
    name: 'ariaCurrent',
    type: 'select',
    options: ['page', 'step', 'location', 'date', 'time', 'true', 'false'],
    defaultValue: '',
    description: 'Maps to aria-current on the anchor. Use "page" for active navigation links.',
  },
];
