import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

const DEFAULT_CHILDREN = [
  { tag: 'io-option' as const, properties: { value: 'nl', label: 'Netherlands' } },
  { tag: 'io-option' as const, properties: { value: 'be', label: 'Belgium' } },
  { tag: 'io-option' as const, properties: { value: 'de', label: 'Germany' } },
  { tag: 'io-option' as const, properties: { value: 'fr', label: 'France' } },
  { tag: 'io-option' as const, properties: { value: 'es', label: 'Spain' } },
  { tag: 'io-option' as const, properties: { value: 'it', label: 'Italy' } },
  { tag: 'io-option' as const, properties: { value: 'se', label: 'Sweden', disabled: true } },
];

export const multiSelectStory: Story<'io-multi-select'> = {
  state: {
    properties: {
      label: 'Countries',
      placeholder: 'Select countries',
      disabled: false,
      required: false,
      state: 'none',
      message: '',
      filterable: false,
      filterPlaceholder: 'Search...',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-multi-select' as const,
      properties: {
        name: 'countries',
        label: (properties?.label as string) ?? 'Countries',
        placeholder: (properties?.placeholder as string) || undefined,
        disabled: (properties?.disabled as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        state: (properties?.state as string) ?? 'none',
        message: (properties?.message as string) || undefined,
        filterable: (properties?.filterable as boolean) ?? false,
        filterPlaceholder: (properties?.filterPlaceholder as string) || undefined,
        hideLabel: (properties?.hideLabel as boolean) ?? false,
      },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryDefault: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries' } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: { name: 'countries', label: 'Countries' },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryWithFilter: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries', filterable: true } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: { name: 'countries', label: 'Countries', filterable: true, filterPlaceholder: 'Search countries' },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryError: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries', state: 'error', message: 'Please select at least one country' } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: {
        name: 'countries',
        label: 'Countries',
        state: 'error',
        message: 'Please select at least one country',
      },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryPreselected: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries' } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: { name: 'countries', label: 'Countries', value: ['nl', 'de'] },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryRequired: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries', required: true } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: { name: 'countries', label: 'Countries', required: true, placeholder: 'Select at least one country' },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryMaxDisplay: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries' } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: { name: 'countries', label: 'Countries', value: ['nl', 'be', 'de', 'fr', 'es'], maxDisplay: 2 },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectStoryDisabled: Story<'io-multi-select'> = {
  state: { properties: { label: 'Countries', disabled: true } },
  generator: () => [
    {
      tag: 'io-multi-select' as const,
      properties: { name: 'countries', label: 'Countries', value: ['nl', 'be'], disabled: true },
      children: DEFAULT_CHILDREN,
    },
  ],
};

export const multiSelectPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Countries',
    description: 'Sets the field label shown above the trigger.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'Select options',
    description: 'Displays hint text when no values are selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents opening and changing the selection.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form submission.',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success', 'warning'],
    defaultValue: 'none',
    description: 'Visual and semantic validation state.',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Message text shown below the trigger (error, success, or helper).',
  },
  {
    name: 'filterable',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a search input inside the dropdown to filter options by label.',
  },
  {
    name: 'filterPlaceholder',
    type: 'string',
    defaultValue: 'Search...',
    description: 'Placeholder text for the filter search input. Only relevant when filterable is true.',
  },
  {
    name: 'dropdownDirection',
    type: 'select',
    options: ['auto', 'down', 'up'],
    defaultValue: 'auto',
    description: 'Direction the dropdown opens: auto (viewport-aware), down, or up.',
  },
  {
    name: 'maxDisplay',
    type: 'number',
    defaultValue: 3,
    description: 'Max number of selected labels shown in the trigger before collapsing to "{N} selected".',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Collapses the label area entirely. Provide a label value for screen-reader accessibility.',
  },
  {
    name: 'selectAll',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows "Select all" and "Clear all" footer buttons inside the dropdown.',
  },
  {
    name: 'maxSelections',
    type: 'number',
    defaultValue: 0,
    description: 'Maximum number of selections allowed before limitreached event fires.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Helper text displayed below the trigger. Hidden when state is error.',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Persistent description rendered below the field. Always visible, not hidden in error state.',
  },
];
