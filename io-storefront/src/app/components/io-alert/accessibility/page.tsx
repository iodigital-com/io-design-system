'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoAlertAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Non-dismissible alerts are passive — they receive no keyboard focus. Dismissible alerts expose a single focusable close button."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the dismiss button (×) when dismissible=true. Non-dismissible alerts are skipped entirely.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'When focus is on the dismiss button: emits the dismiss event. Your application must handle removing the alert.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Same as Enter on the dismiss button.',
            },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-alert uses ARIA live regions so screen readers announce new alerts automatically, without requiring user focus."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: 'status / alert',
              description: 'info, success, and warning variants use role="status" (polite). Only the error variant uses role="alert" (assertive). Assertive live regions interrupt the current reading flow — use error sparingly.',
            },
            {
              attribute: 'aria-live',
              value: 'polite / assertive',
              description: 'Derived from the variant. info/success/warning = polite (waits for current speech to finish). error only = assertive (interrupts immediately).',
            },
            {
              attribute: 'aria-label on dismiss button',
              value: '"Dismiss notification"',
              description: 'The dismiss × button has an accessible label that identifies its purpose to screen reader users.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-alert is tested against WCAG 2.2 Level AA across all four variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All four variant colour combinations meet the 4.5:1 contrast ratio for normal text. Icon colours also meet 3:1 against their respective backgrounds."
          />
          <ComplianceCard
            criterion="4.1.3"
            level="AA"
            title="Status Messages"
            note="Alerts are injected into ARIA live regions (role=status or role=alert). Screen readers announce the message without the user needing to move focus to the alert."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The dismiss button exposes role=button and aria-label. The live region container exposes the appropriate role. All ARIA attributes are declared inline in render()."
          />
          <ComplianceCard
            criterion="1.4.11"
            level="AA"
            title="Non-text Contrast"
            note="The left-border stripe, variant icon, and dismiss button icon all meet the 3:1 contrast ratio requirement against adjacent backgrounds."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="The dismiss button is fully keyboard operable. Non-dismissible alerts do not create keyboard traps."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for inclusive alert usage across all surfaces and assistive technologies."
        />
        <RuleCard label="Use assertive live regions sparingly">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> variant
          uses <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>role=&quot;alert&quot;</code>{' '}
          which interrupts screen reader speech. All other variants ({' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>info</code>,{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>success</code>,{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>warning</code>
          ) use{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>role=&quot;status&quot;</code>{' '}
          (polite). Only inject error alerts when the message requires immediate attention.
          Injecting multiple assertive alerts in rapid succession creates a poor screen reader experience.
        </RuleCard>
        <RuleCard label="Do not hide alerts with CSS alone">
          Setting <code>display: none</code> or <code>visibility: hidden</code> on an alert removes it from the accessibility tree silently.
          Always remove the element from the DOM when dismissing — or toggle its presence via conditional rendering.
        </RuleCard>
        <RuleCard label="Keep body copy concise">
          Screen readers announce the full alert content on injection. Overly long alerts make the announcement
          difficult to follow. Limit body copy to 2–3 sentences. Use the <code>heading</code> prop to add a short title
          that anchors the announcement.
        </RuleCard>
        <RuleCard label="Do not auto-dismiss error alerts">
          Errors require user acknowledgement and action. Auto-removing an error alert before the user has read
          and responded is inaccessible. Only auto-dismiss info or success messages after a sufficient delay (&gt;5 seconds).
        </RuleCard>
      </section>

    </div>
  );
}
