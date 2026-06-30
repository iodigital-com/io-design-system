'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoLinkPureUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-link-pure is the icon + label tertiary CTA link. It renders with no underline at rest and is designed for navigation, card CTAs, list actions, and icon-only affordances."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use io-link-pure for navigation items, card footer CTAs, and list action links where an icon adds visual clarity.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>alignLabel=&quot;end&quot;</C> when the icon should trail the label — for example &ldquo;Go to dashboard&rdquo; with a right arrow.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>active=true</C> for the currently selected navigation item. It applies visual treatment and sets <C>aria-current=&quot;page&quot;</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>hideLabel=true</C> with a descriptive text slot for icon-only links — the text becomes the <C>aria-label</C>.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use io-link-pure as a button substitute. If the action does not navigate, use <C>{'<io-button>'}</C> — links and buttons have different semantics.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use io-link-pure for inline body text links. Use <C>{'<io-link variant="inline">'}</C> for links embedded within paragraph text.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use an icon-only link (<C>hideLabel=true</C>) without providing descriptive text in the slot. The slot text is the accessible name.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="align-label" className="space-y-6">
        <SectionHeader
          title="alignLabel"
          description="Controls whether the icon appears before or after the label."
        />
        <div className="space-y-3">
          <RuleCard label="start (default) — icon before label">
            Use for most CTA links. The icon leads the label, drawing the eye and communicating the action type.
          </RuleCard>
          <RuleCard label="end — icon after label">
            Use for forward navigation patterns where the icon (e.g. arrow-right) signals direction. Common in &ldquo;next step&rdquo; or &ldquo;continue&rdquo; contexts.
          </RuleCard>
        </div>
      </section>

      <section id="stretch" className="space-y-6">
        <SectionHeader
          title="stretch"
          description="When true, the link fills its container and pushes the label and icon to opposite ends."
        />
        <div className="space-y-3">
          <RuleCard label="Use stretch in navigation lists and sidebars">
            When io-link-pure items appear in a sidebar or dropdown, <C>stretch=true</C> creates consistent full-width rows where the icon is flush with the container edge.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
