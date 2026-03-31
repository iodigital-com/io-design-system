import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { FrameworkCode } from '@/models/framework';

const accordionSingleOpenCode: FrameworkCode = {
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
import { IoAccordion } from '@io-digital/components-react';

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
import { IoAccordion } from '@io-digital/components-angular';

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
import { IoAccordion } from '@io-digital/components-vue';

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
      disabled: false,
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
          disabled: (properties?.disabled as boolean) ?? false,
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
  { name: 'disabled', type: 'boolean', defaultValue: false },
  {
    name: 'use-heading-slot',
    type: 'boolean',
    defaultValue: false,
    group: 'slots',
    description: 'Use the named heading slot instead of the heading prop fallback.',
  },
];
