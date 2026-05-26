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
          description="io-select offers two modes: a styled native select for simple single-value choices, and a fully accessible ARIA combobox (custom=true) for filtering and multi-select scenarios."
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
              Set <C>custom</C> when you need filtering, multi-select, or a consistent cross-platform dropdown experience beyond what the native select provides.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The floating label is the accessible name — there is no fallback.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for fewer than five options — use radio buttons instead. They are faster to scan and require fewer interactions.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use the native select (custom=false) for search or autocomplete — enable <C>custom</C> and <C>filter</C> instead. The native select element has no built-in search capability.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use the native select (custom=false) for multi-value selection — its UX is inconsistent across operating systems. Enable <C>custom</C> and <C>multiple</C> for a consistent, accessible multi-select combobox.
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
          description="Options are defined as slotted child elements. Place io-option elements directly inside io-select, or nest them inside io-optgroup elements to create labelled groups."
        />
        <div className="space-y-3">
          <RuleCard label="Labels — human-readable, sentence case">
            Write option labels as short noun phrases in sentence case: &ldquo;Netherlands&rdquo;, &ldquo;Monthly billing&rdquo;, &ldquo;Read only&rdquo;. Set the label via the <C>label</C> attribute on <C>io-option</C>. Avoid codes or abbreviations — labels should be human-readable.
          </RuleCard>
          <RuleCard label="Values — stable machine identifiers">
            The <C>value</C> attribute on each <C>io-option</C> is the string submitted with the form and used internally. Use stable, lowercase identifiers that are not affected by translations or display changes: <C>nl</C>, <C>monthly</C>, <C>read_only</C>.
          </RuleCard>
          <RuleCard label="Disabled options — use sparingly">
            Add the <C>disabled</C> attribute to an individual <C>io-option</C> to make it unselectable — useful for showing &ldquo;Coming soon&rdquo; entries. Do not use disabled options as section headers; use <C>io-optgroup</C> for grouping instead.
          </RuleCard>
          <RuleCard label="Groups — use io-optgroup for related options">
            Wrap related <C>io-option</C> elements in an <C>io-optgroup</C> with a <C>label</C> attribute to add a visible group heading. Adding <C>disabled</C> to <C>io-optgroup</C> disables all options in the group.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Use size to align select controls with inputs, textareas, and buttons in the same form group."
        />
        <div className="space-y-3">
          <RuleCard label="sm — Dense UIs">
            Use <C>sm</C> for compact desktop layouts where many controls share limited vertical space.
          </RuleCard>
          <RuleCard label="md — Default">
            Use <C>md</C> for most forms. It balances readability and information density.
          </RuleCard>
          <RuleCard label="lg — Touch-first contexts">
            Use <C>lg</C> for mobile-heavy flows and prominent primary filters.
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
            Set <C>state=&quot;error&quot;</C> and provide <C>message</C>. The border and label turn red. The error message appears below with <C>role=&quot;alert&quot;</C>.
          </RuleCard>
          <RuleCard label="Disabled — unavailable">
            Set <C>disabled=true</C>. The entire component renders at 40% opacity and pointer events are blocked.
          </RuleCard>
        </div>
      </section>

      {/* ── Combobox mode ────────────────────────────────────────── */}
      <section id="combobox-mode" className="space-y-6">
        <SectionHeader
          title="Combobox mode"
          description="Set custom=true to replace the native select with a fully accessible ARIA combobox. Use the additional props below to layer on filtering and multi-select."
        />
        <div className="space-y-3">
          <RuleCard label="custom — switch to the ARIA combobox">
            Set <C>custom</C> when you need more control than the native select provides: consistent cross-platform appearance, keyboard-managed focus, or the ability to add filtering and multi-select. The combobox renders a <C>button[role=combobox]</C> trigger and a <C>ul[role=listbox]</C> dropdown with full ARIA wiring.
          </RuleCard>
          <RuleCard label="multiple — allow multiple selections">
            Set <C>multiple</C> (alongside <C>custom</C>) to let users select more than one option. The dropdown stays open after each selection. Each option shows a checkbox indicator. The trigger summarises the selection: one item shows its label, two or more items show &ldquo;N selected&rdquo;. The <C>change</C> event detail is <C>string[]</C> in this mode.
          </RuleCard>
          <RuleCard label="filter — add type-to-search">
            Set <C>filter</C> (alongside <C>custom</C>) to add a text input at the top of the dropdown. Options are filtered in real time by label as the user types. Focus moves automatically to the filter input when the dropdown opens. Combine with <C>multiple</C> for a searchable multi-select combobox.
          </RuleCard>
          <RuleCard label="Combine multiple + filter for long option lists">
            When users need to select several items from a list of ten or more, combining <C>multiple</C> and <C>filter</C> reduces the time spent scrolling and improves accuracy. Use when options are not easily predictable — for example &ldquo;Assign to team member&rdquo; in a large organisation.
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


      {/* ── Rich content via named slots ─────────────────────────── */}
      <section id="named-slots" className="space-y-6">
        <SectionHeader
          title="Rich content via named slots"
          description="Use named slots to embed rich HTML in the label, description, or message. Slot content overrides the corresponding prop when provided."
        />
        <div className="space-y-3">
          <RuleCard label="label slot — icons and badges next to the label">
            Embed an icon or &ldquo;required&rdquo; badge in the select label via the <C>label</C> slot. Decorative icons must be <C>aria-hidden=&quot;true&quot;</C>.
          </RuleCard>
          <RuleCard label="description slot — linked helper text">
            Use the <C>description</C> slot to add a link inside the helper text — for example, linking to a page that explains the options.
          </RuleCard>
          <RuleCard label="message slot — rich error messages">
            Use the <C>message</C> slot when the error needs a link or formatted text. The container retains <C>role=&quot;alert&quot;</C> in both native and custom (combobox) render modes.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
