'use client';

import {
  multiSelectStoryDefault,
  multiSelectStoryWithFilter,
  multiSelectStoryError,
  multiSelectStoryPreselected,
  multiSelectStoryRequired,
  multiSelectStoryMaxDisplay,
  multiSelectStoryDisabled,
} from '../io-multi-select.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoMultiSelectExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" description="Multi-select with removable chips for each selected value." />
        <ComponentStory story={multiSelectStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="With search filter"
          description="When filter is true, a search input appears inside the dropdown to narrow options by label."
        />
        <ComponentStory story={multiSelectStoryWithFilter} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" description="Use state='error' with a message to communicate validation failures." />
        <ComponentStory story={multiSelectStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Pre-selected values"
          description="Pass a comma-separated string to the value prop to pre-populate the selection on mount."
        />
        <ComponentStory story={multiSelectStoryPreselected} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Required field"
          description="Set required to mark the field as mandatory. The component participates in native HTML form validation."
        />
        <ComponentStory story={multiSelectStoryRequired} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Overflow chips (maxDisplay)"
          description="Use maxDisplay to cap the visible chips. Additional selections collapse into a '+N more' indicator."
        />
        <ComponentStory story={multiSelectStoryMaxDisplay} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Disabled"
          description="Set disabled to prevent opening the dropdown. Existing selections remain visible but cannot be changed."
        />
        <ComponentStory story={multiSelectStoryDisabled} />
      </section>
    </div>
  );
}
