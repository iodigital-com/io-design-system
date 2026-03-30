import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const radioStory: Story<'io-radio'> = {
  state: {
    properties: {
      label: 'Option A',
      checked: false,
      required: false,
      disabled: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-radio' as const,
      properties: {
        label: (properties?.label as string) ?? 'Option A',
        checked: (properties?.checked as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) ?? undefined,
        helperText: (properties?.helperText as string) ?? undefined,
      },
    },
  ],
};

export const radioStoryDefault: Story<'io-radio'> = {
  state: { properties: { label: 'Standard delivery', checked: false } },
  generator: () => [
    {
      tag: 'io-radio' as const,
      properties: { label: 'Standard delivery', checked: false },
    },
  ],
};

export const radioStoryChecked: Story<'io-radio'> = {
  state: { properties: { label: 'Express delivery', checked: true } },
  generator: () => [
    {
      tag: 'io-radio' as const,
      properties: { label: 'Express delivery', checked: true },
    },
  ],
};

export const radioStoryDisabled: Story<'io-radio'> = {
  state: { properties: { label: 'Disabled option', disabled: true } },
  generator: () => [
    {
      tag: 'io-radio' as const,
      properties: { label: 'Disabled option', disabled: true },
    },
    {
      tag: 'io-radio' as const,
      properties: { label: 'Disabled and selected', disabled: true, checked: true },
    },
  ],
};

export const radioStoryError: Story<'io-radio'> = {
  state: {
    properties: {
      label: 'I agree to the terms',
      error: true,
      errorMessage: 'Please select an option to continue',
    },
  },
  generator: () => [
    {
      tag: 'io-radio' as const,
      properties: {
        label: 'I agree to the terms',
        error: true,
        errorMessage: 'Please select an option to continue',
      },
    },
  ],
};

export const radioStoryGroup: Story<'io-radio'> = {
  state: {
    properties: {
      label: 'Standard delivery',
      name: 'delivery',
      checked: true,
    },
  },
  generator: () => [
    {
      tag: 'io-radio' as const,
      properties: { label: 'Standard delivery', name: 'delivery', value: 'standard', checked: true },
    },
    {
      tag: 'io-radio' as const,
      properties: { label: 'Express delivery', name: 'delivery', value: 'express', checked: false },
    },
    {
      tag: 'io-radio' as const,
      properties: { label: 'Next-day delivery', name: 'delivery', value: 'next-day', checked: false },
    },
  ],
};

export const radioPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Option A',
    description: 'Sets the text label next to the radio option.',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
    description: 'Controls whether this radio option is selected.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks this option as required for validation.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents selecting and focusing this option.',
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
    description: 'Shows validation feedback below the radio field.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the radio field.',
  },
];
