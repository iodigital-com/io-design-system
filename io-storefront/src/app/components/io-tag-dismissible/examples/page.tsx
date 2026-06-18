'use client';

import {
  tagDismissibleStoryDefault,
  tagDismissibleStoryVariants,
  tagDismissibleStoryWithIcon,
} from '../io-tag-dismissible.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTagDismissibleExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={tagDismissibleStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Colour variants" />
        <ComponentStory story={tagDismissibleStoryVariants} />
      </section>

      <section>
        <ExamplesSectionHeader title="With icon" />
        <ComponentStory story={tagDismissibleStoryWithIcon} />
      </section>
    </div>
  );
}
