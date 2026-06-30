'use client';

import { SectionHeader, RuleCard, AriaTable, ComplianceCard } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoFlagAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-flag uses a native <img> element with an alt attribute for accessible country identification."
        />
        <AriaTable
          rows={[
            {
              attribute: 'img[alt]',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  Country name (e.g. &quot;Netherlands&quot;)
                </span>
              ),
              description: "The flag image's alt text defaults to the country's full English name derived from the ISO code. This allows screen readers to announce the country when focus or reading order reaches the flag.",
            },
            {
              attribute: 'img[alt] = ""',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>
                  Decorative (set label=&quot;&quot;)
                </span>
              ),
              description: "Set label='' when the country name is already present in adjacent text and the flag is purely decorative. This hides the image from screen readers and prevents redundant announcement.",
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-flag is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.1.1"
            level="A"
            title="Non-text Content"
            note="The flag image has a meaningful alt attribute derived from the ISO country code. The consumer can override with an explicit label prop or suppress with label='' for decorative usage."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Flags rely on colour to convey country identity. Always pair io-flag with a visible country name or other text label so meaning is not communicated by colour alone."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The component renders a native <img> — no ARIA role override needed. The alt attribute provides the accessible name."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for accessible flag usage."
        />
        <RuleCard label="Always pair flags with visible text">
          Flags rely on colour and pattern to convey meaning — colour-blind users may not distinguish some flag pairs.
          Always provide a text label (country name, language code, or region) adjacent to or inside the same control.
        </RuleCard>
        <RuleCard label="Use label='' when the country is named in adjacent text">
          If the flag appears inside a list item that already includes the country name (e.g. &ldquo;Netherlands&rdquo;),
          set <code style={{ fontFamily: 'monospace' }}>label=&quot;&quot;</code> to mark the image as decorative
          and prevent screen readers from announcing &ldquo;Netherlands&rdquo; twice.
        </RuleCard>
        <RuleCard label="Override the label prop for non-English interfaces">
          The default label is always in English (derived from FLAG_COUNTRY_NAMES). For Dutch or other language interfaces,
          pass the translated country name via the <code style={{ fontFamily: 'monospace' }}>label</code> prop
          so screen readers announce the name in the page language.
        </RuleCard>
      </section>

    </div>
  );
}
