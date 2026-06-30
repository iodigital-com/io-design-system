'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoRadioApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-radio Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Label text rendered next to the radio visual. This is the only accessible name for the field — it must always be set.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML name attribute. Set the same name on every io-radio in a group to enable mutual exclusivity and arrow-key navigation.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Value submitted with the form when this radio is selected. Passed as the value field in the change event detail. Should be unique within the group.',
            ],
            [
              <span key="n"><InlineCode>checked</InlineCode></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether this radio button is selected. Mutable — updated internally on user interaction. Bind to change to keep external state in sync. Only one radio in a group should be checked at any time.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Sets the native required attribute on the input.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the radio button. Renders at reduced opacity and blocks all pointer events. Sets the native disabled attribute.',
            ],
            [
              <span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Validation state. Controls border colour, icon, and message colour.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Validation message shown below the radio when state is not none. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the radio when state is none. Hidden when any validation state is active.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Shows a loading spinner in place of the radio control and disables interaction.',
            ],
            [
              <span key="n"><InlineCode>form</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Associates this field with a <form> element by its ID, enabling out-of-DOM form participation.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the label while keeping it accessible to screen readers. Requires a non-empty label prop.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-radio."
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
              'Fires when the user selects this radio option. The detail contains the value string of the selected option. Use this to update external state for the entire group.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the radio loses focus. Useful for touched/dirty tracking in form libraries. Parity with io-checkbox and io-switch.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelectorAll('io-radio[name="delivery"]')
  .forEach((radio) => {
    radio.addEventListener('change', (e) => {
      console.log('selected:', e.detail.value);
    });
  });

// React
<IoRadio
  label="Express delivery"
  name="delivery"
  value="express"
  onChange={(e) => setDelivery(e.detail.value)}
/>

// Angular
<io-radio label="Express delivery" name="delivery" value="express" (change)="onDeliveryChange($event)"></io-radio>

// Vue
<io-radio label="Express delivery" name="delivery" value="express" @change="handleDeliveryChange" />`}
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
              'Programmatically moves focus to the native radio input element. Use to return focus after a modal closes or to direct the user to a required field.',
            ],
            [
              <InlineCode key="n">checkValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Checks validity without showing browser validation UI. Returns true if valid.',
            ],
            [
              <InlineCode key="n">reportValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Checks validity and shows browser validation UI if invalid. Returns true if valid.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-radio."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              'Rich label content. Overrides the label prop when slotted content is present. Wrap decorative icons in aria-hidden="true".',
            ],
            [
              <InlineCode key="n">description</InlineCode>,
              'Rich helper text content, shown when state is none. Use when the helper text needs a link or formatted markup.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              'Rich validation message content. Overrides the message prop when slotted. Retains role="alert" when in error state.',
            ],
          ]}
        />
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
              <InlineCode key="n">--io-radio-size</InlineCode>,
              <InlineCode key="d">1rem</InlineCode>,
              'Width and height of the radio control circle.',
            ],
            [
              <InlineCode key="n">--io-radio-border-width</InlineCode>,
              <InlineCode key="d">1.5px</InlineCode>,
              'Border width of the radio control in its resting state.',
            ],
            [
              <InlineCode key="n">--io-radio-border-error-width</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Border width when the radio is in an error state. Thicker to satisfy WCAG 1.4.1.',
            ],
            [
              <InlineCode key="n">--io-radio-dot-size</InlineCode>,
              <InlineCode key="d">8px</InlineCode>,
              'Diameter of the filled inner dot shown when the radio is checked.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
