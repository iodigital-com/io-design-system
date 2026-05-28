'use client';

import {
  popoverStoryBottom,
  popoverStoryTop,
  popoverStoryLeft,
  popoverStoryRight,
  popoverStoryRichContent,
  popoverStoryCloseOnClickOutsideFalse,
  popoverStoryWithActions,
} from '../io-popover.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoPopoverExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Placement: Bottom" />
        <ComponentStory story={popoverStoryBottom} />
      </section>

      <section>
        <ExamplesSectionHeader title="Placement: Top" />
        <ComponentStory story={popoverStoryTop} />
      </section>

      <section>
        <ExamplesSectionHeader title="Placement: Right" />
        <ComponentStory story={popoverStoryRight} />
      </section>

      <section>
        <ExamplesSectionHeader title="Placement: Left" />
        <ComponentStory story={popoverStoryLeft} />
      </section>

      <section>
        <ExamplesSectionHeader title="Rich content" />
        <ComponentStory story={popoverStoryRichContent} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Actions menu"
          description="Slot a list of ghost buttons to create a kebab/more-actions menu. Each action closes the popover after executing."
        />
        <ComponentStory story={popoverStoryWithActions} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Stays open on outside click"
          description="Set closeOnClickOutside=false for filter or settings panels that should persist while the user interacts with other parts of the page."
        />
        <ComponentStory story={popoverStoryCloseOnClickOutsideFalse} />
      </section>
    </div>
  );
}
