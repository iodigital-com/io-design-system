'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard, KeyboardTable, Kbd } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoSegmentedControlAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-segmented-control uses the ARIA radio group keyboard pattern with roving tabindex. Only the selected (or first enabled) segment is in the page tab sequence."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus into the control. Focus lands on the selected segment, or the first enabled segment if none is selected. Pressing Tab again moves focus out of the control entirely.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Shift</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>+</span>
                  <Kbd>Tab</Kbd>
                </span>
              ),
              action: 'Moves focus to the previous focusable element outside the control.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Arrow Right</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>/</span>
                  <Kbd>Arrow Down</Kbd>
                </span>
              ),
              action: 'Moves focus and selection to the next enabled segment. Wraps from the last segment to the first. Disabled segments are skipped.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Arrow Left</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>/</span>
                  <Kbd>Arrow Up</Kbd>
                </span>
              ),
              action: 'Moves focus and selection to the previous enabled segment. Wraps from the first segment to the last. Disabled segments are skipped.',
            },
            {
              key: <Kbd>Home</Kbd>,
              action: 'Moves focus and selection to the first enabled segment.',
            },
            {
              key: <Kbd>End</Kbd>,
              action: 'Moves focus and selection to the last enabled segment.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Enter</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>/</span>
                  <Kbd>Space</Kbd>
                </span>
              ),
              action: 'Activates the focused segment. Has no effect on disabled segments.',
            },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-segmented-control uses role=group on the host and role=radio on each io-segment, forming an accessible radio group without a native fieldset."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>group</code>
              ),
              description: 'Set on the io-segmented-control host element. Groups all child segments as a labelled region.',
            },
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>radio</code>
              ),
              description: 'Set on each io-segment host element. Screen readers announce each segment as a radio option with its label and checked state.',
            },
            {
              attribute: 'aria-checked',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}or{' '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;false&quot;</code>
                </span>
              ),
              description: 'Set on each io-segment. Screen readers announce whether the segment is the currently selected option.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Value of the label prop</span>
              ),
              description: 'Set to the value of the label prop when it is non-empty. Omitted (not set to empty string) when label is absent so the group is not announced without a name. Always provide a label — role="group" without aria-label provides no context to screen reader users.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
              ),
              description: 'Set on the control host when disabled. Individual disabled segments also carry aria-disabled="true".',
            },
            {
              attribute: 'tabindex',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>0</code>
                  {' '}or{' '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>-1</code>
                </span>
              ),
              description: 'Roving tabindex — only the selected (or first) segment is reachable via Tab. Arrow keys navigate between segments.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-segmented-control is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="role=group programmatically associates the segments as a related set. Each segment uses role=radio with aria-checked to convey selection state."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="Arrow keys navigate and select segments via roving tabindex. Enter and Space also activate the focused segment. Tab moves focus out of the control."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Each io-segment button uses the double-ring focus pattern when focused via keyboard."
          />
          <ComplianceCard
            criterion="2.5.3"
            level="A"
            title="Label in Name"
            note="The visible label text is used as the accessible button label, satisfying the requirement that the accessible name contains the visible label."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="role=radio + aria-checked provides name, role, and value for each segment. The parent role=group provides structural context."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible segmented control experiences."
        />
        <RuleCard label="Keep labels short and descriptive">
          Each segment label should communicate the option clearly in one or two words. Avoid generic labels like &ldquo;Option 1&rdquo;.
        </RuleCard>
        <RuleCard label="Listen for the control change event, not individual segment events">
          The group-level <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>change</code> event provides the selected value from <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>detail.value</code>.
        </RuleCard>
        <RuleCard label="Use two to five options">
          More than five options makes the bar unwieldy on small screens. For longer lists, prefer io-radio-group or io-select.
        </RuleCard>
      </section>

    </div>
  );
}
