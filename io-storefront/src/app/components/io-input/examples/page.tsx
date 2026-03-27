'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { inputStoryDefault, inputStoryError, inputStoryDisabled } from '../io-input.stories';

export default function IoInputExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={inputStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Error state
        </h2>
        <ComponentStory story={inputStoryError} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={inputStoryDisabled} />
      </section>
    </div>
  );
}
