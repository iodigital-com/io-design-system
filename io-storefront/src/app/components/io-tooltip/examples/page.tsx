'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  tooltipStoryTop,
  tooltipStoryBottom,
  tooltipStoryLeft,
  tooltipStoryRight,
  tooltipStoryLong,
} from '../io-tooltip.stories';

export default function IoTooltipExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Placement: Top
        </h2>
        <ComponentStory story={tooltipStoryTop} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Placement: Bottom
        </h2>
        <ComponentStory story={tooltipStoryBottom} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Placement: Left
        </h2>
        <ComponentStory story={tooltipStoryLeft} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Placement: Right
        </h2>
        <ComponentStory story={tooltipStoryRight} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Long content
        </h2>
        <ComponentStory story={tooltipStoryLong} />
      </section>
    </div>
  );
}
