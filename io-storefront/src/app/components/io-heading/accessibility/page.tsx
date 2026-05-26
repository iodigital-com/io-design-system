'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoHeadingAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-heading is a passive display element. It is not focusable and receives no keyboard events of its own."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Heading elements are non-interactive and are never inserted into the tab sequence. Focus skips over them entirely.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Same as Tab — the heading is not focusable in either direction.',
            },
          ]}
        />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
            Note — Screen reader heading navigation
          </p>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            Screen reader users navigate pages by heading level using the <strong>H</strong> key (next heading),
            <strong> 1–6</strong> keys (specific levels), and virtual cursor navigation. A correct document outline
            (h1 → h2 → h3 in logical order, no level skips) is essential for this navigation to be meaningful.
          </p>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-heading renders native heading elements with no ARIA overrides. Screen readers announce the heading text and its semantic level."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Implicit heading (from tag)</span>
              ),
              description: 'No ARIA role is set. The heading role comes from the native h1–h6 element. Screen readers announce the heading level number alongside the text content.',
            },
            {
              attribute: 'color prop',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not exposed</span>
              ),
              description: 'The color prop controls visual appearance only. Color is never announced to assistive technologies.',
            },
            {
              attribute: 'size prop',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not exposed</span>
              ),
              description: 'The size prop controls visual font size only. It does not affect the announced heading level — that is determined by the tag prop.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-heading is tested against WCAG 2.2 Level AA. All relevant success criteria pass across all heading levels."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Primary and secondary color tokens meet 4.5:1 contrast ratio for normal text. Large text (18pt+) meets the 3:1 ratio. All values respond correctly in light and dark mode."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Headings are rendered as native h1–h6 elements. The semantic structure is conveyed to assistive technologies through the implicit heading role and level, not through visual styling."
          />
          <ComplianceCard
            criterion="2.4.6"
            level="AA"
            title="Headings and Labels"
            note="Heading text must describe the topic or purpose of the section that follows. io-heading enforces no content requirements — authors are responsible for descriptive heading text."
          />
          <ComplianceCard
            criterion="2.4.10"
            level="AAA"
            title="Section Headings"
            note="Organised content into sections defined by headings aids navigation for all users, especially those using assistive technologies. Use heading levels to create a logical outline."
          />
          <ComplianceCard
            criterion="1.4.4"
            level="AA"
            title="Resize Text"
            note="All heading sizes use --io-font-size-* tokens in rem units. Headings scale correctly when the user increases browser font size up to 200%."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible heading hierarchies with io-heading."
        />
        <RuleCard label="Always provide the tag prop">
          io-heading requires a tag for correct semantics. Without it, a console warning is logged and it falls back to h2 — which may be structurally incorrect. Always be explicit about the heading level.
        </RuleCard>
        <RuleCard label="Never skip heading levels">
          Going from h1 to h4 creates gaps in the document outline that break screen reader heading navigation. Maintain a continuous hierarchy: h1 → h2 → h3 → h4 in descending order.
        </RuleCard>
        <RuleCard label="Decouple visual size from semantic level">
          A visually small h2 sidebar heading and a visually large h2 page heading are both h2 in the document outline. The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>size</code> prop
          controls only the visual presentation — use it freely without affecting semantics.
        </RuleCard>
        <RuleCard label="Use one h1 per page">
          The h1 represents the main topic of the page. Multiple h1 elements create ambiguity for screen reader users navigating by heading. Single-page apps with route changes should update the h1 to reflect the new view.
        </RuleCard>
      </section>

    </div>
  );
}
