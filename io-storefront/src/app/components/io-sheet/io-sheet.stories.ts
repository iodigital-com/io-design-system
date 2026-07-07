import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Configurator story for io-sheet.
 *
 * Renders a trigger <io-button> alongside the <io-sheet>.
 * EventConfig wires: button onClick → open:true, sheet onDismiss → open:false.
 */
export const sheetStory: Story<'io-sheet'> = {
  state: {
    properties: {
      open: false,
      heading: 'Share',
      dismissible: true,
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open sheet'],
        events: {
          onClick: { target: 'io-sheet', prop: 'open', value: true },
        },
      },
      {
        tag: 'io-sheet' as const,
        properties: {
          open: props['open'] ?? false,
          heading: props['heading'] ?? 'Share',
          dismissible: props['dismissible'] ?? true,
        },
        children: [
          {
            tag: 'p' as const,
            children: ['Choose a sharing option to send this content to others.'],
          },
        ],
        events: {
          onDismiss: { target: 'io-sheet', prop: 'open', value: false },
        },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

export const sheetPropDefinitions: PropDefinition[] = [
  { name: 'open', type: 'boolean', defaultValue: false, group: 'Behaviour' },
  { name: 'heading', type: 'string', defaultValue: '', group: 'Content' },
  { name: 'dismissible', type: 'boolean', defaultValue: true, group: 'Behaviour' },
];

// ── Static example stories ────────────────────────────────────────────────

/** Default sheet — heading + body content. */
export const sheetStoryDefault: Story<'io-sheet'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open sheet'],
        events: { onClick: { target: 'io-sheet', prop: 'open', value: true } },
      },
      {
        tag: 'io-sheet' as const,
        properties: { open, heading: 'Share', dismissible: true },
        children: [
          { tag: 'p' as const, children: ['Choose a sharing option to send this content to others.'] },
        ],
        events: { onDismiss: { target: 'io-sheet', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Sheet with footer actions. */
export const sheetStoryWithFooter: Story<'io-sheet'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open sheet with footer'],
        events: { onClick: { target: 'io-sheet', prop: 'open', value: true } },
      },
      {
        tag: 'io-sheet' as const,
        properties: { open, heading: 'Confirm action', dismissible: true },
        children: [
          { tag: 'p' as const, children: ['Are you sure you want to proceed? This action cannot be undone.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'ghost' },
            children: ['Cancel'],
            events: { onClick: { target: 'io-sheet', prop: 'open', value: false } },
          },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'solid' },
            children: ['Confirm'],
            events: { onClick: { target: 'io-sheet', prop: 'open', value: false } },
          },
        ],
        events: { onDismiss: { target: 'io-sheet', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Non-dismissible sheet — dismissible=false. */
export const sheetStoryNonDismissible: Story<'io-sheet'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'io-button' as const,
        properties: { variant: 'solid' },
        children: ['Open required sheet'],
        events: { onClick: { target: 'io-sheet', prop: 'open', value: true } },
      },
      {
        tag: 'io-sheet' as const,
        properties: { open, heading: 'Required step', dismissible: false },
        children: [
          { tag: 'p' as const, children: ['You must complete this step before continuing. Please review the information below.'] },
          {
            tag: 'io-button' as const,
            properties: { slot: 'footer', variant: 'solid' },
            children: ['Continue'],
            events: { onClick: { target: 'io-sheet', prop: 'open', value: false } },
          },
        ],
        events: {},
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};
