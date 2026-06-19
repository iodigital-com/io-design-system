'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoInputPasswordAccessibilityPage() {
  return (
    <div className="space-y-16">
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-input-password behaves as a standard password field. The show/hide toggle is a focusable button."
        />
        <KeyboardTable
          rows={[
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus to the password input.' },
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus from the input to the show/hide toggle button.' },
            { key: <Kbd>Space</Kbd>, action: 'Activates the show/hide toggle button, switching input type between password and text.' },
            { key: <Kbd>Enter</Kbd>, action: 'Submits the parent form if the input is focused and inside a <form> element.' },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The toggle button uses a dynamic aria-label that updates when the visibility state changes."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-label (toggle button)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;Show password&quot; / &quot;Hide password&quot;</span>,
              description: 'The toggle button aria-label reflects the current action, not the current state. "Show password" means the password is currently hidden; "Hide password" means it is currently visible.',
            },
            {
              attribute: 'aria-invalid',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;true&quot; when error</span>,
              description: 'Set to "true" when state="error". Screen readers announce the field as invalid.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader title="WCAG 2.2 compliance" description="io-input-password is tested against WCAG 2.2 Level AA." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard criterion="1.3.1" level="A" title="Info and Relationships" note="Label is programmatically associated with the input via htmlFor/id." />
          <ComplianceCard criterion="2.4.7" level="AA" title="Focus Visible" note="Both the input and toggle button have visible focus indicators." />
          <ComplianceCard criterion="2.5.3" level="A" title="Label in Name" note="The toggle button visible icon is supplemented by an aria-label that matches the action." />
          <ComplianceCard criterion="3.3.1" level="A" title="Error Identification" note="Errors are announced via role='alert' and linked via aria-describedby." />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader title="Best practices" description="Guidelines for accessible password entry." />
        <RuleCard label="Use descriptive autocomplete values">
          Set <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>autocomplete=&quot;current-password&quot;</code> or{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>autocomplete=&quot;new-password&quot;</code>.
          Password managers rely on these values to offer fill suggestions.
        </RuleCard>
      </section>
    </div>
  );
}
