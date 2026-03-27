'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSelectUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-select is a styled native select with a floating label. Use it when a user must choose exactly one value from a predefined list of five or more options."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for lists of five or more options where showing all choices simultaneously (as radio buttons) would create visual clutter.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for well-known enumerable sets such as country, language, currency, or time zone — lists users are familiar with.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The floating label is the accessible name — there is no fallback.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>placeholder</C> to provide a &ldquo;Select an option&rdquo; prompt when no default value is pre-selected.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for fewer than five options — use radio buttons instead. They are faster to scan and require fewer interactions.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for searching or autocomplete scenarios — use a combobox or searchable dropdown instead. The native select has no search capability.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for multi-select scenarios. The native select&apos;s multi-select UX is inconsistent across operating systems. Use a checkbox group or tag input instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>error</C> state before the user has had a chance to interact. Validate on blur or on form submit — not on mount.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Options ──────────────────────────────────────────────── */}
      <section id="options" className="space-y-6">
        <SectionHeader
          title="Options"
          description="The options prop accepts an array of IoSelectOption objects. Each option has a label and a value, with an optional disabled flag."
        />
        <div className="space-y-3">
          <RuleCard label="Labels — human-readable, sentence case">
            Write option labels as short noun phrases in sentence case: &ldquo;Netherlands&rdquo;, &ldquo;Monthly billing&rdquo;, &ldquo;Read only&rdquo;. Avoid codes or abbreviations as labels — they should be human-readable.
          </RuleCard>
          <RuleCard label="Values — stable machine identifiers">
            Values are the strings submitted with the form and used internally. Use stable, lowercase identifiers that are not affected by translations or display changes: <C>nl</C>, <C>monthly</C>, <C>read_only</C>.
          </RuleCard>
          <RuleCard label="Disabled options — use sparingly">
            Set <C>disabled: true</C> on an individual option to make it unselectable — useful for showing &ldquo;Coming soon&rdquo; entries. Do not use disabled options as section headers; use <C>optgroup</C> semantics if grouping is needed.
          </RuleCard>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-select shares the same visual states as io-input — they are designed to appear alongside each other in form layouts."
        />
        <div className="space-y-3">
          <RuleCard label="Default — label at rest">
            The label sits inside the field at body size. No value is selected. The border is 1px in the neutral colour.
          </RuleCard>
          <RuleCard label="Focused / filled — label floats">
            When the select gains focus or a value is selected, the border expands to 5px in the accent colour and the label animates to the floating position.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=true</C> and provide <C>errorMessage</C>. The border and label turn red. The error message appears below with <C>role=&quot;alert&quot;</C>.
          </RuleCard>
          <RuleCard label="Disabled — unavailable">
            Set <C>disabled=true</C>. The entire component renders at 40% opacity and pointer events are blocked.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Well-written labels and options reduce selection errors and form abandonment."
        />
        <div className="space-y-3">
          <RuleCard label="Labels — describe the selection being made">
            The label should name what the user is choosing: &ldquo;Country&rdquo;, &ldquo;Billing cycle&rdquo;, &ldquo;Access level&rdquo;. Avoid vague labels like &ldquo;Select&rdquo; or &ldquo;Choose&rdquo;.
          </RuleCard>
          <RuleCard label="Placeholder — use only when there is no sensible default">
            Use a placeholder such as &ldquo;Select a country&rdquo; only when there is genuinely no default value. If a reasonable default exists, pre-select it — it reduces user effort and makes the field state immediately clear.
          </RuleCard>
          <RuleCard label="Error messages — specific and actionable">
            Error messages must describe the problem and the fix: &ldquo;Please select a country to continue&rdquo;. Avoid generic messages like &ldquo;Invalid selection&rdquo;.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
