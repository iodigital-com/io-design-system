'use client';

import { gridStoryHalves, gridStoryThirds, gridStorySidebar } from '../io-grid.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoGridExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="Two columns — equal halves"
          description="Each io-grid-item spans 6 of 12 columns. The gap-md preset gives a fluid 16–36px gap."
        />
        <ComponentStory story={gridStoryHalves} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Three columns — equal thirds"
          description="Each item spans 4 columns. Resize the window to see the fluid gap respond."
        />
        <ComponentStory story={gridStoryThirds} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Sidebar + main content"
          description="Classic 3/9 layout — narrow sidebar with a dominant main area."
        />
        <ComponentStory story={gridStorySidebar} />
      </section>

    </div>
  );
}
