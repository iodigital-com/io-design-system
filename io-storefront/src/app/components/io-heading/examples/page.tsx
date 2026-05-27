'use client';

import { headingStorySizes, headingStoryLevels, headingStoryWeights, headingStoryAlign, headingStoryEllipsis } from '../io-heading.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoHeadingExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Sizes"
          description="sm through 4xl — visual size is independent from the semantic heading level."
        />
        <ComponentStory story={headingStorySizes} previewClassName="flex flex-col gap-4" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Heading levels"
          description="h1 through h6 with recommended size pairings for a typical type scale."
        />
        <ComponentStory story={headingStoryLevels} previewClassName="flex flex-col gap-4" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Weights"
          description="regular, semibold, bold — mapped to --io-font-weight-* tokens."
        />
        <ComponentStory story={headingStoryWeights} previewClassName="flex flex-col gap-4" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Alignment"
          description="start, center, end — controls text-align within the element."
        />
        <ComponentStory story={headingStoryAlign} previewClassName="flex flex-col gap-4" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Ellipsis truncation"
          description="When ellipsis is true the heading is clipped to a single line with an ellipsis. Requires a constrained-width ancestor."
        />
        <ComponentStory story={headingStoryEllipsis} />
      </section>
    </div>
  );
}
