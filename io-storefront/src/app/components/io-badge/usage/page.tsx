'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBadgeUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Badges are passive labels — not buttons, not links. Choose the right variant and keep the text short so the badge communicates instantly."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use a badge to categorise content with a single concise label — 1 to 3 words maximum.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use semantic variants (<C>success</C>, <C>warning</C>, <C>error</C>) to communicate status alongside descriptive text or an icon.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>primary</C> variant for brand-linked labels such as &ldquo;New&rdquo;, &ldquo;Beta&rdquo;, or category tags where the accent colour adds context.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Anchor a badge to a heading, table cell, card, or list item so users have full context for what the label refers to.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use badges for interactive actions — badges are passive labels, not buttons. Wrap in <C>{'<io-button>'}</C> or a native <C>{'<button>'}</C> if the element must be clickable.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Rely on colour alone to convey meaning — always include descriptive text inside the badge so colour-blind users receive the same information.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Stack more than 2–3 badges in a single row. Consolidate into one descriptive label, or reconsider whether badges are the right pattern.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use the <C>subtle</C> variant on dark or strongly coloured backgrounds — the low-contrast fill becomes hard to read. Use <C>primary</C> or a semantic variant instead.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Variants ─────────────────────────────────────────────── */}
      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="Seven semantic variants cover brand and system-feedback states. Choose by meaning first — reserve brand colours for categorisation, semantic colours for system feedback."
        />

        <div className="space-y-3">
          <SubsectionTitle>Brand variants</SubsectionTitle>
          <RuleCard label="primary — Brand-linked label">
            The default variant. Uses accent-aware tokens so it remains legible in both light and dark mode.
            Ideal for &ldquo;New&rdquo;, &ldquo;Beta&rdquo;, &ldquo;Featured&rdquo;, or category tags that should carry the io Digital brand colour.
          </RuleCard>
          <RuleCard label="neutral — Calm baseline">
            A muted, low-emphasis label for general-purpose or low-priority tags. Works on all standard background surfaces.
          </RuleCard>
          <RuleCard label="info — Informational accent">
            Use for contextual or informational labels that are not tied to a positive/negative outcome — e.g. &ldquo;Draft&rdquo;, &ldquo;Preview&rdquo;.
          </RuleCard>
          <RuleCard label="subtle — Minimal low-fill label">
            A low-contrast, understated label for contexts where a strong colour would be too loud. Use on clean surfaces only — avoid on dark or strongly coloured backgrounds.
          </RuleCard>
        </div>

        <div className="space-y-3">
          <SubsectionTitle>Semantic variants</SubsectionTitle>
          <RuleCard label="success — Positive system state">
            Use for active, completed, verified, or healthy states. Pairs well with a checkmark icon and a short
            positive label: &ldquo;Active&rdquo;, &ldquo;Verified&rdquo;, &ldquo;Completed&rdquo;.
          </RuleCard>
          <RuleCard label="warning — Cautionary state">
            Use for pending, expiring, degraded, or needs-attention states. Always pair with explanatory body text — the
            badge flags the issue; nearby copy explains what action to take.
          </RuleCard>
          <RuleCard label="error — Critical state">
            Use for failed, blocked, or invalid states. Never use as a substitute for inline form validation — use
            the input component&apos;s error state instead. Reserve this badge for record- or entity-level status indicators.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Choose size by density and hierarchy. Keep badge size aligned with nearby typography and controls."
        />
        <div className="space-y-3">
          <RuleCard label="sm — Dense metadata">
            Use <C>sm</C> in compact tables, list rows, and secondary metadata where space is limited.
          </RuleCard>
          <RuleCard label="md — Default">
            Use <C>md</C> for general-purpose badges in cards, lists, and content headers.
          </RuleCard>
          <RuleCard label="lg — High emphasis">
            Use <C>lg</C> sparingly for prominent status chips where stronger visual weight improves scanning.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Badge text is constrained by design — keep it short, scannable, and self-explanatory."
        />
        <div className="space-y-3">
          <RuleCard label="Keep text to 1–3 words">
            The badge renders with <C>white-space: nowrap</C> — longer strings will overflow their container.
            If you need more than three words, consider a tag component or a tooltip instead.
          </RuleCard>
          <RuleCard label="Use sentence case for category labels">
            Write &ldquo;New feature&rdquo; not &ldquo;NEW FEATURE&rdquo;. All-caps is appropriate only in code or technical contexts
            (e.g. HTTP methods: &ldquo;GET&rdquo;, &ldquo;POST&rdquo;). Avoid title case — it slows reading.
          </RuleCard>
          <RuleCard label="Avoid punctuation">
            Badges are labels, not sentences. Omit trailing full stops, commas, or colons. Exception: abbreviations
            that require a full stop for clarity (e.g. &ldquo;v2.0&rdquo;).
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
