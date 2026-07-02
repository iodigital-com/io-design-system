'use client';

import {
  inputSearchStoryDefault,
  inputSearchStorySizes,
  inputSearchStoryWithPlaceholder,
  inputSearchStoryError,
  inputSearchStoryDisabled,
} from '../io-input-search.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoInputSearchExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputSearchStoryDefault} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes aligned with form control rhythm." />
        <ComponentStory story={inputSearchStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="With placeholder" description="Use placeholder to hint the expected input format or scope." />
        <ComponentStory story={inputSearchStoryWithPlaceholder} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={inputSearchStoryError} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={inputSearchStoryDisabled} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>
    </div>
  );
}
