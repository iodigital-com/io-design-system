'use client';

import { buttonTileStoryStates } from '../io-button-tile.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoButtonTileExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="States"
          description="Default, disabled, and loading states of the button tile."
        />
        <ComponentStory story={buttonTileStoryStates} previewClassName="flex-wrap gap-4 items-start" />
      </section>

    </div>
  );
}
