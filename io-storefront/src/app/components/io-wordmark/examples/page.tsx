'use client';

import { wordmarkStorySizes, wordmarkStoryMono } from '../io-wordmark.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoWordmarkExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Sizes"
          description="Four size steps — sm, md, lg, xl — driven entirely by token-scaled font sizes."
        />
        <ComponentStory
          story={wordmarkStorySizes}
          previewClassName="flex flex-col items-start gap-4"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Mono mode"
          description='The mono prop removes the brand-blue tint from "io", using the current text colour for both parts. Useful on coloured or image backgrounds.'
        />
        <ComponentStory
          story={wordmarkStoryMono}
          previewClassName="flex flex-col items-start gap-4"
        />
      </section>
    </div>
  );
}
