'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoFlagUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-flag provides a consistent, accessible country flag for international UI. Use it alongside text labels, never alone."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use io-flag in io-select option rows, io-tag pills, and pricing tables to visually identify a country.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always pair the flag with a text label — the country name, region, or language — so the meaning is clear without colour vision.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>size</C> prop to match the surrounding io-icon scale and maintain visual rhythm.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>label=&quot;&quot;</C> (empty string) when the flag is purely decorative and the country name is already present in adjacent text.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use a flag as the sole indicator of a country, language, or region. Some flags represent disputed territories or are politically sensitive.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use emoji flags as a substitute — they render inconsistently across operating systems and have no accessible alt text.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use flags to represent languages. A flag represents a country, not a language. Use a language name or BCP 47 code instead.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="flag-catalogue" className="space-y-6">
        <SectionHeader
          title="Shipped flag catalogue"
          description="io-flag ships a curated subset — EU member states plus key iO Digital client regions."
        />
        <div className="space-y-3">
          <RuleCard label="EU member states (27)">
            at, be, bg, cy, cz, de, dk, ee, es, fi, fr, gr, hr, hu, ie, it, lt, lu, lv, mt, nl, pl, pt, ro, se, si, sk
          </RuleCard>
          <RuleCard label="Key client / iO presence regions (13)">
            gb, us, tr, no, ch, au, ca, jp, cn, in, br, za, ae
          </RuleCard>
          <RuleCard label="Adding new flags">
            To add a flag outside the current catalogue, update <C>IoFlagName</C> in the component&apos;s <C>types.ts</C>
            and add the country name entry to <C>FLAG_COUNTRY_NAMES</C> in <C>io-flag-utils.ts</C>.
            Flags are served from flagcdn.com — no local assets required.
          </RuleCard>
        </div>
      </section>

      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="The flag size scale mirrors io-icon for consistent alignment in mixed icon-and-flag layouts."
        />
        <div className="space-y-3">
          <RuleCard label="xs (16px) — Compact table cells and dense metadata">
            Use in the smallest density contexts — character count indicators, compact list rows.
          </RuleCard>
          <RuleCard label="sm (20px) — Inline body text">
            Matches the default body text line height. Use for inline country references in paragraphs or list items.
          </RuleCard>
          <RuleCard label="md (24px) — Default">
            Aligns with the medium io-icon size. Use in form field prefixes, io-select option rows, and io-tag pills.
          </RuleCard>
          <RuleCard label="lg (32px) and xl (40px) — Hero contexts">
            Use sparingly in country-pickers, landing pages, and pricing tables where flags should command visual weight.
          </RuleCard>
          <RuleCard label="inherit — Matches surrounding font-size">
            Use when embedding a flag inside io-button-pure or typographic text where the flag should scale with the text.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
