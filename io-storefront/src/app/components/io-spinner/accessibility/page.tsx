'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSpinnerAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-spinner is a non-interactive display element. It receives no keyboard focus and exposes no keyboard commands."
        />
        <div
          className="rounded-lg p-5"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--io-text-primary)' }}>No keyboard interaction.</strong>
            {' '}io-spinner does not participate in the tab order and cannot be focused. Its accessible name is communicated via{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;status&quot;</code>{' '}
            and{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
            to assistive technologies passively, without requiring focus.
          </p>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-spinner uses role=&quot;status&quot; and aria-label to announce the loading state without interrupting the user's current reading position."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>status</code>
                </span>
              ),
              description: 'The host element carries role="status", which implies aria-live="polite". Screen readers will announce the accessible name when the spinner first appears in the DOM, without interrupting an active narration.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From label prop</span>
              ),
              description: 'Set to the value of the label prop (default: "Loading"). This is the text announced by assistive technologies. Always provide a contextual label when the generic "Loading" text would be ambiguous.',
            },
            {
              attribute: 'aria-hidden',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}on SVG
                </span>
              ),
              description: 'The inner SVG animation element is marked aria-hidden="true" so screen readers do not attempt to read the raw SVG markup. All accessible information is conveyed through role="status" and aria-label on the host.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-spinner is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The loading state is conveyed semantically via role='status' and aria-label, not through visual presentation alone. Screen readers receive an equivalent non-visual description."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The primary spinner track meets the 3:1 non-text contrast requirement against white backgrounds. Use color='white' on dark or coloured backgrounds and color='current' to inherit a contrast-safe colour."
          />
          <ComplianceCard
            criterion="2.2.2"
            level="A"
            title="Pause, Stop, Hide"
            note="The spinner animation automatically stops when prefers-reduced-motion is enabled. The visual indicator remains visible but the rotation animation is removed, reducing vestibular disturbance."
          />
          <ComplianceCard
            criterion="4.1.3"
            level="AA"
            title="Status Messages"
            note="role='status' with aria-live='polite' ensures the loading label is announced as a status message without requiring focus, satisfying the requirement to communicate dynamic content changes to screen reader users."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible loading experiences with io-spinner."
        />
        <RuleCard label="Always supply a contextual label">
          The default <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label=&quot;Loading&quot;</code>{' '}
          is acceptable for generic states, but a specific label such as <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;Saving changes&quot;</code>{' '}
          or <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;Loading search results&quot;</code>{' '}
          gives screen reader users meaningful context about what is happening.
        </RuleCard>
        <RuleCard label="Avoid redundant live region nesting">
          Do not place io-spinner inside another element that already has{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live</code>{' '}
          or{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;status&quot;</code>.
          Nested live regions produce duplicate announcements across browsers and screen reader combinations.
        </RuleCard>
        <RuleCard label="Pair with a visible loading message where space allows">
          A spinner alone can be ambiguous. In larger loading regions, supplement io-spinner with a short text label rendered next to it — this benefits all users, not only those using assistive technologies.
        </RuleCard>
        <RuleCard label="Remove the spinner only when loading is truly complete">
          The absence of the spinner signals completion. Removing it before the content is fully rendered creates a confusing state where the spinner is gone but the content is not yet present. Manage mounting and unmounting in response to your data-fetching state.
        </RuleCard>
      </section>

    </div>
  );
}
