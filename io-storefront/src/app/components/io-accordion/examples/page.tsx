'use client';

import { useEffect, useRef, useState } from 'react';

import {
  accordionSingleOpenCode,
  accordionStory,
  accordionStoryCanvasBackground,
  accordionStoryDefaultExpanded,
  accordionStoryGroupMultiOpen,
  accordionStoryOpen,
  accordionStorySlottedHeading,
  accordionStorySizeLg,
  accordionStorySizeMd,
  accordionStorySizeSm,
  accordionStoryStickyWithSurface,
  accordionStorySurfaceBackground,
} from '../io-accordion.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';

const singleOpenItems = [
  { id: 'audits', heading: 'Audits & research', content: 'Making targeted, data-driven decisions starts with clear, reliable data.' },
  { id: 'brand', heading: 'Brand and communication strategy', content: 'A clear brand and communication strategy helps teams move in one direction.' },
  { id: 'digital', heading: 'Digital strategy', content: 'Build a measurable roadmap that links experience quality to business outcomes.' },
];

/**
 * Live single-open demo (controlled pattern).
 *
 * Uses imperative DOM via refs instead of React 19 JSX props because
 * Stencil's @Prop({ mutable: true }) self-mutates `open` on click,
 * and React 19's property-setting on custom elements does not reliably
 * override the in-flight Stencil mutation.
 *
 * Sets allowMultiple=true on each accordion so this controlled demo manages
 * open state exclusively through React — opting out of the built-in
 * single-open coordination that fires when allowMultiple=false (the default).
 */
function SingleOpenDemo() {
  const [openId, setOpenId] = useState('audits');
  const containerRef = useRef<HTMLDivElement>(null);

  // Opt these controlled accordions out of built-in group coordination.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll('io-accordion').forEach((acc) => {
      (acc as unknown as { allowMultiple: boolean }).allowMultiple = true;
    });
  }, []);

  // Attach a single delegated event listener for `update` events.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleUpdate = (ev: Event) => {
      const accordion = (ev.target as HTMLElement).closest('io-accordion');
      if (!accordion) return;
      const id = accordion.getAttribute('data-id');
      const { open } = (ev as CustomEvent<{ open: boolean }>).detail;
      setOpenId(open ? (id ?? '') : '');
    };

    container.addEventListener('update', handleUpdate);
    return () => container.removeEventListener('update', handleUpdate);
  }, []);

  // Imperatively sync the `open` property on every accordion element.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.querySelectorAll('io-accordion').forEach((acc) => {
      (acc as unknown as { open: boolean }).open =
        acc.getAttribute('data-id') === openId;
    });
  }, [openId]);

  return (
    <Playground frameworkCode={accordionSingleOpenCode} codeVisible>
      <div ref={containerRef} className="w-full max-w-[42.5rem]">
        {singleOpenItems.map((item) => (
          <io-accordion
            key={item.id}
            data-id={item.id}
            heading={item.heading}
            suppressHydrationWarning
          >
            <p>{item.content}</p>
          </io-accordion>
        ))}
      </div>
    </Playground>
  );
}

export default function IoAccordionExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Default heading prop"
          description="One accordion controls one content block. Use the heading prop as a simple text trigger."
        />
        <ComponentStory story={accordionStory} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Open by default"
          description="Set open to true when the content should be expanded on initial render."
        />
        <ComponentStory story={accordionStoryOpen} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Named heading slot"
          description="Provide rich heading markup through the heading slot when you need custom typography or inline elements."
        />
        <ComponentStory story={accordionStorySlottedHeading} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Default expanded"
          description="Use default-expanded to expand a panel on first render without setting open externally. The prop has no effect after initial mount."
        />
        <ComponentStory story={accordionStoryDefaultExpanded} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Size sm"
          description="Use size='sm' for compact layouts where vertical space is limited."
        />
        <ComponentStory story={accordionStorySizeSm} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Size md (default)"
          description="The default size. Use when no explicit size is specified."
        />
        <ComponentStory story={accordionStorySizeMd} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Size lg"
          description="Use size='lg' for marketing pages or hero-area accordions where a more prominent trigger is appropriate."
        />
        <ComponentStory story={accordionStorySizeLg} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Background: surface"
          description="Use background='surface' to apply a subtle fill (--io-bg-surface) — useful in card-based or nested layouts."
        />
        <ComponentStory story={accordionStorySurfaceBackground} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Background: canvas"
          description="Use background='canvas' to apply a page-level fill (--io-bg-page) — matches the overall page background."
        />
        <ComponentStory story={accordionStoryCanvasBackground} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Sticky header with surface background"
          description="Combine sticky=true with background='surface' or 'canvas' to keep the trigger visible while scrolling through long expanded content."
        />
        <ComponentStory story={accordionStoryStickyWithSurface} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="One accordion per content item (single-open pattern)"
          description="Render multiple io-accordion elements in a vertical list and keep one panel open at a time in your page-level state logic."
        />
        <SingleOpenDemo />
      </section>
      <section>
        <ExamplesSectionHeader
          title="One accordion per content item (multiple-open pattern)"
          description="When users need side-by-side comparison, allow multiple panels to remain open by controlling each accordion independently."
        />
        <ComponentStory story={accordionStoryGroupMultiOpen} />
      </section>
    </div>
  );
}
