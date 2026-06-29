import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

// ── Configurator story ────────────────────────────────────────────────────────

export const popoverStory: Story<'io-popover'> = {
  state: {
    properties: {
      placement: 'bottom',
      label: 'Quick actions',
      closeOnClickOutside: true,
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'io-popover' as const,
        properties: {
          placement: props['placement'] ?? 'bottom',
          label: props['label'] ?? 'Quick actions',
          closeOnClickOutside: props['closeOnClickOutside'] ?? true,
        },
        children: [
          {
            tag: 'io-button' as const,
            properties: { slot: 'trigger', size: 'sm' },
            children: ['Open popover'],
          },
          {
            tag: 'p' as const,
            children: ['This is the popover body content.'],
          },
        ],
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

// ── Static example stories ────────────────────────────────────────────────────

export const popoverStoryBottom: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'bottom', label: 'Options' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm' },
          children: ['Placement: bottom'],
        },
        {
          tag: 'p' as const,
          children: ['Panel opens below the trigger.'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

export const popoverStoryTop: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'top', label: 'Options' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm' },
          children: ['Placement: top'],
        },
        {
          tag: 'p' as const,
          children: ['Panel opens above the trigger.'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

export const popoverStoryRight: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'right', label: 'Info' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm' },
          children: ['Placement: right'],
        },
        {
          tag: 'p' as const,
          children: ['Panel opens to the right of the trigger.'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

export const popoverStoryLeft: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'left', label: 'Info' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm' },
          children: ['Placement: left'],
        },
        {
          tag: 'p' as const,
          children: ['Panel opens to the left of the trigger.'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

export const popoverStoryRichContent: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'bottom', label: 'More actions' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm', variant: 'ghost' },
          children: ['More'],
        },
        {
          tag: 'p' as const,
          children: ['Use io-popover for rich floating content like menus or forms.'],
        },
        {
          tag: 'io-button' as const,
          properties: { size: 'sm', variant: 'ghost' },
          children: ['Action one'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

export const popoverStoryCloseOnClickOutsideFalse: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'bottom', label: 'Settings', closeOnClickOutside: false },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm' },
          children: ['Open settings'],
        },
        {
          tag: 'p' as const,
          children: ['This panel stays open when you click outside — useful for filter or settings panels.'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

export const popoverStoryWithActions: Story<'io-popover'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-popover' as const,
      properties: { placement: 'bottom', label: 'More actions' },
      children: [
        {
          tag: 'io-button' as const,
          properties: { slot: 'trigger', size: 'sm', variant: 'ghost' },
          children: ['Actions'],
        },
        {
          tag: 'io-button' as const,
          properties: { size: 'sm', variant: 'ghost', style: 'display:block;width:100%;text-align:left' },
          children: ['Edit item'],
        },
        {
          tag: 'io-button' as const,
          properties: { size: 'sm', variant: 'ghost', style: 'display:block;width:100%;text-align:left' },
          children: ['Duplicate'],
        },
        {
          tag: 'io-button' as const,
          properties: { size: 'sm', variant: 'ghost', color: 'rouge', style: 'display:block;width:100%;text-align:left' },
          children: ['Delete'],
        },
      ],
    },
  ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
};

// ── Prop definitions ──────────────────────────────────────────────────────────

export const popoverPropDefinitions: PropDefinition[] = [
  {
    name: 'placement',
    type: 'select',
    options: ['top', 'bottom', 'left', 'right', 'auto'],
    defaultValue: 'bottom',
    description: 'Preferred placement of the floating panel relative to the trigger.',
    group: 'Appearance',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Quick actions',
    description: 'Accessible label for the popover dialog (rendered as aria-labelledby target).',
    group: 'Accessibility',
  },
  {
    name: 'closeOnClickOutside',
    type: 'boolean',
    defaultValue: true,
    description: 'Close the popover when the user clicks outside the panel.',
    group: 'Behaviour',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Supplementary description shown inside the panel below the heading.',
    group: 'Content',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label for the popover.',
    group: 'Accessibility',
  },
];
