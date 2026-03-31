'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoAccordionUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use accordion when users need progressive disclosure without overwhelming the page with full-content blocks."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for FAQ sections, progressive disclosure of complex information, and reducing visual noise on dense content pages.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use single-open mode (default) when items are mutually exclusive or relate to a single decision.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>allow-multiple</C> when users may need to compare information across multiple panels.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use an accordion to hide content that is critical to completing a task. That content should be visible by default.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Nest accordions inside accordion panels.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use accordion as a navigation mechanism. Use <C>io-tabs</C> instead.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="behaviour" className="space-y-6">
        <SectionHeader
          title="Behaviour"
          description="Accordion supports single-open and multi-open disclosure patterns with animated affordances for state change."
        />
        <div className="space-y-3">
          <RuleCard label="Single-open (default)">
            Opening a new panel automatically closes the currently open panel.
          </RuleCard>
          <RuleCard label="Multiple open (allow-multiple)">
            Each panel toggles independently.
          </RuleCard>
          <RuleCard label="Animation">
            Panel height animates from 0 to full via max-height transition; icon rotates from + to -.
          </RuleCard>
          <RuleCard label="Hover">
            Trigger title shifts 1.2rem to the right on hover; icon scales to 0.7.
          </RuleCard>
        </div>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Write concise trigger labels and complete body copy to support scanability and readability."
        />
        <div className="space-y-3">
          <RuleCard label="Title">
            Keep titles to 3-8 words. Use noun phrases for category-style accordions (for example: Interface Design, not What is interface design?).
          </RuleCard>
          <RuleCard label="Body">
            Write complete sentences and keep body copy up to roughly 680px max-width per the reference design.
          </RuleCard>
          <RuleCard label="CTA (optional)">
            A standalone link can appear inside panel content when deeper reading is available.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
