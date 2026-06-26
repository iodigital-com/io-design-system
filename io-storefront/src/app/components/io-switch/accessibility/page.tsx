'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSwitchAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-switch uses a visually-hidden native checkbox with role=switch. All native keyboard behaviours are preserved."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the switch. The focus ring becomes visible around the track.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Toggles the switch state and fires the change event with the new checked value.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-switch uses a native hidden checkbox with role=switch. The switch role communicates on/off semantics to assistive technologies."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>switch</code>
              ),
              description: 'The native input[type="checkbox"] carries role="switch". Screen readers announce the component as a switch, not a checkbox, which communicates an immediate on/off toggle.',
            },
            {
              attribute: 'aria-checked',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' / '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                </span>
              ),
              description: 'Reflects the checked state. Screen readers announce "on" when true and "off" when false (wording varies by browser/AT combination).',
            },
            {
              attribute: 'disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  present when disabled
                </span>
              ),
              description: 'Native HTML disabled attribute set on the underlying <input type="checkbox"> when the disabled prop is true. The native attribute implicitly communicates unavailability to assistive technologies without requiring an explicit aria-disabled attribute.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' when error'}
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Combined with role="alert" on the error message element, the error is announced immediately when it appears.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Generated id</span>
              ),
              description: 'Points to the error message or helper text element. Screen readers read the associated text after the switch label.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-switch is tested against WCAG 2.2 Level AA across all states."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the native input. The error message is linked via aria-describedby. All structure is conveyed through semantic HTML."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The label text and error message meet 4.5:1 contrast against the background. The switch track meets the 3:1 non-text contrast requirement in all states."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern visible around the switch track. Meets minimum area and contrast requirements under WCAG 2.2."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error paragraph is rendered with role='alert'. The visual indicator (red track, red text) is always paired with descriptive text."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required — a dev warning is logged if missing. helperText provides additional context when needed."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The switch has an explicit role=switch, an accessible name from the label element, and communicates its state via aria-checked. All state changes are reflected immediately."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible settings experiences with io-switch."
        />
        <RuleCard label="Use switches only for immediate-effect settings">
          The switch metaphor implies immediate action. If the setting only applies after a form submit, use a checkbox instead. Users expect switches to work like light switches — instant feedback.
        </RuleCard>
        <RuleCard label="Always pair error with errorMessage">
          Setting{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red visual with no text explanation. Screen reader users receive no feedback. Always provide a specific, actionable message.
        </RuleCard>
        <RuleCard label="Do not intercept Enter key">
          The Space key toggles the switch. Enter must not be intercepted — it submits the enclosing form. Intercepting Enter would break native form submission behaviour.
        </RuleCard>
        <RuleCard label="Group related switches in a fieldset">
          When displaying a list of related toggle settings, wrap them in a{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;fieldset&gt;</code>{' '}
          with a{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;legend&gt;</code>{' '}
          so screen reader users understand the group context.
        </RuleCard>
      </section>

    </div>
  );
}
