'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoPopoverAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-popover is fully keyboard operable. The trigger, panel, and all slotted content are reachable via keyboard navigation."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the trigger element inside the trigger slot, opening the popover panel.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the trigger element when it is a button, opening the popover panel.',
            },
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus forward through interactive elements inside the open popover panel. Tab from the last focusable element exits the panel.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Shift</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>+</span>
                  <Kbd>Tab</Kbd>
                </span>
              ),
              action: 'Moves focus backward through interactive elements inside the panel.',
            },
            {
              key: <Kbd>Escape</Kbd>,
              action: 'Closes the open popover panel and returns focus to the trigger element.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-popover uses the dialog ARIA pattern for rich floating content. The panel is announced as a dialog when focus enters, and aria-modal prevents virtual cursor from escaping the panel while it is open."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  dialog
                </code>
              ),
              description: 'Applied to the floating panel element. Screen readers announce "dialog" when focus moves into the panel, giving users a clear signal that a new context has opened.',
            },
            {
              attribute: 'aria-modal',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  true
                </code>
              ),
              description: 'Signals to screen readers that content outside the dialog is inert while the panel is open. This prevents virtual cursor from wandering out of the popover.',
            },
            {
              attribute: 'aria-labelledby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Auto-managed when label prop is set</span>
              ),
              description: 'References the internal label span rendered when the label prop is provided. Screen readers read the label as the dialog name when focus enters the panel.',
            },
            {
              attribute: 'aria-expanded',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>true / false on trigger element</span>
              ),
              description: 'Set on the slotted trigger element to communicate the panel state. Screen readers announce the expanded state so users know whether the panel is open or closed.',
            },
            {
              attribute: 'aria-hidden',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  true
                </code>
              ),
              description: 'Applied to the panel when closed. Hides the panel contents from the accessibility tree so screen reader users do not encounter the hidden content.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-popover is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The popover panel uses role=&quot;dialog&quot; and aria-labelledby when a label prop is provided. The relationship between trigger and panel is communicated programmatically via aria-expanded."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Panel text and background colours use design tokens that maintain at least 4.5:1 contrast. The surface colour also meets 3:1 contrast against the page background."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="The popover can be fully operated by keyboard. The trigger opens the panel on Enter/Space. Escape closes it and returns focus to the trigger."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="On open, focus moves to the first focusable element inside the panel. On close, focus returns to the trigger. The focus sequence is logical and predictable."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The panel carries role=&quot;dialog&quot; and aria-modal=&quot;true&quot;. The trigger carries aria-expanded. Both are exposed correctly to the accessibility tree."
          />
          <ComplianceCard
            criterion="2.1.2"
            level="A"
            title="No Keyboard Trap"
            note="While the panel is open, Tab moves focus through focusable content inside it. Escape closes the panel and returns focus to the trigger, preventing keyboard traps."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible experiences with io-popover."
        />
        <RuleCard label="Always provide a label prop">
          The label prop renders a visible heading inside the panel and wires aria-labelledby automatically. Screen reader users hear the dialog name on entry. Without it, the dialog has no accessible name, which fails WCAG 4.1.2.
        </RuleCard>
        <RuleCard label="Use the trigger slot for the activating element">
          Place the button or control that opens the popover inside the trigger slot. This allows io-popover to manage aria-expanded and return focus correctly on close. Manually wiring open state from outside the component is unsupported.
        </RuleCard>
        <RuleCard label="Keep interactive content keyboard-accessible">
          Every link, button, or form control slotted inside the panel body must be reachable by Tab. Avoid non-interactive elements that carry click events without appropriate roles or tabindex.
        </RuleCard>
        <RuleCard label="Do not intercept Escape unless handling nested layers">
          io-popover handles Escape to close and return focus. Intercepting Escape in slotted content prevents the panel from closing, creating a keyboard trap for users who rely on Escape to exit contexts.
        </RuleCard>
      </section>

    </div>
  );
}
