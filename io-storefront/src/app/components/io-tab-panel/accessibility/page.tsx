'use client';

import { SectionHeader, ComplianceCard } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoTabPanelAccessibilityPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="ARIA contract"
        description="io-tab-panel provides automatic ARIA wiring for tabpanel semantics when used inside io-tabs."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ComplianceCard
          criterion="4.1.2"
          level="A"
          title="Name, Role, Value"
          note="Each panel renders with role=tabpanel. The accessible name is derived from the label prop (aria-label) or the labelledBy prop (aria-labelledby)."
          status="pass"
        />
        <ComplianceCard
          criterion="2.1.1"
          level="A"
          title="Keyboard"
          note="Panels receive tabindex=0 so keyboard users can focus the panel region after activating a tab. Focus enters the panel on Tab from the tab list."
          status="pass"
        />
        <ComplianceCard
          criterion="1.3.1"
          level="A"
          title="Info and Relationships"
          note="Hidden panels use the HTML hidden attribute (display: none), correctly removing them from the accessibility tree."
          status="pass"
        />
      </div>
    </div>
  );
}
