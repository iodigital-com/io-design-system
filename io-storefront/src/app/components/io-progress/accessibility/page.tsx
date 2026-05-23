'use client';

import { AriaTable, ComplianceCard, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoProgressAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-progress is a non-interactive display element. It receives no keyboard focus and exposes no keyboard commands."
        />
        <div
          className="rounded-lg p-5"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--io-text-primary)' }}>No keyboard interaction.</strong>
            {' '}io-progress does not participate in the tab order and cannot be focused.
            Its current value is communicated via{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;progressbar&quot;</code>,{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-valuenow</code>, and{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
            to assistive technologies passively.
          </p>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-progress exposes role=&quot;progressbar&quot; with the standard ARIA value attributes. Screen readers announce the current percentage and accessible name."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>progressbar</code>
                </span>
              ),
              description: 'The host element carries role="progressbar". This tells assistive technologies that the element represents the progress of a task.',
            },
            {
              attribute: 'aria-valuenow',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From value prop (clamped)</span>
              ),
              description: 'Set to the clamped value prop (0–100). Screen readers announce this as the current progress percentage. Updated automatically when the value prop changes.',
            },
            {
              attribute: 'aria-valuemin',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>0</code>
                </span>
              ),
              description: 'Always 0. Defines the minimum value of the range.',
            },
            {
              attribute: 'aria-valuemax',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>100</code>
                </span>
              ),
              description: 'Always 100. Defines the maximum value of the range.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From label prop</span>
              ),
              description: 'Set to the value of the label prop. This is the accessible name that provides context — e.g. "Upload progress" or "Step 2 of 4". Without this, screen readers announce only the percentage with no context.',
            },
          ]}
        />
      </section>

      {/* ── Accessible label guidance ────────────────────────────── */}
      <section id="accessible-label-guidance" className="space-y-6">
        <SectionHeader
          title="Accessible label guidance"
          description="The label prop is the primary mechanism for communicating what the progress represents."
        />
        <div className="space-y-3">
          <RuleCard label="Always provide a label">
            A progress bar without an accessible label announces only a numeric value — e.g. &quot;72&quot; — with no indication of what operation is in progress. Always set the{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
            prop to a meaningful description.
          </RuleCard>
          <RuleCard label="Visible label and aria-label serve different purposes">
            The{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>show-label</code>{' '}
            prop renders a visible percentage below the track — it is marked{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-hidden=&quot;true&quot;</code>{' '}
            so it does not double-announce. Always set both <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
            and <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>show-label</code>{' '}
            if you want both a visual and accessible label.
          </RuleCard>
        </div>
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-progress is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The host element carries role='progressbar' with aria-valuenow, aria-valuemin, aria-valuemax, and aria-label. All three components of the ARIA name/role/value contract are fulfilled."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The progress state is communicated semantically via ARIA progressbar role and value attributes — not only through visual fill width or colour. Screen readers receive equivalent non-visual information."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Colour is not the sole means of conveying progress state. The aria-valuenow attribute and visible percentage label (show-label) provide equivalent non-colour information."
          />
          <ComplianceCard
            criterion="2.2.2"
            level="A"
            title="Pause, Stop, Hide"
            note="The fill transition animation respects prefers-reduced-motion. When the OS reduced-motion preference is active, the transition is disabled and the bar renders statically."
          />
        </div>
      </section>

    </div>
  );
}
