import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const formFieldStory: Story<'io-form-field'> = {
  state: {
    properties: {
      label: 'Email address',
      helperText: '',
      message: '',
      state: 'none',
      required: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-form-field' as const,
      properties: properties ?? {},
      children: [
        {
          tag: 'io-input' as const,
          properties: { type: 'email', name: 'email' },
        },
      ],
    },
  ],
};

export const formFieldStoryDefault: Story<'io-form-field'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-form-field' as const,
      properties: { label: 'Full name' },
      children: [
        { tag: 'io-input' as const, properties: { name: 'fullname', type: 'text' } },
      ],
    },
  ],
};

export const formFieldStoryHelper: Story<'io-form-field'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-form-field' as const,
      properties: { label: 'Email address', helperText: 'We will never share your email.' },
      children: [
        { tag: 'io-input' as const, properties: { name: 'email', type: 'email' } },
      ],
    },
  ],
};

export const formFieldStoryInvalid: Story<'io-form-field'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-form-field' as const,
      properties: { label: 'Username', state: 'error', message: 'This username is already taken.' },
      children: [
        { tag: 'io-input' as const, properties: { name: 'username', type: 'text' } },
      ],
    },
  ],
};

export const formFieldStoryRequired: Story<'io-form-field'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-form-field' as const,
      properties: { label: 'Phone number', required: true, helperText: 'Include country code, e.g. +31 6 12345678.' },
      children: [
        { tag: 'io-input' as const, properties: { name: 'phone', type: 'tel', required: true } },
      ],
    },
  ],
};

export const formFieldPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Email address',
    description: 'Label text displayed above the slotted form control.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Supporting guidance shown below the control when not in an error state.',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success', 'warning'],
    defaultValue: 'none',
    description: 'Validation state — propagates aria-invalid and controls message display.',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Validation message shown when state is not none.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Appends a * indicator to the label.',
  },
];
