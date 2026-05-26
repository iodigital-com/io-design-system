'use client';

import { textStorySizes, textStoryColors } from '../io-text.stories';

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
    </div>
  );
}
