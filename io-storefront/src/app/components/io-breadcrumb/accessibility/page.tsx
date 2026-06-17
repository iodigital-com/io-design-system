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
              attribute: 'aria-label (from label prop)',
              value: 'On the wrapping <nav>',
              description: "Labels the landmark so screen readers can identify it in the landmarks list. Defaults to 'Breadcrumb'. Override via the label prop for non-English UIs or when two breadcrumbs coexist on the same page (WCAG 2.4.6).",
            },
            {
              attribute: 'aria-current="page"',
              value: 'On the last io-breadcrumb-item span',
              description: 'Indicates that this item represents the current page. Screen readers announce the item with "current" or similar language. The last item is always rendered as a span, never a link.',
            },
            {
              attribute: 'aria-hidden="true"',
              value: 'On .breadcrumb__separator spans',
              description: 'Separators are decorative — they are hidden from the accessibility tree so screen readers do not announce them between each item label.',
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
            note="The nav has an accessible name (aria-label). The current page item has aria-current='page'. All interactive elements (links) have programmatically determinable names from their slot content."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All links are natively keyboard reachable and activatable. Tab navigates forward through items; Shift+Tab navigates backward. Enter activates links."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Link text uses --io-color-primary (Energetic Blue). Current page text uses --io-text-secondary. Both meet the 4.5:1 contrast ratio requirement against standard page backgrounds."
          />
          <ComplianceCard
            criterion="2.4.11"
            level="AA"
            title="Focus Appearance"
            note="Link focus ring uses both outline (2px solid --io-focus-inner) and box-shadow (0 0 0 4px --io-focus-outer), matching the system-wide focus pattern established across iO DS interactive components."
          />
          <ComplianceCard
            criterion="2.4.6"
            level="AA"
            title="Headings and Labels"
            note="The nav aria-label defaults to 'Breadcrumb' and can be localised via the label prop. Non-English deployments should override this value to match the visible UI language."
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
          Either set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>current</code> on the last <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-breadcrumb-item</code>, or omit it — the parent automatically infers it. This ensures <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-current=&quot;page&quot;</code> is always present.
        </RuleCard>
        <RuleCard label="Use descriptive item labels">
          Slot text should match the destination page&apos;s <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<title>'}</code> or <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<h1>'}</code>. Avoid abbreviations or internal codes that are not meaningful to users.
        </RuleCard>
        <RuleCard label="Ensure links are keyboard accessible">
          Links inside <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-breadcrumb-item</code> receive focus naturally. Do not suppress focus styles — the focus ring uses both <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>--io-focus-inner</code> (outline) and <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>--io-focus-outer</code> (box-shadow) on <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>:focus-visible</code> to satisfy WCAG 2.4.11.
        </RuleCard>
        <RuleCard label="Localise the nav aria-label">
          Always set the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop when deploying in a non-English language. The default value <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&apos;Breadcrumb&apos;</code> will mismatch the UI language and violate WCAG 2.4.6.
        </RuleCard>
      </section>

    </div>
  );
}
