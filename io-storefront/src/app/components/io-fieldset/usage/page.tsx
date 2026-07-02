'use client';

import { SectionHeader, RuleCard } from '@/components/usage/UsagePrimitives';

export default function IoFieldsetUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use io-fieldset to group heterogeneous form controls or content sections under a shared accessible legend."
        />
        <RuleCard label="Use to group mixed controls that share a common purpose">
          When a form section contains a mix of input types (e.g.{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-input</code>{' '}
          +{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-checkbox</code>),
          wrap them in io-fieldset with a descriptive legend so assistive technology announces the group context.
        </RuleCard>
        <RuleCard label="Use when io-checkbox-group or io-radio-group do not fit">
          io-checkbox-group and io-radio-group manage same-type children automatically.
          io-fieldset is the general-purpose alternative when your grouped controls are heterogeneous
          or when you need full ARIA control (e.g. <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria.role=&quot;radiogroup&quot;</code>).
        </RuleCard>
        <RuleCard label="Use with the error prop to communicate group-level validation">
          When a group of controls fails validation as a whole (e.g. &quot;At least one item must be selected&quot;),
          set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          and <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          on io-fieldset. The error text is linked via <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-describedby</code>.
        </RuleCard>
      </section>

      <section id="when-not-to-use" className="space-y-6">
        <SectionHeader
          title="When not to use"
          description="io-fieldset is generic — prefer the specialised group components when available."
        />
        <RuleCard label="Do not use for homogeneous checkbox groups">
          Use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-checkbox-group</code>{' '}
          when all controls are io-checkbox items sharing the same name. It propagates name/disabled/required automatically.
        </RuleCard>
        <RuleCard label="Do not use for radio button groups">
          Use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-radio-group</code>{' '}
          for mutually exclusive radio selections. io-radio-group handles form association, keyboard navigation, and mutual exclusion.
        </RuleCard>
        <RuleCard label="Do not use as a visual card or container">
          io-fieldset is a semantic grouping primitive. For visual card layouts, use background tokens and spacing utilities directly — the fieldset border would add incorrect semantic meaning.
        </RuleCard>
      </section>

      <section id="prop-interactions" className="space-y-6">
        <SectionHeader
          title="Prop interactions"
          description="Notes on how props interact when used together."
        />
        <RuleCard label="error=true without errorMessage — styling only">
          Setting <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          without <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          applies error styling (legend color, error border) but does not render an error text node or set aria-describedby.
          Use this when the error text is managed externally.
        </RuleCard>
        <RuleCard label="aria prop for role override">
          Pass <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'{ role: \'radiogroup\' }'}</code>{' '}
          via the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria</code>{' '}
          prop when the fieldset semantics should be a radiogroup for AT. Keys are normalised: bare names get <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-</code> prepended automatically (except <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role</code>).
        </RuleCard>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Guidelines for the label (legend) text."
        />
        <RuleCard label="Keep legends short and descriptive">
          The legend is the accessible name for the entire group. Screen readers announce it before each child control.
          Aim for 2–5 words that clearly identify what the group represents.
        </RuleCard>
        <RuleCard label="Required indicator is decorative only">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code>{' '}
          prop renders a <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>*</code>{' '}
          with <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-hidden=&quot;true&quot;</code>.
          Ensure the required nature of each child control is also communicated via the child&apos;s own{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code>{' '}
          prop — io-fieldset does NOT propagate required to children.
        </RuleCard>
      </section>

    </div>
  );
}
