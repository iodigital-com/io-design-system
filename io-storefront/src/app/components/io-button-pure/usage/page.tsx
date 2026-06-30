'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoButtonPureUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-button-pure is a link-styled inline action button for contexts where io-button's fixed sizing is not appropriate."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use io-button-pure for toolbar actions, table row controls, and inline body-copy CTAs where the button should inherit the surrounding font-size.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>underline=true</C> for navigation-style links that should always display an underline, not just on hover.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>active=true</C> to mark the currently active item in a navigation or tab context.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>stretch=true</C> to fill the full width of a container for consistent alignment in lists or menus.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use io-button-pure for primary or secondary call-to-action buttons — use <C>io-button</C> with a variant and color instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use io-button-pure when you need a fixed size preset (sm/md/lg/xl) — use <C>io-button variant=&apos;link&apos;</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not omit an accessible label when using icon-only mode. Always set the <C>label</C> prop when the button has no visible text.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="io-button-vs-io-button-pure" className="space-y-6">
        <SectionHeader
          title="Choosing between io-button and io-button-pure"
          description="Both can render a link-styled button — the distinction is sizing behaviour."
        />
        <div className="space-y-3">
          <RuleCard label="io-button variant='link' — fixed size preset">
            Use when the button must conform to a defined size scale (sm / md / lg / xl). The button has padding
            and minimum dimensions that respect the touch-target rules (44×44 px minimum). Best for standalone
            CTAs and links in forms or modals.
          </RuleCard>
          <RuleCard label="io-button-pure — inherits font-size">
            Use when the button must blend into surrounding body text, a table cell, or a compact toolbar.
            The button has no padding of its own — it adopts the line-height and font-size of its parent.
            Best for inline actions and navigation menus.
          </RuleCard>
        </div>
      </section>

      <section id="props" className="space-y-6">
        <SectionHeader
          title="Key props"
          description="io-button-pure extends the base button model with layout and style modifiers."
        />
        <div className="space-y-3">
          <RuleCard label="underline">
            Always shows a text underline — even when not hovered. Use for links in body copy where the
            underline aids scannability and accessibility. Omit in toolbar or menu contexts where the underline
            would feel out of place.
          </RuleCard>
          <RuleCard label="active">
            Applies the active colour token to signal the currently selected item. Use in navigation menus,
            breadcrumb-style flows, and tab-bar alternatives built from button lists.
          </RuleCard>
          <RuleCard label="stretch">
            Expands the button to full parent width. Use when aligning a column of button-pure items in a
            sidebar menu or dropdown list.
          </RuleCard>
          <RuleCard label="alignLabel">
            Controls the position of the icon relative to the label. <C>start</C> places the icon to the left
            of the label (default); <C>end</C> places it to the right. Use <C>end</C> for trailing arrow icons.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
