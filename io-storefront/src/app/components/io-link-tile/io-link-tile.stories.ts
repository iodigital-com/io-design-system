import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const linkTileStory: Story<'io-link-tile'> = {
  state: {
    properties: {
      href: '/components/io-link',
      label: 'Explore io-link',
      description: 'Animated underline hyperlink component.',
      aspectRatio: '4/3',
      align: 'bottom',
      size: 'md',
      weight: 'semibold',
      gradient: true,
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Link Tile', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    return [
      {
        tag: 'io-link-tile' as const,
        properties: { ...attrs, label },
        children: [],
      },
    ];
  },
};

export const linkTilePropDefinitions: PropDefinition[] = [
  { key: 'href', type: 'string', default: '/components/io-link' },
  { key: 'label', type: 'string', default: 'Explore io-link' },
  { key: 'description', type: 'string', default: 'Animated underline hyperlink component.' },
  { key: 'aspectRatio', type: 'select', options: ['1/1', '4/3', '3/4', '16/9'], default: '4/3' },
  { key: 'align', type: 'select', options: ['top', 'bottom'], default: 'bottom' },
  { key: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
  { key: 'weight', type: 'select', options: ['regular', 'medium', 'semibold', 'bold'], default: 'semibold' },
  { key: 'gradient', type: 'boolean', default: true },
];

export const linkTileStoryAspectRatios: Story<'io-link-tile'> = {
  state: { properties: { href: '#', label: 'Tile', gradient: true } },
  generator: () =>
    (['1/1', '4/3', '3/4', '16/9'] as const).map(ratio => ({
      tag: 'io-link-tile' as const,
      properties: { href: '#', label: ratio, aspectRatio: ratio, gradient: true },
      children: [],
    })),
};

export const linkTileStoryAlignments: Story<'io-link-tile'> = {
  state: { properties: { href: '#', label: 'Content' } },
  generator: () =>
    (['top', 'bottom'] as const).map(align => ({
      tag: 'io-link-tile' as const,
      properties: { href: '#', label: `Align: ${align}`, description: 'Supporting description text.', align, gradient: true },
      children: [],
    })),
};
