'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoModalApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-modal Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '200px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controls dialog visibility. Set to true to open the modal; false to close it.',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>undefined</span>,
              'Text displayed in the dialog header. Used as the accessible name for the dialog via aria-labelledby. If omitted, use the header slot to provide a custom heading element.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">sm | md | lg</InlineCode>,
              <InlineCode key="d">md</InlineCode>,
              'Sets the dialog width. sm is suited to compact confirmations; md is the general-purpose default; lg accommodates content-rich dialogs such as forms or data tables.',
            ],
            [
              <InlineCode key="n">closeOnBackdrop</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'Dismisses the dialog when the user clicks the backdrop area outside the dialog panel. Disable for critical dialogs where accidental dismissal would cause data loss.',
            ],
            [
              <InlineCode key="n">dismissButton</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'Controls visibility of the × dismiss button in the modal header. When false, the ESC key is also suppressed — the modal can only close via programmatic close(). Use false for critical-confirmation modals where accidental dismissal must be prevented. Always include at least one explicit action button in the footer slot.',
            ],
            [
              <InlineCode key="n">description</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Accessible description for the dialog. Linked via aria-describedby to the native <dialog> element. Supplements the heading for screen reader users.',
            ],
            [
              <InlineCode key="n">aria</InlineCode>,
              <InlineCode key="t">{'Record<string, string> | undefined'}</InlineCode>,
              '—',
              'Arbitrary ARIA attributes applied to the inner <dialog> element. Keys may omit or include the aria- prefix. Example: <InlineCode>{\'{ owns: "step-panel" }\'}</InlineCode>.',
            ],
            [
              <span key="n"><InlineCode>background</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;canvas&apos; | &apos;surface&apos; | &apos;elevated&apos;</InlineCode>,
              <InlineCode key="d">&apos;canvas&apos;</InlineCode>,
              'Background colour of the dialog panel. canvas uses the page background; surface uses the card/panel background; elevated uses a raised surface background.',
            ],
            [
              <span key="n"><InlineCode>preventTopLayer</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'When true, uses a CSS-based overlay instead of the native popover top-layer API. Set to false to allow the browser to render the modal in the top layer (useful in stacking-context environments).',
            ],
          ]}
        />
      </section>

      {/* ── Development Warnings ─────────────────────────────────── */}
      <section id="development-warnings" className="space-y-4">
        <SectionHeader
          title="Development warnings"
          description="These console.error messages are emitted in development to flag accessibility violations. They do not appear in production builds."
        />
        <ApiTable
          columns={[
            { label: 'Condition', width: '320px' },
            { label: 'Message' },
          ]}
          rows={[
            [
              'No accessible name provided (missing heading prop, header slot with a heading element, aria-label, or aria-labelledby)',
              '[io-modal] No accessible name provided. Set heading, aria-label, or aria-labelledby prop for WCAG 4.1.2 compliance.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-modal."
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
              'Emitted after the modal closes — whether via backdrop click, ESC key, the built-in close button, or setting open to false. Use this to return focus to the trigger element, clean up state, or trigger follow-up actions.',
            ],
            [
              <InlineCode key="n">motionVisibleEnd</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Emitted after the open entry animation completes. Use to run logic that depends on the modal being fully visible (e.g. auto-focus a field, start a timer).',
            ],
            [
              <InlineCode key="n">motionHiddenEnd</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Emitted after the close exit animation completes. Use to unmount the modal from the DOM or reset internal state only after the animation finishes.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const modal = document.querySelector('io-modal');
openBtn.addEventListener('click', () => { modal.open = true; });
modal.addEventListener('dismiss', () => console.log('dismissed'));

// React
<io-modal open={isOpen} onDismiss={() => setIsOpen(false)} heading="Confirm">...</io-modal>

// Angular
<io-modal [open]="isOpen" (dismiss)="isOpen = false" heading="Confirm">...</io-modal>

// Vue
<IoModal :open="isOpen" @dismiss="isOpen = false" heading="Confirm">...</IoModal>
`}
        </CodeNote>
      </section>



      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-modal. All slots are optional — use only what your dialog requires."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">header</InlineCode>,
              'Overrides the heading prop. Use for custom header content such as a heading with a subtitle, an icon, or a step indicator. When this slot is used, ensure the slotted content includes a visible heading element for accessibility.',
            ],
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Main dialog body content. Place descriptive text, form fields, data, or any content the user needs to respond to here.',
            ],
            [
              <InlineCode key="n">footer</InlineCode>,
              'Action buttons aligned to the end of the dialog panel by default. Place the primary action button and a secondary ghost-variant cancel button here. Limit footer actions to two buttons.',
            ],
          ]}
        />
        <CodeNote label="Slot usage">
{`<io-modal heading="Confirm deletion" size="sm">
  <!-- default slot: body content -->
  <p>This action cannot be undone. The record will be permanently deleted.</p>

  <!-- footer slot: action buttons -->
  <io-button slot="footer" variant="ghost" size="sm">Cancel</io-button>
  <io-button slot="footer" color="rouge" size="sm">Delete</io-button>
</io-modal>

<!-- header slot: custom header content -->
<io-modal size="md">
  <div slot="header">
    <h2>Upload document</h2>
    <p>Supported formats: PDF, DOCX, PNG</p>
  </div>
  <p>Select a file to upload to this record.</p>
  <io-button slot="footer" variant="ghost" size="sm">Cancel</io-button>
  <io-button slot="footer" size="sm">Upload</io-button>
</io-modal>`}
        </CodeNote>
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
              <InlineCode key="n">--io-modal-width-sm</InlineCode>,
              <InlineCode key="d">400px</InlineCode>,
              'Dialog width for the sm size variant.',
            ],
            [
              <InlineCode key="n">--io-modal-width-md</InlineCode>,
              <InlineCode key="d">560px</InlineCode>,
              'Dialog width for the md size variant.',
            ],
            [
              <InlineCode key="n">--io-modal-width-lg</InlineCode>,
              <InlineCode key="d">768px</InlineCode>,
              'Dialog width for the lg size variant.',
            ],
            [
              <InlineCode key="n">--io-modal-max-height</InlineCode>,
              <InlineCode key="d">90vh</InlineCode>,
              'Maximum height of the dialog before the body becomes scrollable.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
