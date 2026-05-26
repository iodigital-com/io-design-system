'use client';

import {
  popoverStoryBottom,
  popoverStoryTop,
  popoverStoryLeft,
  popoverStoryRight,
  popoverStoryRichContent,
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
    </div>
  );
}
