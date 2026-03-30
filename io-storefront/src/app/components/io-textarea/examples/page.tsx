'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
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
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={textareaStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Resize variants" />
        <ComponentStory story={textareaStoryResize} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={textareaStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={textareaStoryDisabled} />
      </section>
    </div>
  );
}
