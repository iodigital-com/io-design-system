'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoDrawerUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-drawer is a slide-out overlay panel that provides supplementary content or actions without navigating away from the current page. Use it when the task is secondary to the main content but requires dedicated space."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for secondary tasks that benefit from dedicated panel space — such as editing settings, viewing details, or filling a contextual form — while keeping the main page visible in the background.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>right</C> placement for detail panels, edit forms, and filter drawers. Use <C>left</C> for navigation menus. Use <C>bottom</C> for mobile-first action sheets.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>footer</C> slot for primary actions (Save, Apply, Confirm) and a secondary ghost-variant button for dismissal (Cancel). Limit footer actions to two buttons.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>heading</C> that clearly identifies the purpose of the drawer panel. Screen readers announce it when the drawer opens.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use a drawer for critical confirmations that require the user&apos;s full attention. Use a modal instead — modals block the background content and signal higher urgency.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Open a drawer on top of another drawer. Stacked overlay panels create confusing navigation hierarchies and are difficult to dismiss with keyboard or assistive technology.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use a drawer for brief status messages or alerts. Use a toast or inline notification instead — drawers require interaction and occupy significant screen real estate.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use the <C>full</C> size for routine tasks. Reserve it for edge cases where the content genuinely requires the full viewport — such as a rich document editor or an immersive data table.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Placement selection ──────────────────────────────────── */}
      <section id="placement-selection" className="space-y-6">
        <SectionHeader
          title="Placement selection"
          description="Choose the placement that matches both the content direction and the user's mental model for the interaction."
        />
        <div className="space-y-3">
          <RuleCard label="right — detail and edit panels (default)">
            The right edge is the conventional location for supplementary content in desktop applications. Use it for record detail views, inline edit forms, filter drawers, and property panels.
          </RuleCard>
          <RuleCard label="left — navigation panels">
            The left edge is associated with navigation in most design systems. Use it for side navigation menus, category trees, and contextual navigation layers.
          </RuleCard>
          <RuleCard label="bottom — action sheets and mobile patterns">
            The bottom edge mirrors the mobile bottom sheet pattern. Use it for action lists, share menus, quick pickers, and stacked options on narrow viewports.
          </RuleCard>
        </div>
      </section>

      {/* ── Size selection ────────────────────────────────────────── */}
      <section id="size-selection" className="space-y-6">
        <SectionHeader
          title="Size selection"
          description="Choose the size that matches the density of the panel content. For left and right placements, size controls the width. For bottom placement, size controls the height."
        />
        <div className="space-y-3">
          <RuleCard label="sm — compact panels (320px / 40vh)">
            Use for narrow utility panels, quick actions, or filters with few fields. The small size reduces visual weight and keeps the background context prominent.
          </RuleCard>
          <RuleCard label="md — general purpose (480px / 50vh, default)">
            The default size suits most use cases — detail views, inline edit forms, and moderate amounts of content. Start here and only change size if the content genuinely overflows or appears sparse.
          </RuleCard>
          <RuleCard label="lg — content-rich panels (640px / 66vh)">
            Reserve the large size for complex forms, multi-section content, or rich data tables. Avoid using it for simple utility panels — it reduces the visible background area significantly.
          </RuleCard>
          <RuleCard label="full — immersive panels (100vw / 100vh)">
            Use sparingly and only when the task genuinely requires full-viewport space — such as a rich text editor or a full-screen image browser. At full size, consider whether a separate route would be more appropriate.
          </RuleCard>
        </div>
      </section>

      {/* ── Triggering and dismissal ──────────────────────────────── */}
      <section id="triggering-and-dismissal" className="space-y-6">
        <SectionHeader
          title="Triggering and dismissal"
          description="io-drawer is controlled via the open prop or the show()/close() methods. Dismissal can happen via ESC, backdrop click, or the built-in close button — all of which set open to false and emit the dismiss event."
        />
        <div className="space-y-3">
          <RuleCard label="Use show() and close() for programmatic control">
            Call <C>show()</C> to open the drawer and <C>close()</C> to close it. Setting the <C>open</C> prop directly also works. Both paths emit the <C>dismiss</C> event on close.
          </RuleCard>
          <RuleCard label="Always provide a close action in the footer">
            Every drawer must include a way for the user to dismiss it without completing the primary action. Place a ghost-variant Cancel button in the <C>footer</C> slot that sets <C>open</C> to false. Do not rely solely on backdrop clicks or the ESC key.
          </RuleCard>
          <RuleCard label="Use closeOnBackdrop thoughtfully">
            <C>closeOnBackdrop</C> is enabled by default. Disable it only for drawers where accidental dismissal would result in data loss — such as an unsaved edit form. When disabled, the footer cancel button becomes the only dismissal route.
          </RuleCard>
          <RuleCard label="Return focus to the trigger element on close">
            When the drawer closes, focus should return to the element that opened it. Listen for the <C>dismiss</C> event and call <C>.focus()</C> on the trigger element reference to restore context for keyboard users.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
