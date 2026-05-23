import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const fileUploadStory: Story<'io-file-upload'> = {
  state: {
    properties: {
      label: 'Upload files',
      accept: '*',
      multiple: false,
      disabled: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-file-upload' as const,
      properties: {
        label: (properties?.label as string) ?? 'Upload files',
        accept: (properties?.accept as string) ?? '*',
        multiple: (properties?.multiple as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) ?? undefined,
        helperText: (properties?.helperText as string) ?? undefined,
      },
    },
  ],
};

export const fileUploadStoryDefault: Story<'io-file-upload'> = {
  state: { properties: { label: 'Upload documents', accept: '.pdf,.docx' } },
  generator: () => [
    {
      tag: 'io-file-upload' as const,
      properties: { label: 'Upload documents', accept: '.pdf,.docx' },
    },
  ],
};

export const fileUploadStoryMultiple: Story<'io-file-upload'> = {
  state: { properties: { label: 'Upload photos', accept: 'image/*', multiple: true } },
  generator: () => [
    {
      tag: 'io-file-upload' as const,
      properties: { label: 'Upload photos', accept: 'image/*', multiple: true },
    },
  ],
};

export const fileUploadStoryWithHelper: Story<'io-file-upload'> = {
  state: {
    properties: {
      label: 'Upload profile picture',
      accept: 'image/*',
      helperText: 'Accepted formats: JPG, PNG, WebP. Max size: 5 MB.',
    },
  },
  generator: () => [
    {
      tag: 'io-file-upload' as const,
      properties: {
        label: 'Upload profile picture',
        accept: 'image/*',
        helperText: 'Accepted formats: JPG, PNG, WebP. Max size: 5 MB.',
      },
    },
  ],
};

export const fileUploadStoryError: Story<'io-file-upload'> = {
  state: {
    properties: {
      label: 'Upload CV',
      accept: '.pdf',
      error: true,
      errorMessage: 'Only PDF files are accepted.',
    },
  },
  generator: () => [
    {
      tag: 'io-file-upload' as const,
      properties: {
        label: 'Upload CV',
        accept: '.pdf',
        error: true,
        errorMessage: 'Only PDF files are accepted.',
      },
    },
  ],
};

export const fileUploadStoryDisabled: Story<'io-file-upload'> = {
  state: { properties: { label: 'Upload files', disabled: true } },
  generator: () => [
    {
      tag: 'io-file-upload' as const,
      properties: { label: 'Upload files', disabled: true },
    },
  ],
};

export const fileUploadPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Upload files',
    description: 'Visible label for the drop zone. Also used as the accessible name.',
  },
  {
    name: 'accept',
    type: 'string',
    defaultValue: '*',
    description: 'Comma-separated list of accepted MIME types or file extensions (e.g. ".pdf,image/*").',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: false,
    description: 'Allows selecting multiple files at once.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables all drag, click, and keyboard interactions.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Applies the invalid visual state with a red border.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: '',
    description: 'Validation error shown below the drop zone when error is true.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Optional hint text shown below the drop zone when there is no error.',
  },
];
