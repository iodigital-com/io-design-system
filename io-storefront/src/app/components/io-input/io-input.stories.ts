import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const inputStory: Story<'io-input'> = {
  state: {
    properties: {
      label: 'Full name',
      type: 'text',
      size: 'md',
      min: '',
      max: '',
      step: '',
      disabled: false,
      loading: false,
      counter: false,
      state: 'none',
      message: '',
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
  state: { properties: { label: 'Email address', type: 'email', state: 'error', message: 'Please enter a valid email' } },
  generator: () => [
    {
      tag: 'io-input' as const,
      properties: { label: 'Email address', type: 'email', state: 'error', message: 'Please enter a valid email' },
    },
  ],
};

export const inputStoryDisabled: Story<'io-input'> = {
  state: { properties: { label: 'Username', type: 'text', disabled: true } },
  generator: () => [
    { tag: 'io-input' as const, properties: { label: 'Username', type: 'text', disabled: true } },
  ],
};

export const inputStorySizes: Story<'io-input'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-input' as const, properties: { label: 'Small', size: 'sm', placeholder: 'Compact field' } },
    { tag: 'io-input' as const, properties: { label: 'Medium', size: 'md', placeholder: 'Default field' } },
    { tag: 'io-input' as const, properties: { label: 'Large', size: 'lg', placeholder: 'Prominent field' } },
  ],
};

export const inputStoryDateTime: Story<'io-input'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-input' as const, properties: { label: 'Date', type: 'date', min: '2026-01-01', max: '2026-12-31' } },
    { tag: 'io-input' as const, properties: { label: 'Time', type: 'time', step: '900' } },
  ],
};

export const inputStoryConstraints: Story<'io-input'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-input' as const,
      properties: {
        label: 'Quantity',
        type: 'number',
        min: '1',
        max: '10',
        step: '1',
        helperText: 'Allowed range: 1 to 10',
      },
    },
  ],
};

export const inputStoryLoading: Story<'io-input'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-input' as const,
      properties: { label: 'Searching…', type: 'search', loading: true, placeholder: 'Type to search' },
    },
  ],
};

export const inputStoryCounter: Story<'io-input'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-input' as const,
      properties: { label: 'Bio', counter: true, maxLength: 100, placeholder: 'Tell us about yourself' },
    },
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
    options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'time'],
    defaultValue: 'text',
    description: 'Defines the native input type and keyboard behavior.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    description: 'Aligns field height with io-button sizes.',
  },
  {
    name: 'min',
    type: 'string',
    defaultValue: '',
    description: 'Minimum value forwarded to the native input (number/date/time).',
  },
  {
    name: 'max',
    type: 'string',
    defaultValue: '',
    description: 'Maximum value forwarded to the native input (number/date/time).',
  },
  {
    name: 'step',
    type: 'string',
    defaultValue: '',
    description: 'Step value forwarded to the native input (number/date/time).',
  },
  {
    name: 'minLength',
    type: 'number',
    defaultValue: undefined,
    description: 'Minimum character count for native constraint validation.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a spinner and disables events while an async operation is in progress.',
  },
  {
    name: 'counter',
    type: 'boolean',
    defaultValue: false,
    description: 'Displays a character count below the field when maxLength is set.',
  },
  {
    name: 'autoComplete',
    type: 'string',
    defaultValue: undefined,
    description: 'Maps to the native autocomplete attribute for browser autofill hints.',
  },
  {
    name: 'spellCheck',
    type: 'boolean',
    defaultValue: undefined,
    description: 'Enables or disables browser spell-check on the input.',
  },
  {
    name: 'form',
    type: 'string',
    defaultValue: undefined,
    description: 'Associates the input with a form element by its id (for out-of-DOM usage).',
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
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
];
