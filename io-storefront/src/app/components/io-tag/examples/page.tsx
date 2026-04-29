'use client';

import {
  tagStoryDefault,
  tagStorySelected,
  tagStoryColors,
  tagStoryRemovable,
  tagStoryDisabled,
} from '../io-tag.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTagExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={tagStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Selected state" />
        <ComponentStory story={tagStorySelected} />
      </section>

      <section>
        <ExamplesSectionHeader title="Colours" />
        <ComponentStory story={tagStoryColors} />
      </section>

      <section>
        <ExamplesSectionHeader title="Removable" />
        <ComponentStory story={tagStoryRemovable} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={tagStoryDisabled} />
      </section>
    </div>
  );
}
