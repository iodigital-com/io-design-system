'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoAiTagUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-ai-tag is a disclosure badge for the EU AI Act. Use it wherever content was produced or modified by an AI system."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>variant=&apos;generated&apos;</C> when the entire content block (text, image, code) was created by an AI model without human authoring.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>variant=&apos;modified&apos;</C> when a human created the content but an AI system made substantive edits — rewriting, expanding, or translating.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>variant=&apos;abbreviation&apos;</C> in space-constrained contexts (table cells, inline tags) where the full label would be too long.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set the correct <C>locale</C> prop to match the language of the surrounding page content.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use io-ai-tag as a general-purpose badge for non-AI content. Reserve it strictly for AI transparency disclosures.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not suppress or hide the tag from users who need transparency about AI-generated content. Visibility is a legal requirement under the EU AI Act.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not roll your own AI disclosure badge using io-tag + icons — this component provides the correct <C>&lt;abbr&gt;</C> semantics and i18n structure.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="Three variants cover the spectrum from minimal to verbose disclosure."
        />
        <div className="space-y-3">
          <RuleCard label="abbreviation — space-constrained contexts">
            Renders <C>AI</C> as an <C>&lt;abbr&gt;</C> element with <C>title=&quot;artificial intelligence&quot;</C>.
            Screen readers and pointer devices can access the full term. Use in table cells, chip groups,
            or compact UI where the full phrase is impractical.
          </RuleCard>
          <RuleCard label="generated — full AI generation disclosure">
            Renders the locale-specific &ldquo;AI-generated&rdquo; string. Use for content blocks,
            articles, or images that were entirely produced by an AI model with no human authoring.
          </RuleCard>
          <RuleCard label="modified — human content edited by AI">
            Renders the locale-specific &ldquo;AI-modified&rdquo; string. Use when a human created
            the original content and an AI system made substantive changes — rewriting, translating,
            summarising, or expanding.
          </RuleCard>
        </div>
      </section>

      <section id="locales" className="space-y-6">
        <SectionHeader
          title="Locales"
          description="Use the locale prop to match the language of the surrounding content."
        />
        <div className="space-y-3">
          <RuleCard label="en — English (default)">
            The default locale. Labels: &ldquo;AI&rdquo;, &ldquo;AI-generated&rdquo;, &ldquo;AI-modified&rdquo;.
            Unknown locales fall back to English automatically.
          </RuleCard>
          <RuleCard label="nl — Dutch">
            Labels: &ldquo;AI&rdquo;, &ldquo;AI-gegenereerd&rdquo;, &ldquo;AI-aangepast&rdquo;.
            iO Digital&apos;s primary Dutch-language market locale.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
