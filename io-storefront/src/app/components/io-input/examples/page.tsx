'use client';

import {
  inputStoryDefault,
  inputStorySizes,
  inputStoryDateTime,
  inputStoryConstraints,
  inputStoryError,
  inputStoryDisabled,
} from '../io-input.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoInputExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes aligned with form control rhythm." />
        <ComponentStory story={inputStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="Date and time types" description="Native date/time inputs with platform pickers and constraints." />
        <ComponentStory story={inputStoryDateTime} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="Numeric constraints" description="min, max, and step forwarded to native number/date/time inputs." />
        <ComponentStory story={inputStoryConstraints} />
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
