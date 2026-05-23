'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoSkeletonAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-skeleton is a non-interactive display element. It receives no keyboard focus and exposes no keyboard commands."
        />
        <div
          className="rounded-lg p-5"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--io-text-primary)' }}>No keyboard interaction.</strong>
            {' '}io-skeleton does not participate in the tab order and cannot be focused. Its accessible name is communicated via{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;img&quot;</code>{' '}
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
          description="io-skeleton uses role=&quot;img&quot; and aria-label to convey the placeholder without producing live region noise when multiple skeletons appear simultaneously."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>img</code>
                </span>
              ),
              description: 'The host element carries role="img". Unlike role="status", this does not create a live region — it describes a static placeholder image. This avoids flooding screen readers with multiple announcements when a list of skeletons loads simultaneously.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From label prop</span>
              ),
              description: 'Set to the value of the label prop (default: "Loading"). This is the accessible name of the placeholder image. Provide a contextual label when the generic "Loading" text would be ambiguous — e.g. "Loading avatar" or "Loading article image".',
            },
            {
              attribute: 'aria-hidden',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}on inner span
                </span>
              ),
              description: 'The inner shimmer animation span is marked aria-hidden="true" so screen readers do not traverse its CSS content. All accessible information is conveyed through role="img" and aria-label on the host.',
            },
          ]}
        />
      </section>

      {/* ── Composition patterns ─────────────────────────────────── */}
      <section id="composition-patterns" className="space-y-6">
        <SectionHeader
          title="Accessible composition"
          description="When multiple skeletons represent a single loading region, wrap them to communicate the group as a unit."
        />
        <div className="space-y-3">
          <RuleCard label="Use aria-busy='true' on the container">
            Wrap compositions in a container element with{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-busy=&quot;true&quot;</code>{' '}
            and a descriptive{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>.
            Set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-busy=&quot;false&quot;</code>{' '}
            when the real content is ready. This gives screen reader users a single, meaningful announcement instead of one per skeleton.
          </RuleCard>
          <RuleCard label="Replace skeletons — do not hide them">
            When content loads, unmount the skeleton elements entirely and mount the real content. Do not use{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>visibility: hidden</code>{' '}
            or{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>opacity: 0</code>{' '}
            — hidden skeletons still occupy space and may still be announced by some assistive technologies.
          </RuleCard>
        </div>
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-skeleton is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The placeholder state is conveyed semantically via role='img' and aria-label. Screen readers receive an equivalent non-visual description of the loading placeholder."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The skeleton shimmer colours are decorative and do not convey information, so the contrast requirement for non-text content does not apply. The skeleton is always accompanied by an accessible label."
          />
          <ComplianceCard
            criterion="2.2.2"
            level="A"
            title="Pause, Stop, Hide"
            note="The shimmer animation automatically stops when prefers-reduced-motion is enabled. The static placeholder remains visible so users still understand the loading state."
          />
          <ComplianceCard
            criterion="1.3.3"
            level="A"
            title="Sensory Characteristics"
            note="The loading state is not communicated through animation alone. The accessible label provides equivalent information for users who cannot perceive the visual animation."
          />
        </div>
      </section>

    </div>
  );
}
