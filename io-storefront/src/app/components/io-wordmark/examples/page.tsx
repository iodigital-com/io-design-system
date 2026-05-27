'use client';

import {
  wordmarkStoryVariants,
  wordmarkStorySizes,
  wordmarkStoryMarkSizes,
  wordmarkStoryLockupSizes,
  wordmarkStoryColors,
  wordmarkStoryMarkColors,
  wordmarkStoryMono,
} from '../io-wordmark.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoWordmarkExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="Variants"
          description="Three variants — text (typographic web font), mark (geometric iO mark SVG), and lockup (full official brand SVG)."
        />
        <ComponentStory
          story={wordmarkStoryVariants}
          previewClassName="flex flex-col items-start gap-6"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Text sizes"
          description="Four size steps for the text variant — sm, md, lg, xl — driven entirely by token-scaled font sizes."
        />
        <ComponentStory
          story={wordmarkStorySizes}
          previewClassName="flex flex-col items-start gap-4"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Mark sizes"
          description="The same four size steps applied to the geometric iO mark SVG."
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
          title="Text colours"
          description="Blue (default), black, and white colour variants for the text wordmark."
        />
        <ComponentStory
          story={wordmarkStoryColors}
          previewClassName="flex flex-col items-start gap-4"
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
          title="Mono mode"
          description='The mono prop removes the brand-blue tint from "io" on the text variant, using the current text colour for both parts. Useful on coloured or image backgrounds.'
        />
        <ComponentStory
          story={wordmarkStoryMono}
          previewClassName="flex flex-col items-start gap-4"
        />
      </section>

    </div>
  );
}
