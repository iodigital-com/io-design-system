'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoLinkPureAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-link-pure renders a native anchor (or button when no href is set). All standard browser keyboard behaviours are preserved."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the link or button. The focus ring becomes visible.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the link and navigates to the href. When rendered as a button (no href), fires the click event.',
            },
          ]}
        />
      </section>

      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-link-pure renders a native anchor or button element, providing the correct implicit role and semantics."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>link</code>
                  {' '}or{' '}
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>button</code>
                  {' '}(implicit)
                </span>
              ),
              description: 'Renders as an anchor when href is set (role=link), or as a button when no href is set (role=button).',
            },
            {
              attribute: 'aria-current',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;page&quot;</code>
                  {' '}when active
                </span>
              ),
              description: 'When active=true, aria-current="page" is set automatically, informing screen reader users this is the current navigation destination.',
            },
            {
              attribute: 'aria-label',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>From slot text when hideLabel=true</span>
              ),
              description: 'When hideLabel=true, the slot text is used as the aria-label, providing an accessible name for icon-only links.',
            },
            {
              attribute: 'aria-disabled',
              value: (
                <span style={{ color: 'var(--io-text-secondary)' }}>
                  <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&quot;true&quot;</code>
                  {' '}when disabled
                </span>
              ),
              description: 'When disabled, aria-disabled="true" keeps the link focusable while communicating its unavailable state to assistive technology.',
            },
          ]}
        />
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-link-pure is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="The default primary blue colour meets 4.5:1 contrast against white and light grey backgrounds."
          />
          <ComplianceCard
            criterion="2.4.4"
            level="A"
            title="Link Purpose (In Context)"
            note="The accessible name is derived from the slot text. For icon-only links (hideLabel=true), the slot text becomes the aria-label."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focus ring uses --io-focus-ring-active, meeting minimum size and contrast requirements."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Native anchor or button element provides the correct role. active=true sets aria-current='page'."
          />
        </div>
      </section>

      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for accessible use of io-link-pure."
        />
        <RuleCard label="Always provide label text in the slot">
          Even when hideLabel=true, the slot text is required — it becomes the aria-label for screen readers. An icon without an accessible name fails WCAG 4.1.2.
        </RuleCard>
        <RuleCard label="Use active=true for the current navigation item">
          Set active=true on the link that corresponds to the current page. This sets aria-current='page', communicating the location to screen reader users.
        </RuleCard>
        <RuleCard label="Do not suppress focus styles">
          The focus ring is a deliberate accessibility feature. Keyboard users depend on visible focus to navigate.
        </RuleCard>
      </section>

    </div>
  );
}
