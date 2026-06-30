'use client';

import { ApiTable, InlineCode, ReflectBadge, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoAccordionApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public API for the single-item accordion pattern."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '170px' },
            { label: 'Attribute', width: '170px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="property"><InlineCode>heading</InlineCode></span>,
              <InlineCode key="attribute">heading</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">''</InlineCode>,
              <span key="description">Fallback heading text. Overridden by the <InlineCode>heading</InlineCode> named slot.</span>,
            ],
            [
              <span key="property"><InlineCode>headingTag</InlineCode></span>,
              <InlineCode key="attribute">heading-tag</InlineCode>,
              <InlineCode key="type">'h2' | 'h3' | 'h4' | 'h5' | 'h6'</InlineCode>,
              <InlineCode key="default">'h3'</InlineCode>,
              <span key="description">HTML heading element wrapping the trigger button.</span>,
            ],
            [
              <span key="property"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">size</InlineCode>,
              <InlineCode key="type">'sm' | 'md' | 'lg'</InlineCode>,
              <InlineCode key="default">'md'</InlineCode>,
              <span key="description">Size preset controlling trigger padding and heading font size. <InlineCode>sm</InlineCode> = compact, <InlineCode>md</InlineCode> = default, <InlineCode>lg</InlineCode> = comfortable. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">compact</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Dense layout mode — reduces trigger padding independently of the <InlineCode>size</InlineCode> preset. Useful for space-constrained UI contexts. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>alignMarker</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">align-marker</InlineCode>,
              <InlineCode key="type">'start' | 'end'</InlineCode>,
              <InlineCode key="default">'end'</InlineCode>,
              <span key="description">Position of the expand/collapse icon relative to the trigger title. <InlineCode>end</InlineCode> (default) places the icon after the title; <InlineCode>start</InlineCode> places it before, for sidebar or tree-navigation layouts.</span>,
            ],
            [
              <span key="property"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">open</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Controls whether the panel is expanded. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">disabled</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Prevents interaction, reduces opacity, and sets <InlineCode>aria-disabled</InlineCode> on the trigger button. The button remains focusable so screen readers can announce it as unavailable (WCAG 4.1.2). Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>defaultExpanded</InlineCode></span>,
              <InlineCode key="attribute">default-expanded</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Expands the panel on the very first render. Has no effect after initial mount — use the <InlineCode>open</InlineCode> prop for runtime control. Does not reflect back to attribute (preventing the attribute from persisting after the user closes the panel).</span>,
            ],
            [
              <span key="property"><InlineCode>allowMultiple</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">allow-multiple</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">When <InlineCode>false</InlineCode> (default), opening this accordion dispatches a coordination event so sibling accordions in the same parent auto-close. Set to <InlineCode>true</InlineCode> to allow multiple panels to remain open simultaneously. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>background</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">background</InlineCode>,
              <InlineCode key="type">'transparent' | 'surface' | 'canvas'</InlineCode>,
              <InlineCode key="default">'transparent'</InlineCode>,
              <span key="description">Background fill variant for the accordion host element. <InlineCode>transparent</InlineCode> (default): no background fill. <InlineCode>surface</InlineCode>: <InlineCode>var(--io-bg-surface)</InlineCode> — subtle fill. <InlineCode>canvas</InlineCode>: <InlineCode>var(--io-bg-page)</InlineCode> — page-level fill. <InlineCode>frosted</InlineCode>: semi-transparent with <InlineCode>backdrop-filter: blur</InlineCode> for legibility over image/video backdrops. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>sticky</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">sticky</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">When <InlineCode>true</InlineCode>, the accordion trigger becomes <InlineCode>position: sticky; top: 0</InlineCode> so it remains visible while scrolling through long expanded content. Only meaningful when <InlineCode>background</InlineCode> is <InlineCode>surface</InlineCode> or <InlineCode>canvas</InlineCode> — using <InlineCode>sticky</InlineCode> with a transparent background causes content to bleed through. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>indent</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">indent</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">When <InlineCode>true</InlineCode>, indents the panel content to visually align with the summary text column past the expand/collapse icon. Useful when <InlineCode>alignMarker="start"</InlineCode> so body copy lines up with the trigger label. Overridable via <InlineCode>--io-accordion-indent</InlineCode>. Reflects to attribute.</span>,
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-accordion."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '190px' },
            { label: 'Detail type', width: '260px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="event">update</InlineCode>,
              <InlineCode key="detail">{`{ open: boolean }`}</InlineCode>,
              <span key="description">Fires when the panel opens or closes. Consumer should update the <InlineCode>open</InlineCode> prop in response.</span>,
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Slots for trigger heading and panel content."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '190px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="slot">summary</InlineCode>,
              <span key="description">Free-form trigger content rendered inside the trigger button. Use instead of <InlineCode>heading</InlineCode> slot for rich markup.</span>,
            ],
            [
              <InlineCode key="slot">heading</InlineCode>,
              <span key="description">Named slot (deprecated — use <InlineCode>summary</InlineCode> instead). Replaces the <InlineCode>heading</InlineCode> prop with rich heading content.</span>,
            ],
            [
              <InlineCode key="slot">summary-before</InlineCode>,
              <span key="description">Rendered as a flex sibling <em>before</em> the trigger button in the heading row. Interactive children (buttons, links) remain independently operable because they live outside the trigger button.</span>,
            ],
            [
              <InlineCode key="slot">summary-after</InlineCode>,
              <span key="description">Rendered as a flex sibling <em>after</em> the trigger button in the heading row. Use for inline action buttons (edit, delete) that must not interfere with the expand/collapse click target.</span>,
            ],
            [
              <span key="slot">(default)</span>,
              <span key="description">Panel body content rendered when the accordion is open.</span>,
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '310px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-accordion-border-color</InlineCode>,
              <InlineCode key="d">var(--io-text-primary)</InlineCode>,
              'Color of the top and bottom divider lines. Defaults to the primary text token, allowing independent theming of the divider without overriding text color.',
            ],
            [
              <InlineCode key="n">--io-accordion-py</InlineCode>,
              <InlineCode key="d">var(--io-space-6)</InlineCode>,
              'Vertical (top/bottom) padding of the trigger button. Overrides the base padding; size-variant padding-top/bottom takes precedence when a size is set.',
            ],
            [
              <InlineCode key="n">--io-accordion-px</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              'Horizontal (left/right) padding of the trigger button. Use to add lateral padding without overriding the entire padding shorthand.',
            ],
            [
              <InlineCode key="n">--io-accordion-summary-top</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              'Top offset for the sticky trigger heading. Set to the height of a fixed app header to prevent the sticky header from hiding behind it.',
            ],
            [
              <InlineCode key="n">--io-accordion-bg-frosted</InlineCode>,
              <InlineCode key="d">color-mix(in srgb, var(--io-bg-surface) 70%, transparent)</InlineCode>,
              'Background color for the frosted background variant. Override to adjust the opacity or tint of the blur layer.',
            ],
            [
              <InlineCode key="n">--io-accordion-indent</InlineCode>,
              <InlineCode key="d">calc(var(--io-space-6) + var(--io-space-4))</InlineCode>,
              'Inline-start padding applied to panel content when indent=true. Aligns body copy with the summary text column past the expand/collapse icon.',
            ],
            [
              <InlineCode key="n">--io-accordion-icon-bar-thickness</InlineCode>,
              <InlineCode key="d">8%</InlineCode>,
              'Thickness of the +/− icon bars as a percentage of the icon container size.',
            ],
            [
              <InlineCode key="n">--io-accordion-icon-bar-inset</InlineCode>,
              <InlineCode key="d">1%</InlineCode>,
              'Inset (padding) of the icon bars from the edges of the icon container.',
            ],
            [
              <InlineCode key="n">--io-accordion-icon-bar-axis-offset</InlineCode>,
              <InlineCode key="d">44%</InlineCode>,
              'Position of each bar along its cross-axis to achieve visual centring.',
            ],
            [
              <InlineCode key="n">--io-accordion-icon-horizontal-collapsed-side</InlineCode>,
              <InlineCode key="d">50%</InlineCode>,
              'The left and right values used to collapse the horizontal bar when the panel is open, producing the − appearance.',
            ],
          ]}
        />
      </section>
    </div>
  );
}
