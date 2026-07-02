import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const badgeStory: Story<'io-badge'> = {
  state: {
    properties: {
      variant: 'primary',
      size: 'md',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-badge' as const,
      properties: properties ?? {},
      children: ['Badge'],
    },
  ],
};

export const badgeStoryVariants: Story<'io-badge'> = {
  state: { properties: { variant: 'primary', size: 'md' } },
  generator: () =>
    (['neutral', 'primary', 'info', 'success', 'warning', 'error', 'subtle'] as const).map(
      (variant) => ({ tag: 'io-badge' as const, properties: { variant, size: 'md' }, children: [variant] }),
    ),
};

export const badgeStorySizes: Story<'io-badge'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-badge' as const, properties: { variant: 'primary', size: 'sm' }, children: ['Small'] },
    { tag: 'io-badge' as const, properties: { variant: 'primary', size: 'md' }, children: ['Medium'] },
    { tag: 'io-badge' as const, properties: { variant: 'primary', size: 'lg' }, children: ['Large'] },
  ],
};

export const badgePropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    description: 'Adjusts badge density for compact or standard layouts.',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['neutral', 'primary', 'info', 'success', 'warning', 'error', 'subtle'],
    defaultValue: 'primary',
    description: 'Sets visual style and semantic meaning of the badge.',
  },
  {
    name: 'appearance',
    type: 'select',
    options: ['solid', 'soft', 'frosted'],
    defaultValue: 'soft',
    description: 'Fill style of the badge: solid (fully-filled), soft (translucent tint, default), or frosted (backdrop-blur).',
  },
  {
    name: 'icon',
    type: 'string',
    defaultValue: '',
    description: 'Optional leading icon name from the io icon set. Rendered aria-hidden at size xs.',
  },
  {
    name: 'iconSource',
    type: 'string',
    defaultValue: '',
    description: 'Custom SVG URL for the leading icon. Takes precedence over icon when both are set.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label for decorative badges. Only set when badge conveys meaning not expressed by its text content.',
  },
];
