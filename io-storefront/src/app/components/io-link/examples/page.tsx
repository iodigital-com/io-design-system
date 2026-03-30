'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import {
  linkStoryStandalone,
  linkStoryInline,
  linkStoryColors,
  linkStoryDisabled,
} from '../io-link.stories';

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
