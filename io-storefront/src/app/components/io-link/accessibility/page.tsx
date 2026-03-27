'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoLinkAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-link uses a native anchor element. All standard browser keyboard behaviours for links are preserved."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the link. The focus ring (double-ring pattern) becomes visible.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the link and navigates to the href destination. If target="_blank", opens in a new tab.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-link renders a native anchor element, giving it the correct implicit role and all expected browser semantics."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>link</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'The native <a> element carries an implicit role of link. Screen readers announce the element as a link with its text content.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Via slot text content</span>
              ),
              description: 'The accessible name is derived from the default slot text. Ensure the slot content is descriptive and meaningful out of context.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when disabled
                </span>
              ),
              description: 'When disabled is true, aria-disabled="true" is set on the anchor. The link remains focusable so keyboard users can discover it, but activation is blocked.',
            },
            {
              attribute: 'rel',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>Auto-set for external</span>
              ),
              description: 'When external is true, rel="noopener noreferrer" is applied automatically, preventing security vulnerabilities from cross-origin navigation.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-link is tested against WCAG 2.2 Level AA across all colour variants and states."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Blue link colour meets 4.5:1 against white and light grey surfaces. Black meets contrast on all light backgrounds. White variant is intended for dark surfaces only — always verify contrast at point of use."
          />
          <ComplianceCard
            criterion="2.4.4"
            level="A"
            title="Link Purpose (In Context)"
            note="The accessible name is derived from the slot text content. Descriptive link text communicates the destination without requiring surrounding context. Avoid generic text such as 'click here' or 'read more'."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus is indicated by the double-ring focus pattern using --io-focus-inner and --io-focus-outer tokens. The focus ring meets the minimum area and contrast requirements of WCAG 2.2."
          />
          <ComplianceCard
            criterion="2.5.3"
            level="A"
            title="Label in Name"
            note="The visible text in the default slot is the accessible name. There is no ARIA override. Screen reader users hear exactly the text that sighted users see."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The native anchor element provides the correct role of 'link'. The accessible name comes from content. Disabled and external states are communicated via aria-disabled and the slot text respectively."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible navigation experiences with io-link."
        />
        <RuleCard label="Write descriptive link text">
          Screen reader users often navigate a page by cycling through links with the Tab key. Each link must make sense without surrounding context. Describe the destination: &ldquo;View accessibility report&rdquo; rather than &ldquo;click here&rdquo;.
        </RuleCard>
        <RuleCard label="Do not suppress focus styles">
          The double-ring focus indicator is a deliberate accessibility feature. Never apply{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>outline: none</code>{' '}
          or override the focus tokens. Keyboard users depend on visible focus to navigate.
        </RuleCard>
        <RuleCard label="Announce new-tab behaviour">
          When a link opens in a new tab, users are transported to an unfamiliar context without a Back button in their mental model. The external icon provides a visual cue. Consider adding screen-reader-only text such as &ldquo;(opens in new tab)&rdquo; within the slot content for AT users.
        </RuleCard>
        <RuleCard label="Do not use a link for non-navigation actions">
          If clicking an element triggers a JavaScript action rather than navigating to a URL, use{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<io-button variant="link">'}</code>.
          Misusing anchor elements confuses screen reader users who expect links to navigate.
        </RuleCard>
      </section>

    </div>
  );
}
