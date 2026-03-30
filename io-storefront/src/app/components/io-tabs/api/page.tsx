'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, MutableBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tabs Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute. Props marked 'mutable' are updated internally by the component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">tabs</InlineCode>,
              <InlineCode key="t">IoTabItem[]</InlineCode>,
              <InlineCode key="d">[]</InlineCode>,
              <span key="desc">
                Array of tab descriptors. Each item has a required{' '}
                <InlineCode>label</InlineCode> (display text),{' '}
                <InlineCode>value</InlineCode> (unique identifier string), and optional{' '}
                <InlineCode>disabled</InlineCode> (boolean). The order of items determines the
                visual and keyboard order of the tab buttons.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>activeTab</InlineCode>
                <MutableBadge />
                <ReflectBadge />
              </span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              <span key="desc">
                The <InlineCode>value</InlineCode> of the currently active tab. Mutable — updated
                internally when the user activates a tab. Reflected to a host attribute so it can
                be observed via CSS attribute selectors. Bind to{' '}
                <InlineCode>ioChange</InlineCode> to keep external state in sync.
              </span>,
            ],
          ]}
        />
        <CodeNote label="IoTabItem type">
{`interface IoTabItem {
  /** Text displayed on the tab button and used as the accessible name. */
  label: string;
  /** Unique identifier emitted in the ioChange event detail. */
  value: string;
  /** When true, the tab is visually dimmed and cannot be activated. */
  disabled?: boolean;
}`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tabs."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '180px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">ioChange</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              'No',
              'Fires when the user activates a tab (via click, Enter, or Space). The event detail is the value string of the newly active tab. Use this to update the activeTab prop and render the corresponding panel.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-tabs')
  .addEventListener('ioChange', (e) => {
    console.log('active tab:', e.detail);
  });

// React
<IoTabs
  tabs={tabs}
  activeTab={activeTab}
  onIoChange={(e) => setActiveTab(e.detail)}
/>

// Angular
<io-tabs [tabs]="tabs" [activeTab]="activeTab" (ioChange)="onTabChange($event)"></io-tabs>

// Vue
<io-tabs :tabs="tabs" :active-tab="activeTab" @io-change="handleChange" />`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tabs exposes no public methods.</strong>
          {' '}All interactions are driven by prop changes (<InlineCode>tabs</InlineCode>,{' '}
          <InlineCode>activeTab</InlineCode>) and the <InlineCode>ioChange</InlineCode> event.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-tabs."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tabs has no content slots.</strong>
          {' '}The component renders tab buttons only. Panel content is managed entirely by the
          consuming application — render each panel as a sibling element with{' '}
          <InlineCode>role=&quot;tabpanel&quot;</InlineCode> and conditionally show the panel whose
          value matches <InlineCode>activeTab</InlineCode>.
        </EmptyNote>
      </section>

    </div>
  );
}
