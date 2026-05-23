'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoWordmarkUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="The wordmark is the primary typographic brand identifier for io Digital. Use it where the brand name needs to appear clearly in a typographic form."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use the wordmark in headers, footers, and brand-moment contexts where the io Digital identity needs to appear.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>mono</C> mode on strongly coloured or image backgrounds where the brand-blue &ldquo;io&rdquo; would clash with the surface.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Scale with purpose — use <C>xl</C> for hero moments, <C>md</C> for navigation, <C>sm</C> for footers and dense metadata.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Rely on the <C>aria-label</C> prop to provide an accurate accessible name when context requires a different announcement than the default.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not alter the text content &ldquo;io digital&rdquo; — the wordmark is a fixed brand asset.
              It is not a slot-based component.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use hardcoded font sizes in surrounding CSS to resize the wordmark — use the <C>size</C> prop to stay aligned with the token scale.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not place the wordmark inside an interactive element without providing appropriate accessible context for the overall control.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use the wordmark as a substitute for a linked logo — wrap it in an <C>{'<io-link>'}</C> or <C>{'<a>'}</C> if navigation is needed.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="The four size steps map to well-defined font-size values driven by CSS tokens. Choose by hierarchy and context."
        />
        <div className="space-y-3">
          <RuleCard label="sm — Footer and dense metadata (14px)">
            Use <C>sm</C> for legal lines, footnotes, and compact secondary branding where space is limited.
          </RuleCard>
          <RuleCard label="md — Default navigation and inline branding (20px)">
            The default size. Suitable for top navigation bars, card headers, and inline brand references.
          </RuleCard>
          <RuleCard label="lg — Section headers and featured placements (28px)">
            Use <C>lg</C> for section headers, sign-in screens, and prominent secondary branding.
          </RuleCard>
          <RuleCard label="xl — Hero and splash screens (40px)">
            Use <C>xl</C> sparingly for hero sections and full-screen brand moments. Overuse reduces distinctiveness.
          </RuleCard>
        </div>
      </section>

      {/* ── Mono mode ────────────────────────────────────────────── */}
      <section id="mono-mode" className="space-y-6">
        <SectionHeader
          title="Mono mode"
          description='The mono prop renders the entire wordmark in a single text colour — removing the brand-blue tint from "io". Use it when the wordmark must adapt to a non-white surface.'
        />
        <div className="space-y-3">
          <RuleCard label="Use on coloured backgrounds">
            When the wordmark sits on a brand-blue, dark, or image background, set <C>mono</C> to prevent the blue
            &ldquo;io&rdquo; from becoming invisible or clashing with the surface colour.
          </RuleCard>
          <RuleCard label="Inherit from the surrounding text colour">
            In mono mode, both &ldquo;io&rdquo; and &ldquo;digital&rdquo; use <C>currentColor</C> — set the
            surrounding text colour via CSS to control the final appearance.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
