'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoInputSearchApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-input-search Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [<InlineCode key="n">label</InlineCode>, <InlineCode key="t">string</InlineCode>, <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>, 'Label text. The only accessible name for the field — must always be set.'],
            [<InlineCode key="n">name</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'HTML name attribute for form submission.'],
            [<InlineCode key="n">value</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;&apos;</InlineCode>, 'Controlled value. Mutable — updated on user input.'],
            [<InlineCode key="n">placeholder</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'Placeholder text shown when the field is empty.'],
            [<InlineCode key="n">required</InlineCode>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Marks the field as required.'],
            [<span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Disables the input.'],
            [<span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>, <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>, <InlineCode key="d">&apos;none&apos;</InlineCode>, 'Validation state.'],
            [<InlineCode key="n">message</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;&apos;</InlineCode>, 'Validation message shown below the input.'],
            [<InlineCode key="n">helperText</InlineCode>, <InlineCode key="t">string | undefined</InlineCode>, '—', 'Helper text shown when state is none.'],
            [<span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Visually hides the label.'],
            [<span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>, <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>, <InlineCode key="d">&apos;md&apos;</InlineCode>, 'Field size.'],
            [<InlineCode key="n">autocomplete</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;off&apos;</InlineCode>, 'Native autocomplete attribute. Defaults to off for search fields.'],
            [<span key="n"><InlineCode>readOnly</InlineCode><ReflectBadge /></span>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Makes the input read-only. The clear button is also suppressed when readonly.'],
            [<InlineCode key="n">loading</InlineCode>, <InlineCode key="t">boolean</InlineCode>, <InlineCode key="d">false</InlineCode>, 'Shows a loading spinner. Disables the input and clear button while true.'],
            [<InlineCode key="n">maxLength</InlineCode>, <InlineCode key="t">number | undefined</InlineCode>, '—', 'Maximum number of characters allowed. Native constraint — triggers tooLong FACE validation.'],
            [<InlineCode key="n">minLength</InlineCode>, <InlineCode key="t">number | undefined</InlineCode>, '—', 'Minimum number of characters required. Native constraint — triggers tooShort FACE validation.'],
            [<InlineCode key="n">clearAriaLabel</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;Clear search&apos;</InlineCode>, 'Accessible label for the clear (×) button.'],
            [<InlineCode key="n">spellCheck</InlineCode>, <InlineCode key="t">boolean | undefined</InlineCode>, '—', 'Native spellcheck attribute — passed through to the inner input as-is.'],
            [<InlineCode key="n">aria</InlineCode>, <InlineCode key="t">Record&lt;string, string&gt; | undefined</InlineCode>, '—', 'Pass-through ARIA attributes applied directly to the native input element. Use for advanced accessibility patterns not covered by built-in props.'],
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
        <SectionHeader title="Events" description="Custom events emitted by io-input-search." />
        <ApiTable
          columns={[{ label: 'Event', width: '140px' }, { label: 'Detail type', width: '140px' }, { label: 'Description' }]}
          rows={[
            [<InlineCode key="n">input</InlineCode>, <InlineCode key="t">InputEvent</InlineCode>, 'Fires on every keystroke.'],
            [<InlineCode key="n">change</InlineCode>, <InlineCode key="t">string</InlineCode>, 'Fires when the input loses focus after the value has changed.'],
            [<InlineCode key="n">focus</InlineCode>, <InlineCode key="t">FocusEvent</InlineCode>, 'Fires when the input gains focus.'],
            [<InlineCode key="n">blur</InlineCode>, <InlineCode key="t">FocusEvent</InlineCode>, 'Fires when the input loses focus.'],
            [<InlineCode key="n">clear</InlineCode>, <InlineCode key="t">void</InlineCode>, 'Fires when the user clicks the clear (×) button. Use to reset filtered results.'],
          ]}
        />
        <CodeNote label="Usage">
{`document.querySelector('io-input-search')
  .addEventListener('clear', () => resetResults());`}
        </CodeNote>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-input-search accepts named slots for placing rich markup in positions that props only support plain text."
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
