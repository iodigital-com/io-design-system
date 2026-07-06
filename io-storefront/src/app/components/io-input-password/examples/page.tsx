'use client';

import {
  inputPasswordStoryDefault,
  inputPasswordStorySizes,
  inputPasswordStoryNewPassword,
  inputPasswordStoryError,
  inputPasswordStoryDisabled,
} from '../io-input-password.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoInputPasswordExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputPasswordStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes aligned with form control rhythm." />
        <ComponentStory story={inputPasswordStorySizes} previewClassName="flex flex-wrap gap-4 items-end justify-center [&_io-input-password]:w-44 [&_io-input-password]:flex-none" />
      </section>

      <section>
        <ExamplesSectionHeader title="New password" description="Use autocomplete='new-password' on registration forms to trigger password manager hints." />
        <ComponentStory story={inputPasswordStoryNewPassword} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={inputPasswordStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={inputPasswordStoryDisabled} />
      </section>
    </div>
  );
}
