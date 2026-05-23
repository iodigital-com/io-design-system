'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoRadioGroupAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-radio-group renders a native fieldset with a legend. Screen readers announce the legend text before each individual radio label, giving users full group context."
        />
        <AriaTable
          rows={[
            {
              attribute: 'fieldset',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Semantic grouping</span>
              ),
              description: 'The native fieldset element groups all child radios into a single accessible unit. Screen readers announce the group boundary when focus enters or leaves.',
            },
            {
              attribute: 'legend',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From label prop</span>
              ),
              description: 'The label prop value is rendered as a native legend element. Screen readers prepend the legend text to each radio label — for example "Preferred contact, Email".',
            },
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>radiogroup</code>
                  {' '}(implicit via fieldset)
                </span>
              ),
              description: 'A fieldset containing radio inputs carries an implicit ARIA role of radiogroup. No explicit role override is needed.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when disabled
                </span>
              ),
              description: 'The native disabled attribute on the fieldset makes the entire group inert. Screen readers announce each option as unavailable.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set on the fieldset when the error prop is true. Screen readers announce the group as invalid.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Error element id</span>
              ),
              description: 'When error and errorMessage are both set, the fieldset is linked to the error paragraph via aria-describedby. Screen readers announce the error message after the group label.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-radio-group is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The fieldset/legend pattern programmatically associates the group label with each radio. Structure is conveyed through semantic HTML, not visual formatting alone."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="Arrow keys navigate between radios within the group and automatically select the focused option. Tab moves focus to the next focusable element outside the group."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Each child io-radio uses the double-ring focus pattern. Focus is clearly visible on the active radio button."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error is rendered with role='alert' and linked to the fieldset via aria-describedby so screen readers announce it."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required and renders as a legend. helperText provides additional group-level instructions when needed."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible radio group experiences."
        />
        <RuleCard label="Always set both label and name">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> is the accessible group name — it is the question being answered. The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>name</code> groups native inputs so arrow-key navigation and mutual exclusivity work correctly.
        </RuleCard>
        <RuleCard label="Listen for the group change event, not individual radio events">
          The group-level <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>change</code> event provides the selected value from <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>detail.value</code>. This is the canonical way to react to selection changes.
        </RuleCard>
        <RuleCard label="Use helperText for group-level instructions">
          If the group needs additional guidance — for example &ldquo;You can change this at any time&rdquo; — use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code> rather than a separate paragraph, so the text is visually and semantically part of the group.
        </RuleCard>
        <RuleCard label="Always pair error with errorMessage">
          Setting <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> without <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code> marks the group as invalid but gives screen reader users no explanation. Always provide a meaningful error message.
        </RuleCard>
      </section>

    </div>
  );
}
