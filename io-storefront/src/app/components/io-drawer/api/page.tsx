'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoDrawerApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-drawer Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              'Controls drawer visibility. Set to true to open the drawer; false to close it.',
            ],
            [
              <span key="n"><InlineCode>placement</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">left | right | bottom</InlineCode>,
              <InlineCode key="d">right</InlineCode>,
              'Which screen edge the drawer attaches to. Right is the conventional edge for detail and edit panels; left for navigation; bottom for action sheets.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">sm | md | lg | full</InlineCode>,
              <InlineCode key="d">md</InlineCode>,
              'Width preset for left/right placements (320px / 480px / 640px / 100vw); height preset for bottom placement (40vh / 50vh / 66vh / 100vh).',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>undefined</span>,
              'Text displayed in the drawer header. Used as the accessible name for the dialog via aria-labelledby.',
            ],
            [
              <InlineCode key="n">closeOnBackdrop</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'Dismisses the drawer when the user clicks the backdrop area outside the panel. Disable for drawers where accidental dismissal would cause data loss.',
            ],
            [
              <InlineCode key="n">closeLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Close drawer&apos;</InlineCode>,
              'Accessible label for the close button. Override with a more specific description when the context warrants it.',
            ],
            [
              <InlineCode key="n">dismissButton</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'Controls visibility of the × dismiss button. When false, the drawer header has no close button and the user cannot dismiss via keyboard. Use false for guided-flow drawers where the consumer controls the close action.',
            ],
          ]}
        />
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public methods exposed on the io-drawer custom element."
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
              'Opens the drawer. No-op if already open. Equivalent to setting open = true.',
            ],
            [
              <InlineCode key="n">close()</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Closes the drawer programmatically. No-op if already closed. Does NOT emit the dismiss event. Equivalent to setting open = false.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-drawer."
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
              'Only fires when the user actively dismisses (× button, Escape key, backdrop click). Does NOT fire when open is set to false programmatically.',
            ],
          ]}
        />
        <CodeNote label="Accessible name required">
          {`// A console.error is logged in development when the drawer has no accessible name.\n// Provide at least one of: heading prop, heading slot, aria-label, or aria-labelledby.`}
        </CodeNote>
        <CodeNote label="Usage">
{`// Vanilla JS
const drawer = document.querySelector('io-drawer');
openBtn.addEventListener('click', () => { drawer.show(); });
drawer.addEventListener('dismiss', () => console.log('dismissed'));

// React
<io-drawer open={isOpen} onDismiss={() => setIsOpen(false)} heading="Settings">...</io-drawer>

// Angular
<io-drawer [open]="isOpen" (dismiss)="isOpen = false" heading="Settings">...</io-drawer>

// Vue
<IoDrawer :open="isOpen" @dismiss="isOpen = false" heading="Settings">...</IoDrawer>
`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-drawer."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Main drawer body content. Place descriptive text, form fields, navigation links, or any content the user needs to interact with.',
            ],
            [
              <InlineCode key="n">footer</InlineCode>,
              'Action buttons aligned to the end of the drawer panel. Place the primary action button and a secondary ghost-variant cancel button here. Limit footer actions to two buttons.',
            ],
          ]}
        />
        <CodeNote label="Slot usage">
{`<io-drawer heading="Edit profile" placement="right" size="md">
  <!-- default slot: body content -->
  <p>Update your profile information below.</p>

  <!-- footer slot: action buttons -->
  <io-button slot="footer" variant="ghost">Cancel</io-button>
  <io-button slot="footer">Save changes</io-button>
</io-drawer>`}
        </CodeNote>
      </section>

    </div>
  );
}
