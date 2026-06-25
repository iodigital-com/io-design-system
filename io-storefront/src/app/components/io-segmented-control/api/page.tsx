'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoSegmentedControlApiPage() {
  return (
    <div className="space-y-16">

      <section id="io-segmented-control-properties" className="space-y-4">
        <SectionHeader
          title="io-segmented-control Properties"
          description="All @Prop() declarations on the io-segmented-control Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '180px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Currently selected segment value. Controls which io-segment child renders as selected.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'HTML name attribute for form participation. Submitted as name=value when the form is submitted.',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible label for the control group. Required — provides the accessible name for the role="group" container (WCAG 4.1.2).',
            ],
            [
              <InlineCode key="n">hideLabel</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, hides the visible label text. The label value is still used as aria-label for screen readers.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the entire control. Propagated to all child io-segment elements.',
            ],
          ]}
        />
      </section>

      <section id="io-segmented-control-events" className="space-y-4">
        <SectionHeader
          title="io-segmented-control Events"
          description="Custom events emitted by io-segmented-control."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '220px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">{'{ value: string }'}</InlineCode>,
              'No',
              'Fires when a child io-segment is selected. detail.value contains the newly selected segment value. The control also updates its own value prop.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-segmented-control')
  .addEventListener('change', (e) => {
    console.log('selected:', e.detail.value);
  });

// React
<IoSegmentedControl
  name="view"
  value={selected}
  onChange={(e) => setSelected(e.detail.value)}
>
  <IoSegment value="list" label="List" />
  <IoSegment value="grid" label="Grid" />
  <IoSegment value="map" label="Map" />
</IoSegmentedControl>

// Angular
<io-segmented-control name="view" [value]="selected" (change)="onViewChange($event)">
  <io-segment value="list" label="List"></io-segment>
  <io-segment value="grid" label="Grid"></io-segment>
</io-segmented-control>

// Vue
<io-segmented-control name="view" :value="selected" @change="handleViewChange">
  <io-segment value="list" label="List" />
  <io-segment value="grid" label="Grid" />
</io-segmented-control>`}
        </CodeNote>
      </section>

      <section id="io-segment-properties" className="space-y-4">
        <SectionHeader
          title="io-segment Properties"
          description="All @Prop() declarations on the io-segment Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '180px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>value</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'The value submitted when this segment is selected. Must be unique within the segmented control.',
            ],
            [
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Accessible label text rendered inside the segment button. Used as the accessible name.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables this specific segment. Also set automatically by the parent when the group is disabled.',
            ],
            [
              <InlineCode key="n">icon</InlineCode>,
              <InlineCode key="t">IoIconName | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Optional icon name to display alongside the label. Rendered as an io-icon with size="sm" before the label text.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-segmented-control."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'Slot for io-segment child elements. The control propagates selected state and disabled to all slotted io-segment elements on load and on slotchange.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`<io-segmented-control name="view" value="list">
  <io-segment value="list" label="List"></io-segment>
  <io-segment value="grid" label="Grid"></io-segment>
  <io-segment value="map" label="Map"></io-segment>
</io-segmented-control>`}
        </CodeNote>
      </section>

    </div>
  );
}
