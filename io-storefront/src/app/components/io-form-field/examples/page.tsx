'use client';

import {
  formFieldStoryDefault,
  formFieldStoryHelper,
  formFieldStoryInvalid,
  formFieldStoryRequired,
} from '../io-form-field.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoFormFieldExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={formFieldStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="With helper text" description="Helper text provides format hints or supporting guidance." />
        <ComponentStory story={formFieldStoryHelper} />
      </section>

      <section>
        <ExamplesSectionHeader title="Invalid state" description="Set invalid and errorText to show validation feedback." />
        <ComponentStory story={formFieldStoryInvalid} />
      </section>

      <section>
        <ExamplesSectionHeader title="Required" description="The required prop appends an asterisk to the label." />
        <ComponentStory story={formFieldStoryRequired} />
      </section>
    </div>
  );
}
