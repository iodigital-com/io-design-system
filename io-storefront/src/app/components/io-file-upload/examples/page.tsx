'use client';

import {
  fileUploadStoryDefault,
  fileUploadStoryMultiple,
  fileUploadStoryWithHelper,
  fileUploadStoryError,
  fileUploadStoryDisabled,
} from '../io-file-upload.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoFileUploadExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={fileUploadStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Multiple files" />
        <ComponentStory story={fileUploadStoryMultiple} />
      </section>

      <section>
        <ExamplesSectionHeader title="With helper text" />
        <ComponentStory story={fileUploadStoryWithHelper} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={fileUploadStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={fileUploadStoryDisabled} />
      </section>
    </div>
  );
}
