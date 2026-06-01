'use client';

import { SectionHeader, RuleCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoButtonGroupUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Button groups are best for selecting from a compact set of mutually exclusive or independently toggleable options where the choices are always visible."
        />
        <RuleCard label="Use for a small, finite set of options (2–6 items)">
          Button groups work best when all options are visible simultaneously. For longer lists, prefer
          a <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-select</code> or a group of radio buttons.
        </RuleCard>
        <RuleCard label="Use single mode for single-select filters">
          When only one option can be active at a time (e.g., a date-range picker: Day / Week / Month),
          set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>type="single"</code>.
          This maps to the ARIA radiogroup pattern, which is the correct semantic choice.
        </RuleCard>
        <RuleCard label="Use multiple mode for independent toggles">
          When multiple options can be active simultaneously (e.g., weekday filters), set{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>type="multiple"</code>.
          This maps to the ARIA group/checkbox pattern.
        </RuleCard>
      </section>

      <section id="when-not-to-use" className="space-y-6">
        <SectionHeader
          title="When not to use"
          description="Avoid button groups in situations where they create cognitive or visual overload."
        />
        <RuleCard label="Do not use for navigation">
          For page or section navigation, use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-tabs</code>.
          Button groups communicate selection state; tabs communicate navigation to related panels.
        </RuleCard>
        <RuleCard label="Do not use for more than 6 items">
          Large sets of options are better served by a dropdown select, checkbox list, or a combobox.
          A horizontal button group with many items will overflow on small viewports.
        </RuleCard>
        <RuleCard label="Do not mix single and multiple selection styles in one group">
          Each group should have a single, consistent selection model. Mixing the two patterns
          creates semantic ambiguity for assistive technology users.
        </RuleCard>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Labels within a button group should be short, parallel, and mutually intelligible."
        />
        <RuleCard label="Keep labels concise">
          Single words or very short phrases work best (Day, Week, Month). Avoid sentences or phrases
          longer than three words — they make the group too wide and harder to scan.
        </RuleCard>
        <RuleCard label="Always provide an aria-label on the group">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
          prop sets <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>{' '}
          on the container. Without it, screen readers announce the group without context. Example:
          "View period", "Working days", "Sort order".
        </RuleCard>
      </section>

    </div>
  );
}
