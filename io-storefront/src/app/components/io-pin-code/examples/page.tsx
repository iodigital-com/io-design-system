'use client';

import {
  pinCodeStorySixDigit,
  pinCodeStoryPassword,
  pinCodeStoryError,
  pinCodeStorySuccess,
} from '../io-pin-code.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoPinCodeExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Six-digit OTP"
          description="Use length=6 for one-time password flows where a longer code is expected."
        />
        <ComponentStory story={pinCodeStorySixDigit} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Password masking"
          description="type=password masks digits — use for sensitive PIN entry."
        />
        <ComponentStory story={pinCodeStoryPassword} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Error state"
          description="state=error highlights all slots and shows a validation message below."
        />
        <ComponentStory story={pinCodeStoryError} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Success state"
          description="state=success confirms the PIN was accepted."
        />
        <ComponentStory story={pinCodeStorySuccess} />
      </section>
    </div>
  );
}
