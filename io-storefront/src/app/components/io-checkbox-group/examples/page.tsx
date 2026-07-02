'use client';

import {
  checkboxGroupStoryDefault,
  checkboxGroupStoryPreChecked,
  checkboxGroupStoryWithHelper,
  checkboxGroupStoryDisabled,
  checkboxGroupStoryError,
} from '../io-checkbox-group.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoCheckboxGroupExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={checkboxGroupStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Pre-checked options"
          description="Set checked on individual io-checkbox children to pre-select options on load."
        />
        <ComponentStory story={checkboxGroupStoryPreChecked} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="With helper text"
          description="helperText provides supporting guidance below the group legend."
        />
        <ComponentStory story={checkboxGroupStoryWithHelper} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Disabled group"
          description="Setting disabled on the group disables all child checkboxes."
        />
        <ComponentStory story={checkboxGroupStoryDisabled} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Error state"
          description="Set state to &quot;error&quot; and provide a message to show group-level validation feedback."
        />
        <ComponentStory story={checkboxGroupStoryError} />
      </section>
    </div>
  );
}
