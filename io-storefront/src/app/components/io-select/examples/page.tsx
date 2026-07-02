'use client';

import {
  selectStoryDefault,
  selectStorySizes,
  selectStoryPlaceholder,
  selectStoryError,
  selectStoryDisabled,
  selectStoryCombobox,
  selectStoryMultiple,
  selectStoryFilter,
  selectStoryMultipleFilter,
} from '../io-select.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { FORM_FIELD_PREVIEW_STYLE } from '@/components/playground/preview-styles';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoSelectExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={selectStoryDefault} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes for compact to touch-friendly layouts." />
        <ComponentStory story={selectStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="With placeholder" />
        <ComponentStory story={selectStoryPlaceholder} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={selectStoryError} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={selectStoryDisabled} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Combobox (custom)"
          description="Set custom to switch from the native select to a fully accessible ARIA combobox. The trigger is a button with role=combobox and a keyboard-managed listbox dropdown."
        />
        <ComponentStory story={selectStoryCombobox} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Multi-select (custom + multiple)"
          description="Set multiple with custom to allow selecting several options at once. The dropdown stays open after each selection. Options show a checkbox indicator and aria-checked reflects each item's state."
        />
        <ComponentStory story={selectStoryMultiple} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="With filter (custom + filter)"
          description="Set filter with custom to add a search input at the top of the dropdown. Options are filtered by label as the user types. Focus moves to the filter input when the dropdown opens."
        />
        <ComponentStory story={selectStoryFilter} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Multi-select with filter (custom + multiple + filter)"
          description="Combine multiple and filter for a searchable multi-select combobox. Useful when the option list is long and users need to find and select several items efficiently."
        />
        <ComponentStory story={selectStoryMultipleFilter} previewStyle={FORM_FIELD_PREVIEW_STYLE} />
      </section>
    </div>
  );
}
