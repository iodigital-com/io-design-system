'use client';

import {
  radioGroupStoryDefault,
  radioGroupStoryPreselected,
  radioGroupStoryWithHelper,
  radioGroupStoryDisabled,
  radioGroupStoryError,
} from '../io-radio-group.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoRadioGroupExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={radioGroupStoryDefault} previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Pre-selected value"
          description="Set the value prop to pre-select one of the child radios."
        />
        <ComponentStory story={radioGroupStoryPreselected} previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="With helper text"
          description="helperText provides supporting guidance below the group legend."
        />
        <ComponentStory story={radioGroupStoryWithHelper} previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Disabled group"
          description="Setting disabled on the group disables all child radios."
        />
        <ComponentStory story={radioGroupStoryDisabled} previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Error state"
          description="Set state to &quot;error&quot; and provide a message to show group-level validation feedback."
        />
        <ComponentStory story={radioGroupStoryError} previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }} />
      </section>
    </div>
  );
}
