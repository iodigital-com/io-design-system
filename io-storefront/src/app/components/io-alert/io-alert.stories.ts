import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const alertStory: Story<'io-alert'> = {
  state: {
    properties: {
      variant: 'info',
      heading: '',
      dismissible: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-alert' as const,
      properties: properties ?? {},
      children: ['Your session expires in 5 minutes.'],
    },
  ],
};

export const alertPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['info', 'success', 'warning', 'error'],
    defaultValue: 'info',
    description: 'Sets the severity level and associated icon, colour, and live region role.',
  },
  {
    name: 'heading',
    type: 'text',
    defaultValue: '',
    description: 'Optional bold heading rendered above the slotted content.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, renders a dismiss button that emits the dismiss event on click.',
  },
];
