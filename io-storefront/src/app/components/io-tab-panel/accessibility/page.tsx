'use client';

import { A11yCheck, A11ySection } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoTabPanelAccessibilityPage() {
  return (
    <div className="space-y-10">
      <A11ySection title="ARIA contract">
        <A11yCheck
          criterion="WCAG 4.1.2 — Name, Role, Value"
          description="Each panel renders with role=tabpanel. The accessible name is derived from the label prop (aria-label) or the labelledBy prop (aria-labelledby)."
          status="pass"
        />
        <A11yCheck
          criterion="WCAG 2.1.1 — Keyboard"
          description="Panels receive tabindex=0 so keyboard users can focus the panel region after activating a tab. Focus enters the panel on Tab from the tab list."
          status="pass"
        />
        <A11yCheck
          criterion="WCAG 1.3.1 — Info and Relationships"
          description="Hidden panels use the HTML hidden attribute (display: none), correctly removing them from the accessibility tree."
          status="pass"
        />
      </A11ySection>
    </div>
  );
}
