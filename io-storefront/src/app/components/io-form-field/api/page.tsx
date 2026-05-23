'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoFormFieldApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-form-field Stencil component."
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
              'Label text displayed above the slotted control. This is the accessible name — it must always be set.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Supporting guidance shown below the control when invalid is false. Hidden when invalid is true.',
            ],
            [
              <InlineCode key="n">errorText</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Validation error message shown below the control when invalid is true. Rendered with aria-live="polite".',
            ],
            [
              <span key="n"><InlineCode>invalid</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as invalid. Shows errorText, hides helperText, and sets aria-invalid="true" on the slotted control.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Appends a * indicator to the label. Does not set required on the slotted control — set that directly on the control.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-form-field has a default slot for the form control."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'The form control to wrap. Accepts a single io-input, io-select, io-textarea, io-checkbox, or io-radio.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`<io-form-field label="Email address" helper-text="We will never share your email.">
  <io-input name="email" type="email"></io-input>
</io-form-field>

<io-form-field label="Username" invalid error-text="This username is already taken.">
  <io-input name="username" type="text"></io-input>
</io-form-field>`}
        </CodeNote>
      </section>

    </div>
  );
}
