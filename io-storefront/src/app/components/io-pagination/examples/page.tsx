'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { paginationStory, paginationStoryMidRange, paginationStoryFull } from '../io-pagination.stories';

export default function IoPaginationExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="First page active"
          description="Default state - prev arrow disabled."
        />
        <ComponentStory story={paginationStory} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Mid-range with ellipsis"
          description="Ellipsis appears when the page range cannot fit all numbers."
        />
        <ComponentStory story={paginationStoryMidRange} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="All pages visible"
          description="When total pages is 7 or fewer, all numbers are shown without ellipsis."
        />
        <ComponentStory story={paginationStoryFull} />
      </section>
    </div>
  );
}
