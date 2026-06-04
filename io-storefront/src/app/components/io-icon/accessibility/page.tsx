'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoIconAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-icon is a non-interactive display element. It is never inserted into the tab sequence and receives no keyboard events of its own."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Icons are non-interactive and are never inserted into the tab sequence. Focus skips over them entirely.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Same as Tab — the icon is not focusable in either direction.',
            },
          ]}
        />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
            Icon-only buttons
          </p>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            When <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-icon</code> is
            placed inside an <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<io-button>'}</code> or
            a native <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<button>'}</code> with
            no visible text, keyboard focus lands on the button — not the icon. The button must carry its own
            accessible name via its <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>,
            or the icon must have its <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop
            set so it contributes to the button&apos;s computed accessible name.
          </p>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="The rendered ARIA semantics depend on whether the label prop is set. Decorative icons are hidden; meaningful icons are announced as images."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-hidden',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;true&quot;
                </code>
              ),
              description: 'Applied automatically when label is omitted. The icon is decorative and is entirely hidden from the accessibility tree. Screen readers skip it.',
            },
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;img&quot;
                </code>
              ),
              description: 'Applied when label is set. Signals to assistive technology that the element represents a graphical image with a meaningful name.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>value of label prop</span>
              ),
              description: 'Applied when label is set. Provides the accessible name announced by screen readers. Write it as a noun or short phrase describing what the icon represents in context.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-icon is tested against WCAG 2.2 Level AA. Key success criteria are addressed below."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.1.1"
            level="A"
            title="Non-text Content"
            note="When label is set, the icon renders with role=&quot;img&quot; and aria-label providing a text alternative. When label is omitted, aria-hidden=&quot;true&quot; removes it from the accessibility tree — the surrounding context must convey all meaning."
          />
          <ComplianceCard
            criterion="1.4.11"
            level="AA"
            title="Non-text Contrast"
            note="Icons inherit currentColor from their parent. Ensure the parent element's color meets the 3:1 non-text contrast ratio against its background. The component itself does not enforce contrast — this is a consumer responsibility."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Decorative icons expose no name or role (aria-hidden). Meaningful icons expose role=&quot;img&quot; and an accessible name via aria-label. There is no interactive state to expose."
          />
          <ComplianceCard
            criterion="1.4.4"
            level="AA"
            title="Resize Text"
            note="Icon dimensions are set by design tokens keyed to the size prop. They do not scale with browser font size. Ensure icon-only interactive controls meet WCAG 2.5.8 minimum target size (24 × 24 px) — use size=sm or larger."
          />
          <ComplianceCard
            criterion="2.5.8"
            level="AA"
            title="Target Size (Minimum)"
            note="io-icon itself is not interactive. When used inside a button, ensure the button's touch target is at least 24 × 24 px. At size=xs (12 px) add sufficient padding on the parent button to meet this criterion."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive experiences with io-icon across all surfaces and assistive technologies."
        />
        <RuleCard label="Omit label for decorative icons">
          If adjacent visible text already names the action or concept — for example a &ldquo;Search&rdquo; text label next to a search icon — leave the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop
          unset. The icon becomes <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-hidden</code> and
          screen readers announce the text label only, avoiding duplication.
        </RuleCard>
        <RuleCard label="Set label for icon-only buttons">
          When an icon is the only visual affordance in a button, set the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop
          or add <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code> to
          the parent button. Both approaches satisfy WCAG 4.1.2 — choose the one that fits your markup pattern.
        </RuleCard>
        <RuleCard label="Write label values as context-aware descriptions">
          A good label describes the icon&apos;s purpose in the current context, not its visual appearance.
          Prefer &ldquo;Delete item&rdquo; over &ldquo;Trash can&rdquo;, and &ldquo;Close dialog&rdquo; over &ldquo;X mark&rdquo;.
          Screen readers announce the label verbatim — make it actionable.
        </RuleCard>
        <RuleCard label="Verify colour contrast on the parent element">
          Because icons inherit <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>currentColor</code>,
          the contrast check belongs on the container — not the icon component. Run a 3:1 non-text contrast check
          (WCAG 1.4.11) between the parent&apos;s <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>color</code> and
          its background before shipping.
        </RuleCard>
        <RuleCard label="Test in Windows High Contrast Mode">
          In High Contrast Mode the SVG strokes are recoloured by the OS. Verify all icon-only controls remain
          identifiable and that their meaning is still apparent — the stroke paths are preserved, but background
          fills may be overridden.
        </RuleCard>
      </section>

    </div>
  );
}
