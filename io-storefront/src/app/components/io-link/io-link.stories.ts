import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const linkStory: Story<'io-link'> = {
  state: {
    properties: {
      variant: 'standalone',
      color: 'blue',
      href: '#',
      external: false,
      disabled: false,
      label: 'Learn more',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-link' as const,
      properties: {
        variant: (properties?.variant as string) ?? 'standalone',
        color: (properties?.color as string) ?? 'blue',
        href: (properties?.href as string) ?? '#',
        external: (properties?.external as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
      },
      children: [(properties?.label as string) ?? 'Learn more'],
    },
  ],
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

export const linkPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Learn more',
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
    name: 'external',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
];
