'use client';

import { useEffect, useRef } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { accordionStory, accordionStoryAllowMultiple } from '../io-accordion.stories';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

type AccordionItem = {
  title: string;
  body: string;
  open?: boolean;
};

const SAMPLE_ITEMS: AccordionItem[] = [
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

export default function IoAccordionExamplesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cloneItems = () => SAMPLE_ITEMS.map((item) => ({ ...item }));

    const applyItems = () => {
      root.querySelectorAll('io-accordion').forEach((el) => {
        const accordionEl = el as HTMLElement & {
          items?: AccordionItem[];
          dataset: DOMStringMap;
        };

        // Set JS-only items once per element instance to avoid resetting panel state on every DOM mutation.
        if (accordionEl.dataset.itemsBound === 'true') return;

        accordionEl.items = cloneItems();
        accordionEl.dataset.itemsBound = 'true';
      });
    };

    applyItems();

    const observer = new MutationObserver(() => {
      applyItems();
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-10" ref={rootRef}>
      <section>
        <ExamplesSectionHeader
          title="Single-open (default)"
          description="Only one panel can be expanded at a time. Opening another panel closes the current one."
        />
        <ComponentStory story={accordionStory} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Multiple open"
          description="With allow-multiple, multiple panels can be expanded simultaneously - useful for FAQ layouts."
        />
        <ComponentStory story={accordionStoryAllowMultiple} />
      </section>
    </div>
  );
}
