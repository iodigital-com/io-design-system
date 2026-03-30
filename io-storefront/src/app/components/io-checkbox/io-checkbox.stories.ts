import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const checkboxStory: Story<'io-checkbox'> = {
  state: {
    properties: {
      label: 'Accept terms',
      checked: false,
      indeterminate: false,
      required: false,
      disabled: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-checkbox' as const,
      properties: {
        label: (properties?.label as string) ?? 'Accept terms',
        checked: (properties?.checked as boolean) ?? false,
        indeterminate: (properties?.indeterminate as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) ?? undefined,
        helperText: (properties?.helperText as string) ?? undefined,
      },
    },
  ],
};

export const checkboxStoryDefault: Story<'io-checkbox'> = {
  state: { properties: { label: 'Subscribe to newsletter', checked: false } },
  generator: () => [
    {
      tag: 'io-checkbox' as const,
      properties: { label: 'Subscribe to newsletter', checked: false },
    },
  ],
};

export const checkboxStoryChecked: Story<'io-checkbox'> = {
  state: { properties: { label: 'Accept terms and conditions', checked: true } },
  generator: () => [
    {
      tag: 'io-checkbox' as const,
      properties: { label: 'Accept terms and conditions', checked: true },
    },
  ],
};

export const checkboxStoryIndeterminate: Story<'io-checkbox'> = {
  state: { properties: { label: 'Select all items', indeterminate: true } },
  generator: () => [
    {
      tag: 'io-checkbox' as const,
      properties: { label: 'Select all items', indeterminate: true },
    },
  ],
};

export const checkboxStoryError: Story<'io-checkbox'> = {
  state: {
    properties: {
      label: 'Accept terms and conditions',
      error: true,
      errorMessage: 'This field is required',
    },
  },
  generator: () => [
    {
      tag: 'io-checkbox' as const,
      properties: {
        label: 'Accept terms and conditions',
        error: true,
        errorMessage: 'This field is required',
      },
    },
  ],
};

export const checkboxStoryDisabled: Story<'io-checkbox'> = {
  state: { properties: { label: 'Disabled checkbox', disabled: true } },
  generator: () => [
    {
      tag: 'io-checkbox' as const,
      properties: { label: 'Disabled checkbox', disabled: true },
    },
    {
      tag: 'io-checkbox' as const,
      properties: { label: 'Disabled and checked', disabled: true, checked: true },
    },
  ],
};

export const checkboxPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Accept terms',
    description: 'Sets the text label next to the checkbox.',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
    description: 'Controls whether the checkbox is checked.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a mixed state for partially selected groups.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form validation.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents toggling and focus interactions.',
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
    description: 'Shows validation feedback below the checkbox.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the checkbox.',
  },
];
