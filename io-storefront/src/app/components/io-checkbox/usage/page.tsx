'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoCheckboxUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-checkbox is a boolean selection control. Use it whenever a user needs to toggle a single option on or off, or to select multiple independent items from a list."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for independent multi-select lists where each option is orthogonal — selecting &ldquo;Email notifications&rdquo; does not deselect &ldquo;SMS notifications&rdquo;.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for single boolean consent acknowledgements — &ldquo;I accept the terms and conditions&rdquo;, &ldquo;Subscribe to the newsletter&rdquo;.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The label is the accessible name — there is no alternative.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>indeterminate</C> for a &ldquo;Select all&rdquo; parent checkbox when some but not all children are checked.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for mutually exclusive options where only one can be selected — use radio buttons instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use as an immediate action trigger — checkboxes represent a state, not an action. If the change should take effect immediately without a submit button, consider using a toggle switch pattern.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>error</C> state before the user has interacted or before form submission. Validate on submit or on explicit user action.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>indeterminate</C> as a design ornament. It should only represent a genuine partially-selected state in a hierarchical list.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-checkbox has five visual states. State transitions are driven by prop changes — never by direct DOM manipulation."
        />
        <div className="space-y-3">
          <RuleCard label="Unchecked — default">
            The checkbox is unselected. The custom visual shows an empty bordered square. The native input carries checked=false and indeterminate=false.
          </RuleCard>
          <RuleCard label="Checked — selected">
            Set <C>checked=true</C>. The custom visual fills with the accent colour and displays a checkmark. The native input carries checked=true.
          </RuleCard>
          <RuleCard label="Indeterminate — partial selection">
            Set <C>indeterminate=true</C>. The custom visual shows a dash. Used for &ldquo;Select all&rdquo; parent checkboxes when only some children are checked. The native indeterminate property is set via componentDidRender.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=true</C> and provide an <C>errorMessage</C>. The checkbox border and label turn red. The error message appears below with <C>role=&quot;alert&quot;</C> for immediate screen reader announcement.
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
          description="Clear label copy reduces cognitive load and helps users make confident selections."
        />
        <div className="space-y-3">
          <RuleCard label="Write labels as affirmative statements">
            The label should describe what the checked state means. &ldquo;Accept terms and conditions&rdquo; is correct; &ldquo;Do not accept&rdquo; is confusing — negatively worded checkboxes cause user errors.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first word and proper nouns: &ldquo;Send me email updates&rdquo;, &ldquo;Enable two-factor authentication&rdquo;. Avoid ALL CAPS.
          </RuleCard>
          <RuleCard label="Keep labels concise">
            Labels should be one short sentence at most. For longer explanations, use <C>helperText</C> to provide supplementary context without burdening the label itself.
          </RuleCard>
          <RuleCard label="Error messages — specific and actionable">
            Error messages must explain exactly what is required: &ldquo;You must accept the terms to continue&rdquo; is correct; &ldquo;Required&rdquo; alone is insufficient. Write in plain language.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
