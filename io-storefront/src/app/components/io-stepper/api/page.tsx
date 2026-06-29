'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoStepperApiPage() {
  return (
    <div className="space-y-16">

      {/* ── io-stepper Properties ────────────────────────────────── */}
      <section id="io-stepper-properties" className="space-y-4">
        <SectionHeader
          title="io-stepper properties"
          description="All @Prop() declarations on the io-stepper Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>current</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">1</InlineCode>,
              '1-based index of the active step. Steps before it are marked complete, the matching step is current, and steps after are upcoming.',
            ],
            [
              <span key="n"><InlineCode>orientation</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;horizontal&apos; | &apos;vertical&apos;</InlineCode>,
              <InlineCode key="d">&apos;horizontal&apos;</InlineCode>,
              'Layout direction of the stepper. Horizontal flows left-to-right; vertical stacks top-to-bottom.',
            ],
            [
              <InlineCode key="n">ariaLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Progress&apos;</InlineCode>,
              'Accessible label applied to the inner nav landmark via aria-label. Localise this value for non-English applications so screen reader users hear the correct landmark announcement.',
            ],
          ]}
        />
      </section>

      {/* io-stepper Events */}
      <section id="io-stepper-events" className="space-y-4">
        <SectionHeader
          title="io-stepper events"
          description="Custom events emitted by io-stepper. Listen via addEventListener or framework event binding."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '260px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">stepChange</InlineCode>,
              <InlineCode key="t">{'{ activeStepIndex: number }'}</InlineCode>,
              'No',
              'Fired when the user clicks a complete step button. The detail object contains activeStepIndex — the 0-based index of the selected step. Handle this event to navigate the user backward to a previous step in your application flow.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-stepper')
  .addEventListener('stepChange', (e) => {
    goToStep(e.detail.activeStepIndex);
  });

// React
<IoStepper current={current} onStepChange={(e) => goToStep(e.detail.activeStepIndex)}>
  ...
</IoStepper>`}
        </CodeNote>
      </section>

      {/* ── io-stepper Slots ─────────────────────────────────────── */}
      <section id="io-stepper-slots" className="space-y-4">
        <SectionHeader
          title="io-stepper slots"
          description="Content slots available on io-stepper."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                (default)
              </span>,
              'One or more io-step elements. The stepper reads the slot children and assigns index, total, and orientation to each io-step automatically.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`<!-- Vanilla JS / HTML -->
<io-stepper current="2">
  <io-step label="Account"></io-step>
  <io-step label="Details"></io-step>
  <io-step label="Review"></io-step>
</io-stepper>

// React
import { IoStepper, IoStep } from '@iodigital-com/components-react';

<IoStepper current={2}>
  <IoStep label="Account" />
  <IoStep label="Details" />
  <IoStep label="Review" />
</IoStepper>`}
        </CodeNote>
      </section>

      {/* ── io-step Properties ───────────────────────────────────── */}
      <section id="io-step-properties" className="space-y-4">
        <SectionHeader
          title="io-step properties"
          description="All @Prop() declarations on the io-step Stencil component. When used inside io-stepper, index, total, and orientation are set automatically."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>required</span>,
              'Visible text label for this step. Shown below the circle. Also used in the screen-reader description.',
            ],
            [
              <span key="n"><InlineCode>status</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;complete&apos; | &apos;current&apos; | &apos;upcoming&apos; | &apos;warning&apos;</InlineCode>,
              <InlineCode key="d">&apos;upcoming&apos;</InlineCode>,
              'Completion status of this step. Set automatically by io-stepper via the current prop. Can also be set manually when using io-step without a parent io-stepper. The warning status renders a warning indicator on the step circle.',
            ],
            [
              <InlineCode key="n">index</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              '1-based position within the stepper sequence. Set automatically by the parent io-stepper — do not set manually.',
            ],
            [
              <InlineCode key="n">total</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              'Total number of steps in the sequence. Set automatically by the parent io-stepper — used to hide the connector on the last step.',
            ],
            [
              <span key="n"><InlineCode>orientation</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;horizontal&apos; | &apos;vertical&apos;</InlineCode>,
              <InlineCode key="d">&apos;horizontal&apos;</InlineCode>,
              'Inherited orientation from the parent io-stepper. Adjusts internal layout of the step item.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, the step is non-interactive regardless of status. Applies aria-disabled="true" and suppresses click events. Use to block navigation during async operations.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
