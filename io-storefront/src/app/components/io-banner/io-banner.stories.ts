import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

export const bannerStory: Story<'io-banner'> = {
  state: {
    properties: {
      variant: 'info',
      heading: '',
      open: false,
      dismissible: false,
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Show banner'],
        events: {
          onClick: { target: 'io-banner', prop: 'open', value: true },
        },
      },
      {
        tag: 'io-banner' as const,
        properties: {
          variant: props['variant'] ?? 'info',
          heading: props['heading'] ?? '',
          open: props['open'] ?? false,
          dismissible: props['dismissible'] ?? false,
        },
        children: ['Scheduled maintenance on Saturday 10:00–12:00 UTC. Services may be briefly interrupted.'],
        events: {
          onDismiss: { target: 'io-banner', prop: 'open', value: false },
        },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
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
    description: 'Optional heading text rendered above the body content.',
  },
  {
    name: 'headingTag',
    type: 'select',
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    defaultValue: 'h5',
    description: 'Semantic HTML tag for the heading element (WCAG 1.3.1).',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Optional plain-text description rendered below the heading.',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: false,
    description: 'Controls banner visibility. Set to true to show, false to hide.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, renders a dismiss button. Escape key also closes the banner.',
  },
  {
    name: 'position',
    type: 'select',
    options: ['top', 'bottom'],
    defaultValue: 'top',
    description: 'Viewport edge where the banner is fixed (top or bottom).',
  },
];
