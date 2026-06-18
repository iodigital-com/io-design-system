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
            [<InlineCode key="n">clearAriaLabel</InlineCode>, <InlineCode key="t">string</InlineCode>, <InlineCode key="d">&apos;Clear search&apos;</InlineCode>, 'Accessible label for the clear (×) button.'],
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
    </div>
  );
}
