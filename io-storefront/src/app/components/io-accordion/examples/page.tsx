'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  accordionStory,
  accordionStoryGroupMultiOpen,
  accordionStoryGroupSingleOpen,
  accordionStoryOpen,
  accordionStorySlottedHeading,
} from '../io-accordion.stories';
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
          title="One accordion per content item (single-open pattern)"
          description="Render multiple io-accordion elements in a vertical list and keep one panel open at a time in your page-level state logic."
        />
        <ComponentStory story={accordionStoryGroupSingleOpen} />
        <p
          className="text-xs mt-3"
          style={{ color: 'var(--io-text-muted)' }}
        >
          Note: Single-open behaviour requires page-level state management. The preview above does not enforce it — see the code tabs for a working implementation.
        </p>
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
