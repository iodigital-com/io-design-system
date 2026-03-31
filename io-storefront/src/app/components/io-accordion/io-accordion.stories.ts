import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const accordionStory: Story<'io-accordion'> = {
  state: {
    properties: {
      open: false,
      heading: 'Some Heading',
      'heading-tag': 'h3',
      'use-heading-slot': false,
    },
  },
  generator: ({ properties } = {}) => [
    (() => {
      const useHeadingSlot = (properties?.['use-heading-slot'] as boolean) ?? false;
      const heading = (properties?.heading as string) ?? 'Some Heading';

      return {
        tag: 'io-accordion' as const,
        properties: {
          open: (properties?.open as boolean) ?? false,
          ...(useHeadingSlot
            ? {}
            : {
                heading,
                'heading-tag': (properties?.['heading-tag'] as string) ?? 'h3',
              }),
        },
        events: {
          onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
        },
        children: [
          ...(useHeadingSlot
            ? [
                {
                  tag: 'span' as const,
                  properties: { slot: 'heading', className: 'p-static-md' },
                  children: [heading],
                },
              ]
            : []),
          {
            tag: 'p' as const,
            children: [
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
            ],
          },
        ],
      };
    })(),
  ],
};

export const accordionStoryOpen: Story<'io-accordion'> = {
  state: { properties: { open: true, heading: 'Some Heading', 'heading-tag': 'h3' } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: {
        open: true,
        heading: 'Some Heading',
        'heading-tag': 'h3',
      },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
          ],
        },
      ],
    },
  ],
};

export const accordionStorySlottedHeading: Story<'io-accordion'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-accordion' as const,
      properties: {
        open: (properties?.open as boolean) ?? false,
      },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'span' as const,
          properties: { slot: 'heading', className: 'p-static-md' },
          children: ['Some slotted heading'],
        },
        {
          tag: 'p' as const,
          children: [
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
          ],
        },
      ],
    },
  ],
};

export const accordionStoryGroupSingleOpen: Story<'io-accordion'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'w-full max-w-[42.5rem]' },
      children: [
        {
          tag: 'io-accordion' as const,
          properties: { open: true, heading: 'Audits & research' },
          children: [{ tag: 'p' as const, children: ['Making targeted, data-driven decisions starts with clear, reliable data.'] }],
        },
        {
          tag: 'io-accordion' as const,
          properties: { heading: 'Brand and communication strategy' },
          children: [{ tag: 'p' as const, children: ['A clear brand and communication strategy helps teams move in one direction.'] }],
        },
        {
          tag: 'io-accordion' as const,
          properties: { heading: 'Digital strategy' },
          children: [{ tag: 'p' as const, children: ['Build a measurable roadmap that links experience quality to business outcomes.'] }],
        },
      ],
    },
  ],
};

export const accordionStoryGroupMultiOpen: Story<'io-accordion'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'w-full max-w-[42.5rem]' },
      children: [
        {
          tag: 'io-accordion' as const,
          properties: { open: true, heading: 'Audits & research' },
          children: [{ tag: 'p' as const, children: ['Making targeted, data-driven decisions starts with clear, reliable data.'] }],
        },
        {
          tag: 'io-accordion' as const,
          properties: { open: true, heading: 'Brand and communication strategy' },
          children: [{ tag: 'p' as const, children: ['A clear brand and communication strategy helps teams move in one direction.'] }],
        },
        {
          tag: 'io-accordion' as const,
          properties: { heading: 'Digital strategy' },
          children: [{ tag: 'p' as const, children: ['Build a measurable roadmap that links experience quality to business outcomes.'] }],
        },
      ],
    },
  ],
};

export const accordionPropDefinitions: PropDefinition[] = [
  { name: 'open', type: 'boolean', defaultValue: false },
  { name: 'heading', type: 'string', defaultValue: 'Some Heading' },
  { name: 'heading-tag', type: 'select', defaultValue: 'h3', options: ['h2', 'h3', 'h4', 'h5', 'h6'] },
  {
    name: 'use-heading-slot',
    type: 'boolean',
    defaultValue: false,
    group: 'slots',
    description: 'Use the named heading slot instead of the heading prop fallback.',
  },
];
