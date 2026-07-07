import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const wordmarkStory: Story<'io-wordmark'> = {
  state: {
    properties: {
      variant: 'mark',
      color: 'blue',
      size: 'md',
    },
  },
  generator: ({ properties } = {}) => {
    const filteredProps = Object.fromEntries(
      Object.entries(properties ?? {}).filter(([, v]) => v !== '' && v !== undefined),
    );
    return [{ tag: 'io-wordmark' as const, properties: filteredProps, children: [] }];
  },
};

// ── Variant stories ───────────────────────────────────────────────────────────

export const wordmarkStoryVariants: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['mark', 'lockup', 'badge'] as const).map((variant) => ({
      tag: 'io-wordmark' as const,
      properties: { variant, size: 'md' },
      children: [],
    })),
};

// ── Size stories ──────────────────────────────────────────────────────────────

export const wordmarkStoryMarkSizes: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-wordmark' as const,
      properties: { variant: 'mark' as const, size },
      children: [],
    })),
};

export const wordmarkStoryLockupSizes: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-wordmark' as const,
      properties: { variant: 'lockup' as const, size },
      children: [],
    })),
};

// ── Colour stories ────────────────────────────────────────────────────────────

export const wordmarkStoryMarkColors: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['blue', 'black', 'white', 'beige'] as const).map((color) => ({
      tag: 'io-wordmark' as const,
      properties: { variant: 'mark' as const, color, size: 'lg' },
      children: [],
    })),
};

export const wordmarkStoryLockupColors: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['blue', 'black', 'white'] as const).map((color) => ({
      tag: 'io-wordmark' as const,
      properties: { variant: 'lockup' as const, color, size: 'md' },
      children: [],
    })),
};

// ── Badge story ───────────────────────────────────────────────────────────────

export const wordmarkStoryBadge: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['blue', 'black', 'white'] as const).map((color) => ({
      tag: 'io-wordmark' as const,
      properties: { variant: 'badge' as const, color, size: 'lg' },
      children: [],
    })),
};

// ── Prop definitions ──────────────────────────────────────────────────────────

export const wordmarkPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['mark', 'lockup', 'badge'],
    defaultValue: 'mark',
    description: 'Which visual representation to render. mark = geometric iO mark. lockup = full brand lockup. badge = square brand mark for app icons and avatars.',
  },
  {
    name: 'color',
    type: 'select',
    options: ['blue', 'black', 'white', 'beige'],
    defaultValue: 'blue',
    description: 'Colour applied to the wordmark. "beige" is only valid on variant="mark".',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg', 'xl', 'inherit'],
    defaultValue: 'md',
    description: 'Controls SVG height for mark and lockup variants.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: 'io Digital',
    description: 'Accessible label for the host element.',
  },
  {
    name: 'href',
    type: 'string',
    defaultValue: '',
    description: 'When set, renders the wordmark as a link pointing to this URL.',
  },
  {
    name: 'target',
    type: 'select',
    options: ['_self', '_blank', '_parent', '_top'],
    defaultValue: '_self',
    description: 'Target attribute applied to the rendered link when href is set.',
  },
];
