import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import { IO_FIELD_STATES } from '@/utils/field-state';

export const inputSearchStory: Story<'io-input-search'> = {
  state: {
    properties: {
      label: 'Search',
      size: 'md',
      disabled: false,
      state: 'none',
      message: '',
      helperText: '',
      placeholder: '',
      clearAriaLabel: 'Clear search',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-input-search' as const,
      properties: properties ?? {},
    },
  ],
};

export const inputSearchStoryDefault: Story<'io-input-search'> = {
  state: { properties: { label: 'Search' } },
  generator: () => [
    { tag: 'io-input-search' as const, properties: { label: 'Search' } },
  ],
};

export const inputSearchStoryWithPlaceholder: Story<'io-input-search'> = {
  state: { properties: { label: 'Search products', placeholder: 'Search by name or SKU…' } },
  generator: () => [
    {
      tag: 'io-input-search' as const,
      properties: { label: 'Search products', placeholder: 'Search by name or SKU…' },
    },
  ],
};

export const inputSearchStoryError: Story<'io-input-search'> = {
  state: { properties: { label: 'Search', state: 'error', message: 'Enter at least 2 characters' } },
  generator: () => [
    {
      tag: 'io-input-search' as const,
      properties: { label: 'Search', state: 'error', message: 'Enter at least 2 characters' },
    },
  ],
};

export const inputSearchStoryDisabled: Story<'io-input-search'> = {
  state: { properties: { label: 'Search', disabled: true } },
  generator: () => [
    { tag: 'io-input-search' as const, properties: { label: 'Search', disabled: true } },
  ],
};

export const inputSearchStorySizes: Story<'io-input-search'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-input-search' as const, properties: { label: 'Small', size: 'sm' } },
    { tag: 'io-input-search' as const, properties: { label: 'Medium', size: 'md' } },
    { tag: 'io-input-search' as const, properties: { label: 'Large', size: 'lg' } },
  ],
};

export const inputSearchPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Search',
    description: 'Sets the field label shown above the input.',
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
    description: 'Placeholder text shown when the field is empty.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents editing and focus interactions.',
  },
  {
    name: 'state',
    type: 'select',
    options: [...IO_FIELD_STATES],
    defaultValue: 'none',
    description: 'Validation state — controls border color, icon, and message color.',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Shows validation feedback below the field.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the input.',
  },
  {
    name: 'clearAriaLabel',
    type: 'string',
    defaultValue: 'Clear search',
    description: 'Accessible label for the clear (×) button shown when the field has a value.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form submission.',
  },
  {
    name: 'readOnly',
    type: 'boolean',
    defaultValue: false,
    description: 'Makes the input read-only — value is visible but not editable.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading indicator and disables the input while a search is in progress.',
  },
  {
    name: 'maxLength',
    type: 'number',
    defaultValue: undefined,
    description: 'Maximum number of characters allowed in the field.',
  },
  {
    name: 'minLength',
    type: 'number',
    defaultValue: undefined,
    description: 'Minimum number of characters required in the field.',
  },
];
