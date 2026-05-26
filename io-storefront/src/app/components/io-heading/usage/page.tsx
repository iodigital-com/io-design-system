'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoHeadingUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-heading is the typography primitive for all h1–h6 headings. The semantic tag prop controls the document outline — always choose the correct level regardless of visual size."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Always provide the <C>tag</C> prop with the correct semantic heading level for the context.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>size</C> independently from <C>tag</C> — for example, a sidebar <C>h3</C> may visually use <C>size=&quot;sm&quot;</C> while the main content <C>h3</C> uses <C>size=&quot;xl&quot;</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Maintain a logical heading hierarchy: h1 → h2 → h3 in order, never skipping levels.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use a single <C>h1</C> per page for the main page title.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not choose a heading level based on how it looks — choose it based on the document structure. Use the <C>size</C> prop to control visual appearance.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not skip heading levels (e.g. jumping from h1 to h4) — this breaks screen reader navigation.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not omit the <C>tag</C> prop — io-heading logs a warning and falls back to h2, but this may be semantically incorrect for your page context.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Seven visual sizes span from compact UI labels to hero page titles. Size is decoupled from heading level."
        />
        <div className="space-y-3">
          <RuleCard label="sm (14px) — Compact UI labels">
            Use for sidebar headings, widget titles, and dense layout sections.
          </RuleCard>
          <RuleCard label="md (16px) — Body-scale headings">
            Use for card headers and low-level sub-sections in data-dense UIs.
          </RuleCard>
          <RuleCard label="lg (18px) — Section sub-headings">
            Use for secondary section titles within a page content area.
          </RuleCard>
          <RuleCard label="xl (20px) — Primary section headings">
            Use for main section headings on content pages and forms.
          </RuleCard>
          <RuleCard label="2xl (24px) — Page sub-headings">
            The default size. Use for page-level h2 headings and dialog titles.
          </RuleCard>
          <RuleCard label="3xl (30px) — Article titles">
            Use for prominent article, landing page section, and feature headings.
          </RuleCard>
          <RuleCard label="4xl (32px) — Hero headings">
            Use sparingly for hero section h1 headings where maximum visual weight is needed.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
