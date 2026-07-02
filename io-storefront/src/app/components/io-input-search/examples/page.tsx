'use client';

import {
  inputSearchStoryDefault,
  inputSearchStorySizes,
  inputSearchStoryWithPlaceholder,
  inputSearchStoryError,
  inputSearchStoryDisabled,
} from '../io-input-search.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoInputSearchExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputSearchStoryDefault} previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes aligned with form control rhythm." />
        <ComponentStory story={inputSearchStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="With placeholder" description="Use placeholder to hint the expected input format or scope." />
        <ComponentStory story={inputSearchStoryWithPlaceholder} previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={inputSearchStoryError} previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={inputSearchStoryDisabled} previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }} />
      </section>
    </div>
  );
}
