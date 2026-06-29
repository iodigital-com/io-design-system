import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

export const textStory: Story<'io-text'> = {
  state: {
    properties: {
      tag: 'p',
      size: 'base',
      weight: 'regular',
      align: 'start',
      color: 'primary',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-text' as const,
      properties: properties ?? {},
      children: ['The quick brown fox jumps over the lazy dog.'],
    },
  ],
};

export const textStorySizes: Story<'io-text'> = {
  state: { properties: {} },
  generator: () =>
    (['xs', 'sm', 'base', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-text' as const,
      properties: { size, tag: 'p', weight: 'regular', color: 'primary' },
      children: [`Size: ${size} — The quick brown fox jumps over the lazy dog.`],
    })),
};

export const textStoryColors: Story<'io-text'> = {
  state: { properties: {} },
  generator: () =>
    (['primary', 'secondary', 'disabled', 'inverse', 'success', 'warning', 'error', 'info', 'inherit'] as const).map((color) => ({
      tag: 'io-text' as const,
      properties: { color, tag: 'p', size: 'base', weight: 'regular' },
      children: [`Color: ${color}`],
    })),
};

export const textStoryWeights: Story<'io-text'> = {
  state: { properties: {} },
  generator: () =>
    (['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => ({
      tag: 'io-text' as const,
      properties: { weight, tag: 'p', size: 'base', color: 'primary' },
      children: [`Weight: ${weight} — The quick brown fox jumps over the lazy dog.`],
    })),
};

export const textStoryAlign: Story<'io-text'> = {
  state: { properties: {} },
  generator: () =>
    (['start', 'center', 'end'] as const).map((align) => ({
      tag: 'io-text' as const,
      properties: { align, tag: 'p', size: 'base', weight: 'regular', color: 'primary' },
      children: [`Align: ${align} — The quick brown fox jumps over the lazy dog.`],
    })),
};

export const textStoryEllipsis: Story<'io-text'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'div' as const,
      properties: { style: { width: '320px' } },
      children: [
        {
          tag: 'io-text' as const,
          properties: { ellipsis: true, tag: 'p', size: 'base', weight: 'regular', color: 'primary' },
          children: ['Ellipsis enabled: The quick brown fox jumps over the lazy dog and keeps going past the container edge.'],
        },
      ],
    },
  ],
};

export const textPropDefinitions: PropDefinition[] = [
  {
    name: 'tag',
    type: 'select',
    options: ['p', 'span', 'div', 'blockquote', 'time', 'address', 'figcaption', 'cite', 'legend'],
    defaultValue: 'p',
    description: 'Semantic HTML element to render.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'base', 'lg', 'xl', 'inherit'],
    defaultValue: 'base',
    description: 'Font size using --io-font-size-* tokens.',
  },
  {
    name: 'weight',
    type: 'select',
    options: ['regular', 'medium', 'semibold', 'bold'],
    defaultValue: 'regular',
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
    options: ['primary', 'secondary', 'disabled', 'inverse', 'success', 'warning', 'error', 'info', 'inherit'],
    defaultValue: 'primary',
    description: 'Text color using semantic --io-text-* tokens.',
  },
  {
    name: 'ellipsis',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, truncates text with an ellipsis on a single line.',
  },
  {
    name: 'hyphens',
    type: 'select',
    options: ['none', 'manual', 'auto', 'inherit'],
    defaultValue: 'inherit',
    description: 'CSS hyphenation behaviour. auto uses the browser hyphenation dictionary; manual respects soft-hyphens (­) only. Also sets overflow-wrap: break-word when auto or manual.',
  },
  {
    name: 'datetime',
    type: 'string',
    defaultValue: undefined,
    description: 'Machine-readable date/time value for tag="time". Maps to the HTML datetime attribute.',
  },
];
