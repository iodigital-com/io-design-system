import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

const DEFAULT_CHILDREN = [
  { tag: 'io-option' as const, properties: { value: 'nl', label: 'Netherlands' } },
  { tag: 'io-option' as const, properties: { value: 'be', label: 'Belgium' } },
  { tag: 'io-option' as const, properties: { value: 'de', label: 'Germany' } },
];

export const selectStory: Story<'io-select'> = {
  state: {
    properties: {
      label: 'Country',
      size: 'md',
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
        size: (properties?.size as string) ?? 'md',
        placeholder: (properties?.placeholder as string) || undefined,
        disabled: (properties?.disabled as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) || undefined,
        helperText: (properties?.helperText as string) || undefined,
      },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const selectStoryDefault: Story<'io-select'> = {
  state: { properties: { label: 'Country' } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Country' },
      children: DEFAULT_CHILDREN,
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
      },
      children: DEFAULT_CHILDREN,
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
      },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const selectStoryDisabled: Story<'io-select'> = {
  state: { properties: { label: 'Country', disabled: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Country', disabled: true },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const selectStorySizes: Story<'io-select'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Small', size: 'sm', placeholder: 'Choose' },
      children: DEFAULT_CHILDREN,
    },
    {
      tag: 'io-select' as const,
      properties: { label: 'Medium', size: 'md', placeholder: 'Choose' },
      children: DEFAULT_CHILDREN,
    },
    {
      tag: 'io-select' as const,
      properties: { label: 'Large', size: 'lg', placeholder: 'Choose' },
      children: DEFAULT_CHILDREN,
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
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    description: 'Aligns field height with io-button sizes.',
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
