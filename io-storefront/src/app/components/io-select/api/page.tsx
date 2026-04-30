'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSelectApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-select Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Label text. Rendered as a floating label above the select on focus or when a value is present. This is the only accessible name for the field.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Field size aligned with io-input and io-textarea for consistent form rhythm.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML name attribute. Used for form submission and to generate the internal select id.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Controlled selected value. Mutable — updated internally when the user selects an option. Bind to change to keep external state in sync.',
            ],
            [
              <InlineCode key="n">placeholder</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Placeholder option rendered as the first disabled option. Shown when value is empty. Provides a "Select an option" prompt.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Appends a * indicator to the label and sets the native required attribute.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the select. Renders at 40% opacity and blocks pointer events.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the select in error state. The border and floating label change to the error colour. Sets aria-invalid="true".',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Error message shown below the select when error is true. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the select when error is false. Hidden when the error state is active.',
            ],
            [
              <span key="n"><InlineCode>custom</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Switches from the native <select> element to a fully accessible ARIA combobox/listbox implementation. Required for multiple selection and filter mode.',
            ],
            [
              <InlineCode key="n">multiple</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Enables multi-value selection. Requires custom=true. The change event detail becomes string[] instead of string.',
            ],
            [
              <InlineCode key="n">filter</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Adds a search input inside the dropdown to filter options by label. Requires custom=true.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-select."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '160px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">string | string[]</InlineCode>,
              'No',
              'Fires when the selected value changes. Detail is the new value string (single mode) or array of selected values (multiple mode).',
            ],
            [
              <InlineCode key="n">focus</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the select gains focus.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the select loses focus. Recommended trigger point for field-level validation.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-select')
  .addEventListener('change', (e) => console.log('value:', e.detail));

// React
<IoSelect label="Country" onChange={(e) => setCountry(e.detail)}>
  <io-option value="nl" label="Netherlands" />
  <io-option value="be" label="Belgium" />
</IoSelect>

// Angular
<io-select label="Country" (change)="onSelect($event)">
  <io-option value="nl" label="Netherlands"></io-option>
  <io-option value="be" label="Belgium"></io-option>
</io-select>

// Vue
<io-select label="Country" @change="handleChange">
  <io-option value="nl" label="Netherlands" />
  <io-option value="be" label="Belgium" />
</io-select>`}
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
              'Programmatically moves focus to the inner select element. Use to return focus after a modal closes or to direct the user to a required field after a validation response.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-option and io-optgroup are the slot children of io-select. Place them as direct children to define the available options and groups."
        />
        <ApiTable
          columns={[
            { label: 'Element', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">io-option</InlineCode>,
              <span key="d">
                A single selectable option. Accepts <InlineCode>value</InlineCode> (string, required),{' '}
                <InlineCode>label</InlineCode> (string, displayed text), and optional{' '}
                <InlineCode>disabled</InlineCode> (boolean) attributes.
              </span>,
            ],
            [
              <InlineCode key="n">io-optgroup</InlineCode>,
              <span key="d">
                A labelled group of <InlineCode>io-option</InlineCode> children. Accepts{' '}
                <InlineCode>label</InlineCode> (string, group heading) and optional{' '}
                <InlineCode>disabled</InlineCode> (boolean, propagates to all child options).
              </span>,
            ],
          ]}
        />
      </section>

    </div>
  );
}
