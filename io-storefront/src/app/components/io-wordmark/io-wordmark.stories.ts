import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const wordmarkStory: Story<'io-wordmark'> = {
  state: {
    properties: {
      variant: 'text',
      color: 'blue',
      size: 'md',
      mono: false,
      href: '',
      target: '',
      rel: '',
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
    (['text', 'mark', 'lockup'] as const).map((variant) => ({
      tag: 'io-wordmark' as const,
      properties: { variant, size: 'md' },
      children: [],
    })),
};

// ── Size stories ──────────────────────────────────────────────────────────────

export const wordmarkStorySizes: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-wordmark' as const,
      properties: { size },
      children: [],
    })),
};

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

// beige excluded here — it is only valid on variant="mark" (see wordmarkStoryMarkColors)
export const wordmarkStoryColors: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['blue', 'black', 'white'] as const).map((color) => ({
      tag: 'io-wordmark' as const,
      properties: { color, size: 'lg' },
      children: [],
    })),
};

export const wordmarkStoryMarkColors: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () =>
    (['blue', 'black', 'white', 'beige'] as const).map((color) => ({
      tag: 'io-wordmark' as const,
      properties: { variant: 'mark' as const, color, size: 'lg' },
      children: [],
    })),
};

// ── Mono story ────────────────────────────────────────────────────────────────

export const wordmarkStoryMono: Story<'io-wordmark'> = {
  state: { properties: {} },
  generator: () => [
    { tag: 'io-wordmark' as const, properties: { size: 'lg', mono: false }, children: [] },
    { tag: 'io-wordmark' as const, properties: { size: 'lg', mono: true }, children: [] },
  ],
};

// ── Prop definitions ──────────────────────────────────────────────────────────

export const wordmarkPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['text', 'mark', 'lockup'],
    defaultValue: 'text',
    description: 'Which visual representation to render.',
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
    options: ['sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    description: 'Controls font-size (text variant) or SVG height (mark/lockup variants).',
  },
  {
    name: 'mono',
    type: 'boolean',
    defaultValue: false,
    description: 'Monochrome mode — both "io" and "digital" use the current text colour. Text variant only.',
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
    description: 'When provided on variant="text", renders the wordmark as an <a> element.',
  },
  {
    name: 'target',
    type: 'string',
    defaultValue: '',
    description: 'Browsing context for the link (e.g. "_blank"). Only applies when href is set.',
  },
  {
    name: 'rel',
    type: 'string',
    defaultValue: '',
    description: 'Link relationship (e.g. "noopener noreferrer"). Only applies when href is set.',
  },
];
