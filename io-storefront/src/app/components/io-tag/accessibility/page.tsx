'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTagAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-tag is implemented as a button element, giving it the full keyboard behaviour of a native button."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the tag. The focus ring (double-ring pattern) becomes visible.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Toggles the selected state and fires toggle, or fires remove if the tag is removable.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Same as Enter — toggles the selected state or removes the tag. This is the standard keyboard activation for button elements.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-tag uses a native button element with ARIA state attributes to communicate selected and disabled states to assistive technologies."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>button</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native button element carries an implicit role of button. Screen readers announce the tag as a button with its text content.',
            },
            {
              attribute: 'aria-pressed',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}/ <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                </span>
              ),
              description: 'Reflects the selected state. Screen readers announce "pressed" or "not pressed" to communicate toggle state. Updated immediately when selected changes.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when disabled
                </span>
              ),
              description: 'Set when disabled is true. Keeps the tag in the tab order so keyboard users can discover it, but blocks activation.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-tag is tested against WCAG 2.2 Level AA across all colour variants, sizes, and states."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Tag label text meets the 4.5:1 contrast ratio against the tag background in all colour variants — default, blue, and beige — in both unselected and selected states."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern. The focus ring meets the minimum area and contrast requirements under WCAG 2.2 for all colour variants."
          />
          <ComplianceCard
            criterion="2.5.3"
            level="A"
            title="Label in Name"
            note="The visible slot text is the accessible name of the button. There is no ARIA override — screen reader users hear exactly the text that sighted users see."
          />
          <ComplianceCard
            criterion="2.5.5"
            level="AA"
            title="Target Size"
            note="Both sm and md sizes meet the 44×44px minimum touch target requirement via their expanded hit area, ensuring touch accessibility on mobile devices."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Role is button (implicit). Accessible name comes from slot content. aria-pressed communicates toggle state. aria-disabled communicates the disabled state without removing the element from tab order."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible filter and multi-select experiences with io-tag."
        />
        <RuleCard label="Wrap tag groups in a fieldset or labelled container">
          When using a group of tags as a filter set, wrap them in an element with a descriptive{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
          or{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-labelledby</code>{' '}
          so screen reader users understand the group&apos;s purpose before navigating into it.
        </RuleCard>
        <RuleCard label="Announce selection changes if context requires it">
          For filter bars that update a result count dynamically, use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live</code>{' '}
          on the result count container so screen reader users are informed of the change without losing their current focus position.
        </RuleCard>
        <RuleCard label="The remove icon button must have an accessible label">
          When{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>removable</code>{' '}
          is true, the internal remove icon button carries an{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
          of &ldquo;Remove [tag label]&rdquo; so the action is unambiguous to screen reader users.
        </RuleCard>
      </section>

    </div>
  );
}
