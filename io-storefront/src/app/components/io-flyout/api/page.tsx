'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoFlyoutApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-flyout Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controls flyout visibility. Set to true to open the flyout; false to close it.',
            ],
            [
              <span key="n"><InlineCode>position</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">start | end | top | bottom</InlineCode>,
              <InlineCode key="d">end</InlineCode>,
              'Which side of the viewport the flyout panel is anchored to. end (right in LTR) is the conventional edge for detail panels; start (left in LTR) for navigation menus. top and bottom anchor to the horizontal edges.',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>undefined</span>,
              'Text displayed in the flyout header. Used as the accessible name for the dialog via aria-labelledby. Omit to use the header slot for custom heading markup.',
            ],
            [
              <InlineCode key="n">closeLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">Close flyout</InlineCode>,
              'Accessible label for the close button. Override to provide context when multiple overlays may be open simultaneously.',
            ],
          ]}
        />
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public methods exposed on the io-flyout custom element."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '200px' },
            { label: 'Returns', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">show()</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Opens the flyout. No-op if already open. Equivalent to setting open = true.',
            ],
            [
              <InlineCode key="n">close()</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Closes the flyout programmatically. No-op if already closed. Does NOT emit the dismiss event. Equivalent to setting open = false.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-flyout."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '200px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">dismiss</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Emitted when the user dismisses the flyout via the close button, backdrop click, or Escape key. Does NOT fire when open is set to false or close() is called programmatically.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const flyout = document.querySelector('io-flyout');
openBtn.addEventListener('click', () => { flyout.show(); });
flyout.addEventListener('dismiss', () => console.log('dismissed'));

// React
<io-flyout open={isOpen} onDismiss={() => setIsOpen(false)} heading="Navigation">...</io-flyout>

// Angular
<io-flyout [open]="isOpen" (dismiss)="isOpen = false" heading="Navigation">...</io-flyout>

// Vue
<IoFlyout :open="isOpen" @dismiss="isOpen = false" heading="Navigation">...</IoFlyout>
`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-flyout."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Main flyout body content. Place navigation links, descriptive text, form fields, or any content the user needs to interact with.',
            ],
            [
              <InlineCode key="n">header</InlineCode>,
              'Replaces the built-in heading area. Use when custom heading markup or an io-heading element is required. When this slot is used, the heading prop is ignored.',
            ],
            [
              <InlineCode key="n">footer</InlineCode>,
              'Action buttons aligned to the end of the flyout panel. Typically a primary action button and a ghost-variant Cancel or Close button. Limit footer actions to two buttons.',
            ],
          ]}
        />
        <CodeNote label="Slot usage">
{`<io-flyout heading="Navigation" position="right">
  <!-- default slot: body content -->
  <p>Select a section to navigate to.</p>

  <!-- footer slot: action buttons -->
  <io-button slot="footer" variant="ghost">Close</io-button>
  <io-button slot="footer">Go to section</io-button>
</io-flyout>`}
        </CodeNote>
      </section>

    </div>
  );
}
