'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSelectAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard — native select ──────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction — native select"
          description="When custom is false (default), io-select uses a native select element. All native keyboard behaviours of the underlying select are preserved — including platform-specific OS dropdown behaviour."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the select. The border expands to 5px in the accent colour and the label floats.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Alt</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>↓</Kbd></span>,
              action: 'Opens the native dropdown on Windows/Linux. On macOS, the dropdown opens via Space or click.',
            },
            {
              key: <Kbd>↑</Kbd>,
              action: 'Selects the previous option. On some platforms, cycles through options without opening the dropdown.',
            },
            {
              key: <Kbd>↓</Kbd>,
              action: 'Selects the next option. Fires change with the newly selected value.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Confirms the selection and closes the dropdown (when open). Submits the parent form if outside a dropdown context.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the dropdown without changing the selection (when open).',
            },
          ]}
        />
      </section>

      {/* ── Keyboard — combobox (custom=true) ────────────────────── */}
      <section id="keyboard-interaction-combobox" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction — combobox (custom=true)"
          description="When custom is true, io-select renders a fully accessible ARIA combobox with explicit keyboard management. All key bindings follow the APG combobox pattern."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the combobox trigger button. If the dropdown is open, Tab closes it first.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>↓</Kbd></span>,
              action: 'Opens the dropdown when the trigger has focus. ArrowDown also sets the first option as active.',
            },
            {
              key: <Kbd>↑</Kbd>,
              action: 'Opens the dropdown and sets the last option as active.',
            },
            {
              key: <Kbd>↓</Kbd>,
              action: 'Moves focus to the next option in the dropdown (wraps to first).',
            },
            {
              key: <Kbd>↑</Kbd>,
              action: 'Moves focus to the previous option in the dropdown (wraps to last).',
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
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd><span style={{ color: 'var(--io-text-muted)' }}>(open)</span></span>,
              action: 'Selects the currently active option. In single mode, closes the dropdown. In multiple mode, toggles the option and keeps the dropdown open.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the dropdown and returns focus to the trigger. Does not change the selection.',
            },
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Closes the dropdown when open.',
            },
          ]}
        />
        <SectionHeader
          title="Filter input keyboard (filter=true)"
          description="When filter is true, the dropdown opens with focus on the search input. Additional key bindings apply from the filter input."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>↓</Kbd>,
              action: 'Moves focus to the first option in the filtered list.',
            },
            {
              key: <Kbd>↑</Kbd>,
              action: 'Moves focus to the last option in the filtered list.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Selects the currently active option in the filtered list.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the dropdown and returns focus to the trigger.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour — native ─────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour — native select"
          description="The default (custom=false) mode uses native HTML semantics. The label is associated programmatically via htmlFor/id — no ARIA role override is needed."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>listbox</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native select element carries an implicit role of listbox. Screen readers handle option announcement and selection state automatically.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via htmlFor / id</span>
              ),
              description: 'The label element is associated to the select using a generated id pair. Screen readers announce the label text as the accessible name.',
            },
            {
              attribute: 'aria-invalid',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when error
                </span>
              ),
              description: 'Set to "true" when the error prop is true. Screen readers announce the field as invalid, and the error message (role="alert") is announced immediately.',
            },
            {
              attribute: 'aria-required',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via native required</span>
              ),
              description: 'The native required attribute is passed directly to the select element. Assistive technologies treat this as aria-required="true".',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour — combobox ───────────────────── */}
      <section id="screen-reader-behaviour-combobox" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour — combobox (custom=true)"
          description="The combobox mode uses explicit ARIA roles and live attributes to communicate state to assistive technologies. All attribute values are synchronised in real time."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="combobox"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Trigger button</span>
              ),
              description: 'The trigger button carries role="combobox". Screen readers announce it as an expandable combobox control.',
            },
            {
              attribute: 'aria-haspopup',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;listbox&quot;</code>
              ),
              description: 'Set on the trigger. Announces that activating the button opens a listbox popup.',
            },
            {
              attribute: 'aria-expanded',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}/ <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                </span>
              ),
              description: 'Reflects the open/closed state of the dropdown in real time. Screen readers announce "expanded" or "collapsed" as the user opens and closes the listbox.',
            },
            {
              attribute: 'aria-controls',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>→ listbox id</span>
              ),
              description: 'Links the trigger to the listbox element. Screen readers use this to locate the popup and navigate its options.',
            },
            {
              attribute: 'aria-activedescendant',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>→ active option id</span>
              ),
              description: 'Points to the id of the currently focused option. Screen readers announce the active option label as keyboard focus moves through the list.',
            },
            {
              attribute: 'aria-labelledby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>→ label id</span>
              ),
              description: 'Links the trigger to the visible label element. Screen readers announce the label as the accessible name of the combobox.',
            },
            {
              attribute: 'role="listbox"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Option list (ul)</span>
              ),
              description: 'The dropdown list carries role="listbox". Screen readers treat it as a selection container.',
            },
            {
              attribute: 'aria-multiselectable',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
              ),
              description: 'Set on the listbox when multiple=true. Screen readers announce that multiple options can be selected simultaneously.',
            },
            {
              attribute: 'role="option"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Each option (li)</span>
              ),
              description: 'Each list item carries role="option". Screen readers announce each item as a selectable option in the listbox.',
            },
            {
              attribute: 'aria-selected',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}/ <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                </span>
              ),
              description: 'Reflects the selection state of each option. Screen readers announce "selected" or "not selected" when focus moves to an option.',
            },
            {
              attribute: 'aria-checked',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Multiple mode only</span>
              ),
              description: 'Set on each option when multiple=true. Provides a checked/unchecked state signal alongside aria-selected for screen readers that distinguish selection from checked state.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
              ),
              description: 'Set on individual options when disabled=true on that option. Screen readers announce the option as unavailable. Disabled options are skipped during keyboard navigation.',
            },
            {
              attribute: 'aria-autocomplete="list"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Filter input (filter=true)</span>
              ),
              description: 'Set on the filter text input when filter=true. Announces to screen readers that typing narrows the list of available options.',
            },
            {
              attribute: 'aria-label="Filter options"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Filter input (filter=true)</span>
              ),
              description: 'Provides an accessible name for the search input independent of the combobox label.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-select is tested against WCAG 2.2 Level AA across both native and combobox modes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The label is programmatically associated with the field. In native mode via htmlFor/id; in combobox mode via aria-labelledby. The error message is linked via aria-describedby. Structure is conveyed through HTML semantics and explicit ARIA roles."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Selected option text meets 4.5:1 against the field background. The floating label in accent colour meets 4.5:1. The border meets the 3:1 non-text contrast requirement."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="The combobox is fully operable by keyboard. All options are reachable via ArrowUp/ArrowDown. Home and End jump to list boundaries. Escape closes the dropdown and returns focus to the trigger."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the border expanding from 1px to 5px in the accent colour. This provides a clear, high-contrast focus indicator that meets WCAG 2.2 minimum area requirements."
          />
          <ComplianceCard
            criterion="3.3.1"
            level="A"
            title="Error Identification"
            note="When error=true and errorMessage is set, the error text renders with role='alert'. The visual indicator (red border, red label) is always paired with descriptive text."
          />
          <ComplianceCard
            criterion="3.3.2"
            level="A"
            title="Labels or Instructions"
            note="The label prop is required — the component will not render without it. helperText provides additional context. Placeholder is never used as a label substitute."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible form experiences with io-select."
        />
        <RuleCard label="Always pair error with errorMessage">
          Setting{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          shows a red border with no textual explanation. Screen reader users receive no feedback. Always provide a specific, actionable message.
        </RuleCard>
        <RuleCard label="Validate on blur, not on every change">
          Showing errors while the user is still cycling through options is disorienting. Trigger validation on the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>blur</code>{' '}
          event or on form submit, not on every{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>change</code>.
        </RuleCard>
        <RuleCard label="Use custom=true when filtering or multi-select is needed">
          The native select element does not support search filtering or a consistent multi-select UX across operating systems. Use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>custom</code>{' '}
          to switch to the fully accessible ARIA combobox before enabling{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>multiple</code>{' '}
          or{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>filter</code>.
        </RuleCard>
        <RuleCard label="Do not disable individual options as category headers">
          Disabled options with no value are sometimes used as visual group separators. This pattern is not accessible — use native optgroup elements in the select markup for grouping, or restructure the options to avoid nesting.
        </RuleCard>
        <RuleCard label="Pre-select a sensible default when possible">
          A pre-selected value reduces the number of required interactions. If a default makes sense — for example, defaulting to the user&apos;s locale for &ldquo;Country&rdquo; — set it via the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>value</code>{' '}
          prop. This is especially helpful for users with motor impairments.
        </RuleCard>
        <RuleCard label="Choose size for context and touch targets">
          Use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;lg&quot;</code> where touch interaction is primary to improve target size and reduce selection errors.
        </RuleCard>
      </section>

    </div>
  );
}
