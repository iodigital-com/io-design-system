import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const inputPasswordStory: Story<'io-input-password'> = {
  state: {
    properties: {
      label: 'Password',
      size: 'md',
      disabled: false,
      state: 'none',
      message: '',
      helperText: '',
      autocomplete: 'current-password',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-input-password' as const,
      properties: properties ?? {},
    },
  ],
};

export const inputPasswordStoryDefault: Story<'io-input-password'> = {
  state: { properties: { label: 'Password' } },
  generator: () => [
    { tag: 'io-input-password' as const, properties: { label: 'Password' } },
  ],
};

export const inputPasswordStoryNewPassword: Story<'io-input-password'> = {
  state: { properties: { label: 'New password', autocomplete: 'new-password', helperText: 'Min 8 characters, include a number and symbol' } },
  generator: () => [
    {
      tag: 'io-input-password' as const,
      properties: { label: 'New password', autocomplete: 'new-password', helperText: 'Min 8 characters, include a number and symbol' },
    },
  ],
};

export const inputPasswordStoryError: Story<'io-input-password'> = {
  state: { properties: { label: 'Password', state: 'error', message: 'Password is incorrect' } },
  generator: () => [
    {
      tag: 'io-input-password' as const,
      properties: { label: 'Password', state: 'error', message: 'Password is incorrect' },
    },
  ],
};

export const inputPasswordStoryDisabled: Story<'io-input-password'> = {
  state: { properties: { label: 'Password', disabled: true } },
  generator: () => [
    { tag: 'io-input-password' as const, properties: { label: 'Password', disabled: true } },
  ],
};

export const inputPasswordStorySizes: Story<'io-input-password'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-input-password' as const, properties: { label: 'Small', size: 'sm' } },
    { tag: 'io-input-password' as const, properties: { label: 'Medium', size: 'md' } },
    { tag: 'io-input-password' as const, properties: { label: 'Large', size: 'lg' } },
  ],
};

export const inputPasswordPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Password',
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
    name: 'maxLength',
    type: 'number',
    defaultValue: undefined,
    description: 'Maximum number of characters allowed.',
  },
  {
    name: 'minLength',
    type: 'number',
    defaultValue: undefined,
    description: 'Minimum number of characters required.',
  },
  {
    name: 'autocomplete',
    type: 'string',
    defaultValue: 'current-password',
    description: 'Maps to the native autocomplete attribute. Use "current-password" for login or "new-password" for registration.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
];
