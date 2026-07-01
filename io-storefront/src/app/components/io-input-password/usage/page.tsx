'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoInputPasswordUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-input-password is a specialised password field with a show/hide toggle. Use it whenever a user needs to enter a secret value such as a password or security code."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for login passwords, new password fields, and confirm password fields.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>autocomplete=&quot;current-password&quot;</C> on login forms and <C>autocomplete=&quot;new-password&quot;</C> on registration forms — password managers depend on this.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Provide <C>helperText</C> with password rules (length, character requirements) before the user submits.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use <C>type=&quot;text&quot;</C> for passwords — browser password managers and autofill will not trigger.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show errors for password strength while the user is still typing — validate on blur or on submit.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="label-visibility" className="space-y-6">
        <SectionHeader
          title="Label visibility"
          description="hideLabel visually hides the floating label while keeping it accessible to screen readers. It is a plain boolean — not breakpoint-aware."
        />
        <div className="space-y-3">
          <RuleCard label="No responsive breakpoint support">
            <C>hideLabel</C> accepts only <C>true</C> or <C>false</C>. For responsive label
            visibility, apply a CSS media query on a wrapper element or use your framework&apos;s
            breakpoint utility to set the attribute conditionally. See the io-input usage page for
            patterns.
          </RuleCard>
        </div>
      </section>

      <section id="toggle-behaviour" className="space-y-6">
        <SectionHeader
          title="Show/hide toggle"
          description="The eye icon toggles between password-masked and plain-text display."
        />
        <div className="space-y-3">
          <RuleCard label="Accessible toggle label">
            The button aria-label switches between &ldquo;Show password&rdquo; and &ldquo;Hide password&rdquo; to reflect the current action. This keeps screen reader users informed of the control purpose.
          </RuleCard>
          <RuleCard label="No auto-hide on blur">
            The password remains visible until the user explicitly toggles it back. Do not auto-hide when the field loses focus — this is disorienting for users checking what they typed.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
