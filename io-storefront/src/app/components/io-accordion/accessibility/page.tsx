'use client';

import { AriaTable, ComplianceCard, Kbd, KeyboardTable, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoAccordionAccessibilityPage() {
  return (
    <div className="space-y-16">
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Accordion triggers are native buttons and support disclosure toggling from keyboard input."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Move focus to the next trigger button.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Move focus to the previous trigger button.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd></span>,
              action: 'Toggle the focused panel open or closed.',
            },
          ]}
        />
      </section>

      <section id="aria" className="space-y-6">
        <SectionHeader
          title="ARIA"
          description="Accordion exposes explicit relationships between trigger buttons and associated panel regions."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-expanded',
              value: '<button>: "true" or "false"',
              description: 'Current open or closed state of the panel controlled by that trigger.',
            },
            {
              attribute: 'aria-controls',
              value: '<button>: panel element ID',
              description: 'Links trigger button to its corresponding panel element.',
            },
            {
              attribute: 'role',
              value: '<div> panel: "region"',
              description: 'Identifies panel content as a landmark region.',
            },
            {
              attribute: 'aria-labelledby',
              value: '<div> panel: trigger button ID',
              description: 'Associates panel region with its trigger label.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG compliance"
          description="Accordion implementation supports disclosure widget accessibility expectations, with one known semantic caveat noted below."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="aria-expanded, aria-controls, role=region, and aria-labelledby expose structure programmatically."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All triggers are keyboard-operable using Enter and Space."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Trigger buttons display a visible focus ring via var(--io-focus-ring-active)."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Interactive elements expose accessible names, roles, and state values to assistive technologies."
          />
        </div>
      </section>

      <section id="known-limitation" className="space-y-4">
        <RuleCard label="Known limitation">
          Arrow key navigation (Up/Down between triggers) is not implemented. This is acceptable for disclosure patterns but can be considered for future keyboard-heavy interfaces. Also, collapsed panel regions are visually hidden and should be verified with assistive technologies if stricter disclosure semantics are required.
        </RuleCard>
      </section>
    </div>
  );
}
