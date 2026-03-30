'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoRadioUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-radio is a mutually exclusive selection control. Use it whenever a user must choose exactly one option from a defined set."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for mutually exclusive choices where selecting one option deselects all others — &ldquo;Standard delivery&rdquo;, &ldquo;Express delivery&rdquo;, &ldquo;Next-day delivery&rdquo;.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Group related radio buttons using the same <C>name</C> attribute. The browser enforces mutual exclusivity within a group through the native radio mechanism.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The label is the accessible name — there is no alternative.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Wrap groups in a <C>&lt;fieldset&gt;</C> with a <C>&lt;legend&gt;</C> to give screen reader users the group context before the individual option labels are announced.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for independent multi-select lists where each option is orthogonal — use checkboxes instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use a single io-radio in isolation for a boolean choice. A single radio button cannot be deselected by the user once chosen. Use io-checkbox for toggle selections.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>error</C> state before the user has interacted or before form submission. Validate on submit or on explicit user action.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Mix radio buttons from different groups on the same page without unique <C>name</C> values — this breaks the mutual exclusivity contract and confuses assistive technologies.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Radio vs checkbox ────────────────────────────────────── */}
      <section id="radio-vs-checkbox" className="space-y-6">
        <SectionHeader
          title="Radio vs checkbox"
          description="Choosing the correct control prevents user errors and sets the right expectation about how many options can be selected."
        />
        <div className="space-y-3">
          <RuleCard label="Use radio when exactly one option must be chosen">
            Radio buttons communicate that the options are mutually exclusive. If a user selects &ldquo;Express delivery&rdquo;, &ldquo;Standard delivery&rdquo; is automatically deselected. This is the correct control when the choices are alternatives, not additions.
          </RuleCard>
          <RuleCard label="Use checkbox when zero or more options can be selected">
            Checkboxes communicate that each option is independent. Selecting &ldquo;Email notifications&rdquo; does not deselect &ldquo;SMS notifications&rdquo;. If each choice stands alone and selections are cumulative, use io-checkbox.
          </RuleCard>
          <RuleCard label="Never use radio for a single boolean toggle">
            A lone radio button cannot be unchecked once selected — the user is permanently committed. For a single on/off choice, use io-checkbox or a toggle switch pattern.
          </RuleCard>
          <RuleCard label="Prefer radio over a select for small option sets">
            When there are fewer than five or six options and space permits, radio buttons are preferred over a dropdown select. They allow users to see all options at once without an extra interaction to open the list.
          </RuleCard>
        </div>
      </section>

      {/* ── Grouping ─────────────────────────────────────────────── */}
      <section id="grouping" className="space-y-6">
        <SectionHeader
          title="Grouping radio buttons"
          description="A radio group is formed by placing multiple io-radio elements with the same name attribute in the DOM. The name value must be unique per group on the page."
        />
        <div className="space-y-3">
          <RuleCard label="Always set a shared name">
            The <C>name</C> attribute is what binds radio buttons into a mutually exclusive group. Without a shared name, the browser treats each radio as independent and will not enforce the one-selection-only constraint.
          </RuleCard>
          <RuleCard label="Set a unique value on each option">
            The <C>value</C> prop distinguishes options within the group. When the user selects a radio, the <C>change</C> event detail carries both <C>checked: true</C> and the option&rsquo;s value string. If value is omitted it defaults to an empty string, making all options indistinguishable in event handlers.
          </RuleCard>
          <RuleCard label="Ensure exactly one option is pre-selected when appropriate">
            Radio groups should generally have one option selected by default if a sensible default exists. An empty radio group (no option pre-selected) is acceptable when the choice is genuinely unknown, but avoid it in forms that require one of the options.
          </RuleCard>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-radio has four visual states. State transitions are driven by prop changes — never by direct DOM manipulation."
        />
        <div className="space-y-3">
          <RuleCard label="Unchecked — default">
            The radio button is unselected. The custom visual shows an empty bordered circle. The native input carries checked=false.
          </RuleCard>
          <RuleCard label="Checked — selected">
            Set <C>checked=true</C>. The custom visual fills with the accent colour and displays a filled dot. Only one radio in a group should carry checked=true at any time.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=true</C> and provide an <C>errorMessage</C>. The radio border and label turn red. The error message appears below with <C>role=&quot;alert&quot;</C> for immediate screen reader announcement.
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
          <RuleCard label="Write labels as noun phrases or short clauses">
            Radio option labels should be parallel in structure. Prefer noun phrases — &ldquo;Standard delivery&rdquo;, &ldquo;Express delivery&rdquo; — or short clauses — &ldquo;Send me a confirmation email&rdquo;. Avoid mixing sentence types within the same group.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first word and proper nouns: &ldquo;Next-day delivery&rdquo;, &ldquo;Monthly billing&rdquo;. Avoid ALL CAPS and title case for option labels.
          </RuleCard>
          <RuleCard label="Keep labels concise">
            Labels should be one short phrase at most. For longer explanations, use <C>helperText</C> to provide supplementary context without burdening the option label itself.
          </RuleCard>
          <RuleCard label="Error messages — specific and actionable">
            Error messages must explain exactly what is required: &ldquo;Please select a delivery method to continue&rdquo; is correct; &ldquo;Required&rdquo; alone is insufficient. Write in plain language. Apply the error to every radio in the affected group so the visual feedback is unambiguous.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
