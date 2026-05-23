'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Breadcrumbs orient users within deep hierarchies. Use them when the page is nested 2 or more levels deep and users need a clear path back."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use breadcrumbs on pages that are 2+ levels deep in a hierarchy — product category pages, documentation subsections, or settings sub-pages.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set the last item as the current page — omit its <C>href</C> so it renders as a non-interactive <C>{'<span aria-current="page">'}</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>maxVisible</C> to collapse very deep paths (5+ items) so the breadcrumb does not overwhelm narrow viewports.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Choose the separator that matches your site&apos;s visual language — chevron for modern UI, slash for documentation or file paths.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use breadcrumbs on top-level pages — a single-item breadcrumb adds noise with no navigational value.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Give the last item an <C>href</C> — the current page should never be a link. Screen readers rely on <C>aria-current=&quot;page&quot;</C> to identify the active location.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use breadcrumbs as the primary navigation — they supplement the main nav; they do not replace it.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Skip levels in the hierarchy — each breadcrumb item must correspond to an actual ancestor page.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Items API ────────────────────────────────────────────── */}
      <section id="items-api" className="space-y-6">
        <SectionHeader
          title="Items API"
          description="Items are passed as a JSON string because Stencil cannot accept complex object arrays as HTML attributes directly."
        />
        <div className="space-y-3">
          <RuleCard label="Last item is the current page">
            The last item in the array is always treated as the current page. Omit its <C>href</C> — the component renders it as <C>{'<span aria-current="page">'}</C> instead of a link.
          </RuleCard>
          <RuleCard label="JSON string prop">
            Pass items via the <C>items</C> attribute as a serialised JSON string:{' '}
            <C>{`items='[{"label":"Home","href":"/"},{"label":"Current"}]'`}</C>. In JavaScript, use <C>JSON.stringify()</C> before setting the property.
          </RuleCard>
          <RuleCard label="Items without href render as plain text">
            Non-last items without an <C>href</C> render as <C>{'<span>'}</C> rather than a link — useful for unlinked intermediate levels.
          </RuleCard>
        </div>
      </section>

      {/* ── Separator choice ─────────────────────────────────────── */}
      <section id="separator" className="space-y-6">
        <SectionHeader
          title="Separator choice"
          description="The separator prop controls the visual divider between items. Both options are aria-hidden so assistive technologies do not announce them."
        />
        <div className="space-y-3">
          <RuleCard label="chevron (default) — Modern UI">
            A small right-pointing SVG chevron. Use in application interfaces, dashboards, and e-commerce sites for a clean, icon-based visual language.
          </RuleCard>
          <RuleCard label="slash — Documentation and file paths">
            A plain <C>/</C> character. Use in documentation sites, developer tools, and file-browser contexts where the path metaphor is explicit.
          </RuleCard>
        </div>
      </section>

      {/* ── maxVisible collapsing ────────────────────────────────── */}
      <section id="max-visible" className="space-y-6">
        <SectionHeader
          title="Collapsing long paths"
          description="Use maxVisible to hide middle items behind an expand button when the hierarchy is deeper than the viewport comfortably supports."
        />
        <div className="space-y-3">
          <RuleCard label="Always preserves first and last items">
            When collapsed, the first item (typically &ldquo;Home&rdquo;) and the current page are always visible. Middle items are replaced by a <C>…</C> expand button.
          </RuleCard>
          <RuleCard label="Expand is one-way">
            Clicking <C>…</C> reveals the full path permanently for that page visit — there is no collapse-again action. Once expanded, the full breadcrumb stays visible.
          </RuleCard>
          <RuleCard label="Changing items resets collapse state">
            If the <C>items</C> prop changes (e.g. navigation to a new page), the collapse state resets to collapsed automatically via the <C>@Watch(&apos;items&apos;)</C> hook.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
