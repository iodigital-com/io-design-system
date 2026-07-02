'use client';

import {
  SectionHeader,
  InlineCode,
  ApiTable,
  ReflectBadge,
  CodeNote,
} from '@/components/api/ApiPrimitives';

export default function IoMultiSelectApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-multi-select Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '130px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Label text. Rendered above the trigger and used as the accessible name via aria-labelledby.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'HTML name attribute. Required for FACE form submission. Multiple FormData entries are submitted under this key.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string[]</InlineCode>,
              <InlineCode key="d">[]</InlineCode>,
              'Array of currently selected option values. Mutable — updated internally when the user selects or deselects options. Bind to change to keep external state in sync.',
            ],
            [
              <InlineCode key="n">placeholder</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Select options&apos;</InlineCode>,
              'Placeholder text displayed in the trigger when no values are selected.',
            ],
            [
              <span key="n"><InlineCode>required</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Appends a * indicator to the label and sets valueMissing validity when the selection is empty.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the multi-select. Renders at 50% opacity and blocks all pointer and keyboard interaction.',
            ],
            [
              <span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Visual and semantic validation state. error changes the trigger border to red. success changes it to green. Use with message to show descriptive feedback.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Message text shown below the trigger. Styled as error (red) when state is error, success (green) when state is success, otherwise muted. Rendered with role="alert" in error state.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Hides the visible label and collapses its space. The label value is still used as the accessible name via aria-label on the trigger and listbox.',
            ],
            [
              <span key="n"><InlineCode>filterable</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Adds a search input at the top of the dropdown to filter visible options by label. Recommended when the option list exceeds 7 items.',
            ],
            [
              <InlineCode key="n">filterPlaceholder</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Search...&apos;</InlineCode>,
              'Placeholder text for the filter search input. Only shown when filterable is true.',
            ],
            [
              <InlineCode key="n">dropdownDirection</InlineCode>,
              <InlineCode key="t">&apos;auto&apos; | &apos;up&apos; | &apos;down&apos;</InlineCode>,
              <InlineCode key="d">&apos;auto&apos;</InlineCode>,
              'Controls the dropdown placement direction. auto uses floating-ui to pick the best position. up pins above the trigger. down pins below.',
            ],
            [
              <InlineCode key="n">maxDisplay</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">3</InlineCode>,
              'Maximum number of selected labels to show in the trigger before collapsing to "{N} selected". Does not affect chip display.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-multi-select."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '140px' },
            { label: 'Detail type', width: '260px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">{'{ value: string[], name: string }'}</InlineCode>,
              'Yes',
              'Fires when the selection changes — on option toggle, chip removal, or clear all. Detail includes the full updated value array and the name prop.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'Yes',
              'Fires when the trigger loses focus and the dropdown is closed. Use for form-library touched/dirty tracking.',
            ],
            [
              <InlineCode key="n">toggle</InlineCode>,
              <InlineCode key="t">{'{ open: boolean }'}</InlineCode>,
              'No',
              'Fires when the dropdown opens or closes. detail.open is true when opening, false when closing.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-multi-select')
  .addEventListener('change', (e) => console.log('selected:', e.detail.value));

// React
<IoMultiSelect
  name="countries"
  label="Countries"
  onChange={(e) => setCountries(e.detail.value)}
>
  <io-option value="nl" label="Netherlands" />
  <io-option value="be" label="Belgium" />
</IoMultiSelect>

// Angular
<io-multi-select name="countries" label="Countries" (change)="onSelect($event)">
  <io-option value="nl" label="Netherlands"></io-option>
  <io-option value="be" label="Belgium"></io-option>
</io-multi-select>

// Vue
<io-multi-select name="countries" label="Countries" @change="handleChange">
  <io-option value="nl" label="Netherlands" />
  <io-option value="be" label="Belgium" />
</io-multi-select>`}
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
              <InlineCode key="n">checkValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Returns true if the current selection satisfies all constraints (required, etc.). Does not show browser validation UI.',
            ],
            [
              <InlineCode key="n">reportValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Triggers browser validation UI if the field is invalid and returns the validity state.',
            ],
            [
              <InlineCode key="n">setFocus</InlineCode>,
              <InlineCode key="s">(options?: FocusOptions) =&gt; Promise&lt;void&gt;</InlineCode>,
              'Programmatically moves focus to the trigger button. Use after form validation to direct the user.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-option and io-optgroup are the slot children of io-multi-select. Place them as direct children to define the available options and groups."
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
          description="Component-specific tokens that can be overridden on the host element or any ancestor."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-multi-select-chip-height</InlineCode>,
              <InlineCode key="d">24px</InlineCode>,
              'Height of each selected-value chip.',
            ],
            [
              <InlineCode key="n">--io-multi-select-chip-max-width</InlineCode>,
              <InlineCode key="d">160px</InlineCode>,
              'Maximum width of each chip before the label truncates with an ellipsis.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
