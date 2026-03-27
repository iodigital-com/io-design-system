import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Configurator story for io-modal.
 *
 * Renders a trigger <io-button> alongside the <io-modal>.
 * EventConfig wires: button onClick → open:true, modal onIoClose → open:false.
 */
export const modalStory: Story<'io-modal'> = {
  state: {
    properties: {
      open: false,
      heading: 'Modal heading',
      size: 'md',
      closeOnBackdrop: true,
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open modal'],
        events: {
          onClick: { target: 'io-button', prop: 'open', value: true },
        },
      },
      {
        tag: 'io-modal' as const,
        properties: {
          open: props['open'] ?? false,
          heading: props['heading'] ?? 'Modal heading',
          size: (props['size'] as 'sm' | 'md' | 'lg') ?? 'md',
          closeOnBackdrop: props['closeOnBackdrop'] ?? true,
        },
        children: [
          {
            tag: 'p' as const,
            children: ['This is the modal body content. Place any content here.'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Confirm'],
          },
        ],
        events: {
          onIoClose: { target: 'io-modal', prop: 'open', value: false },
        },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

export const modalPropDefinitions: PropDefinition[] = [
  { name: 'open', type: 'boolean', defaultValue: false, group: 'State' },
  { name: 'heading', type: 'string', defaultValue: 'Modal heading', group: 'Content' },
  { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md', group: 'Appearance' },
  { name: 'closeOnBackdrop', type: 'boolean', defaultValue: true, group: 'Behaviour' },
];

// ── Static example stories ────────────────────────────────────────────────

/** Default modal — heading + body + footer actions. */
export const modalStoryDefault: Story<'io-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open modal'],
        events: { onClick: { target: 'io-button', prop: 'open', value: true } },
      },
      {
        tag: 'io-modal' as const,
        properties: { open, heading: 'Confirm action' },
        children: [
          { tag: 'p' as const, children: ['Are you sure you want to proceed? This action cannot be undone.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Confirm'],
          },
        ],
        events: { onIoClose: { target: 'io-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Small modal. */
export const modalStorySm: Story<'io-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open small modal'],
        events: { onClick: { target: 'io-button', prop: 'open', value: true } },
      },
      {
        tag: 'io-modal' as const,
        properties: { open, heading: 'Small modal', size: 'sm' },
        children: [
          { tag: 'p' as const, children: ['A compact modal for focused interactions.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Confirm'],
          },
        ],
        events: { onIoClose: { target: 'io-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Large modal. */
export const modalStoryLg: Story<'io-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open large modal'],
        events: { onClick: { target: 'io-button', prop: 'open', value: true } },
      },
      {
        tag: 'io-modal' as const,
        properties: { open, heading: 'Large modal', size: 'lg' },
        children: [
          { tag: 'p' as const, children: ['A wider modal suited for forms, tables, or rich content.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Confirm'],
          },
        ],
        events: { onIoClose: { target: 'io-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Custom header slot — overrides the heading prop. */
export const modalStoryNoHeading: Story<'io-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open modal'],
        events: { onClick: { target: 'io-button', prop: 'open', value: true } },
      },
      {
        tag: 'io-modal' as const,
        properties: { open },
        children: [
          {
            tag: 'h2' as const,
            properties: { slot: 'header' },
            children: ['Custom header via slot'],
          },
          { tag: 'p' as const, children: ['Use the header slot to render any custom heading markup.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Confirm'],
          },
        ],
        events: { onIoClose: { target: 'io-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};
