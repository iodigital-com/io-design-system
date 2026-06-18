'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoSegmentedControlUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-segmented-control provides a unified bar of mutually exclusive options. Think of it as a styled radio group with a horizontal layout — one selection at a time."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>io-segmented-control</C> for switching between two to five mutually exclusive views, modes, or options where all choices fit in a single bar.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>name</C> to participate in form submission. Set <C>value</C> to pre-select a segment on load.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep segment labels short — one or two words — so the bar remains compact on mobile.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Listen for the <C>change</C> event on the control, which provides the newly selected <C>detail.value</C>.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use more than five segments. For longer lists use <C>io-radio-group</C> or <C>io-select</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use <C>io-segmented-control</C> when multiple options can be selected simultaneously — use <C>io-checkbox-group</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not nest interactive content inside <C>io-segment</C> — each segment is itself a button.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="behaviour" className="space-y-6">
        <SectionHeader
          title="Behaviour"
          description="io-segmented-control maintains the selected value and synchronises it to the child segments automatically."
        />
        <div className="space-y-3">
          <RuleCard label="Exclusive selection">
            Only one segment can be selected at a time. When a segment is activated, the parent updates its <C>value</C> prop and deselects all other segments by syncing the <C>selected</C> state on each child.
          </RuleCard>
          <RuleCard label="Roving tabindex keyboard navigation">
            Arrow keys (Left/Right) move focus and selection between segments. Home and End jump to the first or last segment. Tab moves focus out of the control entirely.
          </RuleCard>
          <RuleCard label="FACE form participation">
            When <C>name</C> is set, the selected value is submitted with the form. On form reset, the value reverts to the initial <C>value</C> prop.
          </RuleCard>
          <RuleCard label="Disabled propagation">
            Setting <C>disabled</C> on the control cascades to every child segment, making the entire bar inert.
          </RuleCard>
        </div>
      </section>

      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-segmented-control has three states driven by props."
        />
        <div className="space-y-3">
          <RuleCard label="Default — no pre-selection">
            All child segments are unselected. The first segment receives tabIndex=0 for keyboard discoverability, but no visual selected state.
          </RuleCard>
          <RuleCard label="Pre-selected — value set">
            One segment is visually selected on initial render. Use when a sensible default exists.
          </RuleCard>
          <RuleCard label="Disabled — entire control unavailable">
            Set <C>disabled</C> to grey out the bar and block all user interaction. Use sparingly — prefer hiding unavailable controls over disabling them.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
