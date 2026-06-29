'use client';

import { textListStoryTags, textListStorySizes, textListStoryColors } from '../io-text-list.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTextListExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Tags"
          description="ul for unordered content, ol for sequential content with inherent order."
        />
        <ComponentStory story={textListStoryTags} previewClassName="flex flex-col gap-4" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Sizes"
          description="xs, sm, base, lg, xl — mapped to --io-font-size-* tokens."
        />
        <ComponentStory story={textListStorySizes} previewClassName="flex flex-col gap-4" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Colors"
          description="Semantic color roles using --io-text-* and --io-color-* tokens."
        />
        <ComponentStory story={textListStoryColors} previewClassName="flex flex-col gap-4" />
      </section>
    </div>
  );
}
