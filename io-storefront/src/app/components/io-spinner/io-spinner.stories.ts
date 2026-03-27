import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const spinnerStory: Story<'io-spinner'> = {
  state: {
    properties: {
      size: 'md',
      color: 'primary',
      label: 'Loading',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-spinner' as const,
      properties: {
        size: (properties?.size as string) ?? 'md',
        color: (properties?.color as string) ?? 'primary',
        label: (properties?.label as string) ?? 'Loading',
      },
    },
  ],
};

export const spinnerStorySm: Story<'io-spinner'> = {
  state: { properties: { size: 'sm', color: 'primary', label: 'Loading' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'sm', color: 'primary', label: 'Loading' },
    },
  ],
};

export const spinnerStoryMd: Story<'io-spinner'> = {
  state: { properties: { size: 'md', color: 'primary', label: 'Loading' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'md', color: 'primary', label: 'Loading' },
    },
  ],
};

export const spinnerStoryLg: Story<'io-spinner'> = {
  state: { properties: { size: 'lg', color: 'primary', label: 'Loading' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'lg', color: 'primary', label: 'Loading' },
    },
  ],
};

export const spinnerStoryWhite: Story<'io-spinner'> = {
  state: { properties: { size: 'md', color: 'white', label: 'Loading' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'md', color: 'white', label: 'Loading' },
    },
  ],
};

export const spinnerStoryCurrent: Story<'io-spinner'> = {
  state: { properties: { size: 'md', color: 'current', label: 'Loading' } },
  generator: () => [
    {
      tag: 'io-spinner' as const,
      properties: { size: 'md', color: 'current', label: 'Loading' },
    },
  ],
};

export const spinnerPropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
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
];
