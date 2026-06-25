'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoButtonApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-button Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;solid&apos; | &apos;ghost&apos; | &apos;link&apos;</InlineCode>,
              <InlineCode key="d">&apos;solid&apos;</InlineCode>,
              'Visual fill style. Solid = filled background. Ghost = transparent with border. Link = underline only.',
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoButtonColor</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(10 values)</span>
              </span>,
              <InlineCode key="d">&apos;blue&apos;</InlineCode>,
              <span key="desc">
                Colour theme. One of: <InlineCode>blue</InlineCode> <InlineCode>white</InlineCode> <InlineCode>black</InlineCode> <InlineCode>antraciet</InlineCode> <InlineCode>orange</InlineCode> <InlineCode>pink</InlineCode> <InlineCode>rouge</InlineCode> <InlineCode>yellow</InlineCode> <InlineCode>beige</InlineCode> <InlineCode>grey</InlineCode>. Note: <InlineCode>grey</InlineCode> is only supported with <InlineCode>variant=&quot;ghost&quot;</InlineCode>.
              </span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Size preset. sm ≈ 31px height, md = 42px, lg = 50px, xl = 56px. Heights are driven by control-size tokens.',
            ],
            [
              <InlineCode key="n">type</InlineCode>,
              <InlineCode key="t">&apos;button&apos; | &apos;submit&apos; | &apos;reset&apos;</InlineCode>,
              <InlineCode key="d">&apos;button&apos;</InlineCode>,
              'Native HTML button type attribute. Ignored when href is set (the element renders as <a> instead).',
            ],
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'When set, renders the inner element as <a href="..."> instead of <button>. Removed from the anchor when disabled or loading.',
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'Forwarded to the anchor target attribute. Only used when href is set.',
            ],
            [
              <InlineCode key="n">rel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Forwarded to the anchor rel attribute. Only used when href is set. Recommended value for external links: "noreferrer noopener".',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Reduces opacity and blocks all user interaction. Sets aria-disabled="true". On anchors, also removes the href so the link cannot be followed.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Displays a centred spinner, hides label and arrow (opacity: 0), and blocks interaction. Sets aria-busy="true" and aria-disabled="true". Button dimensions are preserved — no layout shift.',
            ],
            [
              <InlineCode key="n">fullWidth</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Stretches the button to fill 100% of its containing block. Useful for stacked mobile layouts.',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Sets aria-label on the inner element. Required for icon-only buttons that have no visible slot text.',
            ],
            [
              <span key="n"><InlineCode>iconOnly</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders a square icon-only button and suppresses visible label text. Requires label prop or host aria-label for accessibility.',
            ],
            [
              <span key="n"><InlineCode>arrow</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;forward&apos; | &apos;back&apos; | &apos;down&apos; | undefined</InlineCode>,
              '—',
              'Renders an animated SVG arrow icon. forward slides right on hover, back rotates 180° and slides left, down rotates 90° and slides down. Omit to hide the arrow.',
            ],
            [
              <span key="n"><InlineCode>arrowPlacement</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;left&apos; | &apos;right&apos;</InlineCode>,
              <InlineCode key="d">&apos;right&apos;</InlineCode>,
              'Side on which the arrow icon is rendered relative to the label. Use "left" for back-navigation patterns.',
            ],
            [
              <InlineCode key="n">icon</InlineCode>,
              <InlineCode key="t">IoIconName | undefined</InlineCode>,
              '—',
              'Name of a Lucide icon to render inside the button. The icon is hidden from assistive technologies (aria-hidden). Use with hideLabel or iconOnly for icon-only buttons.',
            ],
            [
              <InlineCode key="n">iconSource</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Raw SVG string used as a custom icon when the built-in Lucide icon set does not contain the required icon. Takes precedence over icon when both are set.',
            ],
            [
              <span key="n"><InlineCode>iconPosition</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;left&apos; | &apos;right&apos;</InlineCode>,
              <InlineCode key="d">&apos;left&apos;</InlineCode>,
              'Side on which the icon is rendered relative to the button label. Ignored when iconOnly is true.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the label text while keeping it in the accessible name. Useful for icon-plus-text buttons where the label should be readable by screen readers but not visible.',
            ],
            [
              <span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Reduces vertical padding to a compact preset without changing the size classification. Use in dense layouts such as toolbars or table action cells.',
            ],
            [
              <span key="n"><InlineCode>name</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Gives this button a name in submitted form data. When set alongside value, a name–value pair is included when the form submits. Required for any form value submission — type="submit" triggers submission; type="button" does not submit form data regardless.',
            ],
            [
              <span key="n"><InlineCode>value</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Value included in submitted form data under the name key. Only submitted when name is also set. Also used by io-button-group to identify the selected button.',
            ],
            [
              <span key="n"><InlineCode>form</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'ID of the form element the button is associated with. Allows the button to be placed outside the form element in the DOM while still submitting or resetting that form.',
            ],
            [
              <InlineCode key="n">aria</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>Partial&lt;Record&lt;IoButtonAriaAttribute, string&gt;&gt;</InlineCode>
              </span>,
              '—',
              <span key="desc">
                Escape-hatch for additional ARIA attributes on the inner button or anchor element. Accepted keys: <InlineCode>aria-expanded</InlineCode>, <InlineCode>aria-pressed</InlineCode>, <InlineCode>aria-haspopup</InlineCode>, <InlineCode>aria-controls</InlineCode>, <InlineCode>aria-labelledby</InlineCode>, <InlineCode>aria-describedby</InlineCode>, <InlineCode>aria-label</InlineCode>, <InlineCode>aria-description</InlineCode>. Use for toggle buttons, disclosure triggers, and combobox patterns.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-button. Listen via addEventListener or framework event binding."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '160px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">click</InlineCode>,
              <InlineCode key="t">MouseEvent</InlineCode>,
              'Yes',
              <span key="desc">
                Fires when the user activates the button via click, <kbd className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>Enter</kbd>, or{' '}
                <kbd className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>Space</kbd>. The original <InlineCode>MouseEvent</InlineCode> is passed as the event detail. Not emitted when <InlineCode>disabled</InlineCode> or <InlineCode>loading</InlineCode> is true.
              </span>,
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-button')
  .addEventListener('click', (e) => console.log(e.detail));

// React
<IoButton onClick={(e) => console.log(e.detail)}>Click me</IoButton>

// Angular
<io-button (click)="handleClick($event)">Click me</io-button>

// Vue
<io-button @click="handleClick">Click me</io-button>`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference. Call after the component has been upgraded."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '160px' },
            { label: 'Signature', width: '320px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">setFocus</InlineCode>,
              <InlineCode key="s">(options?: FocusOptions) =&gt; Promise&lt;void&gt;</InlineCode>,
              'Programmatically moves focus to the inner button or anchor element. Useful for managing focus after dynamic UI changes (e.g. closing a modal and returning focus to its trigger).',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const btn = document.querySelector('io-button');
await btn.setFocus({ preventScroll: true });

// React (via ref)
const ref = useRef(null);
await ref.current.setFocus();`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-button."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                (default)
              </span>,
              'Button label text or arbitrary inline content. For icon-only usage with no visible text, always set the label prop to provide an accessible name.',
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
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-button-spinner-duration</InlineCode>,
              <InlineCode key="d">600ms</InlineCode>,
              'Duration of the loading spinner rotation animation.',
            ],
            [
              <InlineCode key="n">--io-button-spinner-border-width</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Border width of the loading spinner ring.',
            ],
            [
              <InlineCode key="n">--io-button-icon-padding</InlineCode>,
              <InlineCode key="d">var(--io-space-2)</InlineCode>,
              'Padding applied to icon-only buttons. Falls back to the global spacing token.',
            ],
            [
              <InlineCode key="n">--io-button-xl-padding-y</InlineCode>,
              <InlineCode key="d">1.125rem</InlineCode>,
              'Vertical padding for the xl size variant.',
            ],
            [
              <InlineCode key="n">--io-button-arrow-width-default</InlineCode>,
              <InlineCode key="d">0.875rem</InlineCode>,
              'Width of the arrow icon for sm, md, and lg sizes.',
            ],
            [
              <InlineCode key="n">--io-button-arrow-height-default</InlineCode>,
              <InlineCode key="d">0.54rem</InlineCode>,
              'Height of the arrow icon for sm, md, and lg sizes.',
            ],
            [
              <InlineCode key="n">--io-button-arrow-xl-width</InlineCode>,
              <InlineCode key="d">1.5rem</InlineCode>,
              'Width of the arrow icon for the xl size variant.',
            ],
            [
              <InlineCode key="n">--io-button-arrow-xl-height</InlineCode>,
              <InlineCode key="d">0.923rem</InlineCode>,
              'Height of the arrow icon for the xl size variant.',
            ],
            [
              <InlineCode key="n">--io-button-arrow-shift-forward</InlineCode>,
              <InlineCode key="d">6px</InlineCode>,
              'Distance the forward arrow translates on hover.',
            ],
            [
              <InlineCode key="n">--io-button-arrow-shift-down</InlineCode>,
              <InlineCode key="d">5px</InlineCode>,
              'Distance the down arrow translates on hover.',
            ],
            [
              <InlineCode key="n">--io-button-link-underline-height</InlineCode>,
              <InlineCode key="d">1px</InlineCode>,
              'Height of the animated underline on link-variant buttons.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
