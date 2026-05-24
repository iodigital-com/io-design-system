'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoFormFieldAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-form-field programmatically associates the label with the slotted control via htmlFor/id and optionally links helper or error text via aria-describedby."
        />
        <AriaTable
          rows={[
            {
              attribute: 'htmlFor / id',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Generated unique ID</span>
              ),
              description: 'A unique ID is generated on componentWillLoad() and set on both the label (htmlFor) and the slotted control (id). Screen readers announce the label text as the accessible name for the field.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Helper or error element id</span>
              ),
              description: 'When helperText or errorMessage is visible, its id is set on the slotted control via aria-describedby. Screen readers announce the description after the field label.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" on the slotted control when the error prop is true. Screen readers announce the field as invalid.',
            },
            {
              attribute: 'aria-live',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;polite&quot;</code>
                  {' '}on error span
                </span>
              ),
              description: 'The error text element has aria-live="polite" so assistive technologies announce the message when it appears, without interrupting current narration.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-form-field is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the slotted control via htmlFor/id. Helper and error text are linked via aria-describedby."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error is rendered with aria-live='polite' and linked to the control so screen readers announce it immediately."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required. helperText provides additional format instructions. The error text provides corrective guidance."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible form experiences with io-form-field."
        />
        <RuleCard label="Always pair error with errorMessage">
          Setting <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          sets aria-invalid on the control but provides no text explanation. Screen reader users will know the field is invalid but not why.
        </RuleCard>
        <RuleCard label="Use a single slotted control per io-form-field">
          The label-to-input association uses a single generated ID. Slotting multiple controls means only the first will be correctly associated with the label.
        </RuleCard>
      </section>

    </div>
  );
}
