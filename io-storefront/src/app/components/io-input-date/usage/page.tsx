'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoInputDateUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-input-date is a native date picker input with a permanently floated label and a calendar icon. Use it for any field that captures a calendar date."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for booking dates, date of birth, appointment scheduling, and any field requiring a calendar date.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>min</C> and <C>max</C> to prevent selection of invalid dates. Mirror constraints in <C>helperText</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Validate on blur — the browser will report range violations via the native validity object.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use <C>io-input type=&quot;date&quot;</C> as a substitute — io-input-date provides the calendar icon and permanently floated label suited to date fields.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Hide the browser&apos;s native date picker — it provides accessible calendar navigation that custom implementations rarely replicate fully.
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

      <section id="constraints" className="space-y-6">
        <SectionHeader
          title="Date constraints"
          description="Use min and max to restrict selectable dates."
        />
        <div className="space-y-3">
          <RuleCard label="Surface constraints in helper text">
            When using <C>min</C> or <C>max</C>, communicate the allowed range in <C>helperText</C> so users understand limits before selecting (e.g. &ldquo;Select a date in 2026&rdquo;).
          </RuleCard>
          <RuleCard label="Pair out-of-range errors with message">
            When a user selects a date outside the allowed range, set <C>state=&quot;error&quot;</C> and provide a specific <C>message</C> (e.g. &ldquo;Date must be in the current year&rdquo;).
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
