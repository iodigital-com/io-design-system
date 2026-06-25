'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoPopoverUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use io-popover for click-triggered floating content that requires richer structure than a tooltip — such as action menus, contextual forms, or supplementary details."
        />
        <div className="space-y-3">
          <RuleCard label="Contextual action menus">
            When a control exposes a small set of actions or options that do not warrant a full modal, a popover keeps the interface focused and avoids a heavy overlay. Common examples include a kebab menu, a sharing panel, or a filter form.
          </RuleCard>
          <RuleCard label="Rich supplementary content">
            When more detail than a tooltip can hold is needed — such as a mini profile card, a date-picker, or a colour swatch panel — a popover provides a contained, dismissible surface.
          </RuleCard>
          <RuleCard label="Confirmations for low-stakes actions">
            For irreversible but low-stakes actions (such as removing a tag or unfollowing an item), a popover confirmation avoids the weight of a full modal while still preventing accidental execution.
          </RuleCard>
        </div>
      </section>

      {/* ── When not to use ──────────────────────────────────────────────────── */}
      <section id="when-not-to-use" className="space-y-6">
        <SectionHeader
          title="When not to use"
          description="Popovers are appropriate for supplementary, dismissible content. They are not appropriate when the interaction is critical, complex, or requires full user attention."
        />
        <div className="space-y-3">
          <RuleCard label="Critical confirmations or destructive actions">
            For permanently destructive actions — such as deleting an account or clearing all data — use an io-modal. The native dialog element provides focus trapping, Escape-key handling, and a backdrop that conveys the weight of the action.
          </RuleCard>
          <RuleCard label="Long multi-step forms">
            If the floating content grows to contain a multi-step flow or significant form work, move it into an io-drawer or io-modal. Popovers work best for compact, single-purpose interactions.
          </RuleCard>
          <RuleCard label="Simple plain-text tooltips">
            For one-sentence supplementary descriptions shown on hover or focus, use the io-tooltip attribute directive instead. Popovers are click-triggered and intended for interactive content.
          </RuleCard>
        </div>
      </section>

      {/* ── Do's and Don'ts ───────────────────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Practical rules for building accessible experiences with io-popover."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. It sets the accessible name of the dialog via <C>aria-labelledby</C> so screen readers announce it when focus enters.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Place the activating control in the <C>trigger</C> slot so the component can manage <C>aria-expanded</C> and return focus on close automatically.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep popover content keyboard-accessible. All interactive elements inside the default slot must be reachable by Tab and operable by keyboard.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Let users close via Escape. io-popover handles this automatically — do not intercept Escape in slotted content unless you need to distinguish between nested layers.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Don&apos;t nest popovers inside other popovers. Stacked floating layers create unpredictable focus order and dismiss behaviour that is difficult for screen reader users to navigate.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t use a popover where you need a persistent visible element. Popovers are transient — when the user clicks away or presses Escape, the content disappears. Use a card, a sidebar, or an inline section for content that must always be visible.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t put so much content that the panel becomes a full-page overlay. If the popover body requires scrolling on most viewports, move the content into an io-drawer or io-modal instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t skip the <C>trigger</C> slot. Providing a visible, focusable trigger ensures keyboard and screen reader users can open and close the popover consistently.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Placement and positioning ─────────────────────────────────────────── */}
      <section id="placement" className="space-y-6">
        <SectionHeader
          title="Placement and positioning"
          description="io-popover uses the native Popover API where supported, falling back to manual viewport-relative positioning."
        />
        <div className="space-y-3">
          <RuleCard label="Placement prop">
            Set <C>placement</C> to <C>top</C>, <C>bottom</C>, <C>left</C>, <C>right</C>, or <C>auto</C>. The chosen placement controls which side the panel appears relative to the trigger.
          </RuleCard>
          <RuleCard label="auto placement">
            When set to <C>auto</C>, the panel opens below the trigger (equivalent to <C>placement=&quot;bottom&quot;</C>). Use an explicit placement value (<C>top</C>, <C>left</C>, <C>right</C>) when you need directional control in constrained layouts.
          </RuleCard>
          <RuleCard label="Viewport positioning">
            The component uses <C>getBoundingClientRect()</C> to compute panel position in viewport-relative coordinates. No external positioning library is required.
          </RuleCard>
          <RuleCard label="Fixed positioning">
            The panel uses <C>position: fixed</C> so it escapes overflow-hidden containers and sticky headers. This means it scrolls with the viewport, not with the page — the panel stays pinned to the trigger area until dismissed.
          </RuleCard>
        </div>
      </section>

      {/* ── Dismiss behaviour ─────────────────────────────────────────────────── */}
      <section id="dismiss-behaviour" className="space-y-6">
        <SectionHeader
          title="Dismiss behaviour"
          description="Three ways to close the popover — each can be observed via the dismiss event."
        />
        <div className="space-y-3">
          <RuleCard label="Trigger re-click">
            Clicking the trigger while the popover is open closes it. This is always active and cannot be disabled.
          </RuleCard>
          <RuleCard label="Outside click">
            By default, clicking anywhere outside the popover panel closes it. Set <C>closeOnClickOutside=&quot;false&quot;</C> to keep the popover open when the user interacts with other page content — useful for filter or settings panels that should persist while the user makes other selections.
          </RuleCard>
          <RuleCard label="Escape key">
            Pressing Escape always closes an open popover, regardless of <C>closeOnClickOutside</C>. This is a WCAG 2.1 Level AA requirement (SC 1.4.13) and cannot be disabled.
          </RuleCard>
          <RuleCard label="dismiss event">
            The <C>dismiss</C> event fires on every programmatic close. Use it to reset form state inside the panel, cancel pending requests, or update parent component state.
          </RuleCard>
        </div>
      </section>

      {/* ── Advanced patterns ─────────────────────────────────────────────────── */}
      <section id="advanced-patterns" className="space-y-6">
        <SectionHeader
          title="Advanced patterns"
          description="Common integration patterns for real-world use cases."
        />
        <div className="space-y-3">
          <RuleCard label="Form inside a popover">
            Slot a form with submit and cancel buttons. Wire the cancel button to call <C>popover.open = false</C> and listen to <C>dismiss</C> to reset the form state. Use <C>closeOnClickOutside=&quot;false&quot;</C> so accidental outside clicks don&apos;t lose draft input.
          </RuleCard>
          <RuleCard label="Kebab / more-actions menu">
            Slot a vertical list of <C>io-button variant=&quot;ghost&quot;</C> elements. Each action button should close the popover programmatically by setting <C>open = false</C> after executing its action so focus returns to the trigger.
          </RuleCard>
          <RuleCard label="Programmatic open">
            Set <C>open=&quot;true&quot;</C> programmatically to open the popover from external logic (e.g. a guided tour or an inline hint trigger). The dismiss event lets you know when the user closes it.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
