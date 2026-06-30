'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoAiTagAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-ai-tag uses semantic HTML to ensure assistive technologies can convey AI disclosure to users."
        />
        <AriaTable
          rows={[
            {
              attribute: 'abbr[title]',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  &quot;artificial intelligence&quot; (locale-specific)
                </span>
              ),
              description: 'When variant is "abbreviation", the component wraps the short label in an <abbr> element. Screen readers announce the title attribute on focus, providing the full term.',
            },
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>
                  None (implicit generic on span)
                </span>
              ),
              description: 'For generated and modified variants, the component renders plain text inside a span. No special ARIA role is needed — the label text itself is the disclosure.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-ai-tag is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The component uses --io-color-primary (#0000D2) on --io-color-primary-bg background. The brand blue achieves the required 4.5:1 contrast ratio against the light background."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Colour is not the sole indicator. The badge text always conveys the disclosure ('AI', 'AI-generated', 'AI-modified') — colour provides additional visual context only."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The abbreviation variant uses <abbr title='...'> so screen readers can read the full term. The generated and modified variants use literal text labels."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for accessible AI transparency disclosure."
        />
        <RuleCard label="Match locale to page language">
          Always set the locale prop to match the primary language of the surrounding content.
          Mismatched language labels confuse screen reader users who have a language-specific speech synthesiser configured.
        </RuleCard>
        <RuleCard label="Do not use color alone for disclosure">
          The badge colour signals &ldquo;AI&rdquo; visually, but the text label must always be present.
          Never remove the text content to create a colour-only indicator.
        </RuleCard>
        <RuleCard label="Pair with surrounding context">
          Place io-ai-tag adjacent to or immediately above the content it describes.
          Screen reader users benefit from proximity between the disclosure and the content it refers to.
        </RuleCard>
      </section>

    </div>
  );
}
