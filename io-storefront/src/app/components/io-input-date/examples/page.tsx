'use client';

import {
  inputDateStoryDefault,
  inputDateStorySizes,
  inputDateStoryWithConstraints,
  inputDateStoryBirthDate,
  inputDateStoryError,
  inputDateStoryDisabled,
} from '../io-input-date.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoInputDateExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputDateStoryDefault} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes aligned with form control rhythm." />
        <ComponentStory story={inputDateStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="With constraints" description="Use min and max to restrict the selectable date range." />
        <ComponentStory story={inputDateStoryWithConstraints} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Date of birth" description="Use max to enforce age requirements. Surface the constraint in helperText." />
        <ComponentStory story={inputDateStoryBirthDate} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={inputDateStoryError} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={inputDateStoryDisabled} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>
    </div>
  );
}
