'use client';

import {
  scrollerStoryHorizontalChips,
  scrollerStoryVerticalLinks,
  scrollerStoryWithScrollbar,
  scrollerStoryButtonStrip,
} from '../io-scroller.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoScrollerExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Horizontal chip bar — overflowing filter chips with left/right fades" />
        <ComponentStory story={scrollerStoryHorizontalChips} />
      </section>

      <section>
        <ExamplesSectionHeader title="Vertical scroll region — long list with top/bottom fades" />
        <ComponentStory story={scrollerStoryVerticalLinks} />
      </section>

      <section>
        <ExamplesSectionHeader title="With native scrollbar — show-scrollbar=true for users who prefer native controls" />
        <ComponentStory story={scrollerStoryWithScrollbar} />
      </section>

      <section>
        <ExamplesSectionHeader title="Button group strip — horizontal row of action buttons" />
        <ComponentStory story={scrollerStoryButtonStrip} />
      </section>

    </div>
  );
}
