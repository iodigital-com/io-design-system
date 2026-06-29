'use client';

import { SectionHeader, RuleCard, DoOrDont } from '@/components/usage/UsagePrimitives';

export default function IoTabPanelUsagePage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="When to use"
        description="Use io-tab-panel inside io-tabs when you want automatic ARIA wiring without managing panelIds, hidden attributes, and labelledby relationships manually."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoOrDont
          do
          label="Use inside io-tabs for automatic ARIA wiring"
          code={`<io-tabs>
  <io-tab-panel label="Overview">
    Overview content
  </io-tab-panel>
  <io-tab-panel label="Details">
    Details content
  </io-tab-panel>
</io-tabs>`}
        />
        <DoOrDont
          dont
          label="Do not repeat panelIds wiring when using io-tab-panel"
          code={`<!-- io-tab-panel handles this automatically -->
<io-tabs panel-ids='["p1","p2"]'>
  <button>Overview</button>
  <button>Details</button>
</io-tabs>
<div id="p1" role="tabpanel">...</div>
<div id="p2" role="tabpanel">...</div>`}
        />
      </div>

      <SectionHeader title="Guidance" />

      <div className="space-y-4">
        <RuleCard
          title="Each panel needs a unique label"
          description="The label prop becomes both the tab button text and the accessible name of the panel. Keep labels short and descriptive."
        />
        <RuleCard
          title="Panel order matches tab order"
          description="io-tabs reads io-tab-panel children in DOM order. The first panel corresponds to tab index 0, the second to index 1, and so on."
        />
        <RuleCard
          title="Use panelIds for backwards compatibility"
          description="Existing io-tabs usage with slotted buttons and panelIds still works. io-tab-panel is an additive pattern — no breaking changes."
        />
      </div>
    </div>
  );
}
