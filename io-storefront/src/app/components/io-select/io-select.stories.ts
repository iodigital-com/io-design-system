import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

const DEFAULT_OPTIONS = [
  { label: 'Netherlands', value: 'nl' },
  { label: 'Belgium', value: 'be' },
  { label: 'Germany', value: 'de' },
];

const COMBOBOX_OPTIONS = [
  { label: 'Netherlands', value: 'nl' },
  { label: 'Belgium', value: 'be' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Spain', value: 'es' },
  { label: 'Italy', value: 'it' },
  { label: 'Sweden', value: 'se', disabled: true },
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
      custom: false,
      multiple: false,
      filter: false,
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
        custom: (properties?.custom as boolean) ?? false,
        multiple: (properties?.multiple as boolean) ?? false,
        filter: (properties?.filter as boolean) ?? false,
        options: COMBOBOX_OPTIONS,
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

export const selectStoryCombobox: Story<'io-select'> = {
  state: { properties: { label: 'Country', custom: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Country',
        placeholder: 'Select a country',
        custom: true,
        options: COMBOBOX_OPTIONS,
      },
    },
  ],
};

export const selectStoryMultiple: Story<'io-select'> = {
  state: { properties: { label: 'Countries', custom: true, multiple: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Countries',
        placeholder: 'Select countries',
        custom: true,
        multiple: true,
        options: COMBOBOX_OPTIONS,
      },
    },
  ],
};

export const selectStoryFilter: Story<'io-select'> = {
  state: { properties: { label: 'Country', custom: true, filter: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Country',
        placeholder: 'Search countries',
        custom: true,
        filter: true,
        options: COMBOBOX_OPTIONS,
      },
    },
  ],
};

export const selectStoryMultipleFilter: Story<'io-select'> = {
  state: { properties: { label: 'Countries', custom: true, multiple: true, filter: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Countries',
        placeholder: 'Search and select',
        custom: true,
        multiple: true,
        filter: true,
        options: COMBOBOX_OPTIONS,
      },
    },
  ],
};

export const selectStorySizes: Story<'io-select'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Small', size: 'sm', options: DEFAULT_OPTIONS, placeholder: 'Choose' },
    },
    {
      tag: 'io-select' as const,
      properties: { label: 'Medium', size: 'md', options: DEFAULT_OPTIONS, placeholder: 'Choose' },
    },
    {
      tag: 'io-select' as const,
      properties: { label: 'Large', size: 'lg', options: DEFAULT_OPTIONS, placeholder: 'Choose' },
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
  {
    name: 'custom',
    type: 'boolean',
    defaultValue: false,
    description: 'Switches to a fully accessible ARIA combobox/listbox. Required before using multiple or filter.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: false,
    description: 'Enables multi-value selection. Requires custom=true. The change event detail becomes string[].',
  },
  {
    name: 'filter',
    type: 'boolean',
    defaultValue: false,
    description: 'Adds a text search input inside the dropdown to filter options by label. Requires custom=true.',
  },
];
