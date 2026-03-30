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
    description: 'Sets the field label shown above the input.',
  },
  {
    name: 'type',
    type: 'select',
    options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    defaultValue: 'text',
    description: 'Defines the native input type and keyboard behavior.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents editing and focus interactions.',
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
    description: 'Shows validation feedback below the field.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the input.',
  },
];
