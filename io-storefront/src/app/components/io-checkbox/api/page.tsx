'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoCheckboxApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-checkbox Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              'Label text rendered next to the checkbox visual. This is the only accessible name for the field — it must always be set.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML name attribute. Used for form submission and to generate the internal input id.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;on&apos;</InlineCode>,
              'Value submitted with the form when the checkbox is checked. Matches the native HTML checkbox default (RFC 1866 §8.1.2). Unchecked checkboxes always submit null to FormData.',
            ],
            [
              <span key="n"><InlineCode>checked</InlineCode></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether the checkbox is checked. Mutable — updated internally on user interaction. Bind to change to keep external state in sync.',
            ],
            [
              <InlineCode key="n">indeterminate</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the checkbox into the indeterminate (mixed) visual state. Mutable. The native input\'s indeterminate property is set via componentDidRender. Use for parent "Select all" checkboxes.',
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
              'Disables the checkbox. Renders at reduced opacity and blocks all pointer events. Sets the native disabled attribute.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Replaces the checkbox visual with a spinner and disables interaction. The native input stays in the DOM for stable form-library refs, and aria-disabled="true" is set on it.',
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
              'Validation message shown below the checkbox when state is not none. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the checkbox when state is none. Hidden when any validation state is active.',
            ],
            [
              <span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Dense layout mode. Reduces the checkbox control to 75% of its standard size and uses a smaller label font. Use in data-dense UIs such as tables or filter panels.',
            ],
            [
              <span key="n"><InlineCode>hideLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the label text while keeping it accessible to screen readers via sr-only technique.',
            ],
            [
              <InlineCode key="n">form</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Associates this field with a form element by ID — enables out-of-DOM form participation via the FACE API.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-checkbox."
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
              <InlineCode key="t">{'{ checked: boolean; value: string }'}</InlineCode>,
              'Yes',
              'Yes',
              'Fires when the user toggles the checkbox. The detail contains the new checked state and the current value string.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Yes',
              'Fires when the inner input loses focus. Use for form library touched/dirty tracking. The native FocusEvent is re-emitted after stopPropagation() so shadow-boundary leakage is prevented.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-checkbox')
  .addEventListener('change', (e) => {
    console.log('checked:', e.detail.checked, 'value:', e.detail.value);
  });
document.querySelector('io-checkbox')
  .addEventListener('blur', () => markFieldAsTouched());

// React
<IoCheckbox
  label="Accept terms"
  onChange={(e) => setAccepted(e.detail.checked)}
  onBlur={() => setTouched(true)}
/>

// Angular
<io-checkbox label="Accept terms" (change)="onCheck($event)" (blur)="onTouch()"></io-checkbox>

// Vue
<io-checkbox label="Accept terms" @change="handleChange" @blur="handleBlur" />`}
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
            { label: 'Method', width: '200px' },
            { label: 'Signature', width: '340px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">setFocus</InlineCode>,
              <InlineCode key="s">(options?: FocusOptions) =&gt; Promise&lt;void&gt;</InlineCode>,
              'Programmatically moves focus to the native checkbox input element. Use to return focus after a modal closes or to direct the user to a required field.',
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
          description="Content slots available on io-checkbox."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-checkbox has no content slots.</strong>
          {' '}All content is passed through props:{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>, and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>message</code>.
        </EmptyNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '300px' },
            { label: 'Default', width: '240px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-checkbox-size</InlineCode>,
              <InlineCode key="d">1rem</InlineCode>,
              'Width and height of the checkbox control square. In compact mode this is scaled to 75% automatically.',
            ],
            [
              <InlineCode key="n">--io-checkbox-radius</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Border radius of the checkbox control square.',
            ],
            [
              <InlineCode key="n">--io-checkbox-border-width</InlineCode>,
              <InlineCode key="d">1.5px</InlineCode>,
              'Border width of the checkbox control in its resting state.',
            ],
            [
              <InlineCode key="n">--io-checkbox-border-error-width</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Border width when the checkbox is in an error state. Thicker than the resting border to satisfy WCAG 1.4.1.',
            ],
            [
              <InlineCode key="n">--io-checkbox-icon-size</InlineCode>,
              <InlineCode key="d">10px</InlineCode>,
              'Width of the checkmark SVG icon rendered inside the checkbox.',
            ],
            [
              <InlineCode key="n">--io-checkbox-border-color</InlineCode>,
              <InlineCode key="d">var(--io-border-interactive)</InlineCode>,
              'Override the resting and hover border colour. Use for contextual themes where the checkbox is embedded inside a custom label with its own hover style.',
            ],
            [
              <InlineCode key="n">--io-checkbox-background-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Override the checked/indeterminate fill colour. Use for brand variants or error-state checked appearance without !important overrides.',
            ],
            [
              <InlineCode key="n">--io-checkbox-icon-color</InlineCode>,
              <InlineCode key="d">var(--io-color-white)</InlineCode>,
              'Override the checkmark and indeterminate dash icon colour independently from the background fill.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
