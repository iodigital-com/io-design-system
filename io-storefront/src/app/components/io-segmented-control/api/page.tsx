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
              'When true, visually hides the label span. The accessible name is still provided via aria-label on the group container regardless of this setting. The label prop must still be set.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the entire control. Propagated to all child io-segment elements.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the control as required in form validation. When no segment is selected, FACE validity is set to valueMissing.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the control in error state. Applies error styling to the bar and legend. Pair with errorMessage to render a visible error text node below the bar.',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>—</span>,
              'Error message rendered as a visible paragraph below the bar when error=true. When omitted, error styling is applied but no error text node is rendered.',
            ],
            [
              <span key="n"><InlineCode>noWrap</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, the segments scroll horizontally via io-scroller instead of wrapping to a second row. Useful when many segments are present.',
            ],
            [
              <span key="n"><InlineCode>columns</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">{"number | 'auto'"}</InlineCode>,
              <InlineCode key="d">'auto'</InlineCode>,
              "When 'auto' (default) the bar uses flex and segments size to their content. When a number is provided, the bar switches to a CSS grid with that many equal-width tracks.",
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
            [
              <InlineCode key="n">iconSource</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>—</span>,
              'URL to a custom SVG or image for the segment icon. Takes precedence over the icon prop when both are set. Use for brand icons or third-party glyphs not in the built-in icon set.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, renders only the icon and uses the label prop as aria-label on the button. The label is visually hidden but still announced by assistive technology. Requires either icon or iconSource to be set.',
            ],
          ]}
        />
      </section>

      <section id="io-segment-slots" className="space-y-4">
        <SectionHeader
          title="io-segment Slots"
          description="Content slots available on io-segment."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">badge</InlineCode>,
              'Optional numeric or badge content rendered after the label (e.g. counts, notifications). Slotted content is excluded from the button aria-label to avoid duplicate announcements by assistive technology.',
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
