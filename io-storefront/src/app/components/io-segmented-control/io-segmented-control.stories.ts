import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const segmentedControlStory: Story<'io-segmented-control'> = {
  state: {
    properties: {
      value: 'list',
      name: 'view',
      label: 'View mode',
      disabled: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-segmented-control' as const,
      properties: properties ?? {},
      children: [
        { tag: 'io-segment' as const, properties: { value: 'list', label: 'List' } },
        { tag: 'io-segment' as const, properties: { value: 'grid', label: 'Grid' } },
        { tag: 'io-segment' as const, properties: { value: 'map', label: 'Map' } },
      ],
    },
  ],
};

export const segmentedControlStoryDefault: Story<'io-segmented-control'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-segmented-control' as const,
      properties: { name: 'view-default' },
      children: [
        { tag: 'io-segment' as const, properties: { value: 'list', label: 'List' } },
        { tag: 'io-segment' as const, properties: { value: 'grid', label: 'Grid' } },
        { tag: 'io-segment' as const, properties: { value: 'map', label: 'Map' } },
      ],
    },
  ],
};

export const segmentedControlStoryPreselected: Story<'io-segmented-control'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-segmented-control' as const,
      properties: { name: 'density', value: 'comfortable' },
      children: [
        { tag: 'io-segment' as const, properties: { value: 'compact', label: 'Compact' } },
        { tag: 'io-segment' as const, properties: { value: 'comfortable', label: 'Comfortable' } },
        { tag: 'io-segment' as const, properties: { value: 'spacious', label: 'Spacious' } },
      ],
    },
  ],
};

export const segmentedControlStoryTwoOptions: Story<'io-segmented-control'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-segmented-control' as const,
      properties: { name: 'theme', value: 'light' },
      children: [
        { tag: 'io-segment' as const, properties: { value: 'light', label: 'Light' } },
        { tag: 'io-segment' as const, properties: { value: 'dark', label: 'Dark' } },
      ],
    },
  ],
};

export const segmentedControlStoryDisabled: Story<'io-segmented-control'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-segmented-control' as const,
      properties: { name: 'view-disabled', value: 'grid', disabled: true },
      children: [
        { tag: 'io-segment' as const, properties: { value: 'list', label: 'List' } },
        { tag: 'io-segment' as const, properties: { value: 'grid', label: 'Grid' } },
        { tag: 'io-segment' as const, properties: { value: 'map', label: 'Map' } },
      ],
    },
  ],
};

export const segmentedControlPropDefinitions: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    defaultValue: 'list',
    description: 'Currently selected segment value. Controls which io-segment child renders as selected.',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'view',
    description: 'HTML name attribute for form participation. Submitted with the form as name=value.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'View mode',
    description: 'Accessible label for the control group. Required for WCAG 4.1.2.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, hides the visible label. The label prop is still used as aria-label.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables the entire control and all child segments. Propagated to all io-segment children.',
  },
];
