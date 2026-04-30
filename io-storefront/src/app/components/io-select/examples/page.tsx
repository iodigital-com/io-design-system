'use client';

import {
  selectStoryDefault,
  selectStorySizes,
  selectStoryPlaceholder,
  selectStoryError,
  selectStoryDisabled,
} from '../io-select.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoSelectExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={selectStoryDefault} />
      </section>

      <section>        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes for compact to touch-friendly layouts." />
        <ComponentStory story={selectStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>        <ExamplesSectionHeader title="With placeholder" />
        <ComponentStory story={selectStoryPlaceholder} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={selectStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={selectStoryDisabled} />
      </section>
    </div>
  );
}
