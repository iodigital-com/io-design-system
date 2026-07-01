import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const switchStory: Story<'io-switch'> = {
  state: {
    properties: {
      label: 'Enable notifications',
      checked: false,
      required: false,
      disabled: false,
      loading: false,
      error: false,
      errorMessage: '',
      helperText: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-switch' as const,
      properties: {
        label: (properties?.label as string) ?? 'Enable notifications',
        checked: (properties?.checked as boolean) ?? false,
        required: (properties?.required as boolean) ?? false,
        disabled: (properties?.disabled as boolean) ?? false,
        loading: (properties?.loading as boolean) ?? false,
        error: (properties?.error as boolean) ?? false,
        errorMessage: (properties?.errorMessage as string) ?? undefined,
        helperText: (properties?.helperText as string) ?? undefined,
      },
    },
  ],
};

export const switchStoryDefault: Story<'io-switch'> = {
  state: { properties: { label: 'Enable notifications', checked: false } },
  generator: () => [
    {
      tag: 'io-switch' as const,
      properties: { label: 'Enable notifications', checked: false },
    },
  ],
};

export const switchStoryChecked: Story<'io-switch'> = {
  state: { properties: { label: 'Dark mode enabled', checked: true } },
  generator: () => [
    {
      tag: 'io-switch' as const,
      properties: { label: 'Dark mode enabled', checked: true },
    },
  ],
};

export const switchStoryWithHelper: Story<'io-switch'> = {
  state: { properties: { label: 'Marketing emails', helperText: 'Receive weekly updates about our products.' } },
  generator: () => [
    {
      tag: 'io-switch' as const,
      properties: { label: 'Marketing emails', helperText: 'Receive weekly updates about our products.' },
    },
  ],
};

export const switchStoryError: Story<'io-switch'> = {
  state: {
    properties: {
      label: 'Accept data processing',
      error: true,
      errorMessage: 'You must accept to continue',
    },
  },
  generator: () => [
    {
      tag: 'io-switch' as const,
      properties: {
        label: 'Accept data processing',
        error: true,
        errorMessage: 'You must accept to continue',
      },
    },
  ],
};

export const switchStoryDisabled: Story<'io-switch'> = {
  state: { properties: { label: 'Unavailable feature', disabled: true } },
  generator: () => [
    {
      tag: 'io-switch' as const,
      properties: { label: 'Unavailable feature', disabled: true },
    },
    {
      tag: 'io-switch' as const,
      properties: { label: 'Disabled and on', disabled: true, checked: true },
    },
  ],
};

export const switchPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Enable notifications',
    description: 'Sets the accessible text label next to the switch.',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
    description: 'Controls whether the switch is on or off.',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: 'on',
    description: 'Value submitted with the form when the switch is on.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form validation.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Prevents toggling and focus interactions.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading spinner and blocks interaction.',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Renders a smaller track and thumb for dense UI contexts.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually hides the label while keeping it accessible to screen readers.',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: false,
    description: 'Applies the invalid visual state.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    defaultValue: '',
    description: 'Shows validation feedback below the switch.',
  },
  {
    name: 'helperText',
    type: 'string',
    defaultValue: '',
    description: 'Displays supporting guidance below the switch.',
  },
  {
    name: 'alignLabel',
    type: 'select',
    options: ['start', 'end'],
    defaultValue: 'end',
    description: 'Controls whether the label appears before (start) or after (end) the toggle.',
  },
  {
    name: 'stretch',
    type: 'boolean',
    defaultValue: false,
    description: 'Makes the switch fill the width of its container, pushing the label and toggle to opposite ends.',
  },
];
