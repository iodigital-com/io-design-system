'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoInputDateAccessibilityPage() {
  return (
    <div className="space-y-16">
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-input-date uses the browser's native date picker. All keyboard interactions are handled by the native input element."
        />
        <KeyboardTable
          rows={[
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus to the date input.' },
            { key: <Kbd>Space</Kbd>, action: 'Opens the native date picker on supported browsers.' },
            { key: <span className="flex items-center gap-1"><Kbd>↑</Kbd> / <Kbd>↓</Kbd></span>, action: 'Increments or decrements the focused date segment (day, month, year).' },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The calendar icon is decorative. The label is permanently floated because date inputs always show a format placeholder."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-hidden (calendar icon)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;true&quot;</span>,
              description: 'The calendar icon is decorative and hidden from the accessibility tree.',
            },
            {
              attribute: 'aria-invalid',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;true&quot; when error</span>,
              description: 'Set to "true" when state="error".',
            },
            {
              attribute: 'aria-describedby',
              value: <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Error / helper element id</span>,
              description: 'Links the error message or helper text to the input for screen reader announcement.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader title="WCAG 2.2 compliance" description="io-input-date is tested against WCAG 2.2 Level AA." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard criterion="1.3.1" level="A" title="Info and Relationships" note="Label is programmatically associated with the input via htmlFor/id." />
          <ComplianceCard criterion="2.4.7" level="AA" title="Focus Visible" note="The input has a visible focus indicator." />
          <ComplianceCard criterion="3.3.1" level="A" title="Error Identification" note="Errors are announced via role='alert'." />
          <ComplianceCard criterion="3.3.2" level="A" title="Labels or Instructions" note="The label is always visible. Constraints (min/max) should also be communicated in helperText." />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader title="Best practices" description="Guidelines for accessible date entry." />
        <RuleCard label="Surface date constraints in helper text">
          When using <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>min</code> or{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>max</code>,
          always describe the allowed range in <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>.
          The native date picker enforces the constraint but does not announce it to screen readers.
        </RuleCard>
      </section>
    </div>
  );
}
