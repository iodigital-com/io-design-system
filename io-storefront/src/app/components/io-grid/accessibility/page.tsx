'use client';

import { SectionHeader, A11yCheck } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoGridAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="structure" className="space-y-6">
        <SectionHeader
          title="Semantic structure"
          description="io-grid and io-grid-item are purely layout primitives with no interactive behaviour. They emit no ARIA roles and introduce no screen reader announcements."
        />
        <A11yCheck status="pass">
          Both components render in the light DOM (shadow: false), so screen readers see only the slotted content — no wrapper elements are injected.
        </A11yCheck>
        <A11yCheck status="pass">
          Column layout is communicated visually only. Screen readers traverse content in DOM order — ensure DOM order matches reading order when designing column layouts.
        </A11yCheck>
      </section>

      <section id="dom-order" className="space-y-6">
        <SectionHeader
          title="DOM order matches reading order"
          description="Ensure the DOM order of io-grid-item children reflects the logical reading sequence, not just the visual layout."
        />
        <A11yCheck status="pass">
          A three-column card grid where cards A, B, C appear left-to-right visually should also appear A, B, C in the DOM. Never use colStart to visually reorder content if the DOM order would confuse screen readers.
        </A11yCheck>
        <A11yCheck status="note">
          When using colStart or rowSpan to create complex visual arrangements, verify that a keyboard user tabbing through the DOM reaches elements in a logical sequence (WCAG 2.4.3).
        </A11yCheck>
      </section>

      <section id="responsive" className="space-y-6">
        <SectionHeader
          title="Responsive behaviour"
          description="The grid does not auto-collapse columns on small screens. Implement responsive behaviour via CSS media queries on io-grid-item."
        />
        <A11yCheck status="note">
          On narrow viewports, wide column spans may cause horizontal scrolling. Test that content remains reachable without horizontal scrolling on 320px viewports (WCAG 1.4.10 Reflow).
        </A11yCheck>
      </section>

    </div>
  );
}
