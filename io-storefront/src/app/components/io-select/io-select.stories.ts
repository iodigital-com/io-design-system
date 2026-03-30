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
    description: 'Sets the field label shown above the select.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '',
    description: 'Displays hint text when no value is selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents opening and changing the selection.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form submission.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Applies the invalid visual state.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: '',
    description: 'Shows validation feedback below the select.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the select.',
  },
];
