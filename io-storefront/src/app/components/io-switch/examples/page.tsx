'use client';

import {
  switchStoryDefault,
  switchStoryChecked,
  switchStoryWithHelper,
  switchStoryError,
  switchStoryDisabled,
} from '../io-switch.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoSwitchExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default (off)" />
        <ComponentStory story={switchStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Checked (on)" />
        <ComponentStory story={switchStoryChecked} />
      </section>

      <section>
        <ExamplesSectionHeader title="With helper text" />
        <ComponentStory story={switchStoryWithHelper} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={switchStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory
          story={switchStoryDisabled}
          previewStyle={{ flexDirection: 'column', alignItems: 'center', gap: 'var(--io-space-2, 8px)' }}
        />
      </section>
    </div>
  );
}
