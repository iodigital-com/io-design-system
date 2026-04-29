'use client';

import {
  textareaStoryDefault,
  textareaStoryResize,
  textareaStoryError,
  textareaStoryDisabled,
} from '../io-textarea.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

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
