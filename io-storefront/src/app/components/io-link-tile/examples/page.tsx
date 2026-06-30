'use client';

import { linkTileStoryAspectRatios, linkTileStoryAlignments } from '../io-link-tile.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoLinkTileExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="Aspect ratios"
          description="Four built-in presets — 1:1, 4:3, 3:4, and 16:9. The tile always fills its container width."
        />
        <ComponentStory story={linkTileStoryAspectRatios} previewClassName="flex-wrap gap-4 items-start" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Content alignment"
          description="The overlay content can be anchored to the top or bottom of the tile."
        />
        <ComponentStory story={linkTileStoryAlignments} previewClassName="flex-wrap gap-4 items-start" />
      </section>

    </div>
  );
}
