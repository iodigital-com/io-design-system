import type { FrameworkCode } from '@/models/framework';
import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

// ── Framework code overrides ──────────────────────────────────────────────────
// The example stories wrap the divider in a context container so the line is
// visible and meaningful. The frameworkCode overrides ensure the code tabs show
// just the clean component markup — not the demo wrapper.

const horizontalCode: FrameworkCode = {
  html: `<io-divider></io-divider>`,
  react: `import { IoDivider } from '@io-digital/components-react';

export function App() {
  return <IoDivider />;
}`,
  angular: `<io-divider></io-divider>`,
  vue: `<template>
  <io-divider />
</template>`,
};

const verticalCode: FrameworkCode = {
  html: `<io-divider orientation="vertical"></io-divider>`,
  react: `import { IoDivider } from '@io-digital/components-react';

export function App() {
  return <IoDivider orientation="vertical" />;
}`,
  angular: `<io-divider orientation="vertical"></io-divider>`,
  vue: `<template>
  <io-divider orientation="vertical" />
</template>`,
};

const labeledCode: FrameworkCode = {
  html: `<io-divider label="or"></io-divider>`,
  react: `import { IoDivider } from '@io-digital/components-react';

export function App() {
  return <IoDivider label="or" />;
}`,
  angular: `<io-divider label="or"></io-divider>`,
  vue: `<template>
  <io-divider label="or" />
</template>`,
};

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * Configurator story — bare io-divider so the code tab shows clean markup.
 * The configurator page removes the grid background via previewStyle so the
 * line is visible even without a content wrapper.
 */
export const dividerStory: Story<'io-divider'> = {
  state: {
    properties: {
      orientation: 'horizontal',
      label: '',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-divider' as const,
      properties: {
        orientation: (properties?.orientation as string) ?? 'horizontal',
        ...(properties?.label ? { label: properties.label as string } : {}),
      },
    },
  ],
};

/**
 * Horizontal example — divider placed between two text sections so the line
 * sits in realistic context. frameworkCode shows just the component.
 */
export const dividerStoryHorizontal: Story<'io-divider'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'w-full max-w-xs' },
      children: [
        {
          tag: 'p' as const,
          properties: { className: 'text-sm mb-3 text-[var(--io-text-secondary)]' },
          children: ['Section one content goes here.'],
        },
        { tag: 'io-divider' as const, properties: {} },
        {
          tag: 'p' as const,
          properties: { className: 'text-sm mt-3 text-[var(--io-text-secondary)]' },
          children: ['Section two content goes here.'],
        },
      ],
    },
  ],
  frameworkCode: horizontalCode,
};

/**
 * Vertical example — divider placed between labelled flex-row items.
 * frameworkCode shows just the component.
 */
export const dividerStoryVertical: Story<'io-divider'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'flex items-center gap-4 h-10' },
      children: [
        {
          tag: 'span' as const,
          properties: { className: 'text-sm text-[var(--io-text-secondary)]' },
          children: ['Section A'],
        },
        { tag: 'io-divider' as const, properties: { orientation: 'vertical' } },
        {
          tag: 'span' as const,
          properties: { className: 'text-sm text-[var(--io-text-secondary)]' },
          children: ['Section B'],
        },
        { tag: 'io-divider' as const, properties: { orientation: 'vertical' } },
        {
          tag: 'span' as const,
          properties: { className: 'text-sm text-[var(--io-text-secondary)]' },
          children: ['Section C'],
        },
      ],
    },
  ],
  frameworkCode: verticalCode,
};

/**
 * Labeled example — the label text is visible on its own; wrap in a
 * max-width container so the flanking lines have room to render.
 */
export const dividerStoryLabeled: Story<'io-divider'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'w-full max-w-xs' },
      children: [{ tag: 'io-divider' as const, properties: { label: 'or' } }],
    },
  ],
  frameworkCode: labeledCode,
};

export const dividerPropDefinitions: PropDefinition[] = [
  {
    name: 'orientation',
    type: 'string',
    defaultValue: 'horizontal',
    description:
      'Visual and ARIA orientation. "horizontal" renders an <hr>; "vertical" renders a div[role=separator]. Has no visual effect when label is set — label always produces a horizontal flex layout.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description:
      'Optional text centered between two lines (e.g. "or", "and"). Overrides the visual layout to flex-row regardless of orientation. The orientation prop still sets aria-orientation on the labeled wrapper.',
  },
];
