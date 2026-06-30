'use client';

import { SectionHeader, KeyboardTable, Kbd, AriaTable, A11yCheck } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoButtonTileAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="The tile surface is a single focusable button. Focus delegates from the host to the embedded button via delegatesFocus."
        />
        <KeyboardTable
          rows={[
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus to the tile button.' },
            { key: <Kbd>Enter</Kbd>, action: 'Activates the button and emits tileClick.' },
            { key: <Kbd>Space</Kbd>, action: 'Activates the button and emits tileClick.' },
          ]}
        />
      </section>

      <section id="screen-reader" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The embedded button uses aria-label composed from the label and description props."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: '"button"',
              description: 'Implicit on the embedded button element.',
            },
            {
              attribute: 'aria-label',
              value: '"{label} — {description}" or just "{label}"',
              description: 'The tile\'s accessible name.',
            },
            {
              attribute: 'aria-disabled',
              value: 'set when disabled=true',
              description: 'Announces the disabled state to screen readers.',
            },
            {
              attribute: 'aria-busy',
              value: '"true" when loading=true',
              description: 'Informs screen readers that an async operation is in progress.',
            },
          ]}
        />
      </section>

      <section id="states" className="space-y-6">
        <SectionHeader
          title="Disabled and loading states"
          description="Both states prevent interaction while maintaining keyboard accessibility."
        />
        <A11yCheck status="pass">
          The disabled button is announced as disabled to screen readers. The tile opacity is reduced to 0.5 to provide a visual cue (WCAG 1.4.1).
        </A11yCheck>
        <A11yCheck status="pass">
          The loading state sets aria-busy="true" on the button, signalling to screen readers that the element is in a busy/processing state.
        </A11yCheck>
      </section>

    </div>
  );
}
