'use client';

import { AriaTable, ComplianceCard, Kbd, KeyboardTable, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoBannerAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="The banner body is non-interactive. Only the optional dismiss button is focusable."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Move focus to the dismiss button (when dismissible=true).',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd></span>,
              action: 'Activate the focused dismiss button — closes the banner and emits the dismiss event.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the banner and emits the dismiss event when dismissible=true. Handled at document level — keyboard focus does not need to be on the banner.',
            },
          ]}
        />
      </section>

      <section id="screen-reader" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-banner uses ARIA live regions to announce content when it appears."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="alert"',
              value: 'Host (error variant)',
              description: 'Implies aria-live="assertive". Content is announced immediately, interrupting the reading queue.',
            },
            {
              attribute: 'role="status"',
              value: 'Host (info/success/warning)',
              description: 'Combined with aria-live="polite" and aria-atomic="true". Announced after the current reading task.',
            },
            {
              attribute: 'aria-label',
              value: 'Dismiss button',
              description: 'Auto-resolved from dismissLabel prop, heading, or variant name. Provides a unique accessible name.',
            },
          ]}
        />
        <RuleCard label="Conditional live region">
          The ARIA role is placed on the inner <code className="font-mono text-xs">.banner</code> div, which is only rendered while <code className="font-mono text-xs">open=true</code>. The live region is created when the banner opens and removed when it closes — preventing stale announcements when the banner is hidden. Content is announced as the live region appears in the DOM.
        </RuleCard>
      </section>

      <section id="wcag" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-banner targets WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ComplianceCard criterion="1.4.3" level="AA" title="Contrast (Minimum)"
            note="All text and icon colours use semantic tokens that meet 4.5:1 contrast against their respective soft backgrounds." />
          <ComplianceCard criterion="4.1.3" level="AA" title="Status Messages"
            note="Notifications use role=&quot;status&quot; or role=&quot;alert&quot; so screen readers announce them without focus movement." />
          <ComplianceCard criterion="4.1.2" level="AA" title="Name, Role, Value"
            note="The dismiss button carries a computed accessible name via aria-label." />
          <ComplianceCard criterion="2.5.8" level="AA" title="Target Size (Minimum)"
            note="The dismiss button uses --io-touch-target-min for both width/height and min-width/min-height." />
        </div>
      </section>

    </div>
  );
}
