'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  tagStoryDefault,
  tagStorySelected,
  tagStoryColors,
  tagStoryRemovable,
  tagStoryDisabled,
} from '../io-tag.stories';

export default function IoTagExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={tagStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Selected state
        </h2>
        <ComponentStory story={tagStorySelected} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Colours
        </h2>
        <ComponentStory story={tagStoryColors} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Removable
        </h2>
        <ComponentStory story={tagStoryRemovable} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={tagStoryDisabled} />
      </section>
    </div>
  );
}
