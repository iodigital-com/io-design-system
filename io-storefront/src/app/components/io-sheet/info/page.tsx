'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSheetInfoPage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-sheet is a bottom sheet overlay that slides up from the bottom of the viewport. Use it for contextual actions, confirmations, and secondary content that needs more visual prominence than a popover but less interruption than a full-screen modal."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for contextual actions triggered by a user gesture — share options, sort and filter panels, quick edit forms.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>heading</C> prop to give the sheet an accessible name. This labels the dialog for screen readers (WCAG 4.1.2).
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the <C>footer</C> slot for primary and cancel actions so keyboard users always have a visible dismiss path.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep sheet content concise. If the user needs to scroll more than two viewport heights, consider a full-screen drawer instead.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use a sheet for critical destructive actions that need the user&apos;s full deliberate attention. Use io-modal instead — it signals higher urgency.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use a sheet for brief status messages or alerts. Use io-toast or io-inline-notification instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Stack sheets on top of each other. Layered overlays create confusing navigation hierarchies. If nested actions are needed, use inline content or a new page.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Set <C>dismissible=false</C> unless the action is truly mandatory. Always provide a visible way to complete or exit the sheet in the footer.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Choosing between sheet and drawer ────────────────────── */}
      <section id="choosing-between-sheet-and-drawer" className="space-y-6">
        <SectionHeader
          title="Choosing between io-sheet and io-drawer"
          description="Both components offer bottom overlay panels. Use this guide to pick the right one."
        />
        <div className="space-y-3">
          <RuleCard label="io-sheet — bottom sheet (this component)">
            Optimised for mobile-first bottom sheet UX. Uses a custom <C>role=dialog</C> host. Best for contextual actions, quick pickers, share menus, and sort/filter panels where a lightweight overlay is preferred.
          </RuleCard>
          <RuleCard label="io-drawer placement=bottom — native dialog bottom sheet">
            Use when you need native <C>{'<dialog>'}</C> semantics, swipe-to-close gesture, or when the panel requires the full multi-size system (sm / md / lg / full height). Also prefer io-drawer when the same pattern is used on desktop with left/right drawers for visual consistency.
          </RuleCard>
        </div>
      </section>

      {/* ── Dismissal patterns ────────────────────────────────────── */}
      <section id="dismissal-patterns" className="space-y-6">
        <SectionHeader
          title="Dismissal patterns"
          description="io-sheet supports three dismissal triggers when dismissible is true: the header close button, backdrop click, and the Escape key. All three emit the dismiss event."
        />
        <div className="space-y-3">
          <RuleCard label="Default dismissal — dismissible=true">
            The close button in the header, a backdrop click outside the panel, and the Escape key all close the sheet and emit the dismiss event. This is the standard pattern for optional actions.
          </RuleCard>
          <RuleCard label="Non-dismissible — dismissible=false">
            Set <C>dismissible</C> to false for mandatory flows where the user must complete the action before continuing. The close button is hidden, and backdrop click and Escape key are disabled. Always provide a visible complete or cancel action in the footer slot.
          </RuleCard>
          <RuleCard label="Programmatic close">
            Set <C>open</C> to false to close the sheet without emitting the dismiss event. Use this for programmatic closure after a successful action — for example, after a form submission completes.
          </RuleCard>
        </div>
      </section>

      {/* ── Focus management ─────────────────────────────────────── */}
      <section id="focus-management" className="space-y-6">
        <SectionHeader
          title="Focus management"
          description="io-sheet implements a focus trap so keyboard focus stays within the panel while it is open. Focus returns to the trigger element when the sheet closes."
        />
        <div className="space-y-3">
          <RuleCard label="Return focus to the trigger on close">
            When the sheet closes, focus returns automatically to the element that triggered the open. Ensure the trigger element is focusable and persists in the DOM while the sheet is open.
          </RuleCard>
          <RuleCard label="First focusable element receives focus on open">
            When the sheet opens, focus moves to the first focusable element inside the panel — typically the close button or the first input field.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
