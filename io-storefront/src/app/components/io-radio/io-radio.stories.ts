import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import { IO_FIELD_STATES } from '@/utils/field-state';

export const radioStory: Story<'io-radio'> = {
  state: {
    properties: {
      label: 'Option A',
      checked: false,
      required: false,
      disabled: false,
      state: 'none',
      message: '',
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
        state: (properties?.state as string) ?? 'none',
        message: (properties?.message as string) ?? '',
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
      state: 'error',
      message: 'Please select an option to continue',
    },
  },
  generator: () => [
    {
      tag: 'io-radio' as const,
      properties: {
        label: 'I agree to the terms',
        state: 'error',
        message: 'Please select an option to continue',
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
    description: 'Shows validation feedback below the radio field.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the radio field.',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: '',
    description: 'HTML name attribute. Set the same name on every io-radio in a group to enable mutual exclusivity.',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    description: 'Value submitted with the form when this radio is selected.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading spinner in place of the radio control and disables interaction.',
  },
  {
    name: 'form',
    type: 'string',
    defaultValue: '',
    description: 'Associates this field with a <form> element by its ID, enabling out-of-DOM form participation.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually hides the label while keeping it accessible to screen readers.',
  },
];
