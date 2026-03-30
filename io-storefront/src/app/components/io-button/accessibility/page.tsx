'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoButtonAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-button is fully operable by keyboard. Focus is managed by delegatesFocus — the shadow root forwards focus directly to the inner element."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the button. Skipped entirely when disabled or loading (pointer-events: none on host removes it from the tab sequence).',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus away from the button to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the button — fires click. On anchor variant (<a>), also follows the href.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the button — fires click. On the anchor variant, also scrolls the page (browser default).',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The component uses shadow: { delegatesFocus: true } so focus pierces the shadow boundary — screen readers announce the inner element directly."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;button&quot;</code>
                  {' '}(implicit on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<button>'}</code>; explicit on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<a>'}</code>)
                </span>
              ),
              description: 'Identifies the element as a button regardless of the rendered HTML tag. Added automatically when href is set.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;true&quot; when disabled or loading
                </code>
              ),
              description: 'Preferred over the HTML disabled attribute on anchor variants — keeps the element focusable so screen reader users can discover it and understand why the action is unavailable.',
            },
            {
              attribute: 'aria-busy',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;true&quot; during loading
                </code>
              ),
              description: 'Announces to screen readers that an async operation is in progress. Pair this with meaningful button label text so the announcement is contextually useful.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Value of the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop
                </span>
              ),
              description: 'Required for icon-only buttons that have no visible text content in the slot. Overrides the computed accessible name from slot text.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-button is tested against WCAG 2.2 Level AA. All five relevant success criteria pass."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All colour + variant combinations meet the 4.5:1 contrast ratio for normal text. Light-on-dark buttons (solid-white text) pass at every breakpoint."
          />
          <ComplianceCard
            criterion="1.4.11"
            level="AA"
            title="Non-text Contrast"
            note="The focus ring and ghost button border both meet the 3:1 contrast ratio against adjacent colours in both light and dark themes."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All button actions are fully reachable and operable by keyboard alone — no mouse required. Disabled and loading states correctly remove focus from the tab sequence."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="A double-ring focus indicator (box-shadow: var(--io-shadow-focus-ring)) is visible on all variants and colours. The indicator passes 3:1 against the button surface and the surrounding page background."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The button's accessible name, role, and state (disabled, busy) are computed correctly for all prop combinations and exposed to assistive technology via ARIA attributes."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive experiences with io-button across all contexts and assistive technologies."
        />
        <RuleCard label="Always label icon-only buttons">
          When the slot contains no visible text — for example an arrow-only or icon-only button — you must pass
          a descriptive <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop.
          Without it, screen readers announce nothing useful. The label should describe the action, not the icon (e.g. <em>&ldquo;Next page&rdquo;</em>, not <em>&ldquo;Arrow&rdquo;</em>).
        </RuleCard>
        <RuleCard label="Prefer loading over disabled for async operations">
          Disabled buttons give no feedback about what happened or when the action will become available.
          Use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>loading</code> to
          communicate that work is in progress, and reserve <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>disabled</code> for
          conditions the user must resolve — always explaining why via a tooltip or helper text.
        </RuleCard>
        <RuleCard label="Don't rely on colour alone to convey state">
          Disabled, loading, and hover states all alter colour. Ensure that shape, label, or additional ARIA
          attributes also communicate the state change — don't assume all users can perceive colour differences.
        </RuleCard>
        <RuleCard label="Test with a screen reader in your target environments">
          Verify <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>, focus
          order, and <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-busy</code> announcements
          in VoiceOver (macOS / iOS), NVDA (Windows), and TalkBack (Android). Pay particular attention to the
          anchor variant — some screen reader + browser combinations announce links and buttons differently.
        </RuleCard>
      </section>

    </div>
  );
}
