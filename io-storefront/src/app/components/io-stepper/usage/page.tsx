'use client';

import { CodeTabs } from '@/components/CodeTabs';
import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoStepperUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Steppers communicate progress through a multi-stage flow. Use them to orient users and reduce cognitive overhead in complex workflows."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use a stepper for linear, sequential flows where each step must be completed before advancing — registration, checkout, or onboarding.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep step labels short and action-oriented (e.g. &ldquo;Account&rdquo;, &ldquo;Shipping&rdquo;, &ldquo;Confirm&rdquo;).
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the vertical orientation in narrow sidebars or when there are more than four steps.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use a stepper for non-sequential flows where users can move freely between steps in any order.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Add more than six steps — consider splitting the flow into multiple smaller flows instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use long or sentence-case labels — they break the visual rhythm of the connector lines.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Structure ────────────────────────────────────────────── */}
      <section id="structure" className="space-y-6">
        <SectionHeader
          title="Structure"
          description="io-stepper is a container that wraps io-step children. The parent sets current and orientation; the children receive their status automatically."
        />
        <RuleCard label="current prop">
          The <C>current</C> prop on <C>io-stepper</C> is 1-based. Setting <C>current=&quot;2&quot;</C> marks step 1 as complete,
          step 2 as current, and all remaining steps as upcoming. The stepper derives all statuses automatically — you do not
          need to set <C>status</C> on each <C>io-step</C> unless you are managing them manually without a parent <C>io-stepper</C>.
        </RuleCard>
        <RuleCard label="orientation prop">
          Switch between <C>horizontal</C> (default) and <C>vertical</C> orientations. Horizontal flows left-to-right and
          suits most page-level wizard patterns. Vertical stacks steps top-to-bottom and is better for sidebars or narrow contexts.
        </RuleCard>
        <CodeTabs
          tabs={[
            {
              label: 'HTML',
              code: `<io-stepper current="2" orientation="horizontal">
  <io-step label="Account"></io-step>
  <io-step label="Details"></io-step>
  <io-step label="Review"></io-step>
</io-stepper>`,
            },
            {
              label: 'React',
              code: `import { IoStepper, IoStep } from '@io-digital/components-react';

<IoStepper current={2} orientation="horizontal">
  <IoStep label="Account" />
  <IoStep label="Details" />
  <IoStep label="Review" />
</IoStepper>`,
            },
            {
              label: 'Angular',
              code: `<io-stepper [current]="2" orientation="horizontal">
  <io-step label="Account"></io-step>
  <io-step label="Details"></io-step>
  <io-step label="Review"></io-step>
</io-stepper>`,
            },
            {
              label: 'Vue',
              code: `<io-stepper :current="2" orientation="horizontal">
  <io-step label="Account"></io-step>
  <io-step label="Details"></io-step>
  <io-step label="Review"></io-step>
</io-stepper>`,
            },
          ]}
        />
      </section>

      {/* ── Orientations ─────────────────────────────────────────── */}
      <section id="orientations" className="space-y-6">
        <SectionHeader
          title="Orientations"
          description="Two layout modes cover the most common stepper placements."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RuleCard label="horizontal">
            The default. Steps flow left-to-right. Best for page-level checkout or multi-page wizard patterns
            at the top of the main content area. Keep labels short to avoid overflow on small viewports.
          </RuleCard>
          <RuleCard label="vertical">
            Steps stack vertically with connecting lines on the left. Use in sidebars, drawers, or when there
            are more than four steps. Labels can be slightly longer without affecting layout.
          </RuleCard>
        </div>
      </section>

      {/* ── Step statuses ────────────────────────────────────────── */}
      <section id="step-statuses" className="space-y-6">
        <SectionHeader
          title="Step statuses"
          description="Each step communicates its position in the flow through a distinct visual treatment."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RuleCard label="complete">
            A filled circle with a checkmark SVG. The connector line to the next step is also filled with brand
            blue to reinforce forward progress.
          </RuleCard>
          <RuleCard label="current">
            A circle outlined in brand blue with the step number inside. Receives <C>aria-current=&quot;step&quot;</C> for
            assistive technology and the label is rendered in full-weight primary text colour.
          </RuleCard>
          <RuleCard label="upcoming">
            A muted circle with reduced opacity on the label. Signals that this step has not been reached yet.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
