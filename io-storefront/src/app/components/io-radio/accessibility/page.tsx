'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoRadioAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-radio uses a visually-hidden native input element. All native radio keyboard behaviours are preserved, including arrow-key navigation within a group."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus into the radio group, landing on the checked option. If no option is checked, focus lands on the first option in the group.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element outside the radio group.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>&#8593;</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>&#8592;</Kbd></span>,
              action: 'Moves focus to and selects the previous radio option in the group. Wraps from the first option to the last.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>&#8595;</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>&#8594;</Kbd></span>,
              action: 'Moves focus to and selects the next radio option in the group. Wraps from the last option to the first.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Selects the focused radio option if it is not already checked. Fires the ioChange event with checked: true and the option\'s value string.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-radio uses a native hidden input with a programmatically-associated label. No ARIA role override is needed. For groups, wrap elements in a fieldset with a legend."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>radio</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native input[type="radio"] carries an implicit role of radio. The custom visual is aria-hidden — screen readers interact only with the native input.',
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
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}or{' '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                </span>
              ),
              description: 'The native input checked attribute drives the aria-checked state. Screen readers announce whether the radio button is selected or not.',
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
            {
              attribute: 'fieldset / legend',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Host responsibility</span>
              ),
              description: 'When rendering a radio group, the host page must wrap the io-radio elements in a <fieldset> with a <legend> describing the group question. This ensures screen readers announce the group label before each individual option.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-radio is tested against WCAG 2.2 Level AA across all states."
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
            note="The label text and error message meet 4.5:1 contrast against the background. The custom radio visual border meets the 3:1 non-text contrast requirement in all states."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern visible around the custom radio visual. Meets minimum area and contrast requirements under WCAG 2.2."
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
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="Full keyboard operation is supported. Arrow keys navigate within a radio group and automatically select the focused option. Tab moves focus between groups."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible form experiences with io-radio."
        />
        <RuleCard label="Always wrap radio groups in a fieldset with a legend">
          Screen reader users hear the group question (legend) before each individual option label. Without a fieldset and legend, users must infer group context from surrounding page content — which is unreliable. The legend text should be the question being answered: &ldquo;Select a delivery method&rdquo;.
        </RuleCard>
        <RuleCard label="Apply error state to every radio in the affected group">
          When a radio group fails validation, set{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          on every io-radio in the group, or place a single error message on the last item only. Applying error to a subset of options is misleading — the error belongs to the group, not an individual radio.
        </RuleCard>
        <RuleCard label="Always pair error with errorMessage">
          Setting{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red visual with no text explanation. Screen reader users receive no feedback. Always provide a specific, actionable message.
        </RuleCard>
        <RuleCard label="Use a unique name per group, not per option">
          All io-radio elements sharing the same{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>name</code>{' '}
          value form one radio group. Using a different name on every option breaks grouping and arrow-key navigation. The name should identify the question, not the answer — for example: <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>delivery-method</code>, not <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>standard</code>.
        </RuleCard>
      </section>

    </div>
  );
}
