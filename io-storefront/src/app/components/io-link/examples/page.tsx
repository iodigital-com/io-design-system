'use client';

import {
  linkStoryStandalone,
  linkStoryInline,
  linkStoryColors,
  linkStoryDisabled,
} from '../io-link.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoLinkExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Standalone" />
        <ComponentStory story={linkStoryStandalone} />
      </section>

      <section>
        <ExamplesSectionHeader title="Inline" />
        <ComponentStory story={linkStoryInline} />
      </section>

      <section>
        <ExamplesSectionHeader title="Colours" />
        <ComponentStory story={linkStoryColors} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={linkStoryDisabled} />
      </section>
    </div>
  );
}
