'use client';

import {
  multiSelectStoryDefault,
  multiSelectStoryWithFilter,
  multiSelectStoryError,
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
    </div>
  );
}
