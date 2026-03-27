'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  spinnerStorySm,
  spinnerStoryMd,
  spinnerStoryLg,
  spinnerStoryWhite,
  spinnerStoryCurrent,
} from '../io-spinner.stories';

export default function IoSpinnerExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Small (16px)
        </h2>
        <ComponentStory story={spinnerStorySm} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Medium (24px)
        </h2>
        <ComponentStory story={spinnerStoryMd} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Large (40px)
        </h2>
        <ComponentStory story={spinnerStoryLg} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          White colour — for use on dark or coloured backgrounds
        </h2>
        <div
          className="rounded-lg p-8 flex items-center justify-center"
          style={{ background: 'var(--io-color-primary)' }}
        >
          <ComponentStory story={spinnerStoryWhite} />
        </div>
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Current colour — inherits from surrounding text colour
        </h2>
        <ComponentStory story={spinnerStoryCurrent} />
      </section>
    </div>
  );
}
