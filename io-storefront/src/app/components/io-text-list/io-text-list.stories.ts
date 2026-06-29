import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

const textListTagValues = ['ul', 'ol'] as const;
const textListSizeValues = ['xs', 'sm', 'base', 'lg', 'xl', 'inherit'] as const;
const textListColorValues = [
  'primary',
  'secondary',
  'disabled',
  'inverse',
  'success',
  'warning',
  'error',
  'info',
  'inherit',
] as const;

export const textListStory: Story<'io-text-list'> = {
  state: {
    properties: {
      tag: 'ul',
      size: 'base',
      color: 'primary',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-text-list' as const,
      properties: properties ?? {},
      children: [
        { tag: 'li' as const, properties: {}, children: ['First list item'] },
        { tag: 'li' as const, properties: {}, children: ['Second list item'] },
        { tag: 'li' as const, properties: {}, children: ['Third list item'] },
      ],
    },
  ],
};

export const textListStoryTags: Story<'io-text-list'> = {
  state: { properties: {} },
  generator: () =>
    textListTagValues.map((tag) => ({
      tag: 'io-text-list' as const,
      properties: { tag, size: 'base', color: 'primary' },
      children: [
        { tag: 'li' as const, properties: {}, children: [`Tag: ${tag} — First item`] },
        { tag: 'li' as const, properties: {}, children: [`Tag: ${tag} — Second item`] },
        { tag: 'li' as const, properties: {}, children: [`Tag: ${tag} — Third item`] },
      ],
    })),
};

export const textListStorySizes: Story<'io-text-list'> = {
  state: { properties: {} },
  generator: () =>
    (['xs', 'sm', 'base', 'lg', 'xl'] as const).map((size) => ({
      tag: 'io-text-list' as const,
      properties: { size, tag: 'ul', color: 'primary' },
      children: [
        { tag: 'li' as const, properties: {}, children: [`Size: ${size} — First item`] },
        { tag: 'li' as const, properties: {}, children: [`Size: ${size} — Second item`] },
      ],
    })),
};

export const textListStoryColors: Story<'io-text-list'> = {
  state: { properties: {} },
  generator: () =>
    (['primary', 'secondary', 'disabled', 'inverse', 'success', 'warning', 'error'] as const).map((color) => ({
      tag: 'io-text-list' as const,
      properties: { color, tag: 'ul', size: 'base' },
      children: [
        { tag: 'li' as const, properties: {}, children: [`Color: ${color} — First item`] },
        { tag: 'li' as const, properties: {}, children: [`Color: ${color} — Second item`] },
      ],
    })),
};

export const textListPropDefinitions: PropDefinition[] = [
  {
    name: 'tag',
    type: 'select',
    options: [...textListTagValues],
    defaultValue: 'ul',
    description: 'Semantic HTML list element to render.',
  },
  {
    name: 'size',
    type: 'select',
    options: [...textListSizeValues],
    defaultValue: 'base',
    description: 'Font size using --io-font-size-* tokens.',
  },
  {
    name: 'color',
    type: 'select',
    options: [...textListColorValues],
    defaultValue: 'primary',
    description: 'Text color using semantic --io-text-* tokens.',
  },
];
