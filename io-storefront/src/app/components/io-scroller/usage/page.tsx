'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoScrollerUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-scroller wraps any content that may overflow its container and provides gradient fade indicators at each edge to communicate that more content exists in that direction."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for horizontal tab bars, chip groups, and filter strips where the number of items exceeds the available width on mobile.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use for vertical scroll regions with a constrained height — for example, a navigation sidebar or a list panel with a fixed viewport height.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Provide a meaningful <C>label</C> prop so screen reader users understand what the scroll region contains — e.g. <C>&quot;Navigation tabs&quot;</C> or <C>&quot;Image strip&quot;</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>show-scrollbar</C> to <C>true</C> in contexts where a visible scrollbar helps users understand that the region is scrollable, such as data tables on desktop.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use as a page-level scroll container. <C>io-scroller</C> is for overflow within a bounded region — not the document scroll.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Nest scrollers inside each other — this creates confusing scroll traps, especially for keyboard and touch users.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Omit <C>label</C> — without it, the scroll region announces as &quot;Scrollable horizontal region&quot; which gives users no context about the content inside.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>io-scroller</C> to scroll a single item that should instead be truncated with an ellipsis — scrollers imply multiple items or overflowing content.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Orientation ──────────────────────────────────────────── */}
      <section id="orientation" className="space-y-6">
        <SectionHeader
          title="Orientation"
          description="Choose the scroll axis that matches the layout of the content inside the scroller."
        />
        <div className="space-y-3">
          <RuleCard label="horizontal (default)">
            Content overflows left and right. Use for tab bars, chip groups, image strips, and button rows. The fade indicators appear on the left and right edges.
          </RuleCard>
          <RuleCard label="vertical">
            Content overflows top and bottom. Use for navigation lists, option menus, and any vertically constrained content panel. Set an explicit height on the <C>io-scroller</C> element or its container — without a height constraint, vertical scroll will never trigger. The fade indicators appear on the top and bottom edges.
          </RuleCard>
        </div>
      </section>

      {/* ── Fade indicators ──────────────────────────────────────── */}
      <section id="fade-indicators" className="space-y-6">
        <SectionHeader
          title="Fade indicators"
          description="Gradient fades communicate scroll affordance without obscuring the underlying content."
        />
        <div className="space-y-3">
          <RuleCard label="Fade appears only when there is scrollable content in that direction">
            The start fade (left/top) is hidden when the scroll position is at the very beginning. The end fade (right/bottom) is hidden when the content is fully scrolled to the end. Fades appear automatically — no configuration is required.
          </RuleCard>
          <RuleCard label="Override the fade color when the scroller sits on a non-page background">
            The fade gradient defaults to <C>var(--io-bg-page)</C> which matches the document background. If you place a scroller on a card or surface, override <C>--io-scroller-fade-color</C> to match the container background — e.g.{' '}
            <C>style=&quot;--io-scroller-fade-color: var(--io-bg-raised)&quot;</C>.
          </RuleCard>
          <RuleCard label="Fade size can be adjusted via the CSS custom property">
            The fade gradient width/height defaults to <C>24px</C> (<C>var(--io-space-6)</C>). Override <C>--io-scroller-fade-size</C> on the element to increase or decrease the gradient extent.
          </RuleCard>
        </div>
      </section>

      {/* ── Scrollbar ────────────────────────────────────────────── */}
      <section id="scrollbar" className="space-y-6">
        <SectionHeader
          title="Native scrollbar"
          description="By default the native scrollbar is hidden. Show it when the scrollbar itself communicates important context."
        />
        <div className="space-y-3">
          <RuleCard label="Default — hidden scrollbar for clean mobile-first UIs">
            The native scrollbar is hidden by default. The gradient fades serve as the scroll affordance. This is appropriate for touch-friendly UIs and mobile-first layouts.
          </RuleCard>
          <RuleCard label="show-scrollbar=true for desktop-first or precision scroll contexts">
            Enable the native scrollbar when users are on pointer devices and the scrollbar provides useful positional context — for example, long navigation lists or data tables. The scrollbar is always shown regardless of input modality when <C>show-scrollbar</C> is <C>true</C>.
          </RuleCard>
        </div>
      </section>

      {/* ── Accessibility ────────────────────────────────────────── */}
      <section id="accessibility" className="space-y-6">
        <SectionHeader
          title="Accessibility"
          description="io-scroller is a keyboard-navigable scroll region. Always provide a label and ensure the content inside is accessible."
        />
        <div className="space-y-3">
          <RuleCard label="Always provide a label">
            The <C>label</C> prop sets <C>aria-label</C> on the scroll region. Without it, assistive technologies announce a generic label with no context. Provide a description that reflects the purpose of the content — e.g. <C>&quot;Category filters&quot;</C> or <C>&quot;Image carousel&quot;</C>.
          </RuleCard>
          <RuleCard label="Keyboard users can focus and scroll the region">
            The scroll container has <C>tabindex=&quot;0&quot;</C> when the keyboard is the active input modality. Users can navigate to the scroller with Tab, then scroll with Arrow keys.
          </RuleCard>
          <RuleCard label="Ensure the content inside is independently accessible">
            <C>io-scroller</C> provides the scroll container. The items inside must each be keyboard and screen reader accessible in their own right. Do not rely on scroll position to determine whether an item is interactive.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
