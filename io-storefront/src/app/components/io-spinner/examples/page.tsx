'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
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
        <ExamplesSectionHeader title="Small (16px)" />
        <ComponentStory story={spinnerStorySm} />
      </section>

      <section>
        <ExamplesSectionHeader title="Medium (24px)" />
        <ComponentStory story={spinnerStoryMd} />
      </section>

      <section>
        <ExamplesSectionHeader title="Large (40px)" />
        <ComponentStory story={spinnerStoryLg} />
      </section>

      <section>
        <ExamplesSectionHeader title="White colour — for use on dark or coloured backgrounds" />
        <div
          className="rounded-lg p-8 flex items-center justify-center"
          style={{ background: 'var(--io-color-primary)' }}
        >
          <ComponentStory story={spinnerStoryWhite} />
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Current colour — inherits from surrounding text colour" />
        <ComponentStory story={spinnerStoryCurrent} />
      </section>
    </div>
  );
}
