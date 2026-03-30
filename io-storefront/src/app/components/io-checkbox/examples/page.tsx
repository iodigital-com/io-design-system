'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import {
  checkboxStoryDefault,
  checkboxStoryChecked,
  checkboxStoryIndeterminate,
  checkboxStoryError,
  checkboxStoryDisabled,
} from '../io-checkbox.stories';

export default function IoCheckboxExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={checkboxStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Checked" />
        <ComponentStory story={checkboxStoryChecked} />
      </section>

      <section>
        <ExamplesSectionHeader title="Indeterminate" />
        <ComponentStory story={checkboxStoryIndeterminate} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={checkboxStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={checkboxStoryDisabled} />
      </section>
    </div>
  );
}
