'use client';

import {
  textareaStoryDefault,
  textareaStorySizes,
  textareaStoryResize,
  textareaStoryError,
  textareaStoryDisabled,
} from '../io-textarea.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTextareaExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={textareaStoryDefault} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes to match surrounding form controls." />
        <ComponentStory story={textareaStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="Resize variants" />
        <ComponentStory
          story={textareaStoryResize}
          previewStyle={{ flexDirection: 'column', alignItems: 'center', gap: 'var(--io-space-2, 8px)' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={textareaStoryError} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={textareaStoryDisabled} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>
    </div>
  );
}
