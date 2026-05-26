'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoPinCodeAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Each digit slot is a focusable input. Users can navigate the entire PIN field without a pointer."
        />
        <KeyboardTable
          rows={[
            {
              key: <span>0–9</span>,
              action: 'Enters a digit in the focused slot and automatically advances focus to the next slot.',
            },
            {
              key: <Kbd>Backspace</Kbd>,
              action: 'If the focused slot has a digit, clears it. If the slot is empty, clears the previous slot and moves focus back.',
            },
            {
              key: <Kbd>Delete</Kbd>,
              action: 'Clears the focused slot without moving focus.',
            },
            {
              key: <Kbd>ArrowLeft</Kbd>,
              action: 'Moves focus to the previous digit slot without changing values.',
            },
            {
              key: <Kbd>ArrowRight</Kbd>,
              action: 'Moves focus to the next digit slot without changing values.',
            },
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus out of the component to the next focusable element in the page.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus out of the component to the previous focusable element in the page.',
            },
            {
              key: <span>Paste (Ctrl/⌘+V)</span>,
              action: 'Distributes pasted digits across slots starting from the focused slot. Non-digit characters are stripped.',
            },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-pin-code uses a group role with individual slot labels to give screen reader users clear context at every position."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="group"',
              value: 'Set on the host element',
              description: 'Groups all digit slots under a single semantic container. Screen readers announce the group label before the user enters the first slot.',
            },
            {
              attribute: 'aria-labelledby',
              value: 'References the label element ID',
              description: 'When a label prop is provided, the host group is labelled by it. Screen readers read "Enter PIN group" before announcing individual slot positions.',
            },
            {
              attribute: 'aria-label (per slot)',
              value: '"Digit N of M"',
              description: 'Each input carries its own positional label (e.g. "Digit 2 of 4"). Screen readers announce the position as users navigate with arrow keys or Tab.',
            },
            {
              attribute: 'inputMode="numeric"',
              value: 'Set on each input',
              description: 'Triggers the numeric keyboard on mobile devices. Does not restrict input on desktop — the component filters non-digits in the keydown handler.',
            },
            {
              attribute: 'autoComplete="one-time-code"',
              value: 'Set on each input',
              description: 'Allows browsers and password managers to auto-fill SMS OTP codes. Also enables iOS QuickType bar to suggest the code.',
            },
            {
              attribute: 'aria-invalid',
              value: '"true" when state=error or FACE invalid',
              description: 'Applied to each slot input when the field is in an error state. Screen readers announce "invalid entry" when the user focuses an error slot.',
            },
            {
              attribute: 'aria-required',
              value: '"true" when required=true',
              description: 'Set on the host group element. Indicates to assistive technology that the PIN field must be completed before form submission.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-pin-code is tested against WCAG 2.2 Level AA with axe-core."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The group role with aria-labelledby associates the label with all digit slots. Individual aria-label attributes on each input communicate positional information programmatically."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All slot states (default, filled, error, success, warning) meet the 4.5:1 text contrast ratio. Slot borders use --io-border-interactive for 3:1 non-text contrast compliance."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All functionality is operable via keyboard: digit entry, Backspace, Delete, ArrowLeft/Right, and paste. No operation requires a pointer device."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="Digit slots are focusable in logical left-to-right order. Auto-advance on digit entry and Backspace navigation follow the same order, preserving a predictable reading sequence."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When state=error the message prop is rendered in an aria-live alert region. Each slot receives aria-invalid=true so screen readers announce the error inline."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The host has role=group with a programmatic label. Each input has an accessible name (aria-label), a role (textbox), and reflects its current value and invalid state."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive experiences with io-pin-code."
        />
        <RuleCard label="Always provide a label">
          The label prop gives the group an accessible name. Without it, screen reader users have no context for what
          the PIN field is for. Use descriptive text like "Enter your 4-digit PIN" or "One-time code".
        </RuleCard>
        <RuleCard label="Pair error state with a message">
          Setting state=error alone changes the visual indicator but does not explain the problem. Always provide a
          message prop (e.g. "Incorrect PIN. Please try again.") so the error is announced to screen reader users.
        </RuleCard>
        <RuleCard label="Use type=password for sensitive PINs">
          Account PINs and card PINs should use type=password to mask digits on screen. OTP codes are typically
          short-lived and can use the default type=number display for easier entry.
        </RuleCard>
        <RuleCard label="Support paste for OTP flows">
          Paste distribution is built in — do not disable paste on the inputs. Users copying from SMS or authenticator
          apps rely on paste to fill all slots at once.
        </RuleCard>
      </section>

    </div>
  );
}
