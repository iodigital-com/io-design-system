import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

type IoAccordionItem = {
  title: string;
  body: string;
  open?: boolean;
};

const SAMPLE_ITEMS: IoAccordionItem[] = [
  {
    title: 'Audits & research',
    body: 'Making targeted, data-driven decisions starts with clear, reliable data...',
    open: true,
  },
  {
    title: 'Brand and communication strategy',
    body: 'A clear brand and communication strategy gets you there...',
  },
  {
    title: 'Digital strategy',
    body: "You don't have to constantly reinvent yourself...",
  },
  {
    title: 'Interface Design',
    body: 'Great interfaces are invisible - they guide users effortlessly to their goal...',
  },
  {
    title: 'Service design',
    body: 'Service design connects people, processes, and technology into seamless experiences...',
  },
  {
    title: 'UX strategy',
    body: 'A clear UX strategy aligns user needs with business goals...',
  },
];

export const accordionStory: Story<'io-accordion'> = {
  state: { properties: { 'allow-multiple': false } },
  generator: ({ properties } = {}) => [
    {
      tag: 'io-accordion' as const,
      properties: {
        items: SAMPLE_ITEMS,
        'allow-multiple': properties?.['allow-multiple'] ?? false,
      },
    },
  ],
};

export const accordionStoryAllowMultiple: Story<'io-accordion'> = {
  state: { properties: { 'allow-multiple': true } },
  generator: () => [
    {
      tag: 'io-accordion' as const,
      properties: {
        items: SAMPLE_ITEMS,
        'allow-multiple': true,
      },
    },
  ],
};

export const accordionPropDefinitions: PropDefinition[] = [
  { name: 'allow-multiple', type: 'boolean', defaultValue: false },
];
