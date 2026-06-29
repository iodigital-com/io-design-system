import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const radioGroupStory: Story<'io-radio-group'> = {
  state: {
    properties: {
      label: 'Preferred contact',
      name: 'contact',
      value: 'email',
      required: false,
      disabled: false,
      loading: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-radio-group' as const,
      properties: properties ?? {},
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Email', value: 'email' } },
        { tag: 'io-radio' as const, properties: { label: 'Phone', value: 'phone' } },
        { tag: 'io-radio' as const, properties: { label: 'Post', value: 'post' } },
      ],
    },
  ],
};

export const radioGroupStoryDefault: Story<'io-radio-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-radio-group' as const,
      properties: { label: 'Preferred contact', name: 'contact-default' },
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Email', value: 'email' } },
        { tag: 'io-radio' as const, properties: { label: 'Phone', value: 'phone' } },
        { tag: 'io-radio' as const, properties: { label: 'Post', value: 'post' } },
      ],
    },
  ],
};

export const radioGroupStoryPreselected: Story<'io-radio-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-radio-group' as const,
      properties: { label: 'Subscription tier', name: 'tier', value: 'pro' },
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Free', value: 'free' } },
        { tag: 'io-radio' as const, properties: { label: 'Pro', value: 'pro' } },
        { tag: 'io-radio' as const, properties: { label: 'Enterprise', value: 'enterprise' } },
      ],
    },
  ],
};

export const radioGroupStoryWithHelper: Story<'io-radio-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-radio-group' as const,
      properties: {
        label: 'Notification frequency',
        name: 'notify-freq',
        helperText: 'You can change this at any time in your settings.',
      },
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Instantly', value: 'instant' } },
        { tag: 'io-radio' as const, properties: { label: 'Daily digest', value: 'daily' } },
        { tag: 'io-radio' as const, properties: { label: 'Weekly digest', value: 'weekly' } },
      ],
    },
  ],
};

export const radioGroupStoryError: Story<'io-radio-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-radio-group' as const,
      properties: {
        label: 'Preferred contact',
        name: 'contact-error',
        error: true,
        errorMessage: 'Please select a contact method.',
      },
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Email', value: 'email' } },
        { tag: 'io-radio' as const, properties: { label: 'Phone', value: 'phone' } },
        { tag: 'io-radio' as const, properties: { label: 'Post', value: 'post' } },
      ],
    },
  ],
};

export const radioGroupStoryDisabled: Story<'io-radio-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-radio-group' as const,
      properties: { label: 'Shipping method', name: 'shipping', value: 'standard', disabled: true },
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Standard (3-5 days)', value: 'standard' } },
        { tag: 'io-radio' as const, properties: { label: 'Express (1-2 days)', value: 'express' } },
      ],
    },
  ],
};

export const radioGroupStoryLoading: Story<'io-radio-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-radio-group' as const,
      properties: { label: 'Shipping method', name: 'shipping-loading', value: 'standard', loading: true },
      children: [
        { tag: 'io-radio' as const, properties: { label: 'Standard (3-5 days)', value: 'standard' } },
        { tag: 'io-radio' as const, properties: { label: 'Express (1-2 days)', value: 'express' } },
      ],
    },
  ],
};

export const radioGroupPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Preferred contact',
    description: 'Legend text for the fieldset — the accessible group name.',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'contact',
    description: 'Name propagated to all slotted io-radio children.',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: 'email',
    description: 'Currently selected radio value. Updates checked state on children.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Supporting guidance shown below the legend.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks all child io-radio elements as required.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables the entire group and all child radios.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a spinner overlay and blocks interaction while an async operation is in progress.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Puts the group in error state.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: undefined,
    description: 'Error message shown below the group when error is true.',
  },
  {
    name: 'orientation',
    type: 'select',
    options: ['vertical', 'horizontal'],
    defaultValue: 'vertical',
    description: 'Controls layout direction of the radio options. Horizontal wraps at container boundary.',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: undefined,
    description: 'Supplementary description shown below the legend for additional context.',
  },
];
