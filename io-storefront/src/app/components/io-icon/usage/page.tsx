'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoIconUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Icons reinforce meaning at a glance. The key decision is whether an icon is decorative — adding visual polish — or meaningful — conveying information that is not expressed in adjacent text."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use icons alongside text labels to speed up scanning. A <C>search</C> icon next to a &ldquo;Search&rdquo; label removes ambiguity and anchors the affordance.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>label</C> when an icon carries meaning that is not conveyed by adjacent text — for example a standalone icon button where the icon is the only indicator of purpose.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>size=&quot;xs&quot;</C> or <C>size=&quot;sm&quot;</C> for inline metadata and <C>size=&quot;md&quot;</C> as the everyday default. Reserve <C>size=&quot;lg&quot;</C> and <C>size=&quot;xl&quot;</C> for hero or illustration contexts.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Let the icon inherit <C>currentColor</C> from its parent. Set <C>color</C> on the wrapper element rather than on the icon directly.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Place an icon-only button without a <C>label</C> prop or an <C>aria-label</C> on the button. Users relying on screen readers receive no information about the action.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use icons to replace text for complex actions. Icons are effective for universal conventions (<C>x</C> for close, <C>search</C> for search); avoid them for domain-specific actions where a text label is clearer.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Override <C>stroke-width</C> or <C>fill</C> via CSS on internal SVG elements. All visual tokens are controlled by <C>currentColor</C> and the size prop — deviating from these breaks the design system contract.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Set <C>label</C> when an icon is purely decorative and adjacent text already describes the action. Adding a redundant label causes screen readers to announce the same information twice.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Decorative vs meaningful ─────────────────────────────── */}
      <section id="decorative-vs-meaningful" className="space-y-6">
        <SectionHeader
          title="Decorative vs meaningful icons"
          description="The distinction drives the accessibility contract. Get this right and screen reader users receive exactly the context they need — no more, no less."
        />
        <div className="space-y-3">
          <RuleCard label="Decorative — omit label">
            When the icon appears alongside a visible text label that already names the action, the icon adds no information for screen readers. Omit the <C>label</C> prop entirely. The component applies <C>aria-hidden=&quot;true&quot;</C> automatically so assistive technology skips it.
            <br /><br />
            Example: a button that reads &ldquo;Download report&rdquo; with a <C>download</C> icon alongside the text. The text is the label — the icon is decorative.
          </RuleCard>
          <RuleCard label="Meaningful — set label">
            When the icon is the sole conveyor of information — typically in an icon-only button, a status indicator with no adjacent text, or an inline annotation — set the <C>label</C> prop with a concise, action-oriented description.
            <br /><br />
            Example: <C>{'<io-icon name="search" label="Search" />'}</C> inside a button that has no visible text.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Five sizes map to fixed pixel dimensions via design tokens. Choose size by visual hierarchy and the density of surrounding elements."
        />
        <div className="space-y-3">
          <RuleCard label="xs — 12 px">
            Reserved for the most compact metadata contexts: inline table cell decorators, dense chip labels, or tight navigation items. Rarely used alone — almost always paired with fine typography.
          </RuleCard>
          <RuleCard label="sm — 16 px">
            Suitable for inline body text icons, small input field adornments, and secondary navigation. Pairs naturally with <C>font-size: 14 px</C> elements.
          </RuleCard>
          <RuleCard label="md — 20 px (default)">
            The general-purpose size. Use in buttons, form field adornments, card actions, and anywhere an icon must be immediately legible without dominating the layout.
          </RuleCard>
          <RuleCard label="lg — 24 px">
            Use for primary navigation icons, section headers, and empty-state illustrations where additional visual weight aids orientation.
          </RuleCard>
          <RuleCard label="xl — 32 px">
            For hero sections, onboarding screens, and large call-to-action blocks where the icon is a visual anchor rather than a supporting detail.
          </RuleCard>
        </div>
      </section>

      {/* ── Available icon names ─────────────────────────────────── */}
      <section id="available-icons" className="space-y-6">
        <SectionHeader
          title="Available icons"
          description="51 icons are registered in the io Design System icon set. All are derived from Lucide and pre-extracted to avoid runtime imports."
        />
        <div className="space-y-3">
          <RuleCard label="Actions">
            <C>check</C>, <C>x</C>, <C>plus</C>, <C>minus</C>, <C>edit</C>, <C>trash-2</C>,
            <C>copy</C>, <C>download</C>, <C>upload</C>, <C>external-link</C>, <C>search</C>,
            <C>filter</C>, <C>settings</C>
          </RuleCard>
          <RuleCard label="Navigation">
            <C>chevron-down</C>, <C>chevron-up</C>, <C>chevron-right</C>, <C>chevron-left</C>,
            <C>chevrons-up-down</C>, <C>arrow-right</C>, <C>arrow-left</C>, <C>arrow-down</C>,
            <C>home</C>
          </RuleCard>
          <RuleCard label="Status &amp; feedback">
            <C>check-circle</C>, <C>x-circle</C>, <C>info</C>, <C>alert-triangle</C>,
            <C>alert-circle</C>, <C>loader</C>
          </RuleCard>
          <RuleCard label="Content &amp; user">
            <C>eye</C>, <C>eye-off</C>, <C>user</C>, <C>calendar</C>
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
