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
              element: 'Host (error variant)',
              notes: 'Implies aria-live="assertive". Content is announced immediately, interrupting the reading queue.',
            },
            {
              attribute: 'role="status"',
              element: 'Host (info/success/warning)',
              notes: 'Combined with aria-live="polite" and aria-atomic="true". Announced after the current reading task.',
            },
            {
              attribute: 'aria-label',
              element: 'Dismiss button',
              notes: 'Auto-resolved from dismissLabel prop, heading, or variant name. Provides a unique accessible name.',
            },
          ]}
        />
        <RuleCard>
          Because io-banner uses CSS <code className="font-mono text-xs">display: none</code> / <code className="font-mono text-xs">display: block</code> toggled by the <code className="font-mono text-xs">open</code> attribute, screen readers announce the content when it first becomes visible — without requiring a DOM re-mount.
        </RuleCard>
      </section>

      <section id="wcag" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-banner targets WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ComplianceCard criterion="1.4.3" title="Contrast (Minimum)">
            All text and icon colours use semantic tokens that meet 4.5:1 contrast against their respective soft backgrounds.
          </ComplianceCard>
          <ComplianceCard criterion="4.1.3" title="Status Messages">
            Notifications use <code className="font-mono text-xs">role="status"</code> or <code className="font-mono text-xs">role="alert"</code> so screen readers announce them without focus movement.
          </ComplianceCard>
          <ComplianceCard criterion="4.1.2" title="Name, Role, Value">
            The dismiss button carries a computed accessible name via <code className="font-mono text-xs">aria-label</code>.
          </ComplianceCard>
          <ComplianceCard criterion="2.5.8" title="Target Size (Minimum)">
            The dismiss button uses <code className="font-mono text-xs">--io-touch-target-min</code> for both width/height and min-width/min-height.
          </ComplianceCard>
        </div>
      </section>

    </div>
  );
}
