'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  radioStoryDefault,
  radioStoryChecked,
  radioStoryDisabled,
  radioStoryError,
  radioStoryGroup,
} from '../io-radio.stories';

export default function IoRadioExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={radioStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Checked
        </h2>
        <ComponentStory story={radioStoryChecked} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={radioStoryDisabled} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Error state
        </h2>
        <ComponentStory story={radioStoryError} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Radio group
        </h2>
        <ComponentStory story={radioStoryGroup} />
      </section>
    </div>
  );
}
