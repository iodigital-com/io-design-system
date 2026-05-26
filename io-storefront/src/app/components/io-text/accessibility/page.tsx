'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoTextAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-text is a passive display element. It is not focusable and receives no keyboard events of its own."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Text elements are non-interactive and are never inserted into the tab sequence. Focus skips over them entirely.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Same as Tab — the text element is not focusable in either direction.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-text renders semantic HTML with no ARIA overrides. Screen readers announce content based on the native element semantics."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Implicit (from HTML tag)</span>
              ),
              description: 'No ARIA role is added. The role comes from the semantic tag — p, span, div, blockquote, or time. Each carries its own implicit ARIA semantics.',
            },
            {
              attribute: 'color prop',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Not exposed</span>
              ),
              description: 'The color prop controls visual appearance only. Color is never announced. Use descriptive slot text to convey semantic meaning.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-text is tested against WCAG 2.2 Level AA. All relevant success criteria pass across all color variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All semantic color tokens (primary, secondary, success, warning, error) meet the 4.5:1 contrast ratio for normal text against standard page backgrounds in both light and dark mode."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Color is never the sole indicator of meaning. Semantic colors (success, warning, error) must always be paired with descriptive text that communicates the status without relying on color perception."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="io-text renders standard semantic HTML elements. The accessible name comes from slot text content. No interactive role or state is implied."
          />
          <ComplianceCard
            criterion="1.4.4"
            level="AA"
            title="Resize Text"
            note="All typography is driven entirely by --io-font-size-* tokens defined in rem. Text scales correctly when the user increases browser font size up to 200%."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Semantic tags (p, blockquote, time) convey structural meaning to assistive technologies. Choose the tag that matches the content's role in the document."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible text experiences with io-text."
        />
        <RuleCard label="Choose the semantically correct tag">
          Use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>p</code> for paragraphs,
          {' '}<code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>span</code> for inline runs,
          {' '}<code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>blockquote</code> for quoted content,
          {' and '}<code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>time</code> for machine-readable dates.
          Never use a semantically meaningless tag to achieve a visual result.
        </RuleCard>
        <RuleCard label="Always pair semantic colors with descriptive text">
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>success</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>warning</code>, and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code> colors
          are not announced by screen readers. The slot text must communicate the status completely — never rely on color alone.
        </RuleCard>
        <RuleCard label="Use heading components for headings">
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-text</code> does
          not render heading elements. Use <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-heading</code> for
          h1–h6 to maintain a correct and navigable document outline for screen reader users.
        </RuleCard>
        <RuleCard label="Include datetime attribute on time elements">
          When using <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>tag=&quot;time&quot;</code>,
          always pass a machine-readable <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>datetime</code> attribute
          on the host element so assistive technologies can interpret the date value correctly.
        </RuleCard>
      </section>

    </div>
  );
}
