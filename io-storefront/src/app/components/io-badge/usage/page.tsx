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
              Use the <C>blue</C> variant for neutral brand-linked labels such as &ldquo;New&rdquo;, &ldquo;Beta&rdquo;, or category tags where the accent colour adds context.
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
              Use the <C>outline</C> variant on dark or strongly coloured backgrounds — the low-contrast border becomes invisible. Use <C>dark</C> or a solid variant instead.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Variants ─────────────────────────────────────────────── */}
      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="Nine variants cover brand colours and semantic states. Choose by meaning first — reserve brand colours for categorisation, semantic colours for system feedback."
        />

        <div className="space-y-3">
          <SubsectionTitle>Brand variants</SubsectionTitle>
          <RuleCard label="blue — Brand-linked neutral label">
            The default variant. Uses accent-aware tokens so it remains legible in both light and dark mode.
            Ideal for &ldquo;New&rdquo;, &ldquo;Beta&rdquo;, &ldquo;Featured&rdquo;, or category tags that should carry the io Digital brand colour.
          </RuleCard>
          <RuleCard label="beige — Calm warm neutral">
            A muted, warm-toned label for low-priority tags. Works well on warm off-white surfaces (cards, sidebars)
            where a blue badge would feel out of place.
          </RuleCard>
          <RuleCard label="dark — High-contrast solid">
            Maximum contrast on light surfaces. Use for prominent classification tags — content type, tier, or
            plan labels — where the badge must anchor the layout and draw the eye without a brand colour.
          </RuleCard>
          <RuleCard label="orange — Energetic accent">
            Signals energy, action, or &ldquo;featured&rdquo; status. Use sparingly for promotional or highlighted categories.
            Overuse reduces its distinctiveness — limit to one or two badges per view.
          </RuleCard>
          <RuleCard label="rouge — Bold brand accent">
            A bold, distinctive label for exclusive or special-status contexts — &ldquo;Premium&rdquo;, &ldquo;Limited&rdquo;, &ldquo;Invitation only&rdquo;.
            Do not use for system errors; use <C>error</C> instead.
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
          <RuleCard label="outline — Minimal no-fill label">
            No background or brand colour — a subtle, neutral label for contexts where colour would be too loud.
            Use on clean white or lightly tinted surfaces only. Invisible on dark backgrounds.
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
