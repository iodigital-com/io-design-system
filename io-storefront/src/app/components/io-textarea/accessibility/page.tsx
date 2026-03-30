'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTextareaAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-textarea is a standard multi-line focusable text field. All native keyboard behaviours of the underlying textarea element are preserved."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the textarea. The border changes to the accent colour and the label animates to its floating position.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Inserts a new line within the textarea. Does not submit the parent form (unlike single-line inputs). The input event fires with the native InputEvent.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Any key</Kbd></span>,
              action: 'Types into the field. The input event fires on every keystroke with the native InputEvent as detail.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-textarea uses native HTML semantics. The label is associated programmatically via htmlFor/id — no ARIA role override is needed."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>textbox</code>
                  {' '}(implicit, multiline)
                </span>
              ),
              description: 'The native textarea element carries an implicit role of textbox with aria-multiline="true". Screen readers announce it as a multi-line text field.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via htmlFor / id</span>
              ),
              description: 'The label element is associated to the textarea using a generated id pair. Screen readers announce the label text as the accessible name.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Combined with role="alert" on the error message, the error is announced immediately when it appears.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Error or helper element id</span>
              ),
              description: 'Links the textarea to either the error message or helper text paragraph. Provides supplementary context to screen reader users when they focus the field.',
            },
            {
              attribute: 'aria-required',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via native required</span>
              ),
              description: 'The native required attribute is forwarded to the textarea element. Assistive technologies treat this as equivalent to aria-required="true".',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-textarea is tested against WCAG 2.2 Level AA across all states and resize variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the textarea. The error message or helper text is linked via aria-describedby. Structure is conveyed through HTML semantics, not visual formatting alone."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Input text meets 4.5:1 contrast against the field background. The floating label in accent colour and the error colour both meet 4.5:1. The 4-side border meets the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the border colour changing to the accent colour. The 4-side border provides a large, highly visible focus indicator that meets the minimum area requirements of WCAG 2.2."
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
            note="The label prop is required — the component will not render without it. helperText provides additional context when needed. Placeholder is never used as a substitute for the label."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible multi-line text experiences with io-textarea."
        />
        <RuleCard label="Always pair error with errorMessage">
          Setting{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red border with no explanation. Screen reader users receive no feedback. Always provide a specific, actionable message.
        </RuleCard>
        <RuleCard label="Announce character count remaining when using maxLength">
          If you use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>maxLength</code>,{' '}
          display a live character count outside the component using an{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live</code>{' '}
          region so screen reader users are informed as they approach the limit.
        </RuleCard>
        <RuleCard label="Validate on blur, not on every keystroke">
          Showing errors while the user is actively typing is disorienting for screen reader users who receive live announcements. Trigger validation on the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>blur</code>{' '}
          event or on form submit — not on{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>input</code>.
        </RuleCard>
        <RuleCard label="Do not use resize=none when content might overflow">
          Preventing resize removes user control and can cause critical content to be obscured inside a scrolling area. Only use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>resize=&quot;none&quot;</code>{' '}
          when the field is part of a layout-constrained component where the height is deliberately fixed.
        </RuleCard>
      </section>

    </div>
  );
}
