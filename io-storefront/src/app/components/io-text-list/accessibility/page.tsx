'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoTextListAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-text-list is a passive display element. It is not focusable and receives no keyboard events of its own."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'List elements are non-interactive and are never inserted into the tab sequence. Focus skips over them entirely.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Same as Tab — the list element is not focusable in either direction.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-text-list renders semantic HTML with no ARIA overrides. Screen readers announce list structure based on the native ul or ol element."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Implicit (from HTML tag)</span>
              ),
              description: 'No ARIA role is added. ul renders with implicit role="list"; ol renders with implicit role="list" with positional numbering. Each li child has implicit role="listitem".',
            },
            {
              attribute: 'color prop',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not exposed</span>
              ),
              description: 'The color prop controls visual appearance only. Color is never announced. Use descriptive slot text to convey semantic meaning.',
            },
            {
              attribute: 'size prop',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not exposed</span>
              ),
              description: 'The size prop sets font-size via an inline style. It has no effect on the accessible name or role of the list.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-text-list is tested against WCAG 2.2 Level AA. All relevant success criteria pass across all color variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All semantic color tokens (primary, secondary, success, warning, error) meet the 4.5:1 contrast ratio for normal text against standard page backgrounds in both light and dark mode."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Color is never the sole indicator of meaning. Semantic colors (success, warning, error) must always be paired with descriptive text that communicates the status without relying on color perception."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="io-text-list renders standard semantic HTML list elements. The accessible name for each list item comes from its slot text content. No interactive role or state is implied."
          />
          <ComplianceCard
            criterion="1.4.4"
            level="AA"
            title="Resize Text"
            note="All typography is driven by --io-font-size-* tokens defined in rem. Text scales correctly when the user increases browser font size up to 200%."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Semantic tags (ul, ol) convey structural meaning to assistive technologies. Screen readers announce list count and item position. Choose the tag that matches the content's sequence semantics."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible list experiences with io-text-list."
        />
        <RuleCard label="Choose the semantically correct tag">
          Use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>ul</code> for
          unordered content where sequence does not matter and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>ol</code> for
          sequences where order carries meaning. Screen readers announce list type and item count.
        </RuleCard>
        <RuleCard label="Always slot li elements as direct children">
          Slot only{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;li&gt;</code>{' '}
          elements as direct children of io-text-list. Other elements as direct children produce an invalid DOM structure and break assistive technology list parsing.
        </RuleCard>
        <RuleCard label="Always pair semantic colors with descriptive text">
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>success</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>warning</code>, and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> colors
          are not announced by screen readers. The slot text must communicate the status completely — never rely on color alone.
        </RuleCard>
        <RuleCard label="Avoid using io-text-list for navigation">
          Navigation lists should use a <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;nav&gt;</code> landmark
          wrapping a plain <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;ul&gt;</code>.
          io-text-list is a typographic primitive, not a navigation component.
        </RuleCard>
      </section>

    </div>
  );
}
