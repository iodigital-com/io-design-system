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
  { name: 'href', type: 'string', defaultValue: '/components/io-link' },
  { name: 'target', type: 'string', defaultValue: '_self' },
  { name: 'rel', type: 'string', defaultValue: undefined },
  { name: 'download', type: 'string', defaultValue: undefined },
  { name: 'label', type: 'string', defaultValue: 'Explore io-link' },
  { name: 'description', type: 'string', defaultValue: 'Animated underline hyperlink component.' },
  { name: 'aspectRatio', type: 'select', options: ['1/1', '4/3', '3/4', '16/9'], defaultValue: '4/3' },
  { name: 'align', type: 'select', options: ['top', 'bottom'], defaultValue: 'bottom' },
  { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  { name: 'weight', type: 'select', options: ['regular', 'medium', 'semibold', 'bold'], defaultValue: 'semibold' },
  { name: 'gradient', type: 'boolean', defaultValue: true },
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
