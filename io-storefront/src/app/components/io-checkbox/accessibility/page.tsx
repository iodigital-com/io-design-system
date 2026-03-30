'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoCheckboxAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-checkbox uses a visually-hidden native input element. All native checkbox keyboard behaviours are preserved."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the checkbox. The focus ring becomes visible around the custom visual.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Toggles the checked state and fires the change event with the new checked value and the current value string.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-checkbox uses a native hidden input with a programmatically-associated label. No ARIA role override is needed."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>checkbox</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native input[type="checkbox"] carries an implicit role of checkbox. The custom visual is aria-hidden — screen readers interact only with the native input.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via htmlFor / id</span>
              ),
              description: 'The label element is programmatically associated with the native input via a generated id pair. Screen readers announce the label text as the accessible name.',
            },
            {
              attribute: 'aria-checked',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;mixed&quot;</code>
                  {' '}when indeterminate
                </span>
              ),
              description: 'When indeterminate is true, the native input\'s indeterminate property is set and aria-checked="mixed" is communicated by the browser. Screen readers announce the indeterminate state.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Combined with role="alert" on the error message element, the error is announced immediately when it appears.',
            },
            {
              attribute: 'aria-required',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via native required</span>
              ),
              description: 'The native required attribute is forwarded to the input element. Assistive technologies treat this as equivalent to aria-required="true".',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-checkbox is tested against WCAG 2.2 Level AA across all states."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the native input. The error message is linked via aria-describedby. All structure is conveyed through semantic HTML, not visual formatting alone."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The label text and error message meet 4.5:1 contrast against the background. The custom checkbox visual border meets the 3:1 non-text contrast requirement in all states."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern visible around the custom checkbox visual. Meets minimum area and contrast requirements under WCAG 2.2."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error paragraph is rendered with role='alert'. The visual indicator (red border, red label) is always paired with descriptive text."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required — the component will not render without it. helperText provides additional context when needed."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible form experiences with io-checkbox."
        />
        <RuleCard label="Group related checkboxes in a fieldset">
          When displaying a list of related checkbox options, wrap them in a{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;fieldset&gt;</code>{' '}
          with a{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;legend&gt;</code>{' '}
          so screen reader users understand the group context before hearing individual option labels.
        </RuleCard>
        <RuleCard label="Always pair error with errorMessage">
          Setting{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red visual with no text explanation. Screen reader users receive no feedback. Always provide a specific, actionable message.
        </RuleCard>
        <RuleCard label="Use indeterminate only for genuine partial selection">
          The indeterminate state communicates to screen reader users that the checkbox is &ldquo;mixed&rdquo; (aria-checked=&quot;mixed&quot;). Only use it in hierarchical lists with a parent &ldquo;Select all&rdquo; checkbox. Using it decoratively would mislead assistive technology users.
        </RuleCard>
        <RuleCard label="Avoid negatively worded labels">
          Labels like &ldquo;Do not send me emails&rdquo; create double-negative confusion when checked. Rewrite as an affirmative: &ldquo;Opt out of email notifications&rdquo; or simply restructure the interaction.
        </RuleCard>
      </section>

    </div>
  );
}
