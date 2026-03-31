'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { accordionStory, accordionStoryGroup, accordionStoryOpen, accordionStorySlottedHeading } from '../io-accordion.stories';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

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
          title="One accordion per content item"
          description="To build a list of disclosures, render multiple io-accordion elements instead of passing an items array."
        />
        <ComponentStory story={accordionStoryGroup} />
      </section>
    </div>
  );
}
