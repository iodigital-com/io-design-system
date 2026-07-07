import type { FrameworkCode } from '@/models/framework';
import type { PropDefinition } from '@/models/propDefinition';
import type { Story } from '@/models/story';

type IoAccordionSize = 'xs' | 'sm' | 'md' | 'lg';
type IoAccordionBackground = 'transparent' | 'surface' | 'canvas' | 'frosted';
type IoAccordionAlignMarker = 'start' | 'end';

export const accordionSingleOpenCode: FrameworkCode = {
  html: `<div class="accordion-group" data-accordion-group>
  <io-accordion heading="Audits & research" open>
    <p>Making targeted, data-driven decisions starts with clear, reliable data.</p>
  </io-accordion>
  <io-accordion heading="Brand and communication strategy">
    <p>A clear brand and communication strategy helps teams move in one direction.</p>
  </io-accordion>
  <io-accordion heading="Digital strategy">
    <p>Build a measurable roadmap that links experience quality to business outcomes.</p>
  </io-accordion>
</div>

<script>
  const accordions = [...document.querySelectorAll('[data-accordion-group] io-accordion')];

  accordions.forEach((accordion) => {
    accordion.addEventListener('update', (event) => {
      const { open } = event.detail;
      if (!open) return;

      accordions.forEach((other) => {
        if (other !== accordion) other.open = false;
      });
    });
  });
</script>`,
  react: `import React, { useState } from 'react';
import { IoAccordion } from '@iodigital-com/components-react';

const items = [
  {
    id: 'audits',
    heading: 'Audits & research',
    content: 'Making targeted, data-driven decisions starts with clear, reliable data.',
  },
  {
    id: 'brand',
    heading: 'Brand and communication strategy',
    content: 'A clear brand and communication strategy helps teams move in one direction.',
  },
  {
    id: 'digital',
    heading: 'Digital strategy',
    content: 'Build a measurable roadmap that links experience quality to business outcomes.',
  },
];

export const Example: React.FC = () => {
  const [openId, setOpenId] = useState('audits');

  return (
    <div className="w-full max-w-[42.5rem]">
      {items.map((item) => (
        <IoAccordion
          key={item.id}
          heading={item.heading}
          open={openId === item.id}
          onUpdate={(event) => {
            setOpenId(event.detail.open ? item.id : '');
          }}
        >
          <p>{item.content}</p>
        </IoAccordion>
      ))}
    </div>
  );
};`,
  angular: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IoAccordion } from '@iodigital-com/components-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IoAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<div class="w-full max-w-[42.5rem]">
  @for (item of items; track item.id) {
    <io-accordion
      [heading]="item.heading"
      [open]="openId === item.id"
      (update)="onUpdate(item.id, $event.detail.open)"
    >
      <p>{{ item.content }}</p>
    </io-accordion>
  }
</div>\`,
})
export class ExampleComponent {
  openId = 'audits';

  readonly items = [
    {
      id: 'audits',
      heading: 'Audits & research',
      content: 'Making targeted, data-driven decisions starts with clear, reliable data.',
    },
    {
      id: 'brand',
      heading: 'Brand and communication strategy',
      content: 'A clear brand and communication strategy helps teams move in one direction.',
    },
    {
      id: 'digital',
      heading: 'Digital strategy',
      content: 'Build a measurable roadmap that links experience quality to business outcomes.',
    },
  ];

  onUpdate(id: string, open: boolean): void {
    this.openId = open ? id : '';
  }
}`,
  vue: `<script setup lang="ts">
import { ref } from 'vue';
import { IoAccordion } from '@iodigital-com/components-vue';

const items = [
  {
    id: 'audits',
    heading: 'Audits & research',
    content: 'Making targeted, data-driven decisions starts with clear, reliable data.',
  },
  {
    id: 'brand',
    heading: 'Brand and communication strategy',
    content: 'A clear brand and communication strategy helps teams move in one direction.',
  },
  {
    id: 'digital',
    heading: 'Digital strategy',
    content: 'Build a measurable roadmap that links experience quality to business outcomes.',
  },
];

const openId = ref('audits');

const onUpdate = (id: string, open: boolean) => {
  openId.value = open ? id : '';
};
</script>

<template>
  <div class="w-full max-w-[42.5rem]">
    <IoAccordion
      v-for="item in items"
      :key="item.id"
      :heading="item.heading"
      :open="openId === item.id"
      @update="({ detail }) => onUpdate(item.id, detail.open)"
    >
      <p>{{ item.content }}</p>
    </IoAccordion>
  </div>
</template>`,
};

