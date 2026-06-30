'use client';

import {
  linkPureStoryDefault,
  linkPureStoryIconEnd,
  linkPureStoryActive,
  linkPureStorySizes,
  linkPureStoryDisabled,
  linkPureStoryIconOnly,
} from '../io-link-pure.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoLinkPureExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default — icon start" />
        <ComponentStory story={linkPureStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Icon end" />
        <ComponentStory story={linkPureStoryIconEnd} />
      </section>

      <section>
        <ExamplesSectionHeader title="Active (current nav item)" />
        <ComponentStory story={linkPureStoryActive} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" />
        <ComponentStory story={linkPureStorySizes} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled" />
        <ComponentStory story={linkPureStoryDisabled} />
      </section>

      <section>
        <ExamplesSectionHeader title="Icon only" />
        <ComponentStory story={linkPureStoryIconOnly} />
      </section>
    </div>
  );
}
