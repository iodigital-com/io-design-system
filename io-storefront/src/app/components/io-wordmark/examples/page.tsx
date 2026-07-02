'use client';

import {
  wordmarkStoryVariants,
  wordmarkStoryMarkSizes,
  wordmarkStoryLockupSizes,
  wordmarkStoryMarkColors,
  wordmarkStoryLockupColors,
  wordmarkStoryBadge,
} from '../io-wordmark.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoWordmarkExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="Variants"
          description="Two variants — mark (geometric iO mark SVG) and lockup (full official brand lockup SVG)."
        />
        <ComponentStory
          story={wordmarkStoryVariants}
          previewClassName="flex flex-col items-start gap-6"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Mark sizes"
          description="Four size steps for the geometric iO mark SVG — sm, md, lg, xl — driven by token-scaled SVG heights."
        />
        <ComponentStory
          story={wordmarkStoryMarkSizes}
          previewClassName="flex flex-row items-end gap-6"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Lockup sizes"
          description="The full official brand lockup (mark + 'io digital' text) at all four size steps."
        />
        <ComponentStory
          story={wordmarkStoryLockupSizes}
          previewClassName="flex flex-col items-start gap-6"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Mark colours"
          description="All four colour variants for the iO mark — blue, black, white, and beige."
        />
        <ComponentStory
          story={wordmarkStoryMarkColors}
          previewClassName="flex flex-row items-end gap-8"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Lockup colours"
          description="Three colour variants for the brand lockup — blue, black, and white. Beige is mark-only."
        />
        <ComponentStory
          story={wordmarkStoryLockupColors}
          previewClassName="flex flex-col items-start gap-6"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Badge variant"
          description="Square brand mark for app icons, social avatars, and watermarks. Available in blue, black, and white."
        />
        <ComponentStory
          story={wordmarkStoryBadge}
          previewClassName="flex flex-row items-end gap-8"
        />
      </section>

    </div>
  );
}
