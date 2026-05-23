'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoCheckboxGroupUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-checkbox-group provides a semantic fieldset/legend wrapper for a set of io-checkbox elements, automatically managing name propagation and emitting a group-level change event with all currently checked values."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>io-checkbox-group</C> any time you present two or more independent <C>io-checkbox</C> options that belong to the same question.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always set both <C>label</C> and <C>name</C>. The label becomes the <C>&lt;legend&gt;</C> text and the name is propagated to every child checkbox.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Pre-check individual options by setting <C>checked</C> directly on the child <C>io-checkbox</C> elements where a sensible default exists.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>helperText</C> to provide group-level instructions or constraints, such as &ldquo;Select all that apply&rdquo;.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use <C>io-checkbox-group</C> for mutually exclusive selections — use <C>io-radio-group</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not manually set <C>name</C> on child <C>io-checkbox</C> elements — <C>io-checkbox-group</C> propagates the name automatically.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use a single <C>io-checkbox</C> inside <C>io-checkbox-group</C> for a lone boolean toggle. A bare <C>io-checkbox</C> or <C>io-form-field</C> is more appropriate.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="behaviour" className="space-y-6">
        <SectionHeader
          title="Behaviour"
          description="io-checkbox-group acts as an orchestrator — it does not maintain checked state itself but reads it from the children on each change event."
        />
        <div className="space-y-3">
          <RuleCard label="Name propagation">
            On load and whenever the <C>name</C> prop changes, the group sets the <C>name</C> property on every slotted <C>io-checkbox</C> child. This groups them semantically in form submissions.
          </RuleCard>
          <RuleCard label="Checked state is owned by children">
            Unlike <C>io-radio-group</C>, the checkbox group does not control the checked state of its children. Each <C>io-checkbox</C> manages its own <C>checked</C> state internally. The group only reads the current checked values when emitting the change event.
          </RuleCard>
          <RuleCard label="Disabled propagation">
            Setting <C>disabled</C> on the group cascades to all child checkboxes, making the entire fieldset inert. Individual checkboxes cannot be re-enabled from within a disabled group.
          </RuleCard>
          <RuleCard label="Group-level change event">
            The <C>change</C> event emitted by the group contains <C>detail.checkedValues</C> — an array of all currently checked option values. Listen on the group element rather than on individual checkboxes.
          </RuleCard>
        </div>
      </section>

      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-checkbox-group has three states driven by props."
        />
        <div className="space-y-3">
          <RuleCard label="Default — no pre-selection">
            All child checkboxes are unchecked. The user selects zero or more options.
          </RuleCard>
          <RuleCard label="Pre-checked — children have checked set">
            One or more <C>io-checkbox</C> children have <C>checked=true</C> set directly. Use when sensible defaults exist.
          </RuleCard>
          <RuleCard label="Disabled — entire group unavailable">
            Set <C>disabled</C> to grey out the fieldset and block all user interaction. Use sparingly — prefer showing unavailable groups as read-only where possible.
          </RuleCard>
          <RuleCard label="Error — group validation failed">
            Set <C>error</C> to indicate that the group has a validation error. Pair with <C>errorMessage</C> to provide accessible error text rendered below the group.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
