import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const bannerStory: Story<'io-banner'> = {
  state: {
    properties: {
      variant: 'info',
      heading: '',
      open: true,
      dismissible: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-banner' as const,
      properties: properties ?? {},
      children: ['Scheduled maintenance on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.'],
    },
  ],
};

export const bannerPropDefinitions: PropDefinition[] = [
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
    name: 'open',
    type: 'boolean',
    defaultValue: true,
    description: 'Controls banner visibility. Set to true to show, false to hide.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, renders a dismiss button. Clicking it closes the banner and emits the dismiss event.',
  },
];
