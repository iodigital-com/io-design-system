import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const toastStory: Story<'io-toast-item'> = {
  state: {
    properties: {
      variant: 'neutral',
      text: 'Notification message.',
      actionLabel: '',
      actionHref: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-toast-item' as const,
      properties: {
        variant: (properties?.variant as string) ?? 'neutral',
        text: (properties?.text as string) ?? 'Notification message.',
        ...(properties?.actionLabel ? { actionLabel: properties.actionLabel as string } : {}),
        ...(properties?.actionHref ? { actionHref: properties.actionHref as string } : {}),
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

export const toastStoryWithAction: Story<'io-toast-item'> = {
  state: { properties: { variant: 'neutral', text: 'Your file is ready.', actionLabel: 'Download' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'neutral', text: 'Your file is ready.', actionLabel: 'Download' },
    },
  ],
};

export const toastStoryWithActionHref: Story<'io-toast-item'> = {
  state: { properties: { variant: 'info', text: 'New release available.', actionLabel: 'View changelog', actionHref: '#' } },
  generator: () => [
    {
      tag: 'io-toast-item' as const,
      properties: { variant: 'info', text: 'New release available.', actionLabel: 'View changelog', actionHref: '#' },
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
  {
    name: 'actionLabel',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'actionHref',
    type: 'string',
    defaultValue: '',
  },
];
