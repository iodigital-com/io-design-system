'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-breadcrumb uses native HTML landmark and list semantics. No custom ARIA roles are required."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-label="Breadcrumb"',
              value: 'On the wrapping <nav>',
              description: 'Labels the landmark so screen readers can identify it in the landmarks list. Without this label, multiple unlabelled nav elements on a page become indistinguishable.',
            },
            {
              attribute: 'aria-current="page"',
              value: 'On the last item',
              description: 'Indicates that this item represents the current page. Screen readers announce the item with "current" or similar language. The last item is always rendered as a <span>, never a link.',
            },
            {
              attribute: 'aria-hidden="true"',
              value: 'On separators',
              description: 'Separators (chevron SVG or slash text) are decorative — they are hidden from the accessibility tree so screen readers do not announce them between each item label.',
            },
            {
              attribute: 'aria-label="Show full breadcrumb path"',
              value: 'On the expand button',
              description: 'Provides an accessible name for the … expand button when the breadcrumb is collapsed. Without this label, the button would be announced as "…" which is not meaningful.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-breadcrumb is tested against WCAG 2.2 Level AA. All relevant success criteria pass."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="2.4.8"
            level="AAA"
            title="Location"
            note="The breadcrumb provides a clear indication of the user's location within the site hierarchy. The nav landmark with aria-label='Breadcrumb' allows screen reader users to navigate directly to the breadcrumb."
          />
          <ComplianceCard
            criterion="2.4.4"
            level="A"
            title="Link Purpose (In Context)"
            note="Each breadcrumb link uses the page title as its text label — the link destination is clear without surrounding context. The current page is not a link, preventing confusion."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The ordered list (<ol>) structure conveys the hierarchical relationship between items. The nav landmark identifies the breadcrumb as a navigation region. aria-current='page' programmatically marks the active location."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The nav has an accessible name (aria-label). The expand button has an accessible label. The current page item has aria-current='page'. All interactive elements have programmatically determinable names."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All links and the expand button are reachable and activatable by keyboard. Tab navigates forward through items; Shift+Tab navigates backward. Enter activates links and the expand button."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Link text uses --io-color-primary (Energetic Blue). Current page and separator text uses --io-text-secondary. Both meet the 4.5:1 contrast ratio requirement against standard page backgrounds."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive breadcrumb navigation across all surfaces and assistive technologies."
        />
        <RuleCard label="Always mark the current page item">
          Omit the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>href</code> on the last item so it renders with <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-current=&quot;page&quot;</code>. Linking the current page creates a confusing experience for keyboard and screen reader users.
        </RuleCard>
        <RuleCard label="Use descriptive item labels">
          Item labels should match the destination page&apos;s <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<title>'}</code> or <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<h1>'}</code>. Avoid abbreviations or internal codes that are not meaningful to users.
        </RuleCard>
        <RuleCard label="Ensure the expand button is keyboard accessible">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>…</code> button is a native <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<button>'}</code> element and receives focus naturally. Do not suppress its focus styles — the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>--io-focus-inner</code> ring is visible in both light and dark modes.
        </RuleCard>
      </section>

    </div>
  );
}
