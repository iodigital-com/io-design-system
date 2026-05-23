'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoFormFieldUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-form-field auto-wires the accessibility relationship between a label, a form control, and helper or error text. Use it to wrap a single io-input, io-select, io-textarea, io-checkbox, or io-radio."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>io-form-field</C> when you need a shared label-input pairing outside of a component that has a built-in label prop.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. It is the accessible name for the slotted control.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Pair <C>error</C> with <C>errorMessage</C> to give specific, actionable feedback after validation fails.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>helperText</C> for format hints or constraints before the user starts interacting.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Slot more than one form control — <C>io-form-field</C> is designed for a single label-to-input relationship.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>io-form-field</C> to wrap <C>io-radio-group</C> or <C>io-checkbox-group</C> — those groups already render a <C>fieldset</C>/<C>legend</C> and manage their own accessible label.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>invalid</C> before the user has had a chance to interact. Validate on blur or on form submit.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-form-field has three visual states driven by the error prop and text props."
        />
        <div className="space-y-3">
          <RuleCard label="Default — label above control">
            The label is always visible above the slotted control. The control&apos;s own focus and hover states are not affected.
          </RuleCard>
          <RuleCard label="Helper — supplementary guidance">
            When <C>helperText</C> is set and <C>error</C> is false, the helper text is shown below the control and linked via <C>aria-describedby</C>.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            When <C>error</C> is true and <C>errorMessage</C> is set, the error message replaces the helper text. The slotted control receives <C>aria-invalid=&quot;true&quot;</C> automatically.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
