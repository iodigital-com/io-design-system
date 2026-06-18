'use client';

import {
  segmentedControlStoryDefault,
  segmentedControlStoryPreselected,
  segmentedControlStoryTwoOptions,
  segmentedControlStoryDisabled,
} from '../io-segmented-control.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoSegmentedControlExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={segmentedControlStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Pre-selected value"
          description="Set the value prop to pre-select one of the child segments on initial render."
        />
        <ComponentStory story={segmentedControlStoryPreselected} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Two options"
          description="Works equally well with just two mutually exclusive choices."
        />
        <ComponentStory story={segmentedControlStoryTwoOptions} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Disabled"
          description="Setting disabled on the control disables all child segments."
        />
        <ComponentStory story={segmentedControlStoryDisabled} />
      </section>
    </div>
  );
}
