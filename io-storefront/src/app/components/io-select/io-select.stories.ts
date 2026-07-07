import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import { IO_FIELD_STATES } from '@/utils/field-state';

const DEFAULT_CHILDREN = [
  { tag: 'io-option' as const, properties: { value: 'nl', label: 'Netherlands' } },
  { tag: 'io-option' as const, properties: { value: 'be', label: 'Belgium' } },
  { tag: 'io-option' as const, properties: { value: 'de', label: 'Germany' } },
];

const COMBOBOX_CHILDREN = [
  { tag: 'io-option' as const, properties: { value: 'nl', label: 'Netherlands' } },
  { tag: 'io-option' as const, properties: { value: 'be', label: 'Belgium' } },
  { tag: 'io-option' as const, properties: { value: 'de', label: 'Germany' } },
  { tag: 'io-option' as const, properties: { value: 'fr', label: 'France' } },
  { tag: 'io-option' as const, properties: { value: 'es', label: 'Spain' } },
  { tag: 'io-option' as const, properties: { value: 'it', label: 'Italy' } },
  { tag: 'io-option' as const, properties: { value: 'se', label: 'Sweden', disabled: true } },
];

export const selectStory: Story<'io-select'> = {
  state: {
    properties: {
      label: 'Country',
      size: 'md',
      placeholder: '',
      disabled: false,
      required: false,
      state: 'none',
      message: '',
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
        state: (properties?.state as string) || undefined,
        message: (properties?.message as string) || undefined,
        helperText: (properties?.helperText as string) || undefined,
        hideLabel: (properties?.hideLabel as boolean) ?? false,
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
      state: 'error',
      message: 'Please select a country',
    },
  },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: {
        label: 'Country',
        state: 'error',
        message: 'Please select a country',
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

export const selectStoryCombobox: Story<'io-select'> = {
  state: { properties: { label: 'Country', custom: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Country', placeholder: 'Select a country', custom: true },
      children: COMBOBOX_CHILDREN,
    },
  ],
};

export const selectStoryMultiple: Story<'io-select'> = {
  state: { properties: { label: 'Countries', custom: true, multiple: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Countries', placeholder: 'Select countries', custom: true, multiple: true },
      children: COMBOBOX_CHILDREN,
    },
  ],
};

export const selectStoryFilter: Story<'io-select'> = {
  state: { properties: { label: 'Country', custom: true, filter: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Country', placeholder: 'Search countries', custom: true, filter: true },
      children: COMBOBOX_CHILDREN,
    },
  ],
};

export const selectStoryMultipleFilter: Story<'io-select'> = {
  state: { properties: { label: 'Countries', custom: true, multiple: true, filter: true } },
  generator: () => [
    {
      tag: 'io-select' as const,
      properties: { label: 'Countries', placeholder: 'Search and select', custom: true, multiple: true, filter: true },
      children: COMBOBOX_CHILDREN,
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
    name: 'name',
    type: 'string',
    defaultValue: '',
    description: 'HTML name attribute. Used for form submission and to generate the internal select id.',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    description: 'Controlled selected value (single mode). Accepts string or number; numeric values are serialised to string on form submission.',
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
    name: 'state',
    type: 'select',
    options: [...IO_FIELD_STATES],
    defaultValue: 'none',
    description: 'Validation state — controls border color and message color.',
  },
  {
    name: 'message',
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
    description: 'Switches from the native <select> element to a fully accessible ARIA combobox/listbox implementation. Required for multiple selection and filter mode.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: false,
    description: 'Enables multi-value selection. Requires custom=true. The change event detail becomes string[] instead of string.',
  },
  {
    name: 'filter',
    type: 'boolean',
    defaultValue: false,
    description: 'Adds a search input inside the dropdown to filter options by label. Requires custom=true.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading spinner replacing the chevron and disables interaction while async data loads.',
  },
  {
    name: 'form',
    type: 'string',
    defaultValue: '',
    description: 'Associates this field with a form element by ID, enabling out-of-DOM form participation (FACE formAssociated pattern).',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Supplementary description shown below the field for additional context.',
  },
];
