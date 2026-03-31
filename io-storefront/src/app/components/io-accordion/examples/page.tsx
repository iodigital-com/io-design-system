'use client';

import { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import {
  accordionSingleOpenCode,
  accordionStory,
  accordionStoryGroupMultiOpen,
  accordionStoryOpen,
  accordionStorySlottedHeading,
} from '../io-accordion.stories';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

const singleOpenItems = [
  { id: 'audits', heading: 'Audits & research', content: 'Making targeted, data-driven decisions starts with clear, reliable data.' },
  { id: 'brand', heading: 'Brand and communication strategy', content: 'A clear brand and communication strategy helps teams move in one direction.' },
  { id: 'digital', heading: 'Digital strategy', content: 'Build a measurable roadmap that links experience quality to business outcomes.' },
];

function SingleOpenDemo() {
  const [openId, setOpenId] = useState('audits');

  return (
    <Playground frameworkCode={accordionSingleOpenCode} codeVisible>
      <div className="w-full max-w-[42.5rem]">
        {singleOpenItems.map((item) => (
          <io-accordion
            key={item.id}
            heading={item.heading}
            open={openId === item.id}
            suppressHydrationWarning
            onUpdate={(ev: CustomEvent<{ open: boolean }>) => {
              setOpenId(ev.detail.open ? item.id : '');
            }}
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
