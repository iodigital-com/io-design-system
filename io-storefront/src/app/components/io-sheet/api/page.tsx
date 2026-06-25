'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSheetApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-sheet Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              'Controls sheet visibility. Set to true to open the sheet; false to close it. Reflected to the host attribute — use :host([open]) in CSS to target open state.',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>undefined</span>,
              'Text displayed in the sheet header. Used as the accessible name for the dialog via aria-labelledby. Omit to use the header slot for custom heading markup.',
            ],
            [
              <InlineCode key="n">dismissible</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'When true, the close button is shown in the header and backdrop click / Escape key close the sheet. Set to false for mandatory flows where the user must complete the action.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-sheet."
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
              'Emitted when the user dismisses the sheet via the close button, backdrop click, or Escape key. Does NOT fire when open is set to false programmatically.',
            ],
            [
              <InlineCode key="n">motionVisibleEnd</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Emitted after the open animation has completed. Use to focus content inside the sheet or start dependent animations.',
            ],
            [
              <InlineCode key="n">motionHiddenEnd</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Emitted after the close animation has completed. Use to unmount content or reset state after the sheet is fully off-screen.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const sheet = document.querySelector('io-sheet');
openBtn.addEventListener('click', () => { sheet.open = true; });
sheet.addEventListener('dismiss', () => console.log('dismissed'));

// React
<io-sheet open={isOpen} onDismiss={() => setIsOpen(false)} heading="Share">...</io-sheet>

// Angular
<io-sheet [open]="isOpen" (dismiss)="isOpen = false" heading="Share">...</io-sheet>

// Vue
<IoSheet :open="isOpen" @dismiss="isOpen = false" heading="Share">...</IoSheet>
`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-sheet."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Main sheet body content. Place descriptive text, form fields, lists, or any content the user needs to interact with.',
            ],
            [
              <InlineCode key="n">header</InlineCode>,
              'Replaces the built-in heading area. Use when custom heading markup or an io-heading element is required. When this slot is used, the heading prop is ignored.',
            ],
            [
              <InlineCode key="n">footer</InlineCode>,
              'Action buttons at the bottom of the sheet panel. Typically a primary action button and a ghost-variant Cancel or Close button. Limit footer actions to two buttons.',
            ],
          ]}
        />
        <CodeNote label="Slot usage">
{`<io-sheet heading="Share" open>
  <!-- default slot: body content -->
  <p>Choose a sharing option.</p>

  <!-- footer slot: action buttons -->
  <io-button slot="footer" variant="ghost">Cancel</io-button>
  <io-button slot="footer">Share</io-button>
</io-sheet>`}
        </CodeNote>
      </section>

    </div>
  );
}
