'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoWordmarkAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-wordmark is a passive display element. It is not focusable and receives no keyboard events of its own."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'The wordmark is non-interactive and is never inserted into the tab sequence. Focus skips over it entirely.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Same as Tab — the wordmark is not focusable in either direction.',
            },
          ]}
        />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
            Note
          </p>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            If the wordmark is placed inside an interactive parent — for example a navigation link or a button —
            keyboard events belong to that parent element. The wordmark&apos;s accessible name (from <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code>)
            contributes to the parent&apos;s computed accessible name.
          </p>
        </div>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description='io-wordmark renders with role="img" and aria-label="io Digital". Screen readers announce the label rather than reading the raw text content.'
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  img
                </code>
              ),
              description: 'The host element carries role="img" so screen readers treat it as a named graphic rather than reading the raw "io" and "digital" text fragments separately.',
            },
            {
              attribute: 'aria-label',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;io Digital&quot; (default)
                </code>
              ),
              description: 'The accessible name defaults to "io Digital". Override with the ariaLabel prop when a more specific announcement is needed.',
            },
            {
              attribute: 'ariaLabel prop',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Configurable</span>
              ),
              description: 'Set the ariaLabel prop to customise the announcement — for example "iO Digital logo" when the wordmark appears as the primary page identifier.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-wordmark is tested against WCAG 2.2 Level AA across all size and mono variants."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note='The default "io" colour (#0000D2) meets the 4.5:1 contrast ratio on white backgrounds. The "digital" part inherits the surrounding text colour, which must meet contrast requirements set by the consuming context. In mono mode, the full wordmark inherits the text colour.'
          />
          <ComplianceCard
            criterion="1.4.4"
            level="AA"
            title="Resize Text"
            note="Wordmark typography is driven entirely by CSS token-based font-size values. The wordmark scales correctly when the user increases browser font size up to 200%."
          />
          <ComplianceCard
            criterion="1.1.1"
            level="A"
            title="Non-text Content"
            note='The component carries role="img" and aria-label="io Digital" by default, providing a text alternative for the graphic representation of the brand name. The ariaLabel prop allows override for context-specific announcements.'
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note='The wordmark has an explicit role="img" and a configurable accessible name via aria-label. No interactive state is implied — this is correct for a passive brand display element.'
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible experiences with io-wordmark."
        />
        <RuleCard label='Keep the default aria-label unless you have a reason to override'>
          The default <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label=&quot;io Digital&quot;</code> is
          correct for most uses. Only override if the surrounding context requires a more specific announcement —
          for example &ldquo;io Digital homepage&rdquo; when the wordmark is also a navigation link.
        </RuleCard>
        <RuleCard label="Avoid redundant accessible names in interactive wrappers">
          If the wordmark is wrapped in a link or button, that element already announces its own accessible name.
          The wordmark&apos;s <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code> should
          complement — not duplicate — the parent&apos;s label. Consider using an empty or hidden wordmark in this case.
        </RuleCard>
        <RuleCard label="Ensure sufficient contrast in mono mode">
          When <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>mono</code> is
          set, the wordmark inherits <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>currentColor</code>.
          Verify the surrounding text colour achieves at least 4.5:1 contrast against the background surface.
        </RuleCard>
      </section>

    </div>
  );
}
