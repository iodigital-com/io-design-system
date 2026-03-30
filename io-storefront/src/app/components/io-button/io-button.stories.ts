import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for io-button.
 * The generator receives the current Configurator state and returns an
 * ElementConfig array. The same output drives both the live React preview
 * and all framework code-block generators.
 */
export const buttonStory: Story<'io-button'> = {
  state: {
    properties: {
      variant: 'solid',
      color: 'blue',
      size: 'md',
      arrow: undefined,
      disabled: false,
      loading: false,
      fullWidth: false,
      label: 'Click me',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Click me', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    // null tells React to explicitly reset the DOM property (delete skips the reset).
    // Code generators already filter out null, so it won't appear in output.
    if (attrs['arrow'] === 'none') attrs['arrow'] = null;
    return [
      {
        tag: 'io-button' as const,
        properties: attrs,
        children: [label as string],
      },
    ];
  },
};

/** Solid color variants — one per color, with forward arrow. */
export const buttonStorySolid: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', arrow: 'forward' } },
  generator: () =>
    (['blue', 'white', 'black', 'antraciet', 'orange', 'pink', 'rouge', 'yellow', 'beige'] as const).map(
      (color) => ({
        tag: 'io-button' as const,
        properties: { variant: 'solid', color, arrow: 'forward' },
        children: [color.charAt(0).toUpperCase() + color.slice(1)],
      }),
    ),
};

/** Ghost / outline variants — light-stage colors (blue, black, antraciet, grey). */
export const buttonStoryGhost: Story<'io-button'> = {
  state: { properties: { variant: 'ghost', color: 'blue', arrow: 'forward' } },
  generator: () =>
    (['blue', 'black', 'antraciet', 'grey'] as const).map((color) => ({
      tag: 'io-button' as const,
      properties: { variant: 'ghost', color, arrow: 'forward' },
      children: [color.charAt(0).toUpperCase() + color.slice(1)],
    })),
};

/** Ghost white — shown on a dark stage because white-on-white is invisible. */
export const buttonStoryGhostWhite: Story<'io-button'> = {
  state: { properties: { variant: 'ghost', color: 'white', arrow: 'forward' } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { variant: 'ghost', color: 'white', arrow: 'forward' },
      children: ['White'],
    },
  ],
};

/** Arrow direction showcase. */
export const buttonStoryArrows: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', arrow: 'forward' } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'blue', arrow: 'forward' },
      children: ['Forward'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'blue', arrow: 'back' },
      children: ['Back'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'ghost', color: 'blue', arrow: 'down' },
      children: ['Scroll down'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'orange', arrow: 'forward' },
      children: ['Learn more'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'rouge', arrow: 'forward' },
      children: ['Discover'],
    },
  ],
};

/** Size showcase. */
export const buttonStorySizes: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', size: 'md' } },
  generator: () => [
    { tag: 'io-button' as const, properties: { variant: 'solid', color: 'blue', size: 'sm' }, children: ['Small'] },
    { tag: 'io-button' as const, properties: { variant: 'solid', color: 'blue', size: 'md' }, children: ['Medium'] },
    { tag: 'io-button' as const, properties: { variant: 'solid', color: 'blue', size: 'lg' }, children: ['Large'] },
    { tag: 'io-button' as const, properties: { variant: 'solid', color: 'blue', size: 'xl' }, children: ['Extra Large'] },
  ],
};

/** Loading state. */
export const buttonStoryLoading: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', loading: true } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'blue', loading: true },
      children: ['Loading'],
    },
  ],
};

/** Disabled + loading states. */
export const buttonStoryStates: Story<'io-button'> = {
  state: { properties: { variant: 'solid', color: 'blue', disabled: true } },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'blue', disabled: true },
      children: ['Disabled'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'ghost', color: 'blue', disabled: true },
      children: ['Disabled ghost'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'orange', disabled: true, arrow: 'forward' },
      children: ['Disabled + arrow'],
    },
    {
      tag: 'io-button' as const,
      properties: { variant: 'solid', color: 'blue', loading: true },
      children: ['Loading'],
    },
  ],
};

/**
 * Prop definitions for the Configurator controls panel.
 * Maps directly to the @Prop() declarations in io-button.tsx.
 */
export const buttonPropDefinitions: PropDefinition[] = [
  // ── Appearance ────────────────────────────────────────────
  {
    name: 'variant',
    type: 'select',
    options: ['solid', 'ghost'],
    defaultValue: 'solid',
    description: 'Chooses the visual button style.',
    group: 'Appearance',
  },
  {
    name: 'color',
    type: 'select',
    options: ['blue', 'white', 'black', 'antraciet', 'orange', 'pink', 'rouge', 'yellow', 'beige', 'grey'],
    defaultValue: 'blue',
    description: 'Sets the button colour token.',
    group: 'Appearance',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    description: 'Adjusts button height and padding.',
    group: 'Appearance',
  },
  // ── Content ───────────────────────────────────────────────
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Click me',
    description: 'Defines the button text label.',
    group: 'Content',
  },
  {
    name: 'arrow',
    type: 'select',
    options: ['none', 'forward', 'back', 'down'],
    defaultValue: 'none',
    description: 'Adds an optional directional arrow icon.',
    group: 'Content',
  },
  {
    name: 'arrowPlacement',
    type: 'select',
    options: ['right', 'left'],
    defaultValue: 'right',
    description: 'Controls whether the arrow appears before or after the label.',
    group: 'Content',
  },
  // ── State ─────────────────────────────────────────────────
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables interaction and applies disabled styling.',
    group: 'State',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Shows a loading state and blocks clicks.',
    group: 'State',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: false,
    description: 'Expands the button to fill the available width.',
    group: 'State',
  },
];
