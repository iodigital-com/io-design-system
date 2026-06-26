'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoFlyoutInfoPage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-flyout is a side-anchored overlay panel that fills the gap between io-popover (small contextual panel) and io-drawer (full-height overlay). Use it for mega menus, navigation panels, and complex UI panels that need more space than a popover but less than a full drawer."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for mega-menus and navigation flyouts that reveal a set of links or categories from the side of the page.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>right</C> position for detail panels, filter panels, and contextual toolbars. Use <C>left</C> for primary navigation menus.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>heading</C> prop or a custom <C>header</C> slot to give the flyout an accessible name for screen readers (WCAG 4.1.2).
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>footer</C> slot for a Close or primary-action button so keyboard users always have a visible dismiss target.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use a flyout for critical confirmations that require the user&apos;s full attention. Use io-modal instead — it signals higher urgency and blocks the background fully.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use a flyout for brief status messages or alerts. Use io-toast or io-inline-notification instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Open a flyout on top of another flyout or drawer. Stacked overlay panels create confusing navigation hierarchies.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use io-flyout when io-drawer&apos;s full-height, multi-size, and bottom-sheet patterns are needed. io-flyout is fixed at <C>min(480px, 90vw)</C> width.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Position selection ────────────────────────────────────── */}
      <section id="position-selection" className="space-y-6">
        <SectionHeader
          title="Position selection"
          description="Choose the position that matches the content direction and user mental model."
        />
        <div className="space-y-3">
          <RuleCard label="right — detail panels and toolbars (default)">
            The right edge is the conventional location for supplementary content in desktop applications. Use it for detail views, filter panels, and contextual toolbars.
          </RuleCard>
          <RuleCard label="left — navigation menus">
            The left edge is associated with navigation. Use it for primary navigation flyouts, mega menus, and category trees.
          </RuleCard>
        </div>
      </section>

      {/* ── Choosing between overlays ────────────────────────────── */}
      <section id="choosing-between-overlays" className="space-y-6">
        <SectionHeader
          title="Choosing between io-flyout, io-drawer, and io-popover"
          description="Use this guide when deciding which side or contextual overlay to reach for."
        />
        <div className="space-y-3">
          <RuleCard label="io-flyout — partial-height side panel (this component)">
            Use when you need a side panel that does not cover the full viewport height. Fixed at <C>min(480px, 90vw)</C> width. Suited to mega menus, navigation panels, and contextual toolbars where maintaining background context is important.
          </RuleCard>
          <RuleCard label="io-drawer — full-height or multi-size, multi-placement">
            Use when the panel needs flexible sizing (sm / md / lg / full), bottom-sheet placement, or native <C>{'<dialog>'}</C> semantics. Choose io-drawer for record detail views, edit forms, and any task requiring more vertical space than a flyout provides.
          </RuleCard>
          <RuleCard label="io-popover — small contextual panel">
            Use when the overlay is small and contextually attached to a trigger element — for example, dropdown menus, colour pickers, and date pickers. Prefer io-popover over io-flyout when the content fits in a compact floating panel.
          </RuleCard>
        </div>
      </section>

      {/* ── Triggering and dismissal ──────────────────────────────── */}
      <section id="triggering-and-dismissal" className="space-y-6">
        <SectionHeader
          title="Triggering and dismissal"
          description="io-flyout is controlled via the open prop or the show()/close() methods. Dismissal can happen via the close button, backdrop click, or the Escape key — all of which set open to false and emit the dismiss event."
        />
        <div className="space-y-3">
          <RuleCard label="Use show() and close() for programmatic control">
            Call <C>show()</C> to open the flyout and <C>close()</C> to close it without emitting the dismiss event. Setting the <C>open</C> prop directly also works.
          </RuleCard>
          <RuleCard label="Always include a visible close action">
            Every flyout must have a way for the user to dismiss it without completing the primary action. The built-in header close button is always present. Adding a ghost Cancel button in the <C>footer</C> slot provides a second explicit dismissal route.
          </RuleCard>
          <RuleCard label="Return focus to the trigger on close">
            When the flyout closes, focus returns automatically to the element that triggered the open. Ensure the trigger element is focusable and persists in the DOM while the flyout is open.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
