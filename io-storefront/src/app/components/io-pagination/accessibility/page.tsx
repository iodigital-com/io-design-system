'use client';

import { AriaTable, ComplianceCard, Kbd, KeyboardTable, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoPaginationAccessibilityPage() {
  return (
    <div className="space-y-16">
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Pagination is fully button-based. Users can move focus between controls and activate the focused item."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Move focus between previous button, page number buttons, and next button.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd></span>,
              action: 'Activate the focused pagination button.',
            },
            {
              key: 'No arrow key navigation',
              action: 'Each button participates in normal tab order. Arrow keys are not used for roving focus.',
            },
          ]}
        />
      </section>

      <section id="aria" className="space-y-6">
        <SectionHeader
          title="ARIA"
          description="Pagination exposes semantic landmarks and active state metadata so assistive technologies can announce context and position."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-label',
              value: '<nav>: "Pagination"',
              description: 'Identifies the pagination landmark in the page region list.',
            },
            {
              attribute: 'aria-label',
              value: '<button> numbers: "Page N"',
              description: 'Provides an accessible name for each numeric page button.',
            },
            {
              attribute: 'aria-current',
              value: '<button> active page: "page"',
              description: 'Marks the active page in the current set.',
            },
            {
              attribute: 'aria-label',
              value: '<button> prev/next: configurable',
              description: 'Previous and next labels come from prev-label and next-label props.',
            },
            {
              attribute: 'disabled',
              value: '<button> prev/next at boundaries',
              description: 'Prevents impossible navigation at first and last page.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG compliance"
          description="The pagination interaction model and semantics align with WCAG A-level requirements for navigation controls."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The nav landmark and aria-current=page communicate structure and current position programmatically."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All pagination controls are native buttons and fully keyboard-operable."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="Focus follows reading order from previous to numbered pages to next."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="All controls expose accessible names and active state is announced via aria-current."
          />
        </div>
      </section>

      <section id="notes" className="space-y-4">
        <RuleCard label="Accessible labels are required">
          If you override <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>prev-label</code> or <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>next-label</code>, keep labels action-oriented and page-specific.
        </RuleCard>
      </section>
    </div>
  );
}
