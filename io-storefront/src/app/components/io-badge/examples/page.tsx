'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { badgeStoryVariants } from '../io-badge.stories';

export default function IoBadgeExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          All variants
        </h2>
        <ComponentStory story={badgeStoryVariants} previewClassName="flex flex-wrap gap-3" />
      </section>
    </div>
  );
}
