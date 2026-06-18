import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Configurator story for io-drawer.
 *
 * Renders a trigger <io-button> alongside the <io-drawer>.
 * EventConfig wires: button onClick → show(), modal onDismiss → open:false.
 */
export const drawerStory: Story<'io-drawer'> = {
  state: {
    properties: {
      open: false,
      heading: 'Drawer heading',
      placement: 'right',
      size: 'md',
      closeOnBackdrop: true,
      closeLabel: 'Close drawer',
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open drawer'],
        events: {
          onClick: { target: 'io-drawer', prop: 'open', value: true },
        },
      },
      {
        tag: 'io-drawer' as const,
        properties: {
          open: props['open'] ?? false,
          heading: props['heading'] ?? 'Drawer heading',
          placement: (props['placement'] as 'left' | 'right' | 'bottom') ?? 'right',
          size: (props['size'] as 'sm' | 'md' | 'lg' | 'full') ?? 'md',
          closeOnBackdrop: props['closeOnBackdrop'] ?? true,
          closeLabel: props['closeLabel'] ?? 'Close drawer',
        },
        children: [
          {
            tag: 'p' as const,
            children: ['This is the drawer body content. Place any content here.'],
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Save'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
        ],
        events: {
          onDismiss: { target: 'io-drawer', prop: 'open', value: false },
        },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

export const drawerPropDefinitions: PropDefinition[] = [
  { name: 'heading', type: 'string', defaultValue: 'Drawer heading', group: 'Content' },
  { name: 'placement', type: 'select', options: ['left', 'right', 'bottom'], defaultValue: 'right', group: 'Appearance' },
  { name: 'size', type: 'select', options: ['sm', 'md', 'lg', 'full'], defaultValue: 'md', group: 'Appearance' },
  { name: 'closeOnBackdrop', type: 'boolean', defaultValue: true, group: 'Behaviour' },
  { name: 'closeLabel', type: 'string', defaultValue: 'Close drawer', group: 'Accessibility' },
  {
    name: 'dismissButton',
    type: 'boolean',
    defaultValue: true,
    description: 'Shows or hides the × close button. When false, the drawer can only close via programmatic open=false. The dismiss event still only fires for user-initiated closes.',
  },
];

// ── Static example stories ────────────────────────────────────────────────

/** Default drawer — right placement, md size, heading + body + footer. */
export const drawerStoryDefault: Story<'io-drawer'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open drawer'],
        events: { onClick: { target: 'io-drawer', prop: 'open', value: true } },
      },
      {
        tag: 'io-drawer' as const,
        properties: { open, heading: 'Settings', placement: 'right', size: 'md' },
        children: [
          { tag: 'p' as const, children: ['Configure your preferences here.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Save changes'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-drawer', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Left placement drawer. */
export const drawerStoryLeft: Story<'io-drawer'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open left drawer'],
        events: { onClick: { target: 'io-drawer', prop: 'open', value: true } },
      },
      {
        tag: 'io-drawer' as const,
        properties: { open, heading: 'Navigation', placement: 'left', size: 'md' },
        children: [
          { tag: 'p' as const, children: ['Side navigation content goes here.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Close'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-drawer', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Bottom sheet drawer. */
export const drawerStoryBottom: Story<'io-drawer'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open bottom sheet'],
        events: { onClick: { target: 'io-drawer', prop: 'open', value: true } },
      },
      {
        tag: 'io-drawer' as const,
        properties: { open, heading: 'Share', placement: 'bottom', size: 'md' },
        children: [
          { tag: 'p' as const, children: ['Choose how to share this item.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Share'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-drawer', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Small drawer. */
export const drawerStorySm: Story<'io-drawer'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open small drawer'],
        events: { onClick: { target: 'io-drawer', prop: 'open', value: true } },
      },
      {
        tag: 'io-drawer' as const,
        properties: { open, heading: 'Quick settings', placement: 'right', size: 'sm' },
        children: [
          { tag: 'p' as const, children: ['Compact drawer for focused interactions.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer' },
            children: ['Apply'],
            events: { onClick: { target: 'io-drawer', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-drawer', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};
