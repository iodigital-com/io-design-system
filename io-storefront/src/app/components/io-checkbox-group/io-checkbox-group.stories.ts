import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const checkboxGroupStory: Story<'io-checkbox-group'> = {
  state: {
    properties: {
      label: 'Notification channels',
      name: 'notifications',
      required: false,
      disabled: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-checkbox-group' as const,
      properties: properties ?? {},
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Email', value: 'email' } },
        { tag: 'io-checkbox' as const, properties: { label: 'SMS', value: 'sms' } },
        { tag: 'io-checkbox' as const, properties: { label: 'Push', value: 'push' } },
      ],
    },
  ],
};

export const checkboxGroupStoryDefault: Story<'io-checkbox-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-checkbox-group' as const,
      properties: { label: 'Notification channels', name: 'notifications-default' },
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Email', value: 'email' } },
        { tag: 'io-checkbox' as const, properties: { label: 'SMS', value: 'sms' } },
        { tag: 'io-checkbox' as const, properties: { label: 'Push notifications', value: 'push' } },
      ],
    },
  ],
};

export const checkboxGroupStoryPreChecked: Story<'io-checkbox-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-checkbox-group' as const,
      properties: { label: 'Dietary requirements', name: 'dietary' },
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Vegetarian', value: 'vegetarian', checked: true } },
        { tag: 'io-checkbox' as const, properties: { label: 'Vegan', value: 'vegan' } },
        { tag: 'io-checkbox' as const, properties: { label: 'Gluten-free', value: 'gluten-free', checked: true } },
        { tag: 'io-checkbox' as const, properties: { label: 'Dairy-free', value: 'dairy-free' } },
      ],
    },
  ],
};

export const checkboxGroupStoryWithHelper: Story<'io-checkbox-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-checkbox-group' as const,
      properties: {
        label: 'Email preferences',
        name: 'email-prefs',
        helperText: 'Select all types of email you would like to receive.',
      },
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Product updates', value: 'product' } },
        { tag: 'io-checkbox' as const, properties: { label: 'Security alerts', value: 'security' } },
        { tag: 'io-checkbox' as const, properties: { label: 'Marketing', value: 'marketing' } },
      ],
    },
  ],
};

export const checkboxGroupStoryError: Story<'io-checkbox-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-checkbox-group' as const,
      properties: {
        label: 'Notification channels',
        name: 'notifications-error',
        error: true,
        errorMessage: 'Please select at least one notification channel.',
      },
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Email', value: 'email' } },
        { tag: 'io-checkbox' as const, properties: { label: 'SMS', value: 'sms' } },
        { tag: 'io-checkbox' as const, properties: { label: 'Push', value: 'push' } },
      ],
    },
  ],
};

export const checkboxGroupStoryDisabled: Story<'io-checkbox-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-checkbox-group' as const,
      properties: { label: 'Required consents', name: 'consents', disabled: true },
      children: [
        { tag: 'io-checkbox' as const, properties: { label: 'Terms of service', value: 'tos', checked: true } },
        { tag: 'io-checkbox' as const, properties: { label: 'Privacy policy', value: 'privacy', checked: true } },
      ],
    },
  ],
};

export const checkboxGroupPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Notification channels',
    description: 'Legend text for the fieldset — the accessible group name.',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'notifications',
    description: 'Name propagated to all slotted io-checkbox children.',
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
    description: 'Marks the group as required.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables the entire group and all child checkboxes.',
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
    defaultValue: '',
    description: 'Error message shown below the group when error is true.',
  },
  {
    name: 'orientation',
    type: 'select',
    options: ['vertical', 'horizontal'],
    defaultValue: 'vertical',
    description: 'Layout direction of the checkbox options.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading spinner overlay and blocks interaction.',
  },
];
