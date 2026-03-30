'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTextareaApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-textarea Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Label text. Rendered as a floating label above the textarea on focus or when a value is present. This is the only accessible name for the field.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML name attribute. Used for form submission and to generate the internal textarea id.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Controlled value. Mutable — updated internally on user input. Bind to ioChange or ioInput to keep external state in sync.',
            ],
            [
              <InlineCode key="n">placeholder</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Placeholder text. Only visible when the label is floating and the field is empty. Never use as a substitute for the label.',
            ],
            [
              <InlineCode key="n">rows</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">4</InlineCode>,
              'Number of visible text rows. Sets the initial height of the textarea. For resize="auto", this is the minimum height.',
            ],
            [
              <InlineCode key="n">resize</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;none&apos;</InlineCode>{' | '}<InlineCode>&apos;vertical&apos;</InlineCode>{' | '}<InlineCode>&apos;auto&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;vertical&apos;</InlineCode>,
              'Controls resize behaviour. none hides the resize handle; vertical allows user-controlled height resizing; auto grows the textarea height with content.',
            ],
            [
              <InlineCode key="n">maxLength</InlineCode>,
              <InlineCode key="t">number | undefined</InlineCode>,
              '—',
              'Maximum character count. Forwarded as the native maxlength attribute.',
            ],
            [
              <InlineCode key="n">autocomplete</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML autocomplete attribute. Use standard token values to enable browser autofill where appropriate.',
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
              'Disables the textarea. Renders at 40% opacity and blocks all pointer events.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the textarea in error state. The border and floating label change to the error colour. Sets aria-invalid="true".',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Error message shown below the textarea when error is true. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the textarea when error is false. Hidden when the error state is active.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-textarea."
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
              <InlineCode key="n">ioInput</InlineCode>,
              <InlineCode key="t">InputEvent</InlineCode>,
              'No',
              'Fires on every keystroke, including Enter for new lines. The native InputEvent is passed as the event detail. Use for live character counting.',
            ],
            [
              <InlineCode key="n">ioChange</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              'No',
              'Fires when the textarea loses focus after the value has changed. Detail is the current string value. Preferred event for form state management and validation triggers.',
            ],
            [
              <InlineCode key="n">ioFocus</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the textarea gains focus.',
            ],
            [
              <InlineCode key="n">ioBlur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the textarea loses focus. Recommended trigger point for field-level validation.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-textarea')
  .addEventListener('ioChange', (e) => console.log(e.detail));

// React
<IoTextarea
  label="Message"
  onIoChange={(e) => setMessage(e.detail)}
/>

// Angular
<io-textarea label="Message" (ioChange)="handleChange($event)"></io-textarea>

// Vue
<io-textarea label="Message" @io-change="handleChange" />`}
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
              'Programmatically moves focus to the inner textarea element. Use to return focus after a modal closes or to direct the user to a required field after a validation response.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-textarea."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-textarea has no content slots.</strong>
          {' '}All content is passed through props:{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>placeholder</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>, and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>.
        </EmptyNote>
      </section>

    </div>
  );
}
