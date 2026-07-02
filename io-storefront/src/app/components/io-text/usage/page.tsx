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
          title="Colors — role-based model"
          description="io-text organises color values around semantic roles, not contrast tiers. Each value expresses intent (what the text is for) rather than a visual weight step. This is a deliberate design-system choice that keeps copy clearly categorised by function."
        />
        <div className="space-y-3">
          <RuleCard label="primary — Default body text">
            Use for all standard body copy. Carries the highest visual weight for text and should be the default choice. Maps to <C>--io-text-primary</C>.
          </RuleCard>
          <RuleCard label="secondary — De-emphasised text">
            Use for supporting information, metadata, captions, and labels that should recede visually behind primary content. This is a role value — it signals &quot;this content is subordinate&quot;, not just &quot;a little lighter than primary&quot;. Maps to <C>--io-text-secondary</C>.
          </RuleCard>
          <RuleCard label="disabled — Non-interactive state">
            Use exclusively when the surrounding interactive context (button, input, etc.) is disabled. Do not use disabled color to de-emphasise active content — use secondary instead. Maps to <C>--io-text-disabled</C>.
          </RuleCard>
          <RuleCard label="inverse — Text on dark backgrounds">
            Use on dark or brand-colored surfaces where primary text would be illegible. Maps to <C>--io-text-inverse</C>.
          </RuleCard>
          <RuleCard label="success / warning / error — Semantic feedback">
            Use alongside status indicators, form validation messages, and system alerts. These roles carry inherent meaning — always pair with descriptive text, never rely on color alone (WCAG 1.4.1). Maps to <C>--io-color-success</C>, <C>--io-color-warning</C>, <C>--io-color-error</C>.
          </RuleCard>
          <RuleCard label="info — Informational context">
            Use for informational callouts and neutral guidance that does not indicate success, warning, or error. Maps to <C>--io-color-info</C>.
          </RuleCard>
          <RuleCard label="inherit — Parent color passthrough">
            Use when the text color should be inherited from a parent element rather than set by a token. Useful inside custom-colored containers where a local token override controls the text color.
          </RuleCard>
        </div>
      </section>

      {/* ── Role-based vs contrast-tier model ───────────────────── */}
      <section id="color-model" className="space-y-6">
        <SectionHeader
          title="Why role-based, not contrast-tier?"
          description="Some design systems use a contrast-tier model with values like contrast-higher, contrast-high, contrast-medium. io intentionally uses roles instead."
        />
        <div className="space-y-3">
          <RuleCard label="Intent over presentation">
            Role names force a decision about why text is being de-emphasised. &quot;secondary&quot; communicates intent to future maintainers; &quot;contrast-medium&quot; does not. This reduces the risk of misuse — e.g. using a low-contrast value for body copy that should be primary.
          </RuleCard>
          <RuleCard label="No intermediate contrast values by design">
            There is no equivalent of &quot;contrast-medium&quot; between primary and secondary. If a design needs an intermediate visual weight, the correct solution is a lighter font weight (e.g. <C>weight=&quot;regular&quot;</C> instead of <C>weight=&quot;semibold&quot;</C>), not a lower-contrast text token.
          </RuleCard>
          <DoOrDontCard type="do">
            Use <C>color=&quot;secondary&quot;</C> for metadata and labels, <C>weight=&quot;regular&quot;</C> to soften body copy without changing semantics.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not use <C>color=&quot;disabled&quot;</C> to create a visual hierarchy effect on active, readable content. Disabled is reserved for non-interactive states.
          </DoOrDontCard>
        </div>
      </section>

      {/* ── Semantic tags ────────────────────────────────────────── */}
      <section id="semantic-tags" className="space-y-6">
        <SectionHeader
          title="Semantic tag selection"
          description="Choose the tag that matches your content's structural role in the document. io-text now supports address, figcaption, cite, and legend in addition to the core set."
        />
        <div className="space-y-3">
          <RuleCard label="p — Body paragraphs (default)">
            Default tag for standalone paragraphs of body copy.
          </RuleCard>
          <RuleCard label="span — Inline text">
            For inline text that needs size, weight, or color variation within a paragraph. Does not add block-level spacing.
          </RuleCard>
          <RuleCard label="blockquote — Extended quotations">
            For quoted content from external sources. Pair with a <C>cite</C> child or <C>cite</C> attribute for the source.
          </RuleCard>
          <RuleCard label="address — Contact information">
            Wraps contact information (postal address, email, phone) for the nearest article or body element. Screen readers announce it as &quot;contact information&quot;.
          </RuleCard>
          <RuleCard label="figcaption — Figure captions">
            For caption text inside a <C>&lt;figure&gt;</C> element, e.g. image captions, diagram descriptions.
          </RuleCard>
          <RuleCard label="cite — Work title or source reference">
            Wraps the title of a work being cited (book, article, film). Use inside a blockquote or alongside a quotation.
          </RuleCard>
          <RuleCard label="legend — Fieldset labels">
            Caption for a <C>&lt;fieldset&gt;</C> group. Required for accessible form grouping. Note: because io-text renders in the light DOM, it works as a legend without additional ARIA.
          </RuleCard>
          <RuleCard label="time — Machine-readable dates">
            For dates and times. Always pair with a <C>datetime</C> prop containing a machine-parseable ISO 8601 string (WCAG 1.3.1).
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
