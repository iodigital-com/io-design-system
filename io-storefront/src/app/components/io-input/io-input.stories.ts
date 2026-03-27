import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputStory: Story<'io-input'> = {
  state: {
    properties: {
      label: 'Full name',
      type: 'text',
      disabled: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-input' as const,
      properties: properties ?? {},
    },
  ],
};

export const inputStoryDefault: Story<'io-input'> = {
  state: { properties: { label: 'Full name', type: 'text' } },
  generator: () => [
    { tag: 'io-input' as const, properties: { label: 'Full name', type: 'text' } },
  ],
};

export const inputStoryError: Story<'io-input'> = {
  state: { properties: { label: 'Email address', type: 'email', error: true, errorMessage: 'Please enter a valid email' } },
  generator: () => [
    {
      tag: 'io-input' as const,
      properties: { label: 'Email address', type: 'email', error: true, errorMessage: 'Please enter a valid email' },
    },
  ],
};

export const inputStoryDisabled: Story<'io-input'> = {
  state: { properties: { label: 'Username', type: 'text', disabled: true } },
  generator: () => [
    { tag: 'io-input' as const, properties: { label: 'Username', type: 'text', disabled: true } },
  ],
};

export const inputPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Full name',
  },
  {
    name: 'type',
    type: 'select',
    options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    defaultValue: 'text',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
  },
];
