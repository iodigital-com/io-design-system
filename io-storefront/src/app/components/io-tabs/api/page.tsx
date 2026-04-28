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
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Optional accessible label applied to the internal tablist via{' '}
                <InlineCode>aria-label</InlineCode>. Recommended when multiple tablists appear on the same page.
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
                <InlineCode>update</InlineCode> to keep external state in sync.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>activeTabIndex</InlineCode>
                <MutableBadge />
                <ReflectBadge />
              </span>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">-1</InlineCode>,
              <span key="desc">
                The 0-based index of the active tab, aligned with Tabs Bar style controlled state.
                This is updated together with <InlineCode>activeTab</InlineCode> and emitted in{' '}
                <InlineCode>update</InlineCode> detail.
              </span>,
            ],
          ]}
        />
        <CodeNote label="IoTabItem type">
{`interface IoTabItem {
  /** Text displayed on the tab button and used as the accessible name. */
  label: string;
  /** Unique identifier emitted in the change event detail. */
  value: string;
  /** When true, the tab is visually dimmed and cannot be activated. */
  disabled?: boolean;
  /** Optional external panel id for aria-controls linkage. */
  panelId?: string;
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
              <InlineCode key="n">update</InlineCode>,
              <InlineCode key="t">{'{ activeTab: string; activeTabIndex: number }'}</InlineCode>,
              'No',
              'Fires when the user activates a different tab (via click, Enter, or Space). Use this as the primary controlled-state event.',
            ],
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              'No',
              'Legacy value-only event for backward compatibility. Event detail is the active tab value string.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-tabs')
  .addEventListener('update', (e) => {
    console.log('active tab detail:', e.detail.activeTab, e.detail.activeTabIndex);
  });

document.querySelector('io-tabs')
  .addEventListener('change', (e) => {
    console.log('active tab value (legacy):', e.detail);
  });

// React
<IoTabs
  tabs={tabs}
  activeTab={activeTab}
  onUpdate={(e) => {
    setActiveTab(e.detail.activeTab);
    setActiveTabIndex(e.detail.activeTabIndex);
  }}
/>

// Angular
<io-tabs [tabs]="tabs" [activeTab]="activeTab" [activeTabIndex]="activeTabIndex" (update)="onTabUpdate($event)"></io-tabs>

// Vue
<io-tabs :tabs="tabs" :active-tab="activeTab" :active-tab-index="activeTabIndex" @update="handleUpdate" />`}
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
          <InlineCode>activeTab</InlineCode>, <InlineCode>activeTabIndex</InlineCode>) and the{' '}
          <InlineCode>update</InlineCode> event.
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
          {' '}The component renders tab buttons only. Content rendering remains fully owned by the
          consuming application (Tabs Bar style).
        </EmptyNote>
      </section>

    </div>
  );
}
