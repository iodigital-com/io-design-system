'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoTableAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Sortable column headers are keyboard-accessible via Tab. Row checkboxes follow standard checkbox keyboard behaviour."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus through sortable column headers and row checkboxes.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the focused column header — triggers sort.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the focused column header — triggers sort. Toggles focused checkbox state.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-table uses semantic HTML table elements with appropriate ARIA attributes."
        />
        <AriaTable
          rows={[
            {
              attribute: 'caption',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Value of the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>caption</code> prop
                </span>
              ),
              description: 'The HTML <caption> element provides the accessible name for the table. Always provide a caption — omitting it forces screen reader users to deduce the table\'s purpose from its content.',
            },
            {
              attribute: 'aria-sort',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  ascending | descending
                </code>
              ),
              description: 'Applied to the currently sorted column header. Screen readers announce "sorted ascending" or "sorted descending" when focus reaches the header.',
            },
            {
              attribute: 'scope="col"',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  col
                </code>
              ),
              description: 'Applied to every <th> element. Associates the header with its column so screen readers correctly announce header + cell value pairs.',
            },
            {
              attribute: 'aria-selected',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  true | false (selectable only)
                </code>
              ),
              description: 'Applied to every <tr> when selectable is true. Communicates the checked state of each row to screen readers independently of the checkbox.',
            },
            {
              attribute: 'aria-label (checkboxes)',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;Select all rows&quot;</code>
                  {' / '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;Select row N&quot;</code>
                </span>
              ),
              description: 'Descriptive labels on the select-all and per-row checkboxes. Without these labels the checkboxes would have no accessible name.',
            },
            {
              attribute: 'role="region"',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  region
                </code>
              ),
              description: 'Applied to the scroll wrapper. Combined with aria-label (from caption), it creates a landmark so screen reader users can navigate directly to the table.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-table is designed to meet WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Semantic <table>, <thead>, <tbody>, <th scope='col'>, and <caption> elements communicate structure to assistive technologies."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Cell text and header text use the --io-text-primary and --io-text-secondary tokens, which meet the 4.5:1 ratio against --io-bg-surface."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="Sortable column headers are focusable and activatable via Enter or Space. Checkboxes are natively keyboard-accessible."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="Tab order follows the natural reading order: select-all checkbox → column headers → row checkboxes → row cells."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="All interactive elements (sortable headers, checkboxes) have accessible names and roles. aria-sort communicates the current sort state."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive data table experiences."
        />
        <RuleCard label="Always provide a caption">
          The caption is the primary accessible name for the table. Use captionHidden only when
          a visible heading immediately above the table already identifies the data set clearly.
        </RuleCard>
        <RuleCard label="Keep column labels concise and descriptive">
          Screen readers announce the column header before each cell value as the user navigates.
          Verbose headers slow navigation significantly — prefer short, unambiguous labels.
        </RuleCard>
        <RuleCard label="Announce bulk-selection count">
          When using selectable, add an <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live=&quot;polite&quot;</code>{' '}
          region that updates with the count of selected rows (e.g. &ldquo;3 rows selected&rdquo;). This ensures
          screen reader users are aware of the current selection state.
        </RuleCard>
        <RuleCard label="Test in your target screen readers">
          Table navigation varies between VoiceOver, NVDA, and JAWS. Test with at least two
          screen readers — particularly sortable column announcement and row selection state.
        </RuleCard>
      </section>

    </div>
  );
}
