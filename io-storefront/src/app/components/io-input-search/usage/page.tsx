'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoInputSearchUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-input-search is a search field with a persistent magnifier icon and a clear button. Use it whenever a user needs to filter, find, or query content."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for site-wide search, filter inputs, and any field where the user is querying a dataset.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>placeholder</C> to hint the search scope (e.g. &ldquo;Search by name or SKU&hellip;&rdquo;).
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Listen to the <C>clear</C> event to reset filtered results when the user clicks the clear button.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use io-input-search for non-search fields — the magnifier icon signals a specific semantic purpose.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Search on every keystroke without debouncing — this floods the server and creates an overwhelming experience for screen reader users receiving live result announcements.
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

      <section id="clear-button" className="space-y-6">
        <SectionHeader
          title="Clear button"
          description="The × button appears only when the search field has a value."
        />
        <div className="space-y-3">
          <RuleCard label="Focus returns to the input after clearing">
            When the clear button is activated, focus is programmatically returned to the input. This ensures keyboard users can immediately continue typing without needing to navigate back.
          </RuleCard>
          <RuleCard label="Custom clearAriaLabel">
            Override <C>clearAriaLabel</C> when a more specific label improves the experience (e.g. &ldquo;Clear product filter&rdquo; instead of the default &ldquo;Clear search&rdquo;).
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
