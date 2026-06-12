import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const inlineNotificationStory: Story<'io-inline-notification'> = {
  state: {
    properties: {
      variant: 'info',
      heading: '',
      dismissible: false,
      actionLabel: '',
      actionIcon: 'arrow-right',
      actionLoading: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-inline-notification' as const,
      properties: properties ?? {},
      children: ['Your session expires in 5 minutes. Save your work to avoid losing changes.'],
    },
  ],
};

export const inlineNotificationPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['info', 'success', 'warning', 'error'],
    defaultValue: 'info',
    description: 'Sets the severity level and associated icon, colour, and live region role.',
  },
  {
    name: 'heading',
    type: 'string',
    defaultValue: '',
    description: 'Optional bold heading rendered above the slotted content.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, renders a dismiss button that emits the dismiss event on click.',
  },
  {
    name: 'actionLabel',
    type: 'string',
    defaultValue: '',
    description: 'Label for the optional inline call-to-action button. When empty, no action button is rendered.',
  },
  {
    name: 'actionIcon',
    type: 'string',
    defaultValue: 'arrow-right',
    description: 'Icon rendered on the action button. Accepts any IoIconName value.',
  },
  {
    name: 'actionLoading',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, the action button shows a loading spinner and the action event is suppressed.',
  },
];
