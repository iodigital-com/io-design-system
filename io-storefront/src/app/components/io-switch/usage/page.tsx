'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSwitchUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-switch is a binary toggle for settings that take immediate effect. Use it when toggling a setting should apply instantly — without a submit button."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for settings that take effect immediately — &ldquo;Enable dark mode&rdquo;, &ldquo;Allow push notifications&rdquo;, &ldquo;Show online status&rdquo;.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use when the on/off metaphor is clear and familiar to users. The pill-and-thumb visual strongly implies an on/off toggle.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The label is the accessible name — there is no alternative.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>helperText</C> to clarify what &ldquo;on&rdquo; means if the label alone is ambiguous.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for options in a form that requires a submit button to take effect — use <C>io-checkbox</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use for mutually exclusive choices where only one option can be active — use <C>io-radio</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>error</C> state before the user has interacted or before form submission. Validate on submit or on explicit user action.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use multiple switches side by side without clear visual separation — users may not distinguish which label belongs to which switch.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-switch has four visual states. State transitions are driven by prop changes — never by direct DOM manipulation."
        />
        <div className="space-y-3">
          <RuleCard label="Off — default">
            The switch is inactive. The track shows the neutral border-interactive colour. The thumb sits at the left of the track. The native input carries checked=false and aria-checked=&quot;false&quot;.
          </RuleCard>
          <RuleCard label="On — active">
            Set <C>checked=true</C>. The track fills with the primary brand colour. The thumb translates to the right. The native input carries checked=true and aria-checked=&quot;true&quot;.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=true</C> and provide an <C>errorMessage</C>. The track turns red when off. The error message appears below with <C>role=&quot;alert&quot;</C> for immediate screen reader announcement.
          </RuleCard>
          <RuleCard label="Disabled — unavailable">
            Set <C>disabled=true</C>. The entire component renders at reduced opacity. Pointer events are blocked and the native input is disabled.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Clear label copy reduces cognitive load and helps users make confident decisions."
        />
        <div className="space-y-3">
          <RuleCard label="Write labels as nouns or noun phrases, not verbs">
            &ldquo;Dark mode&rdquo; is better than &ldquo;Enable dark mode&rdquo;. The on/off metaphor of the switch makes the verb implied.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first word and proper nouns: &ldquo;Push notifications&rdquo;, &ldquo;Location access&rdquo;.
          </RuleCard>
          <RuleCard label="Keep labels concise">
            Labels should be short — ideally two to four words. Use <C>helperText</C> for explanatory context.
          </RuleCard>
          <RuleCard label="Error messages — specific and actionable">
            Error messages must explain exactly what is required: &ldquo;You must accept data processing to continue&rdquo; is correct; &ldquo;Required&rdquo; alone is insufficient.
          </RuleCard>
        </div>
      </section>

      {/* ── Form integration ─────────────────────────────────────── */}
      <section id="form-integration" className="space-y-6">
        <SectionHeader
          title="Form integration"
          description="io-switch is a form-associated custom element (FACE). It participates in native HTML forms without JavaScript."
        />
        <div className="space-y-3">
          <RuleCard label="name and value">
            Set the <C>name</C> prop to make the switch participate in form submission. The submitted value is <C>on</C> when checked — matching native checkbox behaviour. Omitting <C>name</C> excludes the switch from form data.
          </RuleCard>
          <RuleCard label="required">
            Set <C>required=&quot;true&quot;</C> to mark the switch as mandatory. The switch must be checked to pass HTML5 constraint validation. Use this for consent checkboxes and mandatory agreements.
          </RuleCard>
          <RuleCard label="Validation timing">
            Do not show errors before the user has interacted with the switch. Trigger validation on form submit or on the explicit <C>change</C> event — not on mount or on every render.
          </RuleCard>
          <RuleCard label="formResetCallback">
            io-switch responds to form reset. When the parent form is reset, the switch reverts to its initial <C>checked</C> value and clears any <C>error</C> state. You do not need to handle form reset manually.
          </RuleCard>
        </div>
      </section>

      {/* ── Grouping switches ────────────────────────────────────── */}
      <section id="grouping" className="space-y-6">
        <SectionHeader
          title="Grouping switches"
          description="When displaying multiple switches together, follow these layout and accessibility patterns."
        />
        <div className="space-y-3">
          <RuleCard label="Vertical stacking">
            Stack multiple switches vertically with consistent spacing (<C>var(--io-space-3)</C> between rows). This gives each label enough horizontal reading space and prevents switches from visually merging.
          </RuleCard>
          <RuleCard label="Group with a fieldset">
            Wrap related switches in a <C>{'<fieldset>'}</C> with a <C>{'<legend>'}</C> describing the group (e.g. &ldquo;Notification preferences&rdquo;). This gives screen reader users context for the entire group, not just individual labels.
          </RuleCard>
          <RuleCard label="Avoid side-by-side layout">
            Placing switches side by side without clear visual separation makes it hard for users to associate each label with the correct switch. Stack vertically or use explicit dividers.
          </RuleCard>
          <RuleCard label="Independent state">
            Each io-switch manages its own checked state independently. There is no group-level API — handle group logic (e.g. a &ldquo;Select all&rdquo; control) in your application layer.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
