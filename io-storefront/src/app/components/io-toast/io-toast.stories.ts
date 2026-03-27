import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const toastStory: Story<'io-toast-item'> = {
  state: {
    properties: {
      variant: 'neutral',
      text: 'Notification message.',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-toast-item' as const,
      properties: {
        variant: (properties?.variant as string) ?? 'neutral',
        text: (properties?.text as string) ?? 'Notification message.',
      },
    },
  ],
};

export const toastStoryNeutral: Story<'io-toast-item'> = {
  state: { properties: { variant: 'neutral', text: 'Notification message.' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'neutral', text: 'Notification message.' },
    },
  ],
};

export const toastStorySuccess: Story<'io-toast-item'> = {
  state: { properties: { variant: 'success', text: 'Settings saved successfully.' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'success', text: 'Settings saved successfully.' },
    },
  ],
};

export const toastStoryError: Story<'io-toast-item'> = {
  state: { properties: { variant: 'error', text: 'Something went wrong. Please try again.' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'error', text: 'Something went wrong. Please try again.' },
    },
  ],
};

export const toastStoryWarning: Story<'io-toast-item'> = {
  state: { properties: { variant: 'warning', text: 'Your session will expire in 5 minutes.' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'warning', text: 'Your session will expire in 5 minutes.' },
    },
  ],
};

export const toastStoryInfo: Story<'io-toast-item'> = {
  state: { properties: { variant: 'info', text: 'A new version is available.' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'info', text: 'A new version is available.' },
    },
  ],
};

export const toastPropDefinitions: PropDefinition[] = [
  {
    name: 'text',
    type: 'string',
    defaultValue: 'Notification message.',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['neutral', 'success', 'error', 'warning', 'info'],
    defaultValue: 'neutral',
  },
];
