'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoButtonGroupAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-button-group implements the ARIA radiogroup and checkbox group keyboard patterns with roving tabindex. Only the focused item is in the page tab sequence."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action:
                'Moves focus into the group. Focus lands on the item at the current roving tabindex position (initially the first active item, or the first enabled item if none is active). Pressing Tab again moves focus out of the group.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Shift</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>+</span>
                  <Kbd>Tab</Kbd>
                </span>
              ),
              action: 'Moves focus to the previous focusable element outside the group.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Arrow Right</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>/</span>
                  <Kbd>Arrow Down</Kbd>
                </span>
              ),
              action:
                'Single mode: moves focus to the next enabled item AND selects it. Multiple mode: moves focus only — does not change selection. Wraps from last to first. Disabled items are skipped.',
            },
            {
              key: (
                <span className="flex items-center gap-1">
                  <Kbd>Arrow Left</Kbd>
                  <span style={{ color: 'var(--io-text-muted)' }}>/</span>
                  <Kbd>Arrow Up</Kbd>
                </span>
              ),
              action:
                'Single mode: moves focus to the previous enabled item AND selects it. Multiple mode: moves focus only. Wraps from first to last. Disabled items are skipped.',
            },
            {
              key: <Kbd>Home</Kbd>,
              action:
                'Moves focus to the first enabled item. In single mode, also selects it.',
            },
            {
              key: <Kbd>End</Kbd>,
              action:
                'Moves focus to the last enabled item. In single mode, also selects it.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action:
                'Single mode: selects the focused item. Multiple mode: toggles the focused item on/off. Has no effect on disabled items.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action:
                'Same as Space for both modes.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-button-group uses the ARIA radiogroup or group role depending on the type prop, giving screen readers the correct semantic context."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="radiogroup"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the container when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>type</code> is <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;single&quot;</code>
                </span>
              ),
              description:
                'Groups single-select items. Screen readers announce the group name and hint that only one item can be selected.',
            },
            {
              attribute: 'role="group"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the container when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>type</code> is <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;multiple&quot;</code>
                </span>
              ),
              description:
                'Groups multi-select items (checkboxes). Each item is announced individually with its checked state.',
            },
            {
              attribute: 'role="radio" + aria-checked',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On each button in single mode
                </span>
              ),
              description:
                'Each button is announced as a radio option with checked/unchecked state.',
            },
            {
              attribute: 'role="checkbox" + aria-checked',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On each button in multi-select mode
                </span>
              ),
              description:
                'Each button is announced as a checkbox with checked/unchecked state.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the container from the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop
                </span>
              ),
              description:
                'Provides the accessible name for the group. Strongly recommended — without it, screen readers cannot tell users what the group is for.',
            },
            {
              attribute: 'aria-disabled (container)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the container when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>disabled</code> is true
                </span>
              ),
              description:
                'When the entire group is disabled, aria-disabled="true" is set on the radiogroup or group container. Screen readers announce the group itself as disabled before users move focus into it.',
            },
            {
              attribute: 'aria-disabled + disabled (button)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On individual disabled buttons
                </span>
              ),
              description:
                'Both the semantic aria-disabled attribute and the native HTML disabled attribute are set. The native disabled attribute removes the button from keyboard navigation; aria-disabled signals the semantic state to AT.',
            },
            {
              attribute: 'tabindex — roving',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  tabindex=&quot;0&quot; on focused item, -1 on all others
                </span>
              ),
              description:
                'The roving tabindex pattern ensures the group is a single Tab stop. Arrow keys move focus within the group without polluting the page tab order.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-button-group is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Selection state and group relationships are communicated programmatically via radiogroup/group/radio/checkbox roles and aria-checked."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Active item background (brand blue) with white text meets the 4.5:1 contrast ratio. Inactive text on white background also meets the threshold."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All functionality is operable via keyboard. The roving tabindex plus arrow keys, Home, End, Space, and Enter support the full ARIA radiogroup and checkbox group keyboard interaction models."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="Tab enters the group on the active or first enabled item. Arrow keys move focus within the group. Tab exits to the next focusable element. Focus order matches the visual layout."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern on the focused button. Meets minimum area and contrast requirements under WCAG 2.2."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Each trigger has role=radio or role=checkbox and selection state via aria-checked. The container has role=radiogroup or role=group with an accessible name from aria-label."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible segmented controls with io-button-group."
        />
        <RuleCard label="Always provide a label on the group">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
          prop sets the accessible name on the container. Without it, screen readers have no context for the group. Use short, descriptive labels like "View period" or "Working days".
        </RuleCard>
        <RuleCard label="Do not use colour alone to indicate active state">
          The active button is distinguished by background colour and by{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-checked=&quot;true&quot;</code>.
          Both signals are required for WCAG 1.4.1 (Use of Colour) compliance.
        </RuleCard>
        <RuleCard label="Items are parsed once at load time">
          The component reads its{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-button</code>{' '}
          children once in <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>componentDidLoad</code>.
          If you need to dynamically add or remove items, recreate the component entirely rather than mutating the children list after mount.
        </RuleCard>
      </section>

    </div>
  );
}
