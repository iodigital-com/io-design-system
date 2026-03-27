import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const tagStory: Story<'io-tag'> = {
  state: {
    properties: {
      selected: false,
      removable: false,
      disabled: false,
      size: 'md',
      color: 'default',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-tag' as const,
      properties: {
        selected: (properties?.selected as boolean) ?? false,
        removable: (properties?.removable as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
        size: (properties?.size as string) ?? 'md',
        color: (properties?.color as string) ?? 'default',
      },
      children: ['Design system'],
    },
  ],
};

export const tagStoryDefault: Story<'io-tag'> = {
  state: { properties: { color: 'default', size: 'md' } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { color: 'default', size: 'md' }, children: ['React'] },
    { tag: 'io-tag' as const, properties: { color: 'default', size: 'md' }, children: ['TypeScript'] },
    { tag: 'io-tag' as const, properties: { color: 'default', size: 'md' }, children: ['Accessibility'] },
  ],
};

export const tagStorySelected: Story<'io-tag'> = {
  state: { properties: { selected: true, color: 'default', size: 'md' } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { selected: true, color: 'default', size: 'md' }, children: ['React'] },
    { tag: 'io-tag' as const, properties: { selected: true, color: 'blue', size: 'md' }, children: ['TypeScript'] },
    { tag: 'io-tag' as const, properties: { selected: true, color: 'beige', size: 'md' }, children: ['Accessibility'] },
  ],
};

export const tagStoryColors: Story<'io-tag'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-tag' as const, properties: { color: 'default', size: 'md' }, children: ['Default'] },
    { tag: 'io-tag' as const, properties: { color: 'blue', size: 'md' }, children: ['Blue'] },
    { tag: 'io-tag' as const, properties: { color: 'beige', size: 'md' }, children: ['Beige'] },
  ],
};

export const tagStoryRemovable: Story<'io-tag'> = {
  state: { properties: { removable: true } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { removable: true, color: 'default', size: 'md' }, children: ['Remove me'] },
    { tag: 'io-tag' as const, properties: { removable: true, color: 'blue', size: 'md' }, children: ['Tag two'] },
  ],
};

export const tagStoryDisabled: Story<'io-tag'> = {
  state: { properties: { disabled: true } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { disabled: true, color: 'default', size: 'md' }, children: ['Disabled'] },
    { tag: 'io-tag' as const, properties: { disabled: true, selected: true, color: 'blue', size: 'md' }, children: ['Selected disabled'] },
  ],
};

export const tagPropDefinitions: PropDefinition[] = [
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'removable',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md'],
    defaultValue: 'md',
  },
  {
    name: 'color',
    type: 'select',
    options: ['default', 'blue', 'beige'],
    defaultValue: 'default',
  },
];
