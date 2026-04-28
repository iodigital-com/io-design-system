'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-tabs provides tabs-bar style keyboard navigation with roving tabindex. Only the active tab is in the page tab sequence; arrow keys move focus between tabs."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action:
                'Moves focus into the tab list. Focus lands on the currently active tab. Pressing Tab again moves focus out of the tab list to the next focusable element on the page (typically the associated panel).',
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
          description="io-tabs uses ARIA tab semantics while still keeping content ownership in the consuming application."
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
              attribute: 'disabled (native HTML)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On slotted <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;button&gt;</code>
                </span>
              ),
              description:
                'Disabled tabs rely on the native HTML disabled attribute. io-tabs sets aria-selected="false" and tabindex="-1" for non-active tabs, and keyboard navigation skips disabled tabs.',
            },
            {
              attribute: 'tabindex',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Roving tabindex
                </span>
              ),
              description:
                'Only the active tab has tabindex="0"; all other tabs have tabindex="-1". This roving tabindex pattern ensures that Tab moves focus in and out of the tab list as a single stop, while Arrow keys move between tabs.',
            },
            {
              attribute: 'aria-current (optional)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Consumer-managed content state
                </span>
              ),
              description:
                'When tabs switch application views, consumers may expose additional state in their own content region. io-tabs itself does not enforce panel/link wiring.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-tabs is tested against WCAG 2.2 Level AA."
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
            note="Active and inactive tab label text meets the 4.5:1 contrast ratio against the tab background in both light and dark modes. The active tab indicator meets the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All tab functionality is operable via keyboard. The roving tabindex pattern plus ArrowLeft, ArrowRight, Home, End, Enter, and Space support the full ARIA tab keyboard interaction model."
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
            note="Focus is indicated by the double-ring focus pattern on the focused tab button. Meets minimum area and contrast requirements under WCAG 2.2."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Each trigger has role=tab and selected state via aria-selected. Optional aria-controls can link to consumer-owned external panels."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible tabs-bar style interfaces with io-tabs."
        />
        <RuleCard label="Treat update as the source of truth">
          Use the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>update</code>{' '}
          event detail (<code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>activeTabIndex</code>)
          to keep application state and rendered content in sync.
        </RuleCard>
        <RuleCard label="Disabled triggers remain visible and announced">
          Disabled items use the native{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>disabled</code>{' '}
          attribute on slotted buttons. Keep disabled labels descriptive and avoid long runs of unavailable actions.
        </RuleCard>
        <RuleCard label="Do not rely on colour alone to indicate the active tab">
          The active tab is indicated visually by an underline or accent colour, and programmatically
          via{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-selected=&quot;true&quot;</code>.
          Never remove the underline indicator and rely solely on colour — this fails WCAG 1.4.1
          (Use of Colour).
        </RuleCard>
        <RuleCard label="Ensure focus returns to the correct tab after panel interactions">
          When a user activates a tab, reads the panel, and presses Shift+Tab, focus returns to the
          active tab. Ensure your panel does not trap focus or insert elements between the tab list
          and the panel that would disrupt this return path.
        </RuleCard>
      </section>

    </div>
  );
}
