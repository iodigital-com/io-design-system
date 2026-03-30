'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { inputStoryDefault, inputStoryError, inputStoryDisabled } from '../io-input.stories';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoInputExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={inputStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={inputStoryDisabled} />
      </section>
    </div>
  );
}
