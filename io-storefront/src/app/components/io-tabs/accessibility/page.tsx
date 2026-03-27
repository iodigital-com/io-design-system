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
          description="io-tabs implements the ARIA Authoring Practices Guide tab pattern with automatic activation and roving tabindex. Only the active tab is included in the page tab sequence; arrow keys move focus between tabs."
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
                'Activates the focused tab, updates activeTab, and fires the ioChange event with the tab value. Has no effect on disabled tabs.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action:
                'Activates the focused tab, updates activeTab, and fires the ioChange event with the tab value. Has no effect on disabled tabs.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-tabs uses the WAI-ARIA tab pattern. The tab list container, individual tab buttons, and consumer-provided panels each carry explicit roles and relationships."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="tablist"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the tab list wrapper
                </span>
              ),
              description:
                'Applied to the container element that wraps all tab buttons. Informs screen readers that this is a tab navigation widget. Screen readers announce the number of tabs when the user enters the group.',
            },
            {
              attribute: 'role="tab"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On each tab button
                </span>
              ),
              description:
                'Applied to every tab button element. Combined with role="tablist" on the parent, screen readers announce each button as a tab and include its position within the set (e.g. "Overview, tab, 1 of 3").',
            },
            {
              attribute: 'aria-selected',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}on active tab,{' '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                  {' '}on all others
                </span>
              ),
              description:
                'Communicates the selected state to assistive technology. Only one tab carries aria-selected="true" at a time. Screen readers announce "selected" when the user focuses the active tab.',
            },
            {
              attribute: 'aria-controls',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>
                  panel-{'{value}'}
                </span>
              ),
              description:
                'Points to the id of the associated panel element. The convention is id="panel-{value}" on the panel element. This relationship allows screen reader users to jump directly from a tab to its panel using a shortcut.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when disabled
                </span>
              ),
              description:
                'Applied to individual tab buttons when their IoTabItem has disabled: true. Using aria-disabled (rather than the HTML disabled attribute) keeps the tab button focusable so keyboard users can perceive that a tab exists but is currently unavailable.',
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
              attribute: 'role="tabpanel"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On consumer panel elements
                </span>
              ),
              description:
                'Consumers must apply role="tabpanel" to each panel element. This role, combined with the aria-controls link from the tab, gives screen reader users a complete semantic picture of the tabs widget.',
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
            note="The tablist, tab, and tabpanel roles convey structure programmatically. The active state is communicated via aria-selected, not visual styling alone."
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
            note="Tab enters the tab list on the active tab. Arrow keys move focus within the list. Tab exits to the panel. Focus order is logical and matches the visual layout."
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
            note="Each tab button has an accessible name from its label text, role='tab', aria-selected, and aria-controls. The tablist container has role='tablist'. All state changes are reflected in ARIA attributes."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building fully accessible tab interfaces with io-tabs."
        />
        <RuleCard label="Always link tabs to panels with aria-controls">
          Set{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>id=&quot;panel-{'{value}'}&quot;</code>{' '}
          on each panel element and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;tabpanel&quot;</code>{' '}
          on the panel container. This allows screen reader users to jump between a tab and its panel
          using their shortcut for associated elements.
        </RuleCard>
        <RuleCard label="Use aria-disabled rather than hiding disabled tabs">
          Disabled tabs in io-tabs use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-disabled=&quot;true&quot;</code>{' '}
          rather than the HTML{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>disabled</code>{' '}
          attribute to preserve focusability. This is intentional — if the button were not focusable,
          keyboard users would not know it exists. Consider providing a tooltip or helper text
          explaining why the tab is unavailable.
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
