'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBadgeAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-badge is a passive display element. It is not focusable and receives no keyboard events of its own."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Badges are non-interactive and are never inserted into the tab sequence. Focus skips over them entirely.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Same as Tab — the badge is not focusable in either direction.',
            },
          ]}
        />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
            Note
          </p>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            If a badge is placed inside an interactive parent — for example a button, link, or table row — keyboard
            events belong to that parent element, not to the badge. The badge contributes its text content to the
            parent&apos;s accessible name via the slot.
          </p>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-badge renders a plain span with no ARIA role. Screen readers announce its text content inline with the surrounding context."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  None (implicit{' '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>generic</code>
                  {' '}on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<span>'}</code>)
                </span>
              ),
              description: 'No explicit ARIA role is set. The badge text is read inline as part of its host element\'s context — no special announcement. This is correct for a passive label.',
            },
            {
              attribute: 'variant',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not exposed</span>
              ),
              description: 'The variant prop controls visual appearance only — colour is never announced. The slot text must convey the full meaning (e.g. "Error" not just "●" or a colour swatch).',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not set by component</span>
              ),
              description: 'The accessible name comes entirely from the slot text. If the badge sits inside a landmark or interactive element, the slot text contributes to that element\'s computed accessible name.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-badge is tested against WCAG 2.2 Level AA. All relevant success criteria pass across all 9 variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All 9 variants meet the 4.5:1 contrast ratio for normal text. Semantic variants (success/warning/error) use a soft background with a saturated text colour. Solid variants (dark/orange/rouge) use white text on a filled background."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note={'Colour is never the sole indicator of meaning. Each badge variant requires descriptive text in the slot — a success badge must say "Active", not just render green. No information is conveyed by colour alone.'}
          />
          <ComplianceCard
            criterion="1.4.11"
            level="AA"
            title="Non-text Contrast"
            note="The badge border meets the 3:1 contrast ratio against adjacent page backgrounds in both light and dark themes. The blue variant uses color-mix to derive its border from the accent text token."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The badge exposes its text content as its accessible name through the slot. No interactive role or state is implied — this is correct for a passive label element."
          />
          <ComplianceCard
            criterion="1.4.4"
            level="AA"
            title="Resize Text"
            note="Badge typography is driven entirely by --io-font-size-xs and --io-line-height-tight tokens. The badge scales correctly when the user increases browser font size up to 200%."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive experiences with io-badge across all surfaces and assistive technologies."
        />
        <RuleCard label="Always use descriptive slot text">
          The badge&apos;s accessible name is its slot content. Never use symbols, abbreviations, or colour references
          as the only content (e.g. avoid <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>●</code> or <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>!</code> alone). Use words that convey the state: &ldquo;Active&rdquo;, &ldquo;Pending&rdquo;, &ldquo;Error&rdquo;.
        </RuleCard>
        <RuleCard label="Don't use badges as interactive elements">
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-badge</code> has
          no <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role="button"</code>,
          no click handler, and no focus management. Attaching a click listener to a badge creates a keyboard and
          screen reader trap. Use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<io-button>'}</code> or
          a native <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<button>'}</code> if the element must be interactive.
        </RuleCard>
        <RuleCard label="Pair semantic variants with explanatory context">
          A <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>warning</code> or <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> badge
          flags a problem — but users also need to know what the problem is and what to do about it. Always place
          these variants alongside body text, a tooltip, or a helper message that explains the situation.
        </RuleCard>
        <RuleCard label="Test in Windows High Contrast Mode">
          In High Contrast Mode, background colours are overridden and only foreground text and borders remain.
          Verify that all 9 variants remain legible — pay particular attention to solid variants (dark/orange/rouge)
          where white text on a coloured fill may reduce to white on black, and the outline variant where the border
          may disappear against certain system themes.
        </RuleCard>
      </section>

    </div>
  );
}
