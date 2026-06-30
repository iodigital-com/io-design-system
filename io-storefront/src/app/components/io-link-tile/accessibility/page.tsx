'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, A11yCheck } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoLinkTileAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="The entire tile surface is a single focusable anchor. Focus delegates from the host to the embedded link via delegatesFocus."
        />
        <KeyboardTable
          rows={[
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus to the tile anchor.' },
            { key: <Kbd>Enter</Kbd>, action: 'Follows the href.' },
          ]}
        />
      </section>

      <section id="screen-reader" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The tile renders a single anchor with an aria-label composed from the label and description props."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: '"link"',
              description: 'Implicit on the embedded anchor element.',
            },
            {
              attribute: 'aria-label',
              value: '"{label} — {description}" or just "{label}"',
              description: 'The tile\'s accessible name. Combines label and description when both are present.',
            },
          ]}
        />
      </section>

      <section id="contrast" className="space-y-6">
        <SectionHeader
          title="Colour contrast"
          description="Text overlaid on photographic media requires special handling."
        />
        <A11yCheck status="pass">
          Enable the gradient prop when placing tiles over photographic imagery. The gradient ensures a minimum contrast ratio for white text (WCAG 1.4.3).
        </A11yCheck>
        <A11yCheck status="note">
          The gradient alone does not guarantee 4.5:1 contrast over all images. Test with your actual imagery and consider adding a semi-transparent background to the label when needed.
        </A11yCheck>
      </section>

      <section id="focus-ring" className="space-y-6">
        <SectionHeader
          title="Focus ring"
          description="The focus ring appears on the host element when focused via keyboard."
        />
        <RuleCard title="Uses --io-focus-ring-active">
          The tile host renders the standard io focus ring on :focus-visible. Never override this without providing an equivalent visible focus indicator.
        </RuleCard>
      </section>

    </div>
  );
}
