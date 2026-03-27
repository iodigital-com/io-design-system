import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

const DEFAULT_OPTIONS = [
  { label: 'Netherlands', value: 'nl' },
  { label: 'Belgium', value: 'be' },
  { label: 'Germany', value: 'de' },
];

export const selectStory: Story<'io-select'> = {
  state: {
    properties: {
      label: 'Country',
      placeholder: '',
      disabled: false,
      required: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-select' as const,
      properties: {
        label: (properties?.label as string) ?? 'Country',
        placeholder: (properties?.placeholder as string) || undefined,
        disabled: (properties?.disabled as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) || undefined,
        helperText: (properties?.helperText as string) || undefined,
        options: DEFAULT_OPTIONS,
      },
    },
  ],
};

export const selectStoryDefault: Story<'io-select'> = {
  state: { properties: { label: 'Country' } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Country', options: DEFAULT_OPTIONS },
    },
  ],
};

export const selectStoryPlaceholder: Story<'io-select'> = {
  state: { properties: { label: 'Country', placeholder: 'Select a country' } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Country',
        placeholder: 'Select a country',
        options: DEFAULT_OPTIONS,
      },
    },
  ],
};

export const selectStoryError: Story<'io-select'> = {
  state: {
    properties: {
      label: 'Country',
      error: true,
      errorMessage: 'Please select a country',
    },
  },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Country',
        error: true,
        errorMessage: 'Please select a country',
        options: DEFAULT_OPTIONS,
      },
    },
  ],
};

export const selectStoryDisabled: Story<'io-select'> = {
  state: { properties: { label: 'Country', disabled: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Country', disabled: true, options: DEFAULT_OPTIONS },
    },
  ],
};

export const selectPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Country',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
  },
];
