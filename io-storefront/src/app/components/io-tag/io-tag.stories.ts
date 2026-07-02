import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const tagStory: Story<'io-tag'> = {
  state: {
    properties: {
      selected: false,
      disabled: false,
      size: 'md',
      variant: 'neutral',
      label: '',
      compact: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-tag' as const,
      properties: {
        selected: (properties?.selected as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
        size: (properties?.size as string) ?? 'md',
        variant: (properties?.variant as string) ?? 'neutral',
        label: (properties?.label as string) ?? '',
        compact: (properties?.compact as boolean) ?? false,
      },
      children: ['Design system'],
    },
  ],
};

export const tagStoryDefault: Story<'io-tag'> = {
  state: { properties: { variant: 'neutral', size: 'md' } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { variant: 'neutral', size: 'md' }, children: ['React'] },
    { tag: 'io-tag' as const, properties: { variant: 'neutral', size: 'md' }, children: ['TypeScript'] },
    { tag: 'io-tag' as const, properties: { variant: 'neutral', size: 'md' }, children: ['Accessibility'] },
  ],
};

export const tagStorySelected: Story<'io-tag'> = {
  state: { properties: { selected: true, variant: 'neutral', size: 'md' } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { selected: true, variant: 'neutral', size: 'md' }, children: ['React'] },
    { tag: 'io-tag' as const, properties: { selected: true, variant: 'primary', size: 'md' }, children: ['TypeScript'] },
    { tag: 'io-tag' as const, properties: { selected: true, variant: 'info', size: 'md' }, children: ['Accessibility'] },
  ],
};

export const tagStoryColors: Story<'io-tag'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-tag' as const, properties: { variant: 'neutral', size: 'md' }, children: ['Neutral'] },
    { tag: 'io-tag' as const, properties: { variant: 'primary', size: 'md' }, children: ['Primary'] },
    { tag: 'io-tag' as const, properties: { variant: 'info', size: 'md' }, children: ['Info'] },
  ],
};

export const tagStoryDisabled: Story<'io-tag'> = {
  state: { properties: { disabled: true } },
  generator: () => [
    { tag: 'io-tag' as const, properties: { disabled: true, variant: 'neutral', size: 'md' }, children: ['Disabled'] },
    { tag: 'io-tag' as const, properties: { disabled: true, selected: true, variant: 'primary', size: 'md' }, children: ['Selected disabled'] },
  ],
};

export const tagPropDefinitions: PropDefinition[] = [
  {
    name: 'selected',
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
    name: 'variant',
    type: 'select',
    options: ['neutral', 'primary', 'info', 'success', 'warning', 'error', 'subtle'],
    defaultValue: 'neutral',
  },
];
