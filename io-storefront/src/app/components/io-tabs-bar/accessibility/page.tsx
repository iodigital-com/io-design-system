'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsBarAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-tabs-bar provides tablist-style keyboard navigation with roving tabindex. Only the active tab is in the page tab sequence; arrow keys move focus between tabs."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action:
                'Moves focus into the tab list. Focus lands on the currently active tab. Pressing Tab again moves focus out of the tab list to the next focusable element on the page.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Shift</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>+</span>
                  <Kbd>Tab</Kbd>
                </span>
              ),
              action: 'Moves focus to the previous focusable element outside the tab list.',
            },
            {
              key: <Kbd>Arrow Right</Kbd>,
              action:
                'Moves focus to the next enabled tab in the list. If focus is on the last tab, it wraps to the first enabled tab. Disabled tabs are skipped.',
            },
            {
              key: <Kbd>Arrow Left</Kbd>,
              action:
                'Moves focus to the previous enabled tab in the list. If focus is on the first tab, it wraps to the last enabled tab. Disabled tabs are skipped.',
            },
            {
              key: <Kbd>Home</Kbd>,
              action: 'Moves focus to the first enabled tab in the list.',
            },
            {
              key: <Kbd>End</Kbd>,
              action: 'Moves focus to the last enabled tab in the list.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action:
                'Activates the focused tab, updates activeTabIndex, and fires update. Has no effect on disabled tabs.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action:
                'Activates the focused tab, updates activeTabIndex, and fires update. Has no effect on disabled tabs.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-tabs-bar uses ARIA tab semantics while keeping content ownership in the consuming application or router."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="tablist"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the tab strip wrapper
                </span>
              ),
              description:
                'Groups all tab triggers into a single tab widget for assistive technology.',
            },
            {
              attribute: 'role="tab" + aria-selected',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On each tab trigger
                </span>
              ),
              description:
                'Each trigger is announced as a tab, with selected state read from aria-selected.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the tablist (optional)
                </span>
              ),
              description:
                'Provided via the label prop. Recommended when multiple tab lists appear on the same page to help screen reader users distinguish between them.',
            },
            {
              attribute: 'disabled (native HTML)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On slotted <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;button&gt;</code>
                </span>
              ),
              description:
                'Disabled tabs use the native HTML disabled attribute. io-tabs-bar sets aria-selected="false" and tabindex="-1". Keyboard navigation skips disabled tabs.',
            },
            {
              attribute: 'tabindex',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Roving tabindex
                </span>
              ),
              description:
                'Only the active tab has tabindex="0"; all others have tabindex="-1". This pattern ensures Tab moves in and out of the list as a single stop, while Arrow keys move between tabs.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-tabs-bar is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Tab relationships and selected state are communicated programmatically via tablist/tab roles and aria-selected."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Active and inactive tab label text meets the 4.5:1 contrast ratio. The active tab indicator meets the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All tab functionality is operable via keyboard. ArrowLeft, ArrowRight, Home, End, Enter, and Space support the full ARIA tab keyboard interaction model."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="Tab enters the tab list on the active tab. Arrow keys move focus within the list. Tab exits to the next focusable element. Focus order is logical and matches the visual layout."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern on the focused tab button."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Each trigger has role=tab and selected state via aria-selected. Consumers MUST add aria-controls on each tab button to reference its panel's id — this is a WCAG 4.1.2 compliance requirement, not a best practice. See the consumer requirements section below."
          />
        </div>
      </section>

      {/* ── Consumer compliance requirements ─────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Consumer compliance requirements"
          description="io-tabs-bar manages the tablist role and keyboard navigation. The following wiring is the consumer's responsibility and is required for WCAG 4.1.2 compliance — not optional best practices."
        />
        <RuleCard label="aria-controls is required (WCAG 4.1.2)">
          Every tab button must reference its panel via{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-controls="panel-id"</code>{' '}
          and the panel must carry a matching{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>id</code>{' '}
          attribute. This programmatic association is mandated by the WAI-ARIA tabs pattern and WCAG 4.1.2 — omitting it leaves screen reader users without a way to navigate from a tab to its panel.
        </RuleCard>
        <RuleCard label="Apply role=tabpanel to each panel element">
          Each panel element must carry{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;tabpanel&quot;</code>{' '}
          and an accessible name (via <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-labelledby</code>{' '}
          or{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>).
          Since io-tabs-bar does not inject panels, consumers own this responsibility entirely.
        </RuleCard>
        <RuleCard label="Keep activeTabIndex in sync with the URL">
          Derive the active tab index from the current route on every render. If the URL is shared
          or navigated via the browser history, the correct tab must be highlighted automatically
          without requiring a user interaction.
        </RuleCard>
        <RuleCard label="Do not rely on colour alone to indicate the active tab">
          The active tab is indicated visually by an underline accent and programmatically via{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-selected=&quot;true&quot;</code>.
          Never remove the underline indicator and rely solely on colour — this fails WCAG 1.4.1.
        </RuleCard>
      </section>

    </div>
  );
}
