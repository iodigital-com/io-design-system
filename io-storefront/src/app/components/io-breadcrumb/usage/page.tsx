'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── Quick start ──────────────────────────────────────────── */}
      <section id="quick-start" className="space-y-6">
        <SectionHeader
          title="Quick start"
          description="Place io-breadcrumb-item sub-components directly inside io-breadcrumb. Separators are rendered automatically."
        />
        <div className="space-y-3">
          <RuleCard label="Basic usage">
            <C>{`<io-breadcrumb>`}</C>
            <br />
            <C>{`  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>`}</C>
            <br />
            <C>{`  <io-breadcrumb-item href="/services">Services</io-breadcrumb-item>`}</C>
            <br />
            <C>{`  <io-breadcrumb-item current>Digital Strategy</io-breadcrumb-item>`}</C>
            <br />
            <C>{`</io-breadcrumb>`}</C>
          </RuleCard>
          <RuleCard label="Current item">
            The last item should have the <C>current</C> attribute set. If omitted, <C>io-breadcrumb</C> infers it automatically on the last slotted item.
          </RuleCard>
        </div>
      </section>

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
              Set <C>current</C> on the last <C>io-breadcrumb-item</C>, or omit it — <C>io-breadcrumb</C> infers it automatically on the last slotted item.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Add <C>href</C> to every item except the current page so users can navigate back through the hierarchy.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use breadcrumbs on top-level pages — a single-item breadcrumb adds noise with no navigational value.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Set <C>href</C> on the current page item — the current page should never be a link. Screen readers rely on{' '}
              <C>aria-current=&quot;page&quot;</C> to identify the active location.
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

      {/* ── Localisation ─────────────────────────────────────────── */}
      <section id="localisation" className="space-y-6">
        <SectionHeader
          title="Localisation"
          description="Override the nav aria-label via the label prop for non-English deployments or multi-breadcrumb pages."
        />
        <div className="space-y-3">
          <RuleCard label="label prop">
            The default <C>aria-label</C> is <C>&apos;Breadcrumb&apos;</C>. Override it for non-English UIs or when multiple
            breadcrumbs appear on the same page to satisfy WCAG 2.4.6 and prevent duplicate unlabelled landmark violations.
            Example: <C>{`<io-breadcrumb label="Fil d'Ariane">`}</C>
          </RuleCard>
          <RuleCard label="Multiple breadcrumbs on one page">
            When two breadcrumbs coexist on a page (e.g. global and contextual), give each a distinct <C>label</C> value
            so screen reader landmark navigation distinguishes them.
          </RuleCard>
        </div>
      </section>

      {/* ── Separator customization ──────────────────────────────── */}
      <section id="separator" className="space-y-6">
        <SectionHeader
          title="Separator customization"
          description="The separator between items defaults to '/' and can be overridden with a CSS custom property."
        />
        <div className="space-y-3">
          <RuleCard label="CSS custom property">
            Override the separator character by setting <C>--io-breadcrumb-separator</C> on the <C>io-breadcrumb</C> element or any ancestor.
            Example: <C>{`io-breadcrumb { --io-breadcrumb-separator: '›'; }`}</C>
          </RuleCard>
          <RuleCard label="Separators are aria-hidden">
            Separator spans have <C>aria-hidden="true"</C> — they are decorative and are not announced by screen readers.
          </RuleCard>
          <RuleCard label="Separators are auto-rendered">
            You do not need to add separators manually. Each <C>io-breadcrumb-item</C> renders its own separator unless it
            has the <C>current</C> attribute.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
