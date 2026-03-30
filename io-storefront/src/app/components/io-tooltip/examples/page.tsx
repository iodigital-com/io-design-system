'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import {
  tooltipStoryTop,
  tooltipStoryBottom,
  tooltipStoryLeft,
  tooltipStoryRight,
  tooltipStoryLong,
} from '../io-tooltip.stories';

export default function IoTooltipExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Placement: Top" />
        <ComponentStory story={tooltipStoryTop} />
      </section>

      <section>
        <ExamplesSectionHeader title="Placement: Bottom" />
        <ComponentStory story={tooltipStoryBottom} />
      </section>

      <section>
        <ExamplesSectionHeader title="Placement: Left" />
        <ComponentStory story={tooltipStoryLeft} />
      </section>

      <section>
        <ExamplesSectionHeader title="Placement: Right" />
        <ComponentStory story={tooltipStoryRight} />
      </section>

      <section>
        <ExamplesSectionHeader title="Long content" />
        <ComponentStory story={tooltipStoryLong} />
      </section>
    </div>
  );
}
