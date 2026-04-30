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
      error: false,
      errorMessage: '',
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
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) || undefined,
        helperText: (properties?.helperText as string) || undefined,
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
      error: true,
      errorMessage: 'This field is required',
    },
  },
  generator: () => [
    {
      tag: 'io-textarea' as const,
      properties: {
        label: 'Message',
        error: true,
        errorMessage: 'This field is required',
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
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Applies the invalid visual state.',
  },
  {
    name: 'errorMessage',
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
];
