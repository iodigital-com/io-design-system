'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTooltipAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-tooltip does not add keyboard behaviour of its own. The tooltip appears and disappears based on the focus state of the slotted trigger element."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the trigger element inside io-tooltip. The tooltip panel becomes visible as focus enters the trigger.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Shift</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>+</span>
                  <Kbd>Tab</Kbd>
                </span>
              ),
              action: 'Moves focus to the previous focusable element. The tooltip hides as focus leaves the trigger.',
            },
            {
              key: <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>focusin</span>,
              action: 'Tooltip appears when the trigger receives focus. This applies to any keyboard navigation that lands on the trigger, including Tab, arrow keys, or programmatic focus.',
            },
            {
              key: <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>focusout</span>,
              action: 'Tooltip hides when the trigger loses focus. There is no need to press Escape to dismiss — the tooltip is automatically hidden on blur.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-tooltip uses the tooltip ARIA pattern. The floating panel is not focusable — screen readers access its content via the aria-describedby association on the trigger."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  tooltip
                </code>
              ),
              description: 'Applied to the floating panel element. This role signals to assistive technologies that the element is a tooltip associated with a trigger element via aria-describedby. Screen readers announce tooltip content as a description when the trigger is focused.',
            },
            {
              attribute: 'aria-describedby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Auto-injected on trigger</span>
              ),
              description: 'Injected automatically onto the first slotted child element in componentDidLoad. The value is the ID of the floating tooltip panel. This creates the association that causes screen readers to read the tooltip content when the trigger receives focus.',
            },
            {
              attribute: 'tabindex',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                    not set
                  </code>
                  {' '}(tooltip panel)
                </span>
              ),
              description: 'The floating tooltip panel is not focusable. Users cannot tab into it. Content inside the tooltip must be plain text only — interactive elements inside a tooltip panel are inaccessible to keyboard and screen reader users.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-tooltip is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The tooltip association is conveyed through aria-describedby, not visual proximity alone. Screen readers receive the relationship programmatically regardless of visual placement."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Tooltip panel text and background colours use design tokens that maintain at least 4.5:1 contrast. The tooltip surface colour also meets 3:1 contrast against the page background."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="The trigger element retains its own focus ring when the tooltip is visible. The tooltip panel itself is not focusable and does not affect focus visibility."
          />
          <ComplianceCard
            criterion="4.1.3"
            level="AA"
            title="Status Messages"
            note="The tooltip uses role=&quot;tooltip&quot; rather than role=&quot;status&quot; or role=&quot;alert&quot;. Its content is descriptive and supplementary — it does not convey status changes that require live region announcement."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The tooltip panel carries role=&quot;tooltip&quot; and an ID. The trigger carries aria-describedby pointing to that ID. Both roles and their relationship are exposed correctly to the accessibility tree."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible experiences with io-tooltip."
        />
        <RuleCard label="Keep tooltip content concise">
          The tooltip content is read by screen readers as a description when the trigger is focused. Long sentences or multiple pieces of information create a poor screen reader experience. Aim for a single short phrase or sentence.
        </RuleCard>
        <RuleCard label="Do not put interactive content inside the tooltip">
          The floating panel is not focusable. Links, buttons, or form controls placed inside the tooltip content prop are unreachable by keyboard users and will not be announced by screen readers in a navigable way.
        </RuleCard>
        <RuleCard label="Always include a visible label for icon-only buttons">
          A tooltip supplements a label — it does not replace one. Icon-only buttons must have an accessible name via{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
          or visible text. The tooltip provides additional description, not the primary name.
        </RuleCard>
        <RuleCard label="Do not rely on tooltip for critical information">
          Tooltips are hidden by default and are not visible without hover or focus. Critical instructions, warnings, or required field guidance must always appear as persistent visible text so that all users — including those on touch devices or with cognitive disabilities — can access them without interaction.
        </RuleCard>
      </section>

    </div>
  );
}
