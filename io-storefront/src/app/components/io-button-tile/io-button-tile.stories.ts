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
  { key: 'label', type: 'string', default: 'Add to dashboard' },
  { key: 'description', type: 'string', default: 'Click to add this widget.' },
  { key: 'aspectRatio', type: 'select', options: ['1/1', '4/3', '3/4', '16/9'], default: '4/3' },
  { key: 'align', type: 'select', options: ['top', 'bottom'], default: 'bottom' },
  { key: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  { key: 'weight', type: 'select', options: ['regular', 'medium', 'semibold', 'bold'], default: 'semibold' },
  { key: 'gradient', type: 'boolean', default: true },
  { key: 'disabled', type: 'boolean', default: false },
  { key: 'loading', type: 'boolean', default: false },
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
