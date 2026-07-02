'use client';

import { buttonPureStoryStates, buttonPureStoryAlignLabel } from '../io-button-pure.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoButtonPureExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="States"
          description="Default, underline, active, and disabled states."
        />
        <ComponentStory story={buttonPureStoryStates} previewClassName="flex flex-wrap gap-4 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Icon alignment"
          description="alignLabel='start' places the icon before the label; alignLabel='end' places it after."
        />
        <ComponentStory story={buttonPureStoryAlignLabel} previewClassName="flex flex-wrap gap-4 items-center" />
      </section>
    </div>
  );
}
