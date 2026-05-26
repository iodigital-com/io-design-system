'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoMultiSelectUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-multi-select is a dedicated multi-value selection control. Use it when users need to pick multiple items from a list within a compact dropdown interface."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use when users need to select multiple items from a medium to large option set — e.g. countries, tags, team members.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>filter</C> when the list has more than 7 options to help users find items quickly.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always set both <C>label</C> and <C>name</C>. The label provides the accessible name; name is required for FACE form submission.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>state=&apos;error&apos;</C> with a descriptive <C>message</C> to communicate validation failures after form submission.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for single-value selection — use <C>io-select</C> instead for a simpler interface.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for very small option sets of 3 or fewer — a <C>io-checkbox-group</C> is more scannable in that case.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show error state before the user has interacted or before form submission.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Nest io-multi-select inside another dropdown or popover — this creates layered focus traps.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Selected value display ───────────────────────────────── */}
      <section id="chips" className="space-y-6">
        <SectionHeader
          title="Selected value chips"
          description="Each selected value is shown as a removable chip above the trigger line. Chips provide visual confirmation and direct removal without reopening the dropdown."
        />
        <div className="space-y-3">
          <RuleCard label="Single selection">
            One chip appears. The trigger line displays the option label.
          </RuleCard>
          <RuleCard label="Multiple selections — under maxDisplay">
            Chips appear for each selected value. Use <C>maxDisplay</C> (default 3) to control when the trigger collapses to a count.
          </RuleCard>
          <RuleCard label="Many selections — over maxDisplay">
            The trigger collapses to &ldquo;N selected&rdquo; to avoid overflow. Chips still show all selected values.
          </RuleCard>
          <RuleCard label="Chip removal">
            Each chip has an accessible remove button labelled &ldquo;Remove {'{'}label{'}'}&rdquo;. Clicking removes only that value. The dropdown stays closed.
          </RuleCard>
          <RuleCard label="Clear all">
            A &ldquo;Clear all&rdquo; button appears in the dropdown footer when any values are selected. This emits a <C>change</C> event with an empty array.
          </RuleCard>
        </div>
      </section>

      {/* ── Filter ───────────────────────────────────────────────── */}
      <section id="filter" className="space-y-6">
        <SectionHeader
          title="Search filter"
          description="Enable filter to add a search input at the top of the dropdown. The listbox updates as the user types, showing only options whose labels match the query."
        />
        <div className="space-y-3">
          <RuleCard label="Focus management">
            When the dropdown opens with filter enabled, focus moves to the search input automatically. Keyboard navigation (ArrowDown / ArrowUp / Enter) still works from the filter input.
          </RuleCard>
          <RuleCard label="No match state">
            When the query matches zero options, a &ldquo;No options&rdquo; message appears in the listbox.
          </RuleCard>
          <RuleCard label="Filter query is ephemeral">
            The query is cleared when the dropdown closes. It is never persisted as component state between open/close cycles.
          </RuleCard>
        </div>
      </section>

      {/* ── Form integration ─────────────────────────────────────── */}
      <section id="form" className="space-y-6">
        <SectionHeader
          title="Form integration (FACE)"
          description="io-multi-select is a form-associated custom element. It participates in native HTML form submission without JavaScript."
        />
        <div className="space-y-3">
          <RuleCard label="FormData submission">
            Selected values are submitted under the <C>name</C> key as multiple entries — equivalent to a native multi-select. One FormData entry is appended per selected value.
          </RuleCard>
          <RuleCard label="Required validation">
            When <C>required</C> is true and no values are selected, the element is invalid. The browser prevents form submission and shows the constraint violation message.
          </RuleCard>
          <RuleCard label="Form reset">
            Calling <C>form.reset()</C> restores the selection to the values present when the component was first connected to the DOM.
          </RuleCard>
        </div>
      </section>

      {/* ── Migration ────────────────────────────────────────────── */}
      <section id="migration" className="space-y-6">
        <SectionHeader
          title="Migration from io-select[multiple]"
          description="io-select[multiple custom] is now deprecated. Migrate to io-multi-select for better isolation, improved API, and dedicated chip display."
        />
        <div className="space-y-3">
          <RuleCard label="Before (deprecated)">
            {`<io-select label="Countries" name="countries" custom multiple>\n  <io-option value="nl" label="Netherlands"></io-option>\n</io-select>`}
          </RuleCard>
          <RuleCard label="After">
            {`<io-multi-select label="Countries" name="countries">\n  <io-option value="nl" label="Netherlands"></io-option>\n</io-multi-select>`}
          </RuleCard>
          <RuleCard label="Event detail change">
            The <C>change</C> event detail is now <C>{'{ value: string[], name: string }'}</C> instead of <C>string[]</C>. Update listeners to read <C>e.detail.value</C>.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
