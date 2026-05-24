'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoAccordionUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use accordion when users need progressive disclosure per content block without overwhelming the page."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for FAQ sections, progressive disclosure of complex information, and reducing visual noise on dense content pages.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use one <C>io-accordion</C> per content section, following the PDS disclosure pattern.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>heading</C> prop for simple labels, or the <C>heading</C> slot when richer heading markup is needed.
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
          description="Each accordion toggles one panel and communicates state via the update event."
        />
        <div className="space-y-3">
          <RuleCard label="One accordion, one panel">
            Each <C>io-accordion</C> instance controls exactly one expandable content region.
          </RuleCard>
          <RuleCard label="Controlled state">
            Use the <C>open</C> prop and the <C>update</C> event detail (<C>{`{ open: boolean }`}</C>) to sync state in framework apps.
          </RuleCard>
          <RuleCard label="default-expanded — open on first render">
            Set <C>default-expanded</C> to expand a panel on first render without managing <C>open</C> externally. This is a one-time initialisation — it has no effect after the component has mounted. Use <C>open</C> for any runtime state control.
          </RuleCard>
          <RuleCard label="allow-multiple — group coordination">
            By default (<C>allow-multiple=false</C>), opening one accordion automatically closes sibling accordions in the same parent element. Set <C>allow-multiple=true</C> to opt a specific accordion out of this coordination and allow it to stay open regardless of what its siblings do. All sibling accordions in a &ldquo;multi-open&rdquo; group should have <C>allow-multiple=true</C>.
          </RuleCard>
          <RuleCard label="Size">
            Use the <C>size</C> prop to adjust trigger padding and heading font size. <C>sm</C> is compact for dense layouts, <C>md</C> (default) suits most use cases, and <C>lg</C> is comfortable for prominent marketing sections.
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
