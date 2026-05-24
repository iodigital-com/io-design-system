'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoRadioGroupApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-radio-group Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Legend text for the fieldset — the accessible group name. Rendered as a native <legend> element. Must always be set.',
            ],
            [
              <span key="n"><InlineCode>name</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'HTML name attribute propagated to every slotted io-radio child. Groups the native inputs for mutual exclusivity and arrow-key navigation.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Currently selected radio value. On load and on change, the group sets checked on the child whose value matches this prop.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Supporting guidance shown below the legend.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the group as required.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the entire group. Propagated to all child io-radio elements. The native fieldset disabled attribute is set.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the group in error state. Apply errorMessage alongside this to provide accessible error feedback.',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Error message shown below the group when error is true. Rendered as a paragraph with role="alert" and linked to the fieldset via aria-describedby.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-radio-group."
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
              'Yes',
              'Fires when a child io-radio is selected. detail.value contains the newly selected radio value. The group also updates its own value prop.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-radio-group')
  .addEventListener('change', (e) => {
    console.log('selected:', e.detail.value);
  });

// React
<IoRadioGroup
  label="Preferred contact"
  name="contact"
  value={selected}
  onChange={(e) => setSelected(e.detail.value)}
>
  <IoRadio label="Email" value="email" />
  <IoRadio label="Phone" value="phone" />
</IoRadioGroup>

// Angular
<io-radio-group label="Preferred contact" name="contact" [value]="selected" (change)="onContactChange($event)">
  <io-radio label="Email" value="email"></io-radio>
  <io-radio label="Phone" value="phone"></io-radio>
</io-radio-group>

// Vue
<io-radio-group label="Preferred contact" name="contact" :value="selected" @change="handleContactChange">
  <io-radio label="Email" value="email" />
  <io-radio label="Phone" value="phone" />
</io-radio-group>`}
        </CodeNote>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-radio-group."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'Slot for io-radio child elements. The group propagates name and checked state to all slotted io-radio elements on load and on slotchange.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`<io-radio-group label="Subscription tier" name="tier" value="pro">
  <io-radio label="Free" value="free"></io-radio>
  <io-radio label="Pro" value="pro"></io-radio>
  <io-radio label="Enterprise" value="enterprise"></io-radio>
</io-radio-group>`}
        </CodeNote>
      </section>

    </div>
  );
}
