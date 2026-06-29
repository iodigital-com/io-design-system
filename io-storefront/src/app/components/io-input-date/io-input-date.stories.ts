import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const inputDateStory: Story<'io-input-date'> = {
  state: {
    properties: {
      label: 'Date',
      size: 'md',
      disabled: false,
      state: 'none',
      message: '',
      helperText: '',
      min: '',
      max: '',
      required: false,
      loading: false,
      readonly: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-input-date' as const,
      properties: properties ?? {},
    },
  ],
};

export const inputDateStoryDefault: Story<'io-input-date'> = {
  state: { properties: { label: 'Date' } },
  generator: () => [
    { tag: 'io-input-date' as const, properties: { label: 'Date' } },
  ],
};

export const inputDateStoryWithConstraints: Story<'io-input-date'> = {
  state: { properties: { label: 'Appointment date', min: '2026-01-01', max: '2026-12-31', helperText: 'Select a date in 2026' } },
  generator: () => [
    {
      tag: 'io-input-date' as const,
      properties: { label: 'Appointment date', min: '2026-01-01', max: '2026-12-31', helperText: 'Select a date in 2026' },
    },
  ],
};

export const inputDateStoryBirthDate: Story<'io-input-date'> = {
  state: { properties: { label: 'Date of birth', max: '2008-01-01', helperText: 'You must be 18 or older' } },
  generator: () => [
    {
      tag: 'io-input-date' as const,
      properties: { label: 'Date of birth', max: '2008-01-01', helperText: 'You must be 18 or older' },
    },
  ],
};

export const inputDateStoryError: Story<'io-input-date'> = {
  state: { properties: { label: 'Start date', state: 'error', message: 'Date is outside the allowed range' } },
  generator: () => [
    {
      tag: 'io-input-date' as const,
      properties: { label: 'Start date', state: 'error', message: 'Date is outside the allowed range' },
    },
  ],
};

export const inputDateStoryDisabled: Story<'io-input-date'> = {
  state: { properties: { label: 'End date', disabled: true } },
  generator: () => [
    { tag: 'io-input-date' as const, properties: { label: 'End date', disabled: true } },
  ],
};

export const inputDateStorySizes: Story<'io-input-date'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-input-date' as const, properties: { label: 'Small', size: 'sm' } },
    { tag: 'io-input-date' as const, properties: { label: 'Medium', size: 'md' } },
    { tag: 'io-input-date' as const, properties: { label: 'Large', size: 'lg' } },
  ],
};

export const inputDatePropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Date',
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
    name: 'min',
    type: 'string',
    defaultValue: '',
    description: 'Minimum selectable date in YYYY-MM-DD format.',
  },
  {
    name: 'max',
    type: 'string',
    defaultValue: '',
    description: 'Maximum selectable date in YYYY-MM-DD format.',
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
    options: ['none', 'error', 'success', 'warning'],
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
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading indicator and disables the input.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    defaultValue: false,
    description: 'Makes the input read-only.',
  },
  {
    name: 'step',
    type: 'string',
    defaultValue: '',
    description: 'Step interval in days, or "any".',
  },
];
