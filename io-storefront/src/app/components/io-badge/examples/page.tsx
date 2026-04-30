'use client';

import { badgeStoryVariants, badgeStorySizes } from '../io-badge.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoBadgeExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="All variants" />
        <ComponentStory story={badgeStoryVariants} previewClassName="flex flex-wrap gap-3" />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg badge sizes for different density contexts." />
        <ComponentStory story={badgeStorySizes} previewClassName="flex flex-wrap gap-3 items-center" />
      </section>
    </div>
  );
}
