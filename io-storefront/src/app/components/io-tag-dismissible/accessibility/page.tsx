'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTagDismissibleAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-tag-dismissible supports two keyboard dismiss patterns — via the dismiss button and via Delete / Backspace on the host element."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the dismiss button inside the chip. The focus ring (double-ring pattern) becomes visible on the button.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd>{' / '}<Kbd>Space</Kbd></span>,
              action: 'Activates the dismiss button when it is focused — fires the dismiss event.',
            },
            {
              key: <Kbd>Delete</Kbd>,
              action: 'Fires the dismiss event when the host element (not the button) is focused. Matches the keyboard pattern for tag input components.',
            },
            {
              key: <Kbd>Backspace</Kbd>,
              action: 'Same as Delete — fires dismiss from the host element. Supports the common pattern of pressing Backspace to remove the last chip in a tag input.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The dismiss button has an explicit aria-label built from the label prop, giving screen reader users an unambiguous action description."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>button</code>
                  {' '}(implicit, on dismiss button)
                </span>
              ),
              description: 'The native button element carries an implicit role of button. Screen readers announce the dismiss action as a button.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;Remove {'{label}'}&quot;</code>
                </span>
              ),
              description: 'Set on the dismiss button. Built dynamically from the label prop — e.g. label="React" produces aria-label="Remove React". Screen readers announce the full label so users know which chip they are dismissing.',
            },
            {
              attribute: 'aria-hidden',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code>
                  {' '}(on dismiss icon SVG)
                </span>
              ),
              description: 'The × SVG icon is hidden from the accessibility tree. The button\'s accessible name comes from its aria-label, not the icon.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-tag-dismissible is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="2.5.8"
            level="AA"
            title="Target Size (Minimum)"
            note="The dismiss button has a minimum width and height of 24×24 px, meeting the WCAG 2.2 minimum touch target requirement."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The dismiss button has an explicit aria-label of 'Remove {label}'. Role is button (implicit). The chip label text provides the accessible name for the chip content."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="The dismiss button shows the double-ring focus pattern on keyboard focus. The focus ring meets the minimum area and contrast requirements under WCAG 2.2."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All dismiss functionality is keyboard accessible. The dismiss button can be activated with Enter or Space. The host element supports Delete and Backspace as keyboard shortcuts."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Chip label text meets the 4.5:1 contrast ratio against the chip background in all colour variants."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible dismissible chip experiences."
        />
        <RuleCard label="Always set the label prop">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop is required. It sets both the visible chip text and the dismiss button&apos;s accessible name. Screen reader users hear &ldquo;Remove React&rdquo; (for example) — not just &ldquo;button&rdquo;.
        </RuleCard>
        <RuleCard label="Wrap chip groups in a labelled container">
          When rendering a set of dismissible chips (e.g. applied filters), wrap them in an element with a descriptive{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
          so screen reader users understand the group&apos;s purpose.
        </RuleCard>
        <RuleCard label="Announce removals to screen readers">
          After a chip is dismissed, use an{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live</code>{' '}
          region to announce the change — e.g. &ldquo;React filter removed&rdquo; — so screen reader users are informed without losing their focus position.
        </RuleCard>
      </section>

    </div>
  );
}
