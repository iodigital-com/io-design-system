'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '../../../../components/accessibility/AccessibilityPrimitives';

export default function IoStepperAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="io-stepper is a progress indicator, not an interactive widget. It does not capture keyboard input and does not require keyboard navigation between steps."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Focus passes through the stepper to the next focusable element. The stepper itself is not a focusable interactive control.',
            },
          ]}
        />
        <RuleCard label="Navigation is handled externally">
          Advancement between steps is driven by your application logic (e.g. a &ldquo;Next&rdquo; button that increments the
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>current</code> prop).
          The stepper component itself is a visual progress indicator only.
        </RuleCard>
      </section>

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-stepper renders semantic HTML that announces the progress structure correctly to assistive technology."
        />
        <AriaTable
          rows={[
            {
              attribute: 'role (nav)',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  navigation landmark
                </code>
              ),
              description: 'The <nav> wrapper creates a navigation landmark. Screen readers list it as "Progress" in the landmarks menu.',
            },
            {
              attribute: 'aria-label (nav)',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;Progress&quot;
                </code>
              ),
              description: 'Labels the navigation landmark. Distinguishes the stepper from other nav regions on the page.',
            },
            {
              attribute: 'aria-current',
              value: (
                <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>
                  &quot;step&quot; on the current li
                </code>
              ),
              description: 'Applied to the <li> element of the current step. Screen readers announce "current step" so users know which step they are on.',
            },
          ]}
        />
        <RuleCard label="Screen reader text">
          Each step includes a visually-hidden <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>span</code> with
          the format <em>&ldquo;Step N: Label, status&rdquo;</em>. This ensures that screen readers announce the full context
          (position, label, and completion state) without relying on the visual circle number or colour alone.
        </RuleCard>
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-stepper is tested against WCAG 2.2 Level AA. All relevant success criteria pass."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The ordered list (<ol>) communicates the sequential structure of the steps. ARIA attributes (aria-current, aria-label) supplement the visual presentation."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Status is not conveyed by colour alone. Complete steps show a checkmark, current steps show a prominent border, and screen reader text explicitly states each step's status."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="Step labels and circle numbers meet the 4.5:1 contrast ratio against their backgrounds. The complete step circle (primary blue on white) and current step border both pass."
          />
          <ComplianceCard
            criterion="2.4.6"
            level="AA"
            title="Headings and Labels"
            note="Each step has a visible label. Screen reader text supplements with full positional context (Step N: label, status) so the label alone is not required to carry all meaning."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The navigation landmark has an accessible name, each step list item has aria-current on the active step, and the full step description is provided via a visually-hidden span."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive stepper experiences."
        />
        <RuleCard label="Keep one stepper per page">
          Multiple steppers on the same page can confuse users navigating by landmarks. If you need multiple progress
          indicators, consider using separate pages or a different pattern (e.g. a progress bar).
        </RuleCard>
        <RuleCard label="Announce step changes to screen readers">
          When the user advances to the next step, update the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>current</code> prop
          and ensure focus moves to the new step content. Consider using an ARIA live region to announce
          &ldquo;Step 2 of 3: Details&rdquo; when the step changes.
        </RuleCard>
        <RuleCard label="Do not use colour as the only completion indicator">
          The complete status includes a visible checkmark SVG in the circle. The screen reader text explicitly
          announces each step&apos;s status. Never remove the checkmark or screen-reader text and rely on colour alone.
        </RuleCard>
      </section>

    </div>
  );
}
