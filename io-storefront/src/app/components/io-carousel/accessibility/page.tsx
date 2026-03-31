'use client';

import { ComplianceCard, Kbd, KeyboardTable, RuleCard, SectionHeader } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoCarouselAccessibilityPage() {
  return (
    <div className="space-y-16">
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Carousel navigation relies on focusable prev/next buttons. Slide content links are reachable via sequential Tab navigation."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Move focus to the next interactive element (prev/next button or slide CTA link).',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Shift</Kbd><span style={{ color: 'var(--io-text-muted)' }}>+</span><Kbd>Tab</Kbd></span>,
              action: 'Move focus to the previous interactive element.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd></span>,
              action: 'Activate the focused prev/next button or follow the focused CTA link.',
            },
          ]}
        />
      </section>

      <section id="aria" className="space-y-6">
        <SectionHeader
          title="ARIA"
          description="Prev/Next buttons use aria-label for accessible names. No ARIA live region is used because scrolling is user-initiated."
        />
        <div className="space-y-3">
          <RuleCard label="Prev button">
            Renders as <code className="text-xs">{`<button aria-label="Previous">`}</code>. Override via the <code className="text-xs">prevLabel</code> prop for localisation.
          </RuleCard>
          <RuleCard label="Next button">
            Renders as <code className="text-xs">{`<button aria-label="Next">`}</code>. Override via the <code className="text-xs">nextLabel</code> prop for localisation.
          </RuleCard>
          <RuleCard label="No live region">
            Scroll position changes do not trigger screen reader announcements. This is appropriate for user-controlled horizontal scrolling.
          </RuleCard>
        </div>
      </section>

      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG compliance"
          description="Carousel meets core WCAG requirements for keyboard operability and accessible naming, with a known keyboard limitation for drag scrolling."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="Slide content is structured with semantic type labels, titles, and links."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="Prev/Next buttons and CTA links are keyboard-operable. Drag-to-scroll is pointer-only (see known limitation below)."
          />
          <ComplianceCard
            criterion="2.4.7"
            level="AA"
            title="Focus Visible"
            note="Prev/Next buttons display a visible focus ring via var(--io-focus-ring-active)."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="Navigation buttons have accessible names via aria-label. CTA links have visible text labels."
          />
        </div>
      </section>

      <section id="known-limitation" className="space-y-4">
        <RuleCard label="Known limitation: drag-to-scroll is not keyboard accessible">
          The drag-to-scroll interaction uses mousedown/mousemove/mouseup listeners and has no keyboard equivalent. Keyboard users must rely on the Prev/Next buttons to navigate between slides. Touch-device users can swipe natively via the scrollable track. This is acceptable for supplementary content browsing but should be noted if carousel content is not reachable through other navigation paths.
        </RuleCard>
      </section>
    </div>
  );
}
