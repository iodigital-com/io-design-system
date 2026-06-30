import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const buttonTileStory: Story<'io-button-tile'> = {
  state: {
    properties: {
      label: 'Add to dashboard',
      description: 'Click to add this widget.',
      aspectRatio: '4/3',
      align: 'bottom',
      size: 'md',
      weight: 'semibold',
      gradient: true,
      disabled: false,
      loading: false,
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Button Tile', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    return [
      {
        tag: 'io-button-tile' as const,
        properties: { ...attrs, label },
        children: [],
      },
    ];
  },
};

export const buttonTilePropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Add to dashboard' },
  { name: 'description', type: 'string', defaultValue: 'Click to add this widget.' },
  { name: 'aspectRatio', type: 'select', options: ['1/1', '4/3', '3/4', '16/9'], defaultValue: '4/3' },
  { name: 'align', type: 'select', options: ['top', 'bottom'], defaultValue: 'bottom' },
  { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  { name: 'weight', type: 'select', options: ['regular', 'medium', 'semibold', 'bold'], defaultValue: 'semibold' },
  { name: 'gradient', type: 'boolean', defaultValue: true },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'loading', type: 'boolean', defaultValue: false },
];

export const buttonTileStoryStates: Story<'io-button-tile'> = {
  state: { properties: { label: 'Tile', gradient: true } },
  generator: () => [
    {
      tag: 'io-button-tile' as const,
      properties: { label: 'Default', gradient: true },
      children: [],
    },
    {
      tag: 'io-button-tile' as const,
      properties: { label: 'Disabled', gradient: true, disabled: true },
      children: [],
    },
    {
      tag: 'io-button-tile' as const,
      properties: { label: 'Loading', gradient: true, loading: true },
      children: [],
    },
  ],
};
