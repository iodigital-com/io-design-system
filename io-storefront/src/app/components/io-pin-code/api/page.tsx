'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoPinCodeApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-pin-code Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)' }}>—</span>,
              'Accessible label displayed above the PIN slots. Also sets aria-labelledby on the group.',
            ],
            [
              <InlineCode key="n">length</InlineCode>,
              <InlineCode key="t">3 | 4 | 5 | 6</InlineCode>,
              <InlineCode key="d">4</InlineCode>,
              'Number of digit slots. Accepts 3, 4, 5, or 6.',
            ],
            [
              <InlineCode key="n">type</InlineCode>,
              <InlineCode key="t">&apos;number&apos; | &apos;password&apos;</InlineCode>,
              <InlineCode key="d">&apos;number&apos;</InlineCode>,
              'Display mode. number shows digits; password masks them with the browser\'s default obscure character.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Current PIN value — all filled digits concatenated. Mutable; two-way binding supported.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)' }}>—</span>,
              'HTML form field name. Required for form submission via FormData.',
            ],
            [
              <span key="n"><InlineCode>required</InlineCode></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Reports valueMissing until all slots are filled.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables all digit inputs. Adds aria-disabled to the host group.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Disables all digit inputs and shows a spinner adjacent to the slots — use
                while the server is validating the OTP. Sets <InlineCode>aria-busy=&quot;true&quot;</InlineCode>{' '}
                on the host group and blocks pointer events.
              </span>,
            ],
            [
              <span key="n"><InlineCode>form</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)' }}>—</span>,
              <span key="desc">
                Associates this field with a <InlineCode>{'<form>'}</InlineCode> element
                by ID — enables out-of-DOM form participation. Forwarded as the{' '}
                <InlineCode>form</InlineCode> attribute on each digit input.
              </span>,
            ],
            [
              <span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Visual validation state. Applies coloured slot borders and message text.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Hides the visible label and collapses its space. Provide a non-empty label value for screen-reader accessibility — the label becomes aria-label on the group.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)' }}>—</span>,
              'Helper or validation message displayed below the slots. Announced by screen readers when state=error.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-pin-code."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '240px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Composed', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <span key="t">
                <InlineCode>{'{ value: string; isComplete: boolean }'}</InlineCode>
              </span>,
              'Yes',
              'Yes',
              'Fires on every digit change. value is all filled digits concatenated; isComplete is true when all slots are filled.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Yes',
              'Fires when focus leaves the component entirely (relatedTarget is not one of the slot inputs). Use for form-library touched/dirty tracking. Does NOT fire when focus moves between PIN slots.',
            ],
          ]}
        />
      </section>

      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() declarations callable on the element reference."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '220px' },
            { label: 'Returns', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">setFocus(options?)</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Focuses the first empty slot, or the last slot if the PIN is complete.',
            ],
            [
              <InlineCode key="n">checkValidity()</InlineCode>,
              <InlineCode key="r">Promise&lt;boolean&gt;</InlineCode>,
              'Returns true if the field is valid without showing browser validation UI.',
            ],
            [
              <InlineCode key="n">reportValidity()</InlineCode>,
              <InlineCode key="r">Promise&lt;boolean&gt;</InlineCode>,
              'Returns true if valid; triggers browser validation UI if invalid.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-pin-code does not expose named slots. All content is rendered internally."
        />
        <EmptyNote>No slots — all content is rendered from props.</EmptyNote>
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Design tokens consumed by io-pin-code. Override at the host or any ancestor."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-pin-code-slot-size</InlineCode>,
              'Width and height of each digit slot. Defaults to 48px on md density.',
            ],
            [
              <InlineCode key="n">--io-pin-code-slot-gap</InlineCode>,
              'Gap between digit slots. Defaults to --io-space-2.',
            ],
            [
              <InlineCode key="n">--io-border-interactive</InlineCode>,
              'Border colour for inactive slots (WCAG 1.4.11 non-text contrast).',
            ],
            [
              <InlineCode key="n">--io-border-error</InlineCode>,
              'Border colour when state=error.',
            ],
            [
              <InlineCode key="n">--io-color-primary</InlineCode>,
              'Focused slot border and caret colour.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
