'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbItemAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-breadcrumb-item uses native HTML list item, anchor, and span semantics. No custom ARIA roles are required."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-current="page"',
              value: 'On the current item span',
              description: 'Applied when current=true. Indicates this item represents the current page. Screen readers announce the item with "current" or similar language. The item is always a span — never a link — when current.',
            },
            {
              attribute: '<a href>',
              value: 'On non-current items with href',
              description: 'Native anchor element provides standard link semantics. The slot text becomes the accessible name. Screen readers announce the destination based on the link text.',
            },
            {
              attribute: 'display: contents on :host',
              value: 'On the host element',
              description: 'The host element is transparent in layout, so the <li> inside participates directly in the parent <ol> flow — preserving correct list semantics for screen readers.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-breadcrumb-item is tested against WCAG 2.2 Level AA. All relevant success criteria pass."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Links have their accessible name from slot text. The current page item carries aria-current='page' for programmatic determination of state."
          />
          <ComplianceCard
            criterion="2.4.4"
            level="A"
            title="Link Purpose (In Context)"
            note="Each breadcrumb link uses the page title as its accessible name. Within the ordered list context, the destination is unambiguous."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The <li> element participates in the parent <ol> list structure, conveying the hierarchical relationship programmatically."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="Links are natively keyboard focusable and activatable. The current page span is not interactive — it receives no focus, which is correct since the current page link should not be activated."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Link text uses --io-color-primary (Energetic Blue). Current page text uses --io-text-secondary. Both meet the 4.5:1 contrast ratio requirement against standard page backgrounds."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive breadcrumb items."
        />
        <RuleCard label="Never link the current page">
          Set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>current</code> on the last item (or omit it to let io-breadcrumb infer it). This ensures the item is a span with <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-current="page"</code> rather than a navigable link.
        </RuleCard>
        <RuleCard label="Use descriptive slot text">
          The slot text becomes the accessible name of the link. Match the destination page title so users can predict where the link leads without additional context.
        </RuleCard>
        <RuleCard label="Do not suppress focus styles">
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>--io-focus-inner</code> outline is applied on <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>:focus-visible</code> for keyboard users. Do not override it with <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>outline: none</code>.
        </RuleCard>
      </section>

    </div>
  );
}
