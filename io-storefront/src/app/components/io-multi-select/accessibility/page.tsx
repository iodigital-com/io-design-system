'use client';

import {
  SectionHeader,
  RuleCard,
  KeyboardTable,
  Kbd,
  AriaTable,
  ComplianceCard,
} from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoMultiSelectAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ──────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-multi-select follows the ARIA combobox with listbox pattern. All key bindings comply with the APG combobox authoring practices."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the trigger button. The trigger border expands and a focus ring appears.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element. If the dropdown is open, it closes first.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'When trigger is focused and dropdown is closed: opens the dropdown. When dropdown is open: toggles the focused option.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Same as Enter — opens dropdown or toggles the focused option.',
            },
            {
              key: <Kbd>↓</Kbd>,
              action: 'When closed: opens the dropdown and focuses the first enabled option. When open: moves focus to the next enabled option (wraps to top).',
            },
            {
              key: <Kbd>↑</Kbd>,
              action: 'When closed: opens the dropdown and focuses the last enabled option. When open: moves focus to the previous enabled option (wraps to bottom).',
            },
            {
              key: <Kbd>Home</Kbd>,
              action: 'Moves focus to the first enabled option in the dropdown.',
            },
            {
              key: <Kbd>End</Kbd>,
              action: 'Moves focus to the last enabled option in the dropdown.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the dropdown. Focus returns to the trigger button. The selection is unchanged.',
            },
            {
              key: <Kbd>Tab</Kbd>,
              action: 'When dropdown is open: closes the dropdown and moves focus to the next focusable element.',
            },
          ]}
        />
      </section>

      {/* ── Chip keyboard ────────────────────────────────────────── */}
      <section id="chip-keyboard" className="space-y-6">
        <SectionHeader
          title="Chip remove buttons"
          description="Each selected-value chip contains a remove button that is keyboard accessible."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus sequentially through each chip remove button before reaching the trigger.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the remove button — removes the chip value from the selection and emits a change event.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Same as Enter for button elements.',
            },
          ]}
        />
      </section>

      {/* ── ARIA attributes ──────────────────────────────────────── */}
      <section id="aria-attributes" className="space-y-6">
        <SectionHeader
          title="ARIA attributes"
          description="io-multi-select implements the ARIA 1.1 combobox pattern with role='combobox' on the trigger and role='listbox' on the dropdown."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="combobox"',
              value: 'Trigger button',
              description: 'Identifies the button as a combobox control that owns a listbox popup.',
            },
            {
              attribute: 'aria-haspopup="listbox"',
              value: 'Trigger button',
              description: 'Declares that activating the combobox opens a listbox popup.',
            },
            {
              attribute: 'aria-expanded',
              value: 'Trigger button',
              description: 'Set to "true" when the dropdown is open, "false" when closed.',
            },
            {
              attribute: 'aria-multiselectable="true"',
              value: 'Listbox',
              description: 'Declares that multiple options can be selected simultaneously. Present on the listbox, not the trigger.',
            },
            {
              attribute: 'aria-labelledby',
              value: 'Trigger button',
              description: 'Points to the label element to provide the combobox its accessible name.',
            },
            {
              attribute: 'aria-controls',
              value: 'Trigger button',
              description: 'Points to the listbox element that the combobox controls.',
            },
            {
              attribute: 'aria-activedescendant',
              value: 'Trigger button',
              description: 'Set to the id of the currently keyboard-focused option when the dropdown is open.',
            },
            {
              attribute: 'aria-required',
              value: 'Trigger button',
              description: 'Set to "true" when required=true. Communicates the constraint to assistive technology.',
            },
            {
              attribute: 'aria-invalid',
              value: 'Trigger button',
              description: 'Set to "true" when state="error" or when the FACE internals flag the field as invalid.',
            },
            {
              attribute: 'aria-describedby',
              value: 'Trigger button',
              description: 'Points to the message element when a message is present, providing additional context.',
            },
            {
              attribute: 'role="listbox"',
              value: 'Dropdown list',
              description: 'Identifies the dropdown as a listbox containing selectable options.',
            },
            {
              attribute: 'role="option"',
              value: 'Each option item',
              description: 'Identifies each list item as a selectable option within the listbox.',
            },
            {
              attribute: 'aria-selected',
              value: 'Each option item',
              description: 'Set to "true" when the option is in the current value array, "false" otherwise.',
            },
            {
              attribute: 'aria-disabled',
              value: 'Disabled option',
              description: 'Set to "true" for options where disabled=true.',
            },
            {
              attribute: 'aria-label="Remove {label}"',
              value: 'Chip remove button',
              description: 'Provides an accessible name for each chip removal action.',
            },
          ]}
        />
      </section>

      {/* ── WCAG compliance ──────────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.1 AA compliance"
          description="io-multi-select is designed to meet WCAG 2.1 Level AA requirements."
        />
        <div className="space-y-3">
          <ComplianceCard
            criterion="1.3.1 Info and Relationships"
            level="A"
            title="Role and state relationships communicated via ARIA"
            note="role='combobox', 'listbox', 'option', aria-selected, aria-expanded and aria-multiselectable are all set correctly."
          />
          <ComplianceCard
            criterion="1.4.1 Use of Color"
            level="A"
            title="Selected state indicated by both color and checkmark icon"
            note="The checkbox indicator uses a visual check icon — not color alone."
          />
          <ComplianceCard
            criterion="1.4.11 Non-text Contrast"
            level="AA"
            title="Option checkbox borders use --io-border-interactive"
            note="--io-border-interactive is #767676 (4.57:1 vs white), meeting the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.1.1 Keyboard"
            level="A"
            title="All interactive elements are fully keyboard operable"
            note="Trigger, options, chip remove buttons, and clear all button are all keyboard accessible."
          />
          <ComplianceCard
            criterion="2.4.7 Focus Visible"
            level="AA"
            title="All focusable elements render the io focus ring on keyboard focus"
            note="Uses var(--io-focus-ring-active) on trigger, chip remove buttons, and the clear all button."
          />
          <ComplianceCard
            criterion="3.3.1 Error Identification"
            level="A"
            title="Error state includes aria-invalid and a visible alert message"
            note="When faceInvalid or state='error', aria-invalid='true' is set and a visible message with role='alert' is rendered."
          />
          <ComplianceCard
            criterion="4.1.2 Name, Role, Value"
            level="A"
            title="Combobox has accessible name via aria-labelledby"
            note="State (expanded, selected, required) is programmatically exposed through ARIA attributes."
          />
        </div>
      </section>

      {/* ── Screen reader notes ───────────────────────────────────── */}
      <section id="screen-reader" className="space-y-6">
        <SectionHeader
          title="Screen reader notes"
          description="io-multi-select has been designed for compatibility with VoiceOver (macOS/iOS), NVDA (Windows), and JAWS (Windows)."
        />
        <div className="space-y-3">
          <RuleCard label="VoiceOver + Safari">
            The combobox announces as &ldquo;Countries, collapsed, pop-up button&rdquo; when closed and &ldquo;expanded&rdquo; when open. Selected options announce &ldquo;Netherlands, checked, 1 of 7&rdquo;.
          </RuleCard>
          <RuleCard label="NVDA + Firefox / Chrome">
            NVDA reads the trigger as &ldquo;Countries combo box, collapsed&rdquo;. On expansion, it reads the focused option and its checked state.
          </RuleCard>
          <RuleCard label="Chip removal">
            Each remove button announces as &ldquo;Remove Netherlands, button&rdquo; giving clear context for the action.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
