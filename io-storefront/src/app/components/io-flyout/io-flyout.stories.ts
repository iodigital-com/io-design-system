import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Configurator story for io-flyout.
 *
 * Renders a trigger <io-button> alongside the <io-flyout>.
 * EventConfig wires: button onClick → open:true, flyout onDismiss → open:false.
 */
export const flyoutStory: Story<'io-flyout'> = {
  state: {
    properties: {
      open: false,
      heading: 'Navigation',
      position: 'right',
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open flyout'],
        events: {
          onClick: { target: 'io-flyout', prop: 'open', value: true },
        },
      },
      {
        tag: 'io-flyout' as const,
        properties: {
          open: props['open'] ?? false,
          heading: props['heading'] ?? 'Navigation',
          position: (props['position'] as 'left' | 'right') ?? 'right',
        },
        children: [
          {
            tag: 'p' as const,
            children: ['This is the flyout body content. Place navigation links or complex UI panels here.'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Close'],
            events: { onClick: { target: 'io-flyout', prop: 'open', value: false } },
          },
        ],
        events: {
          onDismiss: { target: 'io-flyout', prop: 'open', value: false },
        },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

export const flyoutPropDefinitions: PropDefinition[] = [
  { name: 'heading', type: 'string', defaultValue: 'Navigation', group: 'Content' },
  { name: 'position', type: 'select', options: ['left', 'right'], defaultValue: 'right', group: 'Appearance' },
  { name: 'closeLabel', type: 'string', defaultValue: 'Close flyout', group: 'Accessibility' },
];

// ── Static example stories ────────────────────────────────────────────────

/** Default flyout — right position, heading + body + footer. */
export const flyoutStoryDefault: Story<'io-flyout'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open flyout'],
        events: { onClick: { target: 'io-flyout', prop: 'open', value: true } },
      },
      {
        tag: 'io-flyout' as const,
        properties: { open, heading: 'Navigation', position: 'right' },
        children: [
          { tag: 'p' as const, children: ['Side navigation content goes here.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Close'],
            events: { onClick: { target: 'io-flyout', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-flyout', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Left position flyout. */
export const flyoutStoryLeft: Story<'io-flyout'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open left flyout'],
        events: { onClick: { target: 'io-flyout', prop: 'open', value: true } },
      },
      {
        tag: 'io-flyout' as const,
        properties: { open, heading: 'Menu', position: 'left' },
        children: [
          { tag: 'p' as const, children: ['Left-anchored flyout for navigation menus.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Close'],
            events: { onClick: { target: 'io-flyout', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-flyout', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Flyout without heading (uses close button only). */
export const flyoutStoryNoHeading: Story<'io-flyout'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open flyout'],
        events: { onClick: { target: 'io-flyout', prop: 'open', value: true } },
      },
      {
        tag: 'io-flyout' as const,
        properties: { open, position: 'right' },
        children: [
          { tag: 'p' as const, children: ['Flyout without a heading prop. The close button is always present.'] },
        ],
        events: { onDismiss: { target: 'io-flyout', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};
