'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoPaginationUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use pagination to split large datasets into predictable pages with clear position and navigation controls."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use pagination when a dataset has more results than can be displayed at once, such as tables, search results, and article archives.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Provide clear indication of position with active page styling and a known total page count.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use pagination for naturally flowing content like long-form articles or chat history. Prefer infinite scroll in those cases.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show pagination when there are fewer than 2 pages. Hide it entirely when it adds no navigation value.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="page-range-behaviour" className="space-y-6">
        <SectionHeader
          title="Page range behaviour"
          description="The component adapts the visible page range to keep the current page centered when possible."
        />
        <div className="space-y-3">
          <RuleCard label="Up to 7 pages">
            Show all page numbers directly with no ellipsis.
          </RuleCard>
          <RuleCard label="8 or more pages">
            Show first page, last page, active page ± 1, and ellipsis where there are gaps.
          </RuleCard>
          <RuleCard label="Boundary controls">
            The previous button is disabled on page 1 and the next button is disabled on the last page.
          </RuleCard>
        </div>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Navigation labels should be explicit and understandable for both visual users and assistive technology users."
        />
        <div className="space-y-3">
          <RuleCard label="Use descriptive nav labels">
            Keep <C>prev-label</C> and <C>next-label</C> descriptive for screen readers, such as &ldquo;Previous page&rdquo; and &ldquo;Next page&rdquo;.
          </RuleCard>
          <RuleCard label="Avoid unlabeled icon controls">
            Never use icon-only prev/next controls without an accessible label on the buttons.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
