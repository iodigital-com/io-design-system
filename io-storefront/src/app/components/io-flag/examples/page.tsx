'use client';

import { flagStoryEU, flagStorySizes } from '../io-flag.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoFlagExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="EU member states (subset)"
          description="nl, de, fr, es, it, be, at, pl, pt, se, dk, fi — all at md size."
        />
        <ComponentStory story={flagStoryEU} previewClassName="flex flex-wrap gap-3 items-center" />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Size scale"
          description="xs, sm, md, lg, xl — aligned with io-icon."
        />
        <ComponentStory story={flagStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>
    </div>
  );
}