export const accordionStory: Story<'io-accordion'> = {
  state: {
    properties: {
      open: false,
      heading: 'Some Heading',
      'heading-tag': 'h3',
      size: 'md',
      disabled: false,
      'default-expanded': false,
      'allow-multiple': false,
      background: 'transparent',
      sticky: false,
      indent: false,
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
          size: (properties?.size as IoAccordionSize) ?? 'md',
          disabled: (properties?.disabled as boolean) ?? false,
          'default-expanded': (properties?.['default-expanded'] as boolean) ?? false,
          'allow-multiple': (properties?.['allow-multiple'] as boolean) ?? false,
          background: (properties?.background as IoAccordionBackground) ?? 'transparent',
          sticky: (properties?.sticky as boolean) ?? false,
          indent: (properties?.indent as boolean) ?? false,
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
  frameworkCode: accordionSingleOpenCode,
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

export const accordionStoryDefaultExpanded: Story<'io-accordion'> = {
  state: { properties: { heading: 'Expanded on load', 'heading-tag': 'h3' } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: {
        heading: 'Expanded on load',
        'heading-tag': 'h3',
        'default-expanded': true,
      },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['This panel opens immediately on first render without requiring the open prop to be set externally.'],
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
          properties: { open: true, heading: 'Audits & research', 'allow-multiple': true },
          children: [{ tag: 'p' as const, children: ['Making targeted, data-driven decisions starts with clear, reliable data.'] }],
        },
        {
          tag: 'io-accordion' as const,
          properties: { open: true, heading: 'Brand and communication strategy', 'allow-multiple': true },
          children: [{ tag: 'p' as const, children: ['A clear brand and communication strategy helps teams move in one direction.'] }],
        },
        {
          tag: 'io-accordion' as const,
          properties: { heading: 'Digital strategy', 'allow-multiple': true },
          children: [{ tag: 'p' as const, children: ['Build a measurable roadmap that links experience quality to business outcomes.'] }],
        },
      ],
    },
  ],
};


export const accordionStorySizeSm: Story<'io-accordion'> = {
  state: { properties: { heading: 'Small accordion', 'heading-tag': 'h3', size: 'sm' } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Small accordion', 'heading-tag': 'h3', size: 'sm' },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['Compact size — reduced trigger padding and smaller heading font.'],
        },
      ],
    },
  ],
};

export const accordionStorySizeMd: Story<'io-accordion'> = {
  state: { properties: { heading: 'Medium accordion (default)', 'heading-tag': 'h3', size: 'md' } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Medium accordion (default)', 'heading-tag': 'h3', size: 'md' },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['Default size — standard trigger padding and heading font.'],
        },
      ],
    },
  ],
};

export const accordionStorySizeLg: Story<'io-accordion'> = {
  state: { properties: { heading: 'Large accordion', 'heading-tag': 'h3', size: 'lg' } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Large accordion', 'heading-tag': 'h3', size: 'lg' },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['Comfortable size — generous trigger padding and larger heading font.'],
        },
      ],
    },
  ],
};

export const accordionStorySurfaceBackground: Story<'io-accordion'> = {
  state: { properties: { heading: 'Surface background', background: 'surface', open: true } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Surface background', background: 'surface', open: true },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['This accordion uses the surface background fill — suitable for card or nested layouts.'],
        },
      ],
    },
  ],
};

export const accordionStoryCanvasBackground: Story<'io-accordion'> = {
  state: { properties: { heading: 'Canvas background', background: 'canvas', open: true } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Canvas background', background: 'canvas', open: true },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['This accordion uses the canvas (page-level) background fill.'],
        },
      ],
    },
  ],
};

export const accordionStorySizeXs: Story<'io-accordion'> = {
  state: { properties: { heading: 'Extra small accordion', 'heading-tag': 'h3', size: 'xs' as IoAccordionSize } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Extra small accordion', 'heading-tag': 'h3', size: 'xs' as IoAccordionSize },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['Densest size — tightest trigger padding and smallest heading font.'],
        },
      ],
    },
  ],
};

export const accordionStoryAlignMarkerStart: Story<'io-accordion'> = {
  state: { properties: { heading: 'Marker at start', 'align-marker': 'start' as IoAccordionAlignMarker } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { heading: 'Marker at start', 'align-marker': 'start' as IoAccordionAlignMarker },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['The expand/collapse icon appears before the title — useful for sidebar or tree-navigation layouts.'],
        },
      ],
    },
  ],
};

