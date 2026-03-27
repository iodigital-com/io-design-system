'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  checkboxStoryDefault,
  checkboxStoryChecked,
  checkboxStoryIndeterminate,
  checkboxStoryError,
  checkboxStoryDisabled,
} from '../io-checkbox.stories';

export default function IoCheckboxExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={checkboxStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Checked
        </h2>
        <ComponentStory story={checkboxStoryChecked} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Indeterminate
        </h2>
        <ComponentStory story={checkboxStoryIndeterminate} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Error state
        </h2>
        <ComponentStory story={checkboxStoryError} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={checkboxStoryDisabled} />
      </section>
    </div>
  );
}
