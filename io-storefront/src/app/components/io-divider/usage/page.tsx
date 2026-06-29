'use client';

import { SectionHeader, RuleCard } from '@/components/usage/UsagePrimitives';

export default function IoDividerUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use io-divider to create visual separation between unrelated or loosely related sections of content."
        />
        <RuleCard label="Use to separate form sections">
          Long forms benefit from a horizontal divider between distinct groups of fields (e.g., personal
          info vs. address vs. payment). Pair with a section heading above the divider for clearest structure.
        </RuleCard>
        <RuleCard label="Use the labeled variant for alternative action separators">
          The labeled variant (e.g., &quot;or&quot;, &quot;or continue with&quot;) is appropriate when two blocks of content
          represent alternative paths — such as a login form followed by social sign-in buttons.
        </RuleCard>
        <RuleCard label="Use the vertical variant in toolbar-style horizontal layouts">
          A vertical divider in a flex row creates a visual break between grouped icon buttons, navigation items,
          or toolbar actions without consuming much horizontal space.
        </RuleCard>
      </section>

      <section id="when-not-to-use" className="space-y-6">
        <SectionHeader
          title="When not to use"
          description="Dividers should be used sparingly. Overuse creates visual noise and weakens the signal."
        />
        <RuleCard label="Do not use to separate every item in a list">
          For lists of items, use spacing alone (margin/padding) rather than a divider between each entry.
          Reserve dividers for structural separation between significantly different sections.
        </RuleCard>
        <RuleCard label="Do not use as a decorative element">
          Dividers carry semantic meaning (role=separator). Do not add them purely for decoration or to fill
          vertical space — use padding and background colours instead.
        </RuleCard>
      </section>

      <section id="prop-interactions" className="space-y-6">
        <SectionHeader
          title="Prop interactions"
          description="Notes on how props interact when used together."
        />
        <RuleCard label="label overrides both visual layout and ARIA orientation">
          When <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
          is set, the component always renders a horizontal flex row with the label text centered between two lines — regardless of the{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>orientation</code>{' '}
          prop value. Because the visual layout is always horizontal,{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-orientation</code>{' '}
          is also always set to <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;horizontal&quot;</code>{' '}
          on the labeled wrapper — the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>orientation</code>{' '}
          prop has no effect when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
          is present.
        </RuleCard>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Guidelines for the labeled variant."
        />
        <RuleCard label="Keep labels very short">
          The label in the labeled variant should be one to three words at most. Long labels break the visual
          symmetry of the two flanking lines and may overflow on narrow viewports.
        </RuleCard>
        <RuleCard label="Use lowercase for conjunction labels">
          Labels like &quot;or&quot;, &quot;and&quot;, and &quot;then&quot; should be lowercase. Sentence-case or title-case labels are
          reserved for date headings or structural section labels.
        </RuleCard>
      </section>

    </div>
  );
}
