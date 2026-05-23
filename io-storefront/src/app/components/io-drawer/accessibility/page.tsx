'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoDrawerAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-drawer is built on the native <dialog> element. Focus trapping and ESC key handling are provided by the browser via showModal(). No custom JavaScript focus trap is required."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the next focusable element inside the drawer. Focus is trapped within the dialog — Tab will cycle from the last focusable element back to the first.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Moves focus to the previous focusable element inside the drawer. Focus wraps from the first focusable element to the last.',
            },
            {
              key: <Kbd>Esc</Kbd>,
              action: 'Closes the drawer and emits the dismiss event. This is native browser behaviour provided by showModal(). Focus returns to the element that opened the drawer.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'Activates the focused button inside the drawer — for example, Save or Cancel in the footer slot.',
            },
            {
              key: <Kbd>Space</Kbd>,
              action: 'Activates the focused button inside the drawer. Equivalent to Enter for button elements.',
            },
          ]}
        />
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-drawer uses showModal() which sets aria-modal=true implicitly and restricts screen reader virtual cursor to drawer content. The heading prop provides the accessible name via aria-labelledby."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>dialog</code>
              ),
              description: 'The native <dialog> element carries an implicit role of dialog. Screen readers announce the dialog role when focus enters, alerting the user that a panel is open.',
            },
            {
              attribute: 'aria-labelledby',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>heading element ID</span>
              ),
              description: 'When the heading prop is provided, the dialog is labelled by the rendered heading element. This gives the drawer an accessible name that screen readers announce on open.',
            },
            {
              attribute: 'aria-modal',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code>
              ),
              description: 'showModal() sets aria-modal=true on the dialog element automatically. This instructs screen readers to restrict the virtual cursor to the drawer content and ignore the inert background.',
            },
            {
              attribute: 'inert',
              value: (
                <span style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>background content</span>
              ),
              description: 'The browser marks all content outside the top-layer dialog as inert when showModal() is called. Keyboard focus and screen reader virtual cursor cannot reach background content while the drawer is open.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-drawer is tested against WCAG 2.2 Level AA using native dialog semantics."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The native dialog element communicates its role and structure through HTML semantics. The heading prop creates a labelled dialog; the default and footer slots provide a clear content hierarchy."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All drawer functionality is operable via keyboard. Focus is trapped inside the dialog by the browser's native showModal() implementation. ESC closes the drawer. All interactive controls in slots are natively focusable."
          />
          <ComplianceCard
            criterion="2.3.3"
            level="AAA"
            title="Animation from Interactions"
            note="The slide-in animation is disabled when the user has enabled prefers-reduced-motion in their system settings. The drawer opens and closes instantly without motion."
          />
          <ComplianceCard
            criterion="2.4.3"
            level="A"
            title="Focus Order"
            note="When the drawer opens, focus moves to the first focusable element inside the dialog. When closed, focus returns to the trigger element. The focus sequence follows the DOM order of slotted content."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Focused elements inside the drawer display the double-ring focus pattern on keyboard interaction. The focus ring meets WCAG 2.2 minimum area and contrast requirements."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The dialog has a name (from heading prop), an implicit role of dialog, and correct state managed by the browser via the native dialog API. The close button has an accessible label via the closeLabel prop."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building accessible experiences with io-drawer."
        />
        <RuleCard label="Always provide a heading">
          Every drawer must have an accessible name. Use the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>heading</code> prop to provide a visible and accessible panel title. A drawer without an accessible name is announced only as &ldquo;dialog&rdquo; by screen readers, giving users no context about its purpose.
        </RuleCard>
        <RuleCard label="Use a descriptive closeLabel">
          The default close button label is &ldquo;Close drawer&rdquo;. Override it with the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>closeLabel</code> prop when the context would benefit from a more specific description — for example, &ldquo;Close settings panel&rdquo; or &ldquo;Close navigation menu&rdquo;.
        </RuleCard>
        <RuleCard label="Include a close button in every drawer">
          The ESC key and backdrop click are not universally available. Always include a visible close action — typically a ghost-variant Cancel button in the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>footer</code> slot.
        </RuleCard>
        <RuleCard label="Test with a screen reader before shipping">
          Open the drawer using the keyboard, verify that the dialog role and accessible name are announced correctly, navigate through all interactive content, and confirm that focus returns to the trigger on close.
        </RuleCard>
      </section>

    </div>
  );
}
