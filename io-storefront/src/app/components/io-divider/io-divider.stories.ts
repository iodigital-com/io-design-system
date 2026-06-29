import type { FrameworkCode } from '@/models/framework';
import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

// ── Framework code overrides ──────────────────────────────────────────────────
// The example stories wrap the divider in a context container so the line is
// visible and meaningful. The frameworkCode overrides ensure the code tabs show
// just the clean component markup — not the demo wrapper.

const horizontalCode: FrameworkCode = {
  html: `<io-divider></io-divider>`,
  react: `import { IoDivider } from '@iodigital-com/components-react';

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
  react: `import { IoDivider } from '@iodigital-com/components-react';

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
  react: `import { IoDivider } from '@iodigital-com/components-react';

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
 * Configurator story — wraps io-divider in a context container so the line is
 * visible in the preview. `frameworkCode` is a function so the code tabs always
 * show clean markup (without the wrapper) that reflects the current prop values.
 */
export const dividerStory: Story<'io-divider'> = {
  state: {
    properties: {
      orientation: 'horizontal',
      color: 'default',
      label: '',
    },
  },
  generator: ({ properties } = {}) => {
    const orientation = (properties?.orientation as string) ?? 'horizontal';
    const color = (properties?.color as string) ?? 'default';
    const label = properties?.label as string | undefined;

    const dividerNode = {
      tag: 'io-divider' as const,
      properties: {
        orientation: orientation as 'horizontal' | 'vertical',
        color: color as 'subtle' | 'default' | 'strong',
        ...(label ? { label } : {}),
      },
    };

    // Vertical (no label) — flex row so the vertical line has content either side.
    if (orientation === 'vertical' && !label) {
      return [
        {
          tag: 'div' as const,
          properties: { className: 'flex items-center gap-4 h-10' },
          children: [
            {
              tag: 'span' as const,
              properties: { className: 'text-sm text-[var(--io-text-secondary)]' },
              children: ['Content'],
            },
            dividerNode,
            {
              tag: 'span' as const,
              properties: { className: 'text-sm text-[var(--io-text-secondary)]' },
              children: ['Content'],
            },
          ],
        },
      ];
    }

    // Horizontal or labeled — block container with paragraphs above and below.
    return [
      {
        tag: 'div' as const,
        properties: { className: 'w-full max-w-xs' },
        children: [
          {
            tag: 'p' as const,
            properties: { className: 'text-sm mb-3 text-[var(--io-text-secondary)]' },
            children: ['Section one content goes here.'],
          },
          dividerNode,
          {
            tag: 'p' as const,
            properties: { className: 'text-sm mt-3 text-[var(--io-text-secondary)]' },
            children: ['Section two content goes here.'],
          },
        ],
      },
    ];
  },
  frameworkCode: ({ properties } = {}) => {
    const orientation = (properties?.orientation as string) ?? 'horizontal';
    const color = (properties?.color as string) ?? 'default';
    const label = properties?.label as string | undefined;
    const attrs = [
      orientation !== 'horizontal' ? `orientation="${orientation}"` : null,
      color !== 'default' ? `color="${color}"` : null,
      label ? `label="${label}"` : null,
    ]
      .filter(Boolean)
      .join(' ');
    const htmlTag = `<io-divider${attrs ? ` ${attrs}` : ''}></io-divider>`;
    const reactProps = [
      orientation !== 'horizontal' ? `orientation="${orientation}"` : null,
      color !== 'default' ? `color="${color}"` : null,
      label ? `label="${label}"` : null,
    ]
      .filter(Boolean)
      .join(' ');
    return {
      html: htmlTag,
      react: `import { IoDivider } from '@iodigital-com/components-react';\n\nexport function App() {\n  return <IoDivider${reactProps ? ` ${reactProps}` : ''} />;\n}`,
      angular: htmlTag,
      vue: `<template>\n  <io-divider${attrs ? ` ${attrs}` : ''} />\n</template>`,
    };
  },
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
    name: 'color',
    type: 'select',
    options: ['subtle', 'default', 'strong'],
    defaultValue: 'default',
    description:
      'Color contrast level of the divider line. "subtle" renders at 50% opacity of --io-border (very light); "default" uses --io-border (standard); "strong" uses --io-border-hover (more prominent). All variants adapt automatically to dark mode.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: undefined,
    description:
      'Optional visible label rendered at the center of the divider line. Also sets aria-label on the separator landmark. When using the default slot, slot content takes precedence over the label prop text.',
  },
];
