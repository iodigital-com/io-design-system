'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSheetAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-sheet implements a custom focus trap so keyboard focus stays within the panel while it is open. The focus trap correctly handles nested web components (custom elements with Shadow DOM) as well as light-DOM content. The Escape key closes the sheet (when dismissible) and returns focus to the trigger element."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the next focusable element inside the sheet. Focus is trapped within the panel — Tab cycles from the last focusable element back to the first.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element inside the sheet. Focus wraps from the first focusable element to the last.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the sheet (when dismissible=true), emits the dismiss event, and returns focus to the element that triggered the open. No-op when dismissible=false.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the focused button inside the sheet — for example, the close button or a footer action button.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the focused button inside the sheet. Equivalent to Enter for button elements.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-sheet uses role=dialog and aria-modal=true on the host element to signal an overlay dialog to assistive technology. The heading prop provides the accessible name via aria-labelledby."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>dialog</code>
              ),
              description: 'The host element carries role=dialog. Screen readers announce the dialog role when focus enters, alerting the user that an overlay panel is open.',
            },
            {
              attribute: 'aria-modal',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code>
              ),
              description: 'aria-modal=true instructs screen readers to restrict the virtual cursor to the sheet content and ignore background elements.',
            },
            {
              attribute: 'aria-labelledby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>heading element ID</span>
              ),
              description: 'When the heading prop is provided, the dialog is labelled by the rendered h2 element. This gives the sheet an accessible name that screen readers announce on open.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-sheet is tested against WCAG 2.2 Level AA using dialog role semantics and a JavaScript focus trap."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The dialog role communicates structure to assistive technology. The heading prop creates a labelled dialog. The default and footer slots provide a clear content hierarchy."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All sheet functionality is operable via keyboard. A JavaScript focus trap keeps Tab and Shift+Tab within the panel, including when nested web components (Shadow DOM children) have focus. Escape closes the sheet when dismissible=true."
          />
          <ComplianceCard
            criterion="2.3.3"
            level="AAA"
            title="Animation from Interactions"
            note="The slide-up entry animation is disabled when the user has enabled prefers-reduced-motion. The sheet opens instantly without motion."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="When the sheet opens, focus moves to the first focusable element inside the panel. When closed, focus returns to the trigger element."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focused elements inside the sheet display the double-ring focus pattern on keyboard interaction. The focus ring meets WCAG 2.2 minimum area and contrast requirements."
          />
          <ComplianceCard
            criterion="2.5.8"
            level="AA"
            title="Target Size"
            note="The close button meets the 44×44 CSS pixel minimum touch target size requirement using var(--io-touch-target-min)."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The host has role=dialog and aria-modal=true. When heading is set, aria-labelledby links to the h2 element. The close button has aria-label=Close."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible experiences with io-sheet."
        />
        <RuleCard label="Always provide an accessible name">
          Every sheet must have an accessible name. Use the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>heading</code> prop or the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>header</code> slot to label the dialog. A sheet without an accessible name is announced only as &ldquo;dialog&rdquo; by screen readers.
        </RuleCard>
        <RuleCard label="Include a complete or cancel action in the footer">
          The built-in close button (when dismissible=true) is always present, but also including a ghost-variant Cancel or Close button in the footer slot gives keyboard users a second, prominent dismissal route.
        </RuleCard>
        <RuleCard label="Test with a screen reader before shipping">
          Open the sheet using the keyboard, verify that the dialog role and accessible name are announced correctly, navigate through all interactive content, and confirm that focus returns to the trigger on close.
        </RuleCard>
      </section>

    </div>
  );
}
