'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoInputAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-input is a standard focusable text field. All native keyboard behaviours of the underlying input element are preserved."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the input. The border expands to 5px and the label animates to its floating position.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Any key</Kbd></span>,
              action: 'Types into the field. The input event fires on every keystroke with the native InputEvent as detail.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Submits the parent form if the input is inside a <form> element. No action for type="text" outside a form.',
            },
            {
              key: <Kbd>Escape</Kbd>,
              action: 'Clears the field value for type="search" (browser default). No action for other input types.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-input uses native HTML semantics. The label is associated programmatically via htmlFor/id — no ARIA role override is needed."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>textbox</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native <input> element carries an implicit role of textbox. No explicit ARIA role is set.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via htmlFor / id</span>
              ),
              description: 'The label element is associated to the input using a generated id pair. Screen readers announce the label text as the accessible name — no aria-label is needed.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Screen readers announce the field as invalid, prompting the user to correct the value.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Error element id</span>
              ),
              description: 'When error and errorMessage are both set, the error paragraph is linked to the input via aria-describedby. Combined with role="alert" on the error element, the message is announced immediately when it appears.',
            },
            {
              attribute: 'aria-required',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via native required</span>
              ),
              description: 'The native required attribute is passed directly to the input element. Most assistive technologies treat this as equivalent to aria-required="true" and announce the field as required.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-input is tested against WCAG 2.2 Level AA across all states and input types."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the input via a htmlFor/id pair. The error message is linked via aria-describedby. Structure is conveyed through semantics, not visual formatting alone."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Input text meets the 4.5:1 contrast ratio against the card background. The floating label in its accent colour and the error colour both meet 4.5:1. Border colour meets the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the border expanding from 1px to 5px in the accent colour. This provides a clear, high-contrast focus indicator that meets the minimum area requirement under WCAG 2.2."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error text is rendered with role='alert' so it is announced immediately by screen readers. The visual indicator (red border, red label) is always paired with a text description."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required — the component will not render without it. helperText provides additional format instructions when needed. Placeholder is never used as a substitute for the label."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible form experiences with io-input."
        />
        <RuleCard label="Always pair error with errorMessage">
          Setting <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red border with no explanation. Screen reader users receive no feedback at all. Always provide a specific, actionable message alongside the error state.
        </RuleCard>
        <RuleCard label="Set autocomplete on common fields">
          Use the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>autocomplete</code>{' '}
          prop with standard values (<code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>email</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>name</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>tel</code>) for fields where browser autofill and password managers can save users effort — especially valuable for users with motor impairments.
        </RuleCard>
        <RuleCard label="Validate on blur, not on every keystroke">
          Showing errors while the user is still typing is disorienting for screen reader users who receive live announcements. Trigger validation on the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>blur</code>{' '}
          event or on form submit — not on <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>input</code>.
        </RuleCard>
        <RuleCard label="Do not auto-advance focus">
          Programmatically moving focus to the next field when a maximum length is reached (e.g. OTP fields) bypasses user control. Let users move focus themselves with Tab. If you use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>setFocus()</code>, ensure it is in response to an explicit user action.
        </RuleCard>
      </section>

    </div>
  );
}
