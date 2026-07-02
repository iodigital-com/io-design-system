import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const progressStory: Story<'io-progress'> = {
  state: {
    properties: {
      value: 60,
      color: 'blue',
      size: 'md',
      animated: true,
      showLabel: false,
      label: 'Progress',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-progress' as const,
      properties: {
        value: (properties?.value as number) ?? 60,
        color: (properties?.color as string) ?? 'blue',
        size: (properties?.size as string) ?? 'md',
        animated: (properties?.animated as boolean) !== false,
        showLabel: (properties?.showLabel as boolean) === true,
        ...(properties?.label ? { label: properties.label as string } : {}),
      },
    },
  ],
};

export const progressStoryDefault: Story<'io-progress'> = {
  state: { properties: { value: 60, color: 'blue', size: 'md', animated: true, showLabel: false } },
  generator: () => [
    {
      tag: 'io-progress' as const,
      properties: { value: 60, color: 'blue', size: 'md', animated: true, label: 'Upload progress' },
    },
  ],
};

export const progressStoryColors: Story<'io-progress'> = {
  state: { properties: { value: 75, color: 'orange', size: 'md' } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 75, color: 'orange', size: 'md', label: 'Progress' } },
  ],
};

export const progressStorySizes: Story<'io-progress'> = {
  state: { properties: { value: 50, color: 'blue', size: 'sm' } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 50, color: 'blue', size: 'sm', label: 'Progress' } },
  ],
};

export const progressStoryWithLabel: Story<'io-progress'> = {
  state: { properties: { value: 88, color: 'success', size: 'md', showLabel: true } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 88, color: 'success', size: 'md', showLabel: true, label: 'Download progress' } },
  ],
};

export const progressStoryEmpty: Story<'io-progress'> = {
  state: { properties: { value: 0, color: 'blue', size: 'md' } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 0, color: 'blue', size: 'md', label: 'Progress' } },
  ],
};

export const progressStorySuccess: Story<'io-progress'> = {
  state: { properties: { value: 100, color: 'success', size: 'md', showLabel: true } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 100, color: 'success', size: 'md', showLabel: true, label: 'Upload complete' } },
  ],
};

export const progressStoryWarning: Story<'io-progress'> = {
  state: { properties: { value: 45, color: 'warning', size: 'md' } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 45, color: 'warning', size: 'md', label: 'Storage usage' } },
  ],
};

export const progressStoryError: Story<'io-progress'> = {
  state: { properties: { value: 30, color: 'error', size: 'md' } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { value: 30, color: 'error', size: 'md', label: 'Upload failed' } },
  ],
};

export const progressStoryIndeterminate: Story<'io-progress'> = {
  state: { properties: { indeterminate: true, color: 'blue', size: 'md' } },
  generator: () => [
    { tag: 'io-progress' as const, properties: { indeterminate: true, color: 'blue', size: 'md', label: 'Loading' } },
  ],
};

export const progressPropDefinitions: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    defaultValue: 60,
    description: 'Progress percentage from 0 to 100. Automatically clamped.',
  },
  {
    name: 'color',
    type: 'select',
    options: ['blue', 'orange', 'success', 'warning', 'error'],
    defaultValue: 'blue',
    description: 'Colour variant for the progress fill.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    description: 'Track height: sm=4px, md=8px, lg=12px.',
  },
  {
    name: 'shape',
    type: 'select',
    options: ['linear', 'circular', 'step'],
    defaultValue: 'linear',
    description: 'Visual variant: linear = horizontal bar, circular = SVG ring, step = segmented step bar.',
  },
  {
    name: 'animated',
    type: 'boolean',
    defaultValue: true,
    description: 'Animate width changes. Disabled automatically by prefers-reduced-motion.',
  },
  {
    name: 'showLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Render visible percentage text below the track.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible aria-label for screen readers.',
  },
  {
    name: 'labelledBy',
    type: 'string',
    defaultValue: '',
    description: 'ID of an external heading element that labels this progress bar. Sets aria-labelledby.',
  },
  {
    name: 'valueText',
    type: 'string',
    defaultValue: '',
    description: 'Human-readable text alternative to the numeric aria-valuenow (e.g. "Step 2 of 5"). Sets aria-valuetext.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: false,
    description: 'Switches to indeterminate (infinite shimmer) mode. Omits aria-valuenow when true.',
  },
  {
    name: 'min',
    type: 'number',
    defaultValue: 0,
    description: 'Minimum value. Maps to aria-valuemin.',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: 100,
    description: 'Maximum value. Maps to aria-valuemax.',
  },
];
