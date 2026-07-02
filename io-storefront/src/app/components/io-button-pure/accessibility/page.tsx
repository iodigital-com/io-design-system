'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoButtonPureAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-button-pure follows standard button and link keyboard interaction patterns."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the button. Disabled buttons are removed from the tab sequence.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the button. For anchor mode, navigates to the href.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the button (button mode only). In anchor mode, Space scrolls the page.',
            },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-button-pure renders a native <button> or <a> element with no ARIA roles added."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Implicit <code style={{ fontFamily: 'monospace' }}>button</code> or <code style={{ fontFamily: 'monospace' }}>link</code>
                </span>
              ),
              description: 'Renders as <button> by default, or <a> when href is provided. Both carry their native semantic role — no ARIA role override is needed.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>
                  From label prop
                </span>
              ),
              description: 'Set the label prop for icon-only buttons where no visible text provides the accessible name. Required for WCAG 4.1.2.',
            },
            {
              attribute: 'disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>
                  Native disabled (button) or aria-disabled (anchor)
                </span>
              ),
              description: 'In button mode, the native disabled attribute removes the button from the tab order and prevents activation. In anchor mode, aria-disabled is set and href is cleared.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-button-pure is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="The component is fully operable via keyboard. Enter and Space activate the button. Tab and Shift+Tab navigate through the focus order."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The default colour token --io-color-primary (#0000D2) achieves the required 4.5:1 contrast ratio against white backgrounds."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Renders as native <button> or <a>. Use the label prop for icon-only buttons to provide an accessible name."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus ring applied via var(--io-focus-ring-active) on :focus-visible. Only shown in keyboard navigation mode."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for accessible io-button-pure usage."
        />
        <RuleCard label="Always provide an accessible name for icon-only buttons">
          Set the <code style={{ fontFamily: 'monospace' }}>label</code> prop when there is no visible text inside the button.
          Without a name, screen reader users cannot determine what the button does.
        </RuleCard>
        <RuleCard label="Use anchor mode for navigation, button mode for actions">
          Set <code style={{ fontFamily: 'monospace' }}>href</code> when the control navigates to a new URL.
          Leave href unset for in-page actions (show/hide, filter, expand).
          Mixing roles confuses screen reader users who depend on the semantic difference.
        </RuleCard>
        <RuleCard label="Respect the active prop — not just colour">
          When marking a button as active in a navigation list, combine the <code style={{ fontFamily: 'monospace' }}>active</code> prop
          with an <code style={{ fontFamily: 'monospace' }}>aria-current=&quot;page&quot;</code> or <code style={{ fontFamily: 'monospace' }}>aria-selected=&quot;true&quot;</code> attribute on the host element
          so screen readers can announce the current selection state.
        </RuleCard>
      </section>

    </div>
  );
}
