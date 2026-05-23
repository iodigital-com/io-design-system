'use client';

import { AriaTable, ComplianceCard, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoAvatarAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-avatar adapts its ARIA attributes to whichever of its three rendering modes is active."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-label',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>Set to <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>name</code> when present</span>,
              description: 'When the name prop is provided the host element receives aria-label set to that name. This ensures initials and icon fallbacks are announced correctly by screen readers.',
            },
            {
              attribute: 'alt (on img)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>Passed through from <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>alt</code> prop</span>,
              description: 'When an image is rendered, the alt attribute is set to the alt prop value. Provides the accessible name for sighted AT users when no aria-label is present.',
            },
            {
              attribute: 'aria-hidden (on img)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}><code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>"true"</code> when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>alt=""</code></span>,
              description: 'When the alt prop is an empty string the img receives aria-hidden="true" automatically, preventing the browser from announcing an empty alt to screen readers.',
            },
            {
              attribute: 'aria-hidden (on SVG icon)',
              value: <span style={{ color: 'var(--io-text-secondary)' }}>Always <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>"true"</code></span>,
              description: 'The person icon SVG is always decorative. The accessible name is provided by the host aria-label (from name) or must be provided by the surrounding context.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-avatar is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.1.1"
            level="A"
            title="Non-text Content"
            note="Images pass alt text through the alt prop. Decorative images (alt='') receive aria-hidden='true'. The icon fallback is always aria-hidden — the host aria-label provides the text alternative."
          />
          <ComplianceCard
            criterion="1.4.3"
            level="AA"
            title="Contrast (Minimum)"
            note="All five colour variants pass 4.5:1 contrast for the initials text. Blue, orange, green, and purple use white text on a saturated background. Grey uses --io-color-grey-6 on --io-color-grey-3."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="When name is provided, the host element receives aria-label equal to the name prop so screen readers can identify the avatar. When name is absent and the avatar is decorative, aria-hidden is applied to the image."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive experiences with io-avatar."
        />
        <RuleCard label="Always provide either name or alt">
          Without a name or a meaningful alt, the avatar has no accessible name. Screen reader users will hear
          &ldquo;image&rdquo; or nothing at all. Set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>name</code> whenever you know the person&apos;s name — the component handles the rest.
        </RuleCard>
        <RuleCard label="Do not nest an avatar inside another interactive element without a label">
          If you place an avatar inside a <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<button>'}</code>, ensure the button has an explicit
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-label</code> describing the action (e.g. &ldquo;View Jane Doe&apos;s profile&rdquo;) rather than relying on the avatar&apos;s internal label.
        </RuleCard>
        <RuleCard label="Test with an image that fails to load">
          Verify that the initials or icon fallback is announced correctly by a screen reader when the image URL
          is invalid. The component resets to initials mode automatically, but confirm the accessible name remains correct.
        </RuleCard>
      </section>

    </div>
  );
}
