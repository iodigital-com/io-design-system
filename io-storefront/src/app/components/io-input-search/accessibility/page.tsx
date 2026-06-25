'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoInputSearchAccessibilityPage() {
  return (
    <div className="space-y-16">
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-input-search follows standard text input keyboard behaviour. The clear button is focusable and operable via keyboard."
        />
        <KeyboardTable
          rows={[
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus to the search input.' },
            { key: <Kbd>Tab</Kbd>, action: 'When a value is present, moves focus to the clear button.' },
            { key: <Kbd>Space</Kbd>, action: 'Activates the clear button, clearing the value and returning focus to the input.' },
            { key: <Kbd>Escape</Kbd>, action: 'Browser default: clears the type=search input value on some browsers.' },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The search icon is decorative. The clear button has a descriptive aria-label."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-hidden (search icon)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;true&quot;</span>,
              description: 'The magnifier prefix icon is decorative — it is hidden from the accessibility tree.',
            },
            {
              attribute: 'aria-label (clear button)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>clearAriaLabel prop</span>,
              description: 'Defaults to "Clear search". Override via clearAriaLabel for more specific context.',
            },
            {
              attribute: 'aria-readonly',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;true&quot; when readonly</span>,
              description: 'Set to "true" when readonly=true. Communicates read-only state to screen readers independently of the visual style.',
            },
            {
              attribute: 'aria-invalid',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>&quot;true&quot; when error or FACE invalid</span>,
              description: 'Set to "true" when state="error" or when native form validation fails (e.g. required, minLength, maxLength constraints after the field has been touched).',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader title="WCAG 2.2 compliance" description="io-input-search is tested against WCAG 2.2 Level AA." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard criterion="1.3.1" level="A" title="Info and Relationships" note="Label is programmatically associated with the input via htmlFor/id." />
          <ComplianceCard criterion="2.5.8" level="AA" title="Target Size (Minimum)" note="Clear button meets the 24×24 px minimum target size requirement." />
          <ComplianceCard criterion="3.3.1" level="A" title="Error Identification" note="Errors are announced via role='alert'." />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader title="Best practices" description="Guidelines for accessible search fields." />
        <RuleCard label="Provide a visible label">
          Never hide the label unless you also set an aria-label. The magnifier icon alone is not a sufficient accessible name for the field.
        </RuleCard>
        <RuleCard label="Debounce live search results">
          Announce result counts via an aria-live region after a debounce delay. Announcing on every keystroke is disruptive for screen reader users.
        </RuleCard>
      </section>
    </div>
  );
}
