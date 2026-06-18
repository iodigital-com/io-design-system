import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const headingStory: Story<'io-heading'> = {
  state: {
    properties: {
      tag: 'h2',
      size: '2xl',
      weight: 'semibold',
      align: 'start',
      color: 'primary',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-heading' as const,
      properties: properties ?? {},
      children: ['The quick brown fox jumps over the lazy dog'],
    },
  ],
};

export const headingStorySizes: Story<'io-heading'> = {
  state: { properties: {} },
  generator: () =>
    (['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => ({
      tag: 'io-heading' as const,
      properties: { size, tag: 'h2', weight: 'semibold', color: 'primary' },
      children: [`Size ${size} — Heading text`],
    })),
};

export const headingStoryLevels: Story<'io-heading'> = {
  state: { properties: {} },
  generator: () =>
    (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((tag, index) => ({
      tag: 'io-heading' as const,
      properties: { tag, size: (['4xl', '3xl', '2xl', 'xl', 'lg', 'md'] as const)[index], weight: 'semibold', color: 'primary' },
      children: [`${tag.toUpperCase()} — Heading level ${index + 1}`],
    })),
};

export const headingStoryWeights: Story<'io-heading'> = {
  state: { properties: {} },
  generator: () =>
    (['regular', 'semibold', 'bold'] as const).map((weight) => ({
      tag: 'io-heading' as const,
      properties: { weight, tag: 'h2', size: '2xl', color: 'primary' },
      children: [`Weight: ${weight} — Heading text example`],
    })),
};

export const headingStoryAlign: Story<'io-heading'> = {
  state: { properties: {} },
  generator: () =>
    (['start', 'center', 'end'] as const).map((align) => ({
      tag: 'io-heading' as const,
      properties: { align, tag: 'h2', size: '2xl', weight: 'semibold', color: 'primary' },
      children: [`Align: ${align} — Heading text example`],
    })),
};

export const headingStoryColors: Story<'io-heading'> = {
  state: { properties: {} },
  generator: () => {
    const colors = ['primary', 'secondary', 'inherit', 'inverse', 'brand'] as const;
    return colors.map((color) => {
      const isInverse = color === 'inverse';
      return {
        tag: isInverse ? ('div' as const) : ('io-heading' as const),
        properties: isInverse
          ? { style: { background: 'var(--io-color-primary)', padding: 'var(--io-space-3)' } }
          : { color, tag: 'h2', size: '2xl', weight: 'semibold', align: 'start' },
        children: isInverse
          ? [
              {
                tag: 'io-heading' as const,
                properties: { color, tag: 'h2', size: '2xl', weight: 'semibold' },
                children: [`Color: ${color}`],
              },
            ]
          : [`Color: ${color} — Heading text example`],
      };
    });
  },
};

export const headingStoryEllipsis: Story<'io-heading'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'div' as const,
      properties: { style: { width: '320px' } },
      children: [
        {
          tag: 'io-heading' as const,
          properties: { ellipsis: true, tag: 'h2', size: '2xl', weight: 'semibold', color: 'primary' },
          children: ['Ellipsis enabled: The quick brown fox jumps over the lazy dog and keeps going past the container edge.'],
        },
      ],
    },
  ],
};

export const headingPropDefinitions: PropDefinition[] = [
  {
    name: 'tag',
    type: 'select',
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    defaultValue: 'h2',
    description: 'Semantic heading level — required for correct document outline. Defaults to h2 with a warning if omitted.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    defaultValue: '2xl',
    description: 'Visual font size using --io-font-size-* tokens. Independent from the semantic heading level.',
  },
  {
    name: 'weight',
    type: 'select',
    options: ['regular', 'semibold', 'bold'],
    defaultValue: 'semibold',
    description: 'Font weight using --io-font-weight-* tokens.',
  },
  {
    name: 'align',
    type: 'select',
    options: ['start', 'center', 'end', 'inherit'],
    defaultValue: 'start',
    description: 'Text alignment.',
  },
  {
    name: 'color',
    type: 'select',
    options: ['primary', 'secondary', 'inherit', 'inverse', 'brand'],
    defaultValue: 'primary',
    description: 'Text color. primary → --io-text-primary; secondary → --io-text-secondary; inverse → --io-text-inverse (use on dark surfaces); brand → --io-color-primary; inherit → inherits from parent.',
  },
  {
    name: 'ellipsis',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, truncates text with an ellipsis on a single line.',
  },
];
