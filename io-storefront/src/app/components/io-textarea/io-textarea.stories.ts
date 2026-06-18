import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const textareaStory: Story<'io-textarea'> = {
  state: {
    properties: {
      label: 'Message',
      size: 'md',
      placeholder: '',
      rows: 4,
      resize: 'vertical',
      disabled: false,
      required: false,
      readOnly: false,
      loading: false,
      counter: false,
      state: 'none',
      message: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-textarea' as const,
      properties: {
        label: (properties?.label as string) ?? 'Message',
        size: (properties?.size as string) ?? 'md',
        placeholder: (properties?.placeholder as string) || undefined,
        rows: (properties?.rows as number) ?? 4,
        resize: (properties?.resize as string) ?? 'vertical',
        disabled: (properties?.disabled as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        readOnly: (properties?.readOnly as boolean) ?? false,
        loading: (properties?.loading as boolean) ?? false,
        counter: (properties?.counter as boolean) ?? false,
        state: (properties?.state as string) ?? 'none',
        message: (properties?.message as string) || undefined,
        helperText: (properties?.helperText as string) || undefined,
        hideLabel: (properties?.hideLabel as boolean) ?? false,
      },
    },
  ],
};

export const textareaStoryDefault: Story<'io-textarea'> = {
  state: { properties: { label: 'Message', rows: 4 } },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Message', rows: 4 },
    },
  ],
};

export const textareaStoryResize: Story<'io-textarea'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: { label: 'No resize', resize: 'none', rows: 3 },
    },
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Vertical resize (default)', resize: 'vertical', rows: 3 },
    },
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Auto resize', resize: 'auto', rows: 3 },
    },
  ],
};

export const textareaStoryError: Story<'io-textarea'> = {
  state: {
    properties: {
      label: 'Message',
      state: 'error',
      message: 'This field is required',
    },
  },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: {
        label: 'Message',
        state: 'error',
        message: 'This field is required',
        rows: 4,
      },
    },
  ],
};

export const textareaStoryDisabled: Story<'io-textarea'> = {
  state: { properties: { label: 'Message', disabled: true, rows: 4 } },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Message', disabled: true, rows: 4 },
    },
  ],
};

export const textareaStorySizes: Story<'io-textarea'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-textarea' as const, properties: { label: 'Small', size: 'sm', rows: 3, placeholder: 'Compact notes' } },
    { tag: 'io-textarea' as const, properties: { label: 'Medium', size: 'md', rows: 3, placeholder: 'Default notes' } },
    { tag: 'io-textarea' as const, properties: { label: 'Large', size: 'lg', rows: 3, placeholder: 'Prominent notes' } },
  ],
};

export const textareaStoryReadOnly: Story<'io-textarea'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Terms & Conditions', readOnly: true, rows: 4, value: 'These terms are read-only and cannot be changed.' },
    },
  ],
};

export const textareaStoryLoading: Story<'io-textarea'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Generating…', loading: true, rows: 4, placeholder: 'AI response will appear here' },
    },
  ],
};

export const textareaStoryCounter: Story<'io-textarea'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: { label: 'Bio', counter: true, maxLength: 200, rows: 4, placeholder: 'Tell us about yourself' },
    },
  ],
};

export const textareaPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Message',
    description: 'Sets the field label shown above the textarea.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    description: 'Aligns field height with io-button sizes.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '',
    description: 'Displays hint text when the field is empty.',
  },
  {
    name: 'rows',
    type: 'number',
    defaultValue: 4,
    description: 'Sets the initial visible row count.',
  },
  {
    name: 'resize',
    type: 'select',
    options: ['none', 'vertical', 'auto'],
    defaultValue: 'vertical',
    description: 'Controls whether and how the textarea can be resized.',
  },
  {
    name: 'readOnly',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents editing while keeping the field focusable and selectable.',
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
    name: 'spellCheck',
    type: 'boolean',
    defaultValue: undefined,
    description: 'Enables or disables browser spell-check on the textarea.',
  },
  {
    name: 'form',
    type: 'string',
    defaultValue: undefined,
    description: 'Associates the textarea with a form element by its id (for out-of-DOM usage).',
  },
  {
    name: 'wrap',
    type: 'select',
    options: ['soft', 'hard', 'off'],
    defaultValue: undefined,
    description: 'Controls how line breaks are submitted with form data.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents editing and focus interactions.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form submission.',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success', 'warning'],
    defaultValue: 'none',
    description: 'Validation state — controls border color and message color.',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Shows validation feedback below the textarea.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the textarea.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Supplementary description shown below the field for additional context.',
  },
];
