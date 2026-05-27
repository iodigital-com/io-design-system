'use client';

import { textStorySizes, textStoryColors, textStoryWeights, textStoryAlign, textStoryEllipsis } from '../io-text.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTextExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Sizes"
          description="xs, sm, base, lg, xl — mapped to --io-font-size-* tokens."
        />
        <ComponentStory story={textStorySizes} previewClassName="flex flex-col gap-3" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Colors"
          description="Semantic color roles using --io-text-* and --io-color-* tokens."
        />
        <ComponentStory story={textStoryColors} previewClassName="flex flex-col gap-2" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Weights"
          description="regular, medium, semibold, bold — mapped to --io-font-weight-* tokens."
        />
        <ComponentStory story={textStoryWeights} previewClassName="flex flex-col gap-3" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Alignment"
          description="start, center, end — controls text-align within the element."
        />
        <ComponentStory story={textStoryAlign} previewClassName="flex flex-col gap-3" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Ellipsis truncation"
          description="When ellipsis is true the text is clipped to a single line with an ellipsis. Requires a constrained-width ancestor."
        />
        <ComponentStory story={textStoryEllipsis} />
      </section>
    </div>
  );
}
