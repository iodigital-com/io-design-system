'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';

export default function IoGridUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-grid provides a shared 12-column layout contract that scales from a single column on mobile to a full 12-column layout on wide viewports."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <DoOrDontCard type="do">
              Use io-grid as the layout backbone of page sections, dashboards, and card grids.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use io-grid-item with colSpan to define how many of the 12 columns each cell occupies.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the gap prop to select a fluid spacing preset (none, sm, md, lg) driven by design tokens.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <DoOrDontCard type="dont">
              Do not use io-grid for single-axis flow layouts — use flexbox utilities for those.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not hardcode pixel column widths on io-grid-item children — the grid token system handles this.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="gap-sizes" className="space-y-4">
        <SectionHeader
          title="Gap sizes"
          description="All gap values use clamp() for fluid scaling. Choose the preset that matches the visual weight of the content."
        />
        <div className="space-y-3">
          <RuleCard label="none — 0px">
            For pixel-perfect tile grids or image mosaics where cells should abut without spacing.
          </RuleCard>
          <RuleCard label="sm — 8–16px fluid">
            Compact UI grids such as icon arrays, tag clouds, or dense data tables.
          </RuleCard>
          <RuleCard label="md — 16–36px fluid (default)">
            The standard gap for card grids, form field layouts, and content sections.
          </RuleCard>
          <RuleCard label="lg — 24–48px fluid">
            Marketing layouts, hero sections, and feature rows where generous whitespace is intentional.
          </RuleCard>
        </div>
      </section>

      <section id="column-spans" className="space-y-4">
        <SectionHeader
          title="Column spans"
          description="The 12-column base allows clean division into halves (6), thirds (4), quarters (3), and sixths (2)."
        />
        <div className="space-y-3">
          <RuleCard label="Full width — colSpan 12">
            Use for hero sections, banners, or any element that should span the full container width.
          </RuleCard>
          <RuleCard label="Half — colSpan 6">
            Use for two-column layouts. Classic for marketing split panels and side-by-side comparisons.
          </RuleCard>
          <RuleCard label="Third — colSpan 4">
            Use for three-card feature rows or three-column form layouts.
          </RuleCard>
          <RuleCard label="Sidebar — colSpan 3 + colSpan 9">
            Classic sidebar/main split. Good for filter panels, navigation drawers, and inspector panels.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
