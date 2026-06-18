'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoFlyoutAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-flyout implements a custom focus trap so keyboard focus stays within the panel while it is open. The Escape key closes the flyout and returns focus to the trigger element."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the next focusable element inside the flyout. Focus is trapped within the panel — Tab cycles from the last focusable element back to the first.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element inside the flyout. Focus wraps from the first focusable element to the last.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the flyout, emits the dismiss event, and returns focus to the element that triggered the open.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the focused button inside the flyout — for example, the Close button or a footer action.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the focused button inside the flyout. Equivalent to Enter for button elements.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-flyout uses role=dialog and aria-modal=true to signal an overlay dialog to assistive technology. The heading prop provides the accessible name via aria-labelledby."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>dialog</code>
              ),
              description: 'The panel element carries role=dialog. Screen readers announce the dialog role when focus enters, alerting the user that an overlay panel is open.',
            },
            {
              attribute: 'aria-modal',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code>
              ),
              description: 'aria-modal=true instructs screen readers to restrict the virtual cursor to the flyout content and ignore background elements.',
            },
            {
              attribute: 'aria-labelledby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>heading element ID</span>
              ),
              description: 'When the heading prop is provided, the dialog is labelled by the rendered h2 element. This gives the flyout an accessible name that screen readers announce on open.',
            },
            {
              attribute: 'aria-hidden',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code>
              ),
              description: 'The panel element has aria-hidden=true when closed. This prevents screen readers from navigating to off-screen flyout content.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-flyout is tested against WCAG 2.2 Level AA using dialog role semantics and a JavaScript focus trap."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The dialog role communicates structure to assistive technology. The heading prop creates a labelled dialog; the default and footer slots provide a clear content hierarchy."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All flyout functionality is operable via keyboard. A JavaScript focus trap keeps Tab and Shift+Tab within the panel. Escape closes the flyout."
          />
          <ComplianceCard
            criterion="2.3.3"
            level="AAA"
            title="Animation from Interactions"
            note="The slide-in/out transition is disabled when the user has enabled prefers-reduced-motion. The panel opens and closes instantly without motion."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="When the flyout opens, focus moves to the first focusable element inside the panel. When closed, focus returns to the trigger element."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focused elements inside the flyout display the double-ring focus pattern on keyboard interaction. The focus ring meets WCAG 2.2 minimum area and contrast requirements."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The panel has an explicit role=dialog, an accessible name via aria-labelledby (heading prop) or aria-label (header slot), and correct visibility state via aria-hidden. The close button has an accessible label."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible experiences with io-flyout."
        />
        <RuleCard label="Always provide an accessible name">
          Every flyout must have an accessible name. Use the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>heading</code> prop or the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>header</code> slot to label the dialog. A flyout without an accessible name is announced only as &ldquo;dialog&rdquo; by screen readers, giving users no context about its purpose.
        </RuleCard>
        <RuleCard label="Include a close action in the footer">
          The built-in close button in the header is always present, but also placing a ghost-variant Cancel or Close button in the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>footer</code> slot gives keyboard users a second, prominent dismissal route.
        </RuleCard>
        <RuleCard label="Test with a screen reader before shipping">
          Open the flyout using the keyboard, verify that the dialog role and accessible name are announced correctly, navigate through all interactive content, and confirm that focus returns to the trigger on close.
        </RuleCard>
      </section>

    </div>
  );
}
