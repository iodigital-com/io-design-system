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
              <span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Validation state. Controls border colour, icon, and message colour.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Validation message shown below the select when state is not none. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the select when state is none. Hidden when any validation state is active.',
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
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Shows a loading spinner replacing the chevron and disables interaction while async data loads.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the label while keeping it accessible via aria-labelledby. Requires a non-empty label prop for accessibility.',
            ],
            [
              <InlineCode key="n">description</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Supplementary description rendered below the field. Use for persistent contextual guidance separate from the validation message.',
            ],
            [
              <InlineCode key="n">aria</InlineCode>,
              <InlineCode key="t">{'Record<string, string> | undefined'}</InlineCode>,
              '—',
              'Arbitrary ARIA attributes applied to the inner select or combobox element. Keys may omit or include the aria- prefix — both forms are accepted. Example: <InlineCode>{\'{ controls: "panel-id" }\'}</InlineCode>.',
            ],
            [
              <InlineCode key="n">form</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Associates this field with a form element by ID, enabling out-of-DOM form participation (FACE formAssociated pattern).',
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
            [
              <InlineCode key="n">toggle</InlineCode>,
              <InlineCode key="t">{'{ open: boolean }'}</InlineCode>,
              'No',
              'Fires when the custom dropdown opens or closes (custom=true only). detail.open is true when opening, false when closing.',
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
            [
              <InlineCode key="n">checkValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Returns true if the field satisfies all constraints. Does not trigger browser validation UI.',
            ],
            [
              <InlineCode key="n">reportValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Returns true if valid; triggers browser validation UI if invalid.',
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
              <InlineCode key="n">--io-select-padding-right</InlineCode>,
              <InlineCode key="d">1.6rem</InlineCode>,
              'Right padding on the native select field that reserves space for the chevron icon.',
            ],
            [
              <InlineCode key="n">--io-select-chevron-offset-y</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Fine-tunes the vertical position of the chevron icon relative to the field bottom.',
            ],
            [
              <InlineCode key="n">--io-combobox-max-height</InlineCode>,
              <InlineCode key="d">280px</InlineCode>,
              'Maximum height of the custom combobox dropdown list before it scrolls.',
            ],
            [
              <InlineCode key="n">--io-combobox-option-height</InlineCode>,
              <InlineCode key="d">44px</InlineCode>,
              'Minimum height of each option row in the combobox dropdown. Matches the 44px touch target minimum.',
            ],
            [
              <InlineCode key="n">--io-combobox-filter-height</InlineCode>,
              <InlineCode key="d">var(--io-size-input-sm)</InlineCode>,
              'Height of the filter input inside the combobox dropdown when filtering is enabled.',
            ],
            [
              <InlineCode key="n">--io-combobox-z</InlineCode>,
              <InlineCode key="d">var(--io-z-dropdown)</InlineCode>,
              'z-index of the combobox dropdown overlay.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
