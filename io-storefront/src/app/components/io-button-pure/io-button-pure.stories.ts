import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const buttonPureStory: Story<'io-button-pure'> = {
  state: {
    properties: {
      disabled: false,
      underline: false,
      active: false,
      stretch: false,
      alignLabel: 'start',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-button-pure' as const,
      properties: properties ?? {},
      children: ['View details'],
    },
  ],
};

export const buttonPureStoryStates: Story<'io-button-pure'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-button-pure' as const, properties: {}, children: ['Default'] },
    { tag: 'io-button-pure' as const, properties: { underline: true }, children: ['With underline'] },
    { tag: 'io-button-pure' as const, properties: { active: true }, children: ['Active state'] },
    { tag: 'io-button-pure' as const, properties: { disabled: true }, children: ['Disabled'] },
  ],
};

export const buttonPureStoryAlignLabel: Story<'io-button-pure'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button-pure' as const,
      properties: { alignLabel: 'start' as const, icon: 'arrow-right' as const },
      children: ['Icon before label'],
    },
    {
      tag: 'io-button-pure' as const,
      properties: { alignLabel: 'end' as const, icon: 'arrow-right' as const },
      children: ['Icon after label'],
    },
  ],
};

export const buttonPurePropDefinitions: PropDefinition[] = [
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables the button and applies reduced opacity.',
  },
  {
    name: 'underline',
    type: 'boolean',
    defaultValue: false,
    description: 'Renders a persistent text underline.',
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the button as the currently active item.',
  },
  {
    name: 'stretch',
    type: 'boolean',
    defaultValue: false,
    description: 'Stretches the button to fill its parent container width.',
  },
  {
    name: 'alignLabel',
    type: 'select',
    options: ['start', 'end'],
    defaultValue: 'start',
    description: "Controls the icon side. 'start' puts the icon before the label; 'end' puts it after.",
  },
];
