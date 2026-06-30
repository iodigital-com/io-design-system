'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';

export default function IoTabPanelUsagePage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="When to use"
        description="Use io-tab-panel inside io-tabs when you want automatic ARIA wiring without managing panelIds, hidden attributes, and labelledby relationships manually."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoOrDontCard type="do">
          Use inside io-tabs for automatic ARIA wiring — io-tab-panel wires role, aria-labelledby, and hidden attributes automatically.
        </DoOrDontCard>
        <DoOrDontCard type="dont">
          Do not repeat panelIds wiring when using io-tab-panel — io-tab-panel handles this automatically.
        </DoOrDontCard>
      </div>

      <SectionHeader
        title="Guidance"
        description="Guidelines for using io-tab-panel correctly inside io-tabs."
      />

      <div className="space-y-4">
        <RuleCard label="Each panel needs a unique label">
          The label prop becomes both the tab button text and the accessible name of the panel. Keep labels short and descriptive.
        </RuleCard>
        <RuleCard label="Panel order matches tab order">
          io-tabs reads io-tab-panel children in DOM order. The first panel corresponds to tab index 0, the second to index 1, and so on.
        </RuleCard>
        <RuleCard label="Use panelIds for backwards compatibility">
          Existing io-tabs usage with slotted buttons and panelIds still works. io-tab-panel is an additive pattern — no breaking changes.
        </RuleCard>
      </div>
    </div>
  );
}
