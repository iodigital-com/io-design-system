'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  textareaStoryDefault,
  textareaStoryResize,
  textareaStoryError,
  textareaStoryDisabled,
} from '../io-textarea.stories';

export default function IoTextareaExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={textareaStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Resize variants
        </h2>
        <ComponentStory story={textareaStoryResize} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Error state
        </h2>
        <ComponentStory story={textareaStoryError} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={textareaStoryDisabled} />
      </section>
    </div>
  );
}
