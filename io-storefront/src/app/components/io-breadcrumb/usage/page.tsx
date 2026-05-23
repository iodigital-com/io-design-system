'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── Migration note ───────────────────────────────────────── */}
      <section id="migration" className="space-y-6">
        <SectionHeader
          title="Wave XI migration: slot-based API"
          description="io-breadcrumb was migrated from a JSON string prop API to a declarative slot-based sub-component API in Wave XI (issue #320)."
        />
        <div className="space-y-3">
          <RuleCard label="Before (deprecated — items prop removed)">
            <C>{`<io-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Current"}]'></io-breadcrumb>`}</C>
          </RuleCard>
          <RuleCard label="After (current API)">
            <C>{`<io-breadcrumb>`}</C>
            <br />
            <C>{`  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>`}</C>
            <br />
            <C>{`  <io-breadcrumb-item current>Current</io-breadcrumb-item>`}</C>
            <br />
            <C>{`</io-breadcrumb>`}</C>
          </RuleCard>
          <RuleCard label="What changed">
            The <C>items</C>, <C>separator</C>, and <C>maxVisible</C> props have been removed. Content is now declarative.
            Separators are injected automatically. The separator character can be customized via the{' '}
            <C>--io-breadcrumb-separator</C> CSS custom property.
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
          <RuleCard label="Separators are auto-managed">
            You do not need to add, remove, or update separators manually. The <C>slotchange</C> handler in{' '}
            <C>io-breadcrumb</C> inserts them automatically each time children change.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
