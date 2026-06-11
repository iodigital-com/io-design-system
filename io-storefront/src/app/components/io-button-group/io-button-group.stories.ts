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
      type: 'single',
      value: 'day',
      disabled: false,
      label: 'View period',
      variant: 'primary',
      direction: 'row',
      compact: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-button-group' as const,
      properties: {
        type: (properties?.type as 'single' | 'multiple') ?? 'single',
        value: properties?.value as string ?? 'day',
        disabled: properties?.disabled as boolean ?? false,
        label: properties?.label as string ?? 'View period',
        variant: (properties?.variant as 'primary' | 'secondary') ?? 'primary',
        direction: (properties?.direction as 'row' | 'column') ?? 'row',
        compact: properties?.compact as boolean ?? false,
        hideLabel: (properties?.hideLabel as boolean) ?? false,
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
  state: { properties: { type: 'single', value: 'week' } },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'week', label: 'View period' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryMultiSelect: Story<'io-button-group'> = {
  state: { properties: { type: 'multiple', value: ['mon', 'wed'] } },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'multiple', value: ['mon', 'wed'], label: 'Working days' },
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
      properties: { type: 'single', value: 'week', disabled: true, label: 'View period (disabled)' },
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
      properties: { type: 'single', value: 'day', label: 'View period' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week', true),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryVariantPrimary: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'week', variant: 'primary', label: 'View period (primary — default)' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryVariantSecondary: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'week', variant: 'secondary', label: 'View period (secondary)' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryDirectionRow: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'week', direction: 'row', label: 'View period (row — default)' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryDirectionColumn: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'edit', direction: 'column', label: 'Actions' },
      children: [
        createButtonGroupItem('edit', 'Edit'),
        createButtonGroupItem('duplicate', 'Duplicate'),
        createButtonGroupItem('archive', 'Archive'),
      ],
    },
  ],
};

export const buttonGroupStoryCompact: Story<'io-button-group'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'week', compact: true, label: 'View period (compact)' },
      children: [
        createButtonGroupItem('day', 'Day'),
        createButtonGroupItem('week', 'Week'),
        createButtonGroupItem('month', 'Month'),
      ],
    },
  ],
};

export const buttonGroupStoryWithIcons: Story<'io-button-group'> = {
  state: { properties: { type: 'single', value: 'calendar', label: 'View mode' } },
  generator: () => [
    {
      tag: 'io-button-group' as const,
      properties: { type: 'single', value: 'calendar', label: 'View mode' },
      children: [
        { tag: 'io-button' as const, properties: { value: 'calendar', icon: 'calendar' }, children: ['Calendar'] },
        { tag: 'io-button' as const, properties: { value: 'table', icon: 'table' }, children: ['Table'] },
        { tag: 'io-button' as const, properties: { value: 'chart', icon: 'chart-bar' }, children: ['Chart'] },
      ],
    },
  ],
};

export const buttonGroupPropDefinitions: PropDefinition[] = [
  {
    name: 'type',
    type: 'select',
    options: ['single', 'multiple'],
    defaultValue: 'single',
    description: "Selection mode. 'single' enables single-select (radiogroup) mode — arrow keys move focus and select simultaneously. 'multiple' enables multi-select (checkbox group) mode — arrow keys only move focus.",
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    description: 'Selected value(s). A single string in single mode; a comma-separated list represents multi-select state (managed programmatically as string[]).',
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
  {
    name: 'variant',
    type: 'select',
    options: ['primary', 'secondary'],
    defaultValue: 'primary',
    description: "Visual variant controlling the active-state color scheme. 'primary' uses brand blue fill with white text; 'secondary' uses a white/surface fill with shadow.",
  },
  {
    name: 'direction',
    type: 'select',
    options: ['row', 'column'],
    defaultValue: 'row',
    description: "Layout direction for the button group. 'row' lays buttons out horizontally (default); 'column' stacks them vertically.",
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Reduces height and padding for compact contexts like toolbars.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
];
