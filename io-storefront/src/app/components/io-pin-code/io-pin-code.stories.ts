import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const pinCodeStory: Story<'io-pin-code'> = {
  state: {
    properties: {
      length: 4,
      type: 'number',
      label: 'Enter PIN',
      state: 'none',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-pin-code' as const,
      properties: properties ?? {},
    },
  ],
};

export const pinCodeStoryPassword: Story<'io-pin-code'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-pin-code' as const,
      properties: { length: 4, type: 'password', label: 'Enter secure PIN', required: true },
    },
  ],
};

export const pinCodeStorySixDigit: Story<'io-pin-code'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-pin-code' as const,
      properties: { length: 6, label: 'One-time code', state: 'none' },
    },
  ],
};

export const pinCodeStoryError: Story<'io-pin-code'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-pin-code' as const,
      properties: { length: 4, label: 'Invalid PIN', state: 'error', message: 'PIN is incorrect. Please try again.' },
    },
  ],
};

export const pinCodeStorySuccess: Story<'io-pin-code'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-pin-code' as const,
      properties: { length: 4, label: 'PIN verified', state: 'success', message: 'PIN accepted.' },
    },
  ],
};

export const pinCodePropDefinitions: PropDefinition[] = [
  {
    name: 'length',
    type: 'select',
    options: ['3', '4', '5', '6'],
    defaultValue: '4',
    description: 'Number of digit slots.',
  },
  {
    name: 'type',
    type: 'select',
    options: ['number', 'password'],
    defaultValue: 'number',
    description: 'Display mode — number shows digits, password masks them.',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success', 'warning'],
    defaultValue: 'none',
    description: 'Visual validation state.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Enter PIN',
    description: 'Accessible label displayed above the slots.',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Helper or validation message displayed below the slots.',
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
    description: 'Disables all digit inputs.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
];
