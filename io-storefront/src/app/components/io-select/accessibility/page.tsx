'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSelectAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-select uses a native select element. All native keyboard behaviours of the underlying select are preserved — including platform-specific OS dropdown behaviour."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the select. The border expands to 5px in the accent colour and the label floats.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Alt</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>↓</Kbd></span>,
              action: 'Opens the native dropdown on Windows/Linux. On macOS, the dropdown opens via Space or click.',
            },
            {
              key: <Kbd>↑</Kbd>,
              action: 'Selects the previous option. On some platforms, cycles through options without opening the dropdown.',
            },
            {
              key: <Kbd>↓</Kbd>,
              action: 'Selects the next option. Fires change with the newly selected value.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Confirms the selection and closes the dropdown (when open). Submits the parent form if outside a dropdown context.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the dropdown without changing the selection (when open).',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-select uses native HTML semantics. The label is associated programmatically via htmlFor/id — no ARIA role override is needed."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>listbox</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native select element carries an implicit role of listbox. Screen readers handle option announcement and selection state automatically.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via htmlFor / id</span>
              ),
              description: 'The label element is associated to the select using a generated id pair. Screen readers announce the label text as the accessible name.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Screen readers announce the field as invalid, and the error message (role="alert") is announced immediately.',
            },
            {
              attribute: 'aria-required',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via native required</span>
              ),
              description: 'The native required attribute is passed directly to the select element. Assistive technologies treat this as aria-required="true".',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-select is tested against WCAG 2.2 Level AA across all states."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the select via a htmlFor/id pair. The error message is linked via aria-describedby. Structure is conveyed through HTML semantics."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Selected option text meets 4.5:1 against the field background. The floating label in accent colour meets 4.5:1. The border meets the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the border expanding from 1px to 5px in the accent colour. This provides a clear, high-contrast focus indicator that meets WCAG 2.2 minimum area requirements."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error text renders with role='alert'. The visual indicator (red border, red label) is always paired with descriptive text."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required — the component will not render without it. helperText provides additional context. Placeholder is never used as a label substitute."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible form experiences with io-select."
        />
        <RuleCard label="Always pair error with errorMessage">
          Setting{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red border with no textual explanation. Screen reader users receive no feedback. Always provide a specific, actionable message.
        </RuleCard>
        <RuleCard label="Validate on blur, not on every change">
          Showing errors while the user is still cycling through options is disorienting. Trigger validation on the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>blur</code>{' '}
          event or on form submit, not on every{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>change</code>.
        </RuleCard>
        <RuleCard label="Do not disable individual options as category headers">
          Disabled options with no value are sometimes used as visual group separators. This pattern is not accessible — use native optgroup elements in the select markup for grouping, or restructure the options to avoid nesting.
        </RuleCard>
        <RuleCard label="Pre-select a sensible default when possible">
          A pre-selected value reduces the number of required interactions. If a default makes sense — for example, defaulting to the user&apos;s locale for &ldquo;Country&rdquo; — set it via the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>value</code>{' '}
          prop. This is especially helpful for users with motor impairments.
        </RuleCard>
      </section>

    </div>
  );
}
