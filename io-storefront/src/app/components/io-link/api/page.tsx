'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoLinkApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-link Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'The URL the link navigates to. Forwarded as the native href attribute on the anchor element. Must always be set — a link without an href is not keyboard-focusable.',
            ],
            [
              <InlineCode key="n">variant</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;standalone&apos;</InlineCode>{' | '}<InlineCode>&apos;inline&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;standalone&apos;</InlineCode>,
              'Visual variant. standalone renders at the component\'s own font size; inline inherits the font size of the surrounding text.',
            ],
            [
              <InlineCode key="n">color</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;blue&apos;</InlineCode>{' | '}<InlineCode>&apos;black&apos;</InlineCode>{' | '}<InlineCode>&apos;white&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;blue&apos;</InlineCode>,
              'Link colour. Use blue or black on light surfaces. Use white on dark or coloured surfaces only.',
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'HTML target attribute. Use "_blank" to open the link in a new tab. When using "_blank", also set external=true and a suitable rel.',
            ],
            [
              <InlineCode key="n">rel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML rel attribute. When external is true, "noopener noreferrer" is applied automatically unless rel is explicitly overridden.',
            ],
            [
              <InlineCode key="n">external</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the link as external. Appends an external-link icon and applies rel="noopener noreferrer" automatically.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the link. Sets aria-disabled="true" and blocks navigation on click. The element remains focusable.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-link."
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
              <InlineCode key="n">ioClick</InlineCode>,
              <InlineCode key="t">MouseEvent</InlineCode>,
              'No',
              'Fires when the link is clicked and not disabled. The native MouseEvent is passed as the event detail. Useful for analytics tracking or SPA navigation interception.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-link')
  .addEventListener('ioClick', (e) => console.log(e.detail));

// React
<IoLink onIoClick={(e) => trackNavigation(e.detail)} href="/docs">
  Documentation
</IoLink>

// Angular
<io-link (click)="handleClick($event)" href="/docs">Documentation</io-link>

// Vue
<io-link @click="handleClick" href="/docs">Documentation</io-link>`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
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
              'Programmatically moves focus to the inner anchor element. Use to return focus after a modal closes or to direct the user to a specific link after a dynamic update.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-link."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'Link text content. This becomes the accessible name of the anchor. Use descriptive text that communicates the link destination without surrounding context.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
