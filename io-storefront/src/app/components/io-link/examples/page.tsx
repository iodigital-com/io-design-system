'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  linkStoryStandalone,
  linkStoryInline,
  linkStoryColors,
  linkStoryDisabled,
} from '../io-link.stories';

export default function IoLinkExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Standalone
        </h2>
        <ComponentStory story={linkStoryStandalone} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Inline
        </h2>
        <ComponentStory story={linkStoryInline} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Colours
        </h2>
        <ComponentStory story={linkStoryColors} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Disabled state
        </h2>
        <ComponentStory story={linkStoryDisabled} />
      </section>
    </div>
  );
}
