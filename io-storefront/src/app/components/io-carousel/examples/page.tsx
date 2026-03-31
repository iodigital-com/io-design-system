'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { carouselStory, carouselStoryMore } from '../io-carousel.stories';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoCarouselExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Related articles (4 slides)"
          description="A compact carousel with four content cards. Prev/Next buttons scroll one slide at a time; drag to scroll is available on pointer devices."
        />
        <ComponentStory story={carouselStory} />
      </section>
      <section>
        <ExamplesSectionHeader
          title="Extended set (8 slides)"
          description="A longer carousel demonstrating how the component handles overflow with many slides. Content remains accessible via button navigation and drag scrolling."
        />
        <ComponentStory story={carouselStoryMore} />
      </section>
    </div>
  );
}
