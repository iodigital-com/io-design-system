'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { badgeStoryVariants } from '../io-badge.stories';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoBadgeExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="All variants" />
        <ComponentStory story={badgeStoryVariants} previewClassName="flex flex-wrap gap-3" />
      </section>
    </div>
  );
}
