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
          description="The wordmark is the primary brand identity component for iO Digital. Choose the variant that fits the context."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>variant=&quot;mark&quot;</C> (default) when only the geometric iO symbol is needed — favicons, avatars, and constrained spaces.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>variant=&quot;lockup&quot;</C> for hero sections and brand-moment placements that require the official full-lockup SVG.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>color=&quot;white&quot;</C> or <C>color=&quot;black&quot;</C> when the wordmark must appear on a non-white surface.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always set <C>ariaLabel</C> to a meaningful description when the wordmark is the only brand identifier on the page.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use <C>color=&quot;beige&quot;</C> on <C>variant=&quot;lockup&quot;</C> — beige is only defined for the mark variant.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use hardcoded sizes in surrounding CSS — use the <C>size</C> prop to stay aligned with the token scale.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not place the wordmark inside an interactive element without providing appropriate accessible context for the overall control.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not alter the SVG paths or reconstruct the mark from scratch — always use the <C>io-wordmark</C> component.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Variants ─────────────────────────────────────────────── */}
      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="Choose the variant that best matches the visual context and brand requirement."
        />
        <div className="space-y-3">
          <RuleCard label='variant="mark" — Geometric iO mark SVG (default)'>
            Renders the official geometric iO mark (italic i + circle O) as an inline SVG.
            Supports all four <C>color</C> values including beige. Use when only the symbol is needed:
            favicons, avatar backgrounds, constrained icon slots.
          </RuleCard>
          <RuleCard label='variant="lockup" — Full brand lockup SVG'>
            Renders the official brand lockup SVG — the iO mark combined with &ldquo;io digital&rdquo; text in the
            approved outlined typeface. Use for hero sections, splash screens, and brand-moment placements
            that require the pixel-perfect official asset.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="The four size steps apply to both variants and control SVG height."
        />
        <div className="space-y-3">
          <RuleCard label="sm — Footer and dense metadata">
            Use <C>sm</C> for legal lines, footnotes, and compact secondary branding where space is limited.
          </RuleCard>
          <RuleCard label="md — Default navigation and inline branding">
            The default size. Suitable for top navigation bars, card headers, and inline brand references.
          </RuleCard>
          <RuleCard label="lg — Section headers and featured placements">
            Use <C>lg</C> for section headers, sign-in screens, and prominent secondary branding.
          </RuleCard>
          <RuleCard label="xl — Hero and splash screens">
            Use <C>xl</C> sparingly for hero sections and full-screen brand moments. Overuse reduces distinctiveness.
          </RuleCard>
        </div>
      </section>

      {/* ── Colour ───────────────────────────────────────────────── */}
      <section id="colour" className="space-y-6">
        <SectionHeader
          title="Colour"
          description="Three colours apply to both variants; beige is exclusive to the mark variant."
        />
        <div className="space-y-3">
          <RuleCard label='color="blue" — Energetic Blue (default)'>
            The entire SVG fills in brand blue via <C>currentColor</C>. Use on white or light-neutral surfaces.
          </RuleCard>
          <RuleCard label='color="black" — Dark neutral'>
            Full wordmark in <C>--io-color-grey-6</C> (#242424). Use on light surfaces where the brand blue
            would be too prominent.
          </RuleCard>
          <RuleCard label='color="white" — Reversed'>
            Full wordmark in white. Use on dark, primary-blue, or image backgrounds.
          </RuleCard>
          <RuleCard label='color="beige" — Warm neutral (mark only)'>
            Available on <C>variant=&quot;mark&quot;</C> only. Uses <C>--io-color-beige</C>.
            Apply on warm-toned or off-white surfaces. Do not use on the lockup variant.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
