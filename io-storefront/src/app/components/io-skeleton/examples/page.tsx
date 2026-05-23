'use client';

import {
  skeletonStoryText,
  skeletonStoryCircular,
  skeletonStoryRectangular,
  skeletonStoryRounded,
  skeletonStoryStatic,
} from '../io-skeleton.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoSkeletonExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Text — single-line content placeholder" />
        <ComponentStory story={skeletonStoryText} />
      </section>

      <section>
        <ExamplesSectionHeader title="Circular — avatar and icon placeholders" />
        <ComponentStory story={skeletonStoryCircular} />
      </section>

      <section>
        <ExamplesSectionHeader title="Rectangular — image and media placeholders" />
        <ComponentStory story={skeletonStoryRectangular} />
      </section>

      <section>
        <ExamplesSectionHeader title="Rounded — card and panel placeholders" />
        <ComponentStory story={skeletonStoryRounded} />
      </section>

      <section>
        <ExamplesSectionHeader title="Static (animated=false) — for reduced-motion contexts or static mocks" />
        <ComponentStory story={skeletonStoryStatic} />
      </section>

      <section>
        <ExamplesSectionHeader title="Card composition — combine multiple skeletons for realistic layouts" />
        <div
          className="rounded-lg p-6 space-y-3"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', maxWidth: '360px' }}
        >
          <io-skeleton variant="rectangular" width="100%" height="160px" label="Loading article image" />
          <io-skeleton variant="text" width="60%" label="Loading title" />
          <io-skeleton variant="text" width="80%" label="Loading subtitle" />
          <io-skeleton variant="text" width="40%" label="Loading metadata" />
        </div>
      </section>
    </div>
  );
}
