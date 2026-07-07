import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const spinnerStory: Story<'io-spinner'> = {
  state: {
    properties: {
      size: 'md',
      color: 'primary',
      label: 'Loading',
      context: 'inline',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-spinner' as const,
      properties: {
        size: (properties?.size as string) ?? 'md',
        color: (properties?.color as string) ?? 'primary',
        label: (properties?.label as string) ?? 'Loading',
        context: (properties?.context as string) ?? 'inline',
      },
    },
  ],
};

export const spinnerStorySm: Story<'io-spinner'> = {
  state: { properties: { size: 'sm', color: 'primary', label: 'Loading', context: 'inline' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'sm', color: 'primary', label: 'Loading', context: 'inline' },
    },
  ],
};

export const spinnerStoryMd: Story<'io-spinner'> = {
  state: { properties: { size: 'md', color: 'primary', label: 'Loading', context: 'inline' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'md', color: 'primary', label: 'Loading', context: 'inline' },
    },
  ],
};

export const spinnerStoryLg: Story<'io-spinner'> = {
  state: { properties: { size: 'lg', color: 'primary', label: 'Loading', context: 'inline' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'lg', color: 'primary', label: 'Loading', context: 'inline' },
    },
  ],
};

export const spinnerStoryWhite: Story<'io-spinner'> = {
  state: { properties: { size: 'md', color: 'white', label: 'Loading', context: 'inline' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'md', color: 'white', label: 'Loading', context: 'inline' },
    },
  ],
};

export const spinnerStoryCurrent: Story<'io-spinner'> = {
  state: { properties: { size: 'md', color: 'current', label: 'Loading', context: 'inline' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'md', color: 'current', label: 'Loading', context: 'inline' },
    },
  ],
};

export const spinnerPropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl', 'inherit'],
    defaultValue: 'md',
  },
  {
    name: 'color',
    type: 'select',
    options: ['primary', 'white', 'current'],
    defaultValue: 'primary',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Loading',
  },
  {
    name: 'context',
    type: 'select',
    options: ['inline', 'blocking'],
    defaultValue: 'inline',
  },
];
