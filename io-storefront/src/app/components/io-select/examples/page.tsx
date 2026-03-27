'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  selectStoryDefault,
  selectStoryPlaceholder,
  selectStoryError,
  selectStoryDisabled,
} from '../io-select.stories';

export default function IoSelectExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={selectStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          With placeholder
        </h2>
        <ComponentStory story={selectStoryPlaceholder} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Error state
        </h2>
        <ComponentStory story={selectStoryError} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={selectStoryDisabled} />
      </section>
    </div>
  );
}
