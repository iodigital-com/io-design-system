'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoLinkUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-link is an animated hyperlink component that adapts to its surrounding text. Use it wherever a clickable anchor is needed — navigation, cross-references, or inline body text."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>variant=&quot;standalone&quot;</C> for navigation links that stand alone — e.g. &ldquo;View all articles&rdquo; or &ldquo;Back to dashboard&rdquo;.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>variant=&quot;inline&quot;</C> for links embedded within a paragraph or sentence of body text where the link inherits the surrounding font size.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>external</C> and <C>target=&quot;_blank&quot;</C> together when the link opens a new tab. The external flag appends a visual indicator and appropriate <C>rel</C> attributes.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use descriptive, action-oriented link text — &ldquo;Read the accessibility guide&rdquo; tells users where they are going; &ldquo;Click here&rdquo; does not.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use io-link as a button substitute. If the action does not navigate, use <C>{'<io-button>'}</C> instead — links and buttons have different semantics and keyboard behaviour.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>color=&quot;white&quot;</C> on a light background. The white variant is designed exclusively for use on dark or coloured surfaces where it provides sufficient contrast.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Omit the <C>href</C> prop. Every io-link must have a destination. A link without an <C>href</C> is not keyboard-focusable and breaks accessibility.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use generic text like &ldquo;here&rdquo;, &ldquo;more&rdquo;, or &ldquo;link&rdquo;. Screen reader users navigate by tab-cycling through links — each link must make sense out of context.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Variants ─────────────────────────────────────────────── */}
      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="io-link has two variants that differ in visual weight and intended placement context."
        />
        <div className="space-y-3">
          <RuleCard label="standalone — independent navigation link">
            Renders at the component&apos;s own font size with a scaleX underline animation on hover and focus. Use outside of paragraph text — in navigation lists, call-to-action rows, card footers, and breadcrumbs.
          </RuleCard>
          <RuleCard label="inline — embedded within body text">
            Inherits the <C>font-size</C> and <C>line-height</C> of its parent element. The underline animation scales to match the surrounding text. Use when a link appears mid-sentence in a paragraph, legal notice, or tooltip.
          </RuleCard>
        </div>
      </section>

      {/* ── Colours ──────────────────────────────────────────────── */}
      <section id="colours" className="space-y-6">
        <SectionHeader
          title="Colours"
          description="Three colour options let io-link integrate with different surface backgrounds."
        />
        <div className="space-y-3">
          <RuleCard label="blue — brand default">
            The primary link colour. Use on white, light grey, and neutral surface backgrounds. Meets the 4.5:1 contrast requirement against standard io background colours.
          </RuleCard>
          <RuleCard label="black — neutral alternative">
            Use when the blue brand colour competes with other UI elements, or when a more typographically neutral style is required. Appropriate on light backgrounds.
          </RuleCard>
          <RuleCard label="white — for dark surfaces">
            Use exclusively on dark or strongly coloured backgrounds — hero banners, dark navigation panels, or coloured card components. Never use on light backgrounds.
          </RuleCard>
        </div>
      </section>

      {/* ── External links ───────────────────────────────────────── */}
      <section id="external-links" className="space-y-6">
        <SectionHeader
          title="External links"
          description="Set external=true whenever the link leads to a page outside the current application."
        />
        <div className="space-y-3">
          <RuleCard label="Always pair external with target and rel">
            When <C>external</C> is true, also set <C>target=&quot;_blank&quot;</C> and <C>rel=&quot;noopener noreferrer&quot;</C>. The <C>noopener</C> attribute prevents the new tab from accessing the opener window; <C>noreferrer</C> prevents referrer leakage.
          </RuleCard>
          <RuleCard label="The external icon signals context change">
            The external icon (external link indicator) is rendered automatically when <C>external</C> is true. It tells sighted users the link opens in a new tab or leaves the application. This is especially important in dense navigation contexts.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Well-written link text improves usability for all users and is essential for screen reader users."
        />
        <div className="space-y-3">
          <RuleCard label="Describe the destination, not the action">
            Write the destination as the link text: &ldquo;Privacy policy&rdquo;, &ldquo;Release notes&rdquo;, &ldquo;Contact support&rdquo;. Avoid &ldquo;Click here&rdquo;, &ldquo;Read more&rdquo;, or &ldquo;Learn more&rdquo; without additional context.
          </RuleCard>
          <RuleCard label="Keep link text concise">
            Link text should be as short as possible while remaining descriptive. Very long link text looks cluttered and is harder to scan. Aim for two to five words for standalone links.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Match the capitalisation of the surrounding text. Standalone navigation links may use title case if that is the established typographic style. Avoid ALL CAPS.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
