'use client';

import { aiTagStoryVariants, aiTagStoryLocales } from '../io-ai-tag.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoAiTagExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="All variants"
          description="abbreviation, generated, and modified disclosure forms."
        />
        <ComponentStory story={aiTagStoryVariants} previewClassName="flex flex-wrap gap-3 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Locales"
          description="English and Dutch translations for generated and modified variants."
        />
        <ComponentStory story={aiTagStoryLocales} previewClassName="flex flex-wrap gap-3 items-center" />
      </section>
    </div>
  );
}
