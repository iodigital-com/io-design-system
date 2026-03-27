'use client';

import { DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTooltipUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-tooltip provides supplementary context for interface elements that benefit from a brief explanation. Use it to reduce visual clutter while keeping helpful information discoverable on hover and focus."
        />
        <div className="space-y-3">
          <RuleCard label="Icon-only buttons">
            When a button or action control has no visible text label — for example, a toolbar icon — use a tooltip to communicate what the control does. The tooltip acts as the accessible name supplement, surfaced on hover and keyboard focus.
          </RuleCard>
          <RuleCard label="Abbreviated or truncated labels">
            When interface constraints force a label to be shortened or clipped, a tooltip can expose the full text. This is common in data tables, breadcrumbs, and navigation items that truncate at a fixed width.
          </RuleCard>
          <RuleCard label="Helper context for non-obvious controls">
            Unfamiliar settings, toggles, or technical fields benefit from a brief tooltip that explains their purpose or effect — for instance, a field labelled &ldquo;TTL&rdquo; that shows &ldquo;Time to live in seconds&rdquo; on hover.
          </RuleCard>
        </div>
      </section>

      {/* ── When not to use ──────────────────────────────────────────────────── */}
      <section id="when-not-to-use" className="space-y-6">
        <SectionHeader
          title="When not to use"
          description="Tooltips are supplementary and transient. They are inappropriate for content that is critical, persistent, or required to complete a task."
        />
        <div className="space-y-3">
          <RuleCard label="Critical information">
            Never place content inside a tooltip that the user must read to complete an action. Tooltips are hidden by default and are not guaranteed to be seen. Use visible, persistent text instead — such as a helper text field, a description paragraph, or an inline callout.
          </RuleCard>
          <RuleCard label="Form validation errors">
            Validation errors must be visible without interaction. Use the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code> prop on form fields such as io-input or io-select. These surface the error persistently below the field, where screen readers and visual users both expect to find it.
          </RuleCard>
          <RuleCard label="Mobile primary flows">
            Touch users cannot hover, and long-press behaviour for tooltips is inconsistent across platforms. If tooltips are the sole source of important context in a flow primarily used on mobile, provide that context as visible text instead.
          </RuleCard>
        </div>
      </section>

      {/* ── Do's & Don'ts ─────────────────────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Practical rules for writing tooltip content and integrating io-tooltip into your interface."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Keep tooltip content concise — one sentence or a short phrase is ideal. Tooltips are not the right place for paragraphs or structured content.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a visible label or accessible name on icon-only buttons. The tooltip supplements the label; it should not be the only way a user can identify the control.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Let <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>@floating-ui/dom</code> handle placement. Set a preferred <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>placement</code> but rely on the automatic flip and shift behaviour to keep the tooltip within the viewport.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Wrap a focusable element — a button, link, or element with <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>tabindex="0"</code> — in the default slot so that keyboard users can access the tooltip via focus.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Don&apos;t place interactive elements such as links or buttons inside the tooltip content. The floating panel is not focusable and users cannot interact with content inside it.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t rely on a tooltip alone to convey error states, warnings, or required fields. These must always have a persistent visible indicator in addition to any supplementary tooltip.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t nest io-tooltip inside another tooltip trigger. Overlapping floating elements create unpredictable stacking and positioning behaviour.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t use a tooltip when a title attribute on a native element would suffice for your use case. Reserve io-tooltip for cases where styled, accessible floating labels are needed.
            </DoOrDontCard>
          </div>
        </div>
      </section>

    </div>
  );
}
