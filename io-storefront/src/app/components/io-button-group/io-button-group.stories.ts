import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

function createButtonGroupItem(value: string, label: string, disabled = false) {
  return {
    tag: 'io-button' as const,
    properties: {
      value,
      ...(disabled ? { disabled: true } : {}),
    },
    children: [label],
  };
}

export const buttonGroupStory: Story<'io-button-group'> = {
  state: {
    properties: {
      exclusive: false,
      value: '',
      disabled: false,
      label: 'View period',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-button-group' as const,
      properties: {
        exclusive: properties?.exclusive as boolean ?? false,
        value: properties?.value as string ?? '',
        disabled: properties?.disabled as boolean ?? false,
        label: properties?.label as string ?? 'View period',
      },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
      events: {
        onChange: {
          target: 'io-button-group',
          prop: 'value',
          eventValueKey: 'value',
        },
      },
    },
  ],
};

export const buttonGroupStoryExclusive: Story<'io-button-group'> = {
  state: { properties: { exclusive: true, value: 'week' } },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { exclusive: true, value: 'week', label: 'View period' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryMultiSelect: Story<'io-button-group'> = {
  state: { properties: { exclusive: false, value: ['mon', 'wed'] } },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { exclusive: false, value: ['mon', 'wed'], label: 'Working days' },
      children: [
        createButtonGroupItem('mon', 'Mon'),
        createButtonGroupItem('tue', 'Tue'),
        createButtonGroupItem('wed', 'Wed'),
        createButtonGroupItem('thu', 'Thu'),
        createButtonGroupItem('fri', 'Fri'),
      ],
    },
  ],
};

export const buttonGroupStoryDisabled: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { exclusive: true, value: 'week', disabled: true, label: 'View period (disabled)' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryItemDisabled: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { exclusive: true, value: 'day', label: 'View period' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week', true),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupPropDefinitions: PropDefinition[] = [
  {
    name: 'exclusive',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    description: 'Selected value(s). A single string in exclusive mode; a comma-separated list represents multi-select state (managed programmatically as string[]).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
  },
];
