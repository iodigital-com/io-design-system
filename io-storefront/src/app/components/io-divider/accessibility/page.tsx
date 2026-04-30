'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoDividerAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Screen reader behaviour ──────────────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-divider is a purely presentational separator. It is exposed to assistive technologies with the appropriate separator role, but carries no interactive semantics."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role="separator"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  On the inner element for all variants
                </span>
              ),
              description:
                'Announces the element as a visual separator to assistive technologies. Screen readers typically announce a separator as a brief pause or "separator" label between sections.',
            },
            {
              attribute: 'aria-orientation="vertical"',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  When <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>orientation=&quot;vertical&quot;</code>
                </span>
              ),
              description:
                'Informs AT of the separator\'s orientation. The default "horizontal" orientation does not require an explicit aria-orientation attribute (it is the default for role="separator").',
            },
            {
              attribute: '<hr> element',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Horizontal variant without label
                </span>
              ),
              description:
                'The horizontal unlabeled variant uses the native <hr> HTML element, which has an implicit role="separator". This provides the strongest semantic signal with no additional ARIA needed.',
            },
            {
              attribute: 'aria-hidden="true" on line spans',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Labeled variant only
                </span>
              ),
              description:
                'The decorative line elements flanking the label text are hidden from AT. Only the label text itself is read.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-divider is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The separator role communicates the structural division to AT programmatically, not by colour alone."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="The divider line is not the only means of conveying separation. The structural context (sectioned layout, heading hierarchy) also communicates the division."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The divider line color (--io-divider-color, defaulting to --io-border = grey-2) meets non-text contrast against white backgrounds. The label text (--io-text-secondary) meets 4.5:1 against the background."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The separator role is correctly assigned. The labeled variant uses aria-hidden on decorative line elements so only the label text is read by AT."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for accessible use of io-divider."
        />
        <RuleCard label="Do not hide dividers from AT when they convey structure">
          The separator role helps AT users understand the layout. Do not add{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-hidden=&quot;true&quot;</code>{' '}
          to the host element unless the divider is truly decorative and the same structural signal is conveyed through headings or other means.
        </RuleCard>
        <RuleCard label="Ensure sufficient contrast for the divider line">
          The default <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>--io-divider-color</code>{' '}
          uses the brand&apos;s grey-2 border token, which meets the 3:1 non-text contrast ratio against white backgrounds per WCAG 1.4.11. Override via the CSS custom property only if the new color also meets this threshold.
        </RuleCard>
      </section>

    </div>
  );
}
