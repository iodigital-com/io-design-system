'use client';

import {
  stepperStoryHorizontal,
  stepperStoryVertical,
  stepperStoryStatuses,
  stepperStoryFiveSteps,
} from '../io-stepper.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoStepperExamplesPage() {
  return (
    <div className="space-y-10">

      {/* ── Status showcase ──────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Step statuses"
          description="Three statuses — complete shows a checkmark, current is highlighted with brand blue, upcoming is muted."
        />
        <ComponentStory
          story={stepperStoryStatuses}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      {/* ── Horizontal ───────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Horizontal"
          description="Default orientation. Steps flow left-to-right with connecting lines between them."
        />
        <ComponentStory
          story={stepperStoryHorizontal}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      {/* ── Vertical ─────────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Vertical"
          description="Steps stack top-to-bottom. Suitable for narrow viewports or sidebar flows."
        />
        <ComponentStory
          story={stepperStoryVertical}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

      {/* ── Five steps ───────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Five-step checkout flow"
          description="Longer flows work the same way — add more io-step children and set current accordingly."
        />
        <ComponentStory
          story={stepperStoryFiveSteps}
          previewStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
        />
      </section>

    </div>
  );
}
