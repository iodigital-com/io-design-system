'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoTextUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-text is a light DOM typography primitive for body copy. Choose the semantic tag that matches your content's role in the document."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>tag=&quot;p&quot;</C> for standalone paragraphs of body copy.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>tag=&quot;span&quot;</C> for inline text that needs size or weight variation within a paragraph.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>tag=&quot;blockquote&quot;</C> for quoted content from external sources.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>tag=&quot;time&quot;</C> with a <C>datetime</C> attribute for machine-readable date and time values.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use io-text for headings — use <C>{'<io-heading>'}</C> instead to maintain a correct document outline.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not rely on color alone to convey meaning — always pair semantic colors (<C>success</C>, <C>warning</C>, <C>error</C>) with descriptive text or an icon.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use <C>ellipsis</C> on multi-line copy — it is designed for single-line overflow scenarios only.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Five sizes cover all body copy scales, from dense metadata to prominent callouts."
        />
        <div className="space-y-3">
          <RuleCard label="xs — Fine print and captions">
            Use for legal footnotes, image captions, and dense metadata where space is at a premium.
            Maps to <C>--io-font-size-xs</C> (12px).
          </RuleCard>
          <RuleCard label="sm — Secondary and helper text">
            Use for helper text, form hints, and secondary metadata. Maps to <C>--io-font-size-sm</C> (14px).
          </RuleCard>
          <RuleCard label="base — Default body copy">
            The standard reading size for all body paragraphs. Maps to <C>--io-font-size-base</C> (16px).
          </RuleCard>
          <RuleCard label="lg — Lead or intro text">
            Use for lead paragraphs and intro copy that opens a section. Maps to <C>--io-font-size-lg</C> (18px).
          </RuleCard>
          <RuleCard label="xl — Callout text">
            Use sparingly for prominent callouts or pull quotes that need extra visual weight.
            Maps to <C>--io-font-size-xl</C> (20px).
          </RuleCard>
        </div>
      </section>

      {/* ── Colors ───────────────────────────────────────────────── */}
      <section id="colors" className="space-y-6">
        <SectionHeader
          title="Colors"
          description="Semantic color roles cover all body copy contexts. Token values respond to light and dark mode automatically."
        />
        <div className="space-y-3">
          <RuleCard label="primary — Default body text">
            Use for all standard body copy. Maps to <C>--io-text-primary</C>.
          </RuleCard>
          <RuleCard label="secondary — De-emphasised text">
            Use for supporting information, metadata, and labels that should recede. Maps to <C>--io-text-secondary</C>.
          </RuleCard>
          <RuleCard label="disabled — Non-interactive state">
            Use only when the surrounding interactive context is disabled. Maps to <C>--io-text-disabled</C>.
          </RuleCard>
          <RuleCard label="inverse — Text on dark backgrounds">
            Use on dark or brand-colored surfaces where primary text would be illegible. Maps to <C>--io-text-inverse</C>.
          </RuleCard>
          <RuleCard label="success / warning / error — Semantic feedback">
            Use alongside status indicators, form validation messages, and system alerts. Always pair with descriptive text.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
