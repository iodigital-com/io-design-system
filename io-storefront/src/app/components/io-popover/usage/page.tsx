'use client';

import { DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

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
              Always provide a <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code> prop. It sets the accessible name of the dialog via{' '}
              <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-labelledby</code> so screen readers announce it when focus enters.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Place the activating control in the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>trigger</code> slot so the component can manage <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-expanded</code> and return focus on close automatically.
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
              Don&apos;t skip the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>trigger</code> slot. Providing a visible, focusable trigger ensures keyboard and screen reader users can open and close the popover consistently.
            </DoOrDontCard>
          </div>
        </div>
      </section>

    </div>
  );
}
