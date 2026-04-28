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
              <span key="n">
                <InlineCode>activeTabIndex</InlineCode>
                <MutableBadge />
                <ReflectBadge />
              </span>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              <span key="desc">
                The 0-based index of the currently active tab. This is the primary controlled-state
                prop — pass the current index down, and update it in response to the{' '}
                <InlineCode>update</InlineCode> event. Mutable — updated internally when the user
                activates a tab. Reflected to the host attribute <InlineCode>active-tab-index</InlineCode>.
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
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-tabs uses a default slot to project tab trigger buttons."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Expected content' },
          ]}
          rows={[
            [
              <span key="s" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              <span key="d">
                One <InlineCode>{'<button type="button">'}</InlineCode> per tab. The component
                assigns <InlineCode>role=&quot;tab&quot;</InlineCode>,{' '}
                <InlineCode>aria-selected</InlineCode>, and <InlineCode>tabindex</InlineCode> to
                each button automatically. Add the HTML <InlineCode>disabled</InlineCode> attribute
                to prevent a tab from being activated.
              </span>,
            ],
          ]}
        />
        <CodeNote label="HTML">
{`<io-tabs active-tab-index="0">
  <button type="button">Overview</button>
  <button type="button">Details</button>
  <button type="button" disabled>Settings</button>
</io-tabs>`}
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
            { label: 'Detail type', width: '200px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">update</InlineCode>,
              <InlineCode key="t">{'{ activeTabIndex: number }'}</InlineCode>,
              'No',
              'Fires when the user activates a different tab (via click, Enter, or Space). Update your controlled state with the emitted activeTabIndex.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-tabs')
  .addEventListener('update', (e) => {
    activeTabIndex = e.detail.activeTabIndex;
  });

// React
const [activeTabIndex, setActiveTabIndex] = useState(0);
<IoTabs
  activeTabIndex={activeTabIndex}
  onUpdate={(e) => setActiveTabIndex(e.detail.activeTabIndex)}
>
  <button type="button">Overview</button>
  <button type="button">Details</button>
</IoTabs>

// Angular
activeTabIndex = 0;
onUpdate(e: CustomEvent<{ activeTabIndex: number }>) {
  this.activeTabIndex = e.detail.activeTabIndex;
}

<io-tabs [activeTabIndex]="activeTabIndex" (update)="onUpdate($event)">
  <button type="button">Overview</button>
  <button type="button">Details</button>
</io-tabs>

// Vue
<io-tabs :active-tab-index="activeTabIndex" @update="e => activeTabIndex = e.detail.activeTabIndex">
  <button type="button">Overview</button>
  <button type="button">Details</button>
</io-tabs>`}
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
          {' '}All interactions are driven by the <InlineCode>activeTabIndex</InlineCode> prop and the{' '}
          <InlineCode>update</InlineCode> event.
        </EmptyNote>
      </section>

    </div>
  );
}
