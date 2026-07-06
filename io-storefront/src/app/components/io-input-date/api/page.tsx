'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoInputDateApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-input-date Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [<InlineCode key="n">label</InlineCode>, <InlineCode key="t">string</InlineCode>, <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>, 'Label text. The only accessible name for the field — must always be set.'],
            [<InlineCode key="n">name</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'HTML name attribute for form submission.'],
            [<InlineCode key="n">value</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;&apos;</InlineCode>, 'Controlled value in YYYY-MM-DD format. Mutable — updated on user input.'],
            [<InlineCode key="n">required</InlineCode>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Marks the field as required.'],
            [<span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Disables the input.'],
            [<span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>, <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>, <InlineCode key="d">&apos;none&apos;</InlineCode>, 'Validation state.'],
            [<InlineCode key="n">message</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;&apos;</InlineCode>, 'Validation message shown below the input.'],
            [<InlineCode key="n">helperText</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'Helper text shown when state is none. Use to surface date constraints.'],
            [<span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Visually hides the label.'],
            [<span key="n"><InlineCode>readOnly</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Makes the input read-only. The native date picker is suppressed.'],
            [<InlineCode key="n">loading</InlineCode>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Shows a loading spinner. Disables the input while true.'],
            [<InlineCode key="n">min</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'Minimum selectable date in YYYY-MM-DD format. Triggers rangeUnderflow FACE validation when violated.'],
            [<InlineCode key="n">max</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'Maximum selectable date in YYYY-MM-DD format. Triggers rangeOverflow FACE validation when violated.'],
            [<InlineCode key="n">step</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'Step interval in days, or "any". Triggers stepMismatch FACE validation when violated.'],
            [<span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>, <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>, <InlineCode key="d">&apos;md&apos;</InlineCode>, 'Field size.'],
            [<span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Reduces padding and height for dense form layouts.'],
            [<InlineCode key="n">spellCheck</InlineCode>, <InlineCode key="t">boolean | undefined</InlineCode>, '—', 'Native spellcheck attribute — passed through to the inner input as-is.'],
            [<InlineCode key="n">pickerLabel</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;Open date picker&apos;</InlineCode>, 'Accessible label for the calendar trigger button. Override for localisation.'],
            [<InlineCode key="n">aria</InlineCode>, <InlineCode key="t">Record&lt;string, string&gt; | undefined</InlineCode>, '—', 'Custom ARIA attributes injected onto the native input element.'],
          ]}
        />
      </section>

      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference. Call after the component has been upgraded."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '160px' },
            { label: 'Signature', width: '320px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">checkValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Returns true if the field passes all form validation constraints. Does not show error UI.',
            ],
            [
              <InlineCode key="n">reportValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Marks the field as touched, re-evaluates FACE validity, and returns the result. Shows error UI when invalid.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader title="Events" description="Custom events emitted by io-input-date." />
        <ApiTable
          columns={[{ label: 'Event', width: '140px' }, { label: 'Detail type', width: '140px' }, { label: 'Description' }]}
          rows={[
            [<InlineCode key="n">input</InlineCode>, <InlineCode key="t">InputEvent</InlineCode>, 'Fires when the date value changes via the picker.'],
            [<InlineCode key="n">change</InlineCode>, <InlineCode key="t">string</InlineCode>, 'Fires when the input loses focus after the value has changed. Detail is the YYYY-MM-DD string.'],
            [<InlineCode key="n">focus</InlineCode>, <InlineCode key="t">FocusEvent</InlineCode>, 'Fires when the input gains focus.'],
            [<InlineCode key="n">blur</InlineCode>, <InlineCode key="t">FocusEvent</InlineCode>, 'Fires when the input loses focus.'],
          ]}
        />
        <CodeNote label="Usage">
{`document.querySelector('io-input-date')
  .addEventListener('change', (e) => console.log(e.detail)); // '2026-06-18'`}
        </CodeNote>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-input-date accepts named slots for placing rich markup in positions that props only support plain text."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              'Custom label content. When slotted, replaces the plain-text label prop and allows rich markup such as links or inline icons inside the label.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              'Validation message content. When slotted in error/warning/success state, replaces the plain-text message prop.',
            ],
            [
              <InlineCode key="n">description</InlineCode>,
              'Helper text content. Replaces the plain-text helperText prop when the field is not in an error state.',
            ],
          ]}
        />
      </section>
    </div>
  );
}
