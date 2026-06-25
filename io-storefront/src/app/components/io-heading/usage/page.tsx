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

      {/* ── Colour ──────────────────────────────────────────────── */}
      <section id="colour" className="space-y-6">
        <SectionHeader
          title="Colour"
          description="Heading colour is set via the color prop and maps to semantic design tokens."
        />
        <div className="space-y-3">
          <RuleCard label="primary (default)">
            Maps to <C>var(--io-text-primary)</C>. Use for all standard headings against page, card, and surface backgrounds.
          </RuleCard>
          <RuleCard label="secondary">
            Maps to <C>var(--io-text-secondary)</C>. Use for supporting or subdued headings where primary text would compete with surrounding content.
          </RuleCard>
          <RuleCard label="inverse">
            Maps to <C>var(--io-text-inverse)</C>. Use on dark or brand-coloured backgrounds — hero sections, dark mode cards.
          </RuleCard>
          <RuleCard label="brand">
            Maps to <C>var(--io-color-primary)</C>. Use sparingly for highlighted headings — feature call-outs, marketing sections, or brand accent moments.
          </RuleCard>
          <RuleCard label="Automatic contrast">
            All colour tokens are defined per theme (light and dark). io-heading automatically uses the correct value — do not override colour with hardcoded hex values.
          </RuleCard>
        </div>
      </section>

      {/* ── Alignment ───────────────────────────────────────────── */}
      <section id="alignment" className="space-y-6">
        <SectionHeader
          title="Alignment"
          description="Text alignment is set via the align prop."
        />
        <div className="space-y-3">
          <RuleCard label="start (default)">
            Left-aligned in LTR languages. Correct for body-context headings, form sections, and content pages.
          </RuleCard>
          <RuleCard label="center">
            Use for hero headings, modal titles, empty-state headings, and marketing sections where centred layout is intended.
          </RuleCard>
          <RuleCard label="end">
            Right-aligned in LTR. Use for narrow layout contexts such as table column headers in right-aligned numeric columns.
          </RuleCard>
          <RuleCard label="RTL support">
            <C>start</C> and <C>end</C> are logical properties. In right-to-left contexts <C>start</C> aligns right and <C>end</C> aligns left automatically. Prefer <C>start</C> over <C>left</C> for internationalised applications.
          </RuleCard>
        </div>
      </section>

      {/* ── Decoupling size from tag ─────────────────────────────── */}
      <section id="size-vs-tag" className="space-y-6">
        <SectionHeader
          title="Decoupling visual size from semantic tag"
          description="The most important design pattern for io-heading: the tag prop drives the DOM, the size prop drives the visuals."
        />
        <div className="space-y-3">
          <RuleCard label="Why they are separate">
            A page may have multiple h3 elements at different visual weights — a compact sidebar h3 and a prominent article-body h3. Setting <C>tag=&quot;h3&quot;</C> on both but different <C>size</C> values keeps the DOM outline correct without sacrificing visual hierarchy.
          </RuleCard>
          <RuleCard label="Default size is 2xl for all heading levels">
            When <C>size</C> is omitted, io-heading renders at <C>2xl</C> (24px) regardless of which <C>tag</C> is set. There is no automatic per-tag size mapping. Always supply an explicit <C>size</C> value when you need a heading to render at a different visual weight.
          </RuleCard>
          <RuleCard label="Accessibility invariant">
            Never use a lower heading level (<C>tag=&quot;h4&quot;</C>) with a large size to simulate the visual appearance of an h1. The DOM order must match the logical document hierarchy for screen reader navigation.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
