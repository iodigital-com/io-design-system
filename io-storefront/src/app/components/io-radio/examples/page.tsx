'use client';

import {
  radioStoryDefault,
  radioStoryChecked,
  radioStoryDisabled,
  radioStoryError,
  radioStoryGroup,
} from '../io-radio.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoRadioExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={radioStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Checked" />
        <ComponentStory story={radioStoryChecked} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory
          story={radioStoryDisabled}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--io-spacing-md, 16px)' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={radioStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Radio group" />
        <ComponentStory
          story={radioStoryGroup}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--io-spacing-md, 16px)' }}
        />
      </section>
    </div>
  );
}