export const accordionStoryStickyWithSurface: Story<'io-accordion'> = {
  state: { properties: { heading: 'Sticky header (surface)', background: 'surface', sticky: true, open: true } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: {
        heading: 'Sticky header (surface)',
        background: 'surface',
        sticky: true,
        open: true,
        style: { maxHeight: '120px', overflowY: 'auto' },
      },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        { tag: 'p' as const, children: ['Line 1 — scroll down to see the header stick.'] },
        { tag: 'p' as const, children: ['Line 2 — more content to enable scrolling.'] },
        { tag: 'p' as const, children: ['Line 3 — more content to enable scrolling.'] },
        { tag: 'p' as const, children: ['Line 4 — more content to enable scrolling.'] },
        { tag: 'p' as const, children: ['Line 5 — header should remain visible above.'] },
      ],
    },
  ],
};

export const accordionStoryFrostedBackground: Story<'io-accordion'> = {
  state: { properties: { heading: 'Frosted background', background: 'frosted', open: true } },
  generator: () => [
    {
      tag: 'div' as const,
      properties: {
        style: {
          background: 'linear-gradient(135deg, var(--io-color-primary) 0%, var(--io-focus-inner) 100%)',
          padding: 'var(--io-space-4)',
        },
      },
      children: [
        {
          tag: 'io-accordion' as const,
          properties: { heading: 'Frosted background', background: 'frosted', open: true },
          events: {
            onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
          },
          children: [
            {
              tag: 'p' as const,
              children: ['The frosted variant applies backdrop-filter: blur for legibility over image or video backdrops. Text contrast is maintained via the semi-transparent surface fill.'],
            },
          ],
        },
      ],
    },
  ],
};

export const accordionStoryIndent: Story<'io-accordion'> = {
  state: { properties: { heading: 'Indented panel', 'align-marker': 'start' as IoAccordionAlignMarker, indent: true, open: true } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: {
        heading: 'Indented panel',
        'align-marker': 'start' as IoAccordionAlignMarker,
        indent: true,
        open: true,
      },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'p' as const,
          children: ['With indent=true, the panel content aligns with the trigger label text — past the expand/collapse icon. Combine with alignMarker="start" for a clean optical column.'],
        },
      ],
    },
  ],
};

export const accordionStorySummarySlots: Story<'io-accordion'> = {
  state: { properties: { open: true } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: { open: true },
      events: {
        onUpdate: { target: 'io-accordion', prop: 'open', eventValueKey: 'open' },
      },
      children: [
        {
          tag: 'span' as const,
          properties: { slot: 'summary' },
          children: ['Rich summary content'],
        },
        {
          tag: 'button' as const,
          properties: {
            slot: 'summary-after',
            style: { marginInlineStart: 'var(--io-space-2)', cursor: 'pointer' },
            'aria-label': 'Edit section',
          },
          children: ['Edit'],
        },
        {
          tag: 'p' as const,
          children: ['The summary slot replaces the heading slot for free-form trigger content. The summary-after slot renders an independently operable action button outside the trigger.'],
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
    name: 'size',
    type: 'select',
    defaultValue: 'md',
    options: ['xs', 'sm', 'md', 'lg'],
    description: 'Controls trigger padding and heading font size. xs = densest, sm = compact, md = default, lg = comfortable.',
  },
  {
    name: 'align-marker',
    type: 'select',
    defaultValue: 'end',
    options: ['start', 'end'],
    description: 'Position of the expand/collapse icon. start = before title, end = after title (default).',
  },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  {
    name: 'default-expanded',
    type: 'boolean',
    defaultValue: false,
    description: 'Expands this panel on the very first render. Has no effect after initial mount.',
  },
  {
    name: 'allow-multiple',
    type: 'boolean',
    defaultValue: false,
    description: 'Set to true to opt out of single-open group coordination. Siblings with allow-multiple=false will auto-close when another opens.',
  },
  {
    name: 'background',
    type: 'select',
    defaultValue: 'transparent',
    options: ['transparent', 'surface', 'canvas', 'frosted'],
    description: 'Background fill for the accordion host. transparent = no fill, surface = var(--io-bg-surface), canvas = var(--io-bg-page), frosted = semi-transparent blur for image/video backdrops.',
  },
  {
    name: 'sticky',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, the accordion trigger becomes position: sticky. Meaningful only with background="surface" or background="canvas".',
  },
  {
    name: 'indent',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, indents panel content to align with the summary text column past the expand/collapse icon. Useful with alignMarker="start".',
  },
];
