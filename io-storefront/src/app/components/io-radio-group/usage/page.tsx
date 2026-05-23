'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoRadioGroupUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-radio-group provides a semantic fieldset/legend wrapper for a set of io-radio buttons, automatically managing name propagation and mutual exclusivity via a group-level change event."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>io-radio-group</C> any time you render two or more mutually exclusive <C>io-radio</C> options. The group handles name and checked state automatically.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always set both <C>label</C> and <C>name</C>. The label becomes the <C>&lt;legend&gt;</C> text, and the name is propagated to every child radio.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>value</C> prop to pre-select an option when a sensible default exists.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>helperText</C> to provide format hints or supporting guidance below the legend.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not mix <C>io-radio</C> elements from different groups inside a single <C>io-radio-group</C>. Each group should represent one question.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use <C>io-radio-group</C> when multiple options can be selected simultaneously — use <C>io-checkbox-group</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not manually set <C>name</C> on the child <C>io-radio</C> elements — <C>io-radio-group</C> propagates the name automatically and manual overrides will be overwritten.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="behaviour" className="space-y-6">
        <SectionHeader
          title="Behaviour"
          description="io-radio-group maintains the selected value and synchronises it to the child radios automatically."
        />
        <div className="space-y-3">
          <RuleCard label="Name propagation">
            On load and whenever the <C>name</C> prop changes, the group sets the <C>name</C> property on every slotted <C>io-radio</C> child. This groups the native inputs so the browser enforces mutual exclusivity and enables arrow-key navigation between options.
          </RuleCard>
          <RuleCard label="Checked state synchronisation">
            The group compares each child&rsquo;s <C>value</C> against the group <C>value</C> prop and sets <C>checked</C> accordingly. When a radio fires a <C>change</C> event the group updates its own value and re-synchronises all children.
          </RuleCard>
          <RuleCard label="Disabled propagation">
            Setting <C>disabled</C> on the group cascades to every child radio, making the entire fieldset inert. Individual radios cannot be re-enabled from within a disabled group.
          </RuleCard>
          <RuleCard label="Group-level change event">
            The <C>change</C> event is emitted by the group with <C>detail.value</C> containing the newly selected radio&rsquo;s value. Listen on the group element rather than on individual radios.
          </RuleCard>
        </div>
      </section>

      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-radio-group has three states driven by props."
        />
        <div className="space-y-3">
          <RuleCard label="Default — no pre-selection">
            All child radios are unchecked. The user must actively select an option before submitting the form.
          </RuleCard>
          <RuleCard label="Pre-selected — value set">
            One radio is checked on initial render. Use when a sensible default exists, such as the most common or recommended option.
          </RuleCard>
          <RuleCard label="Disabled — entire group unavailable">
            Set <C>disabled</C> to grey out the fieldset and block all user interaction. Use sparingly — prefer hiding unavailable options over disabling them.
          </RuleCard>
          <RuleCard label="Error — group validation failed">
            Set <C>error</C> to indicate that the group has a validation error. Pair with <C>errorMessage</C> to provide accessible error text rendered below the group.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
