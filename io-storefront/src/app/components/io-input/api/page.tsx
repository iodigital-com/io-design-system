'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoInputApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-input Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              'Label text. Rendered as a floating label above the input on focus or when a value is present. This is the only accessible name for the field — it must always be set.',
            ],
            [
              <InlineCode key="n">type</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoInputType</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(7 values)</span>
              </span>,
              <InlineCode key="d">&apos;text&apos;</InlineCode>,
              <span key="desc">
                Native input type. One of:{' '}
                <InlineCode>text</InlineCode>{' '}
                <InlineCode>email</InlineCode>{' '}
                <InlineCode>password</InlineCode>{' '}
                <InlineCode>search</InlineCode>{' '}
                <InlineCode>tel</InlineCode>{' '}
                <InlineCode>url</InlineCode>{' '}
                <InlineCode>number</InlineCode>
              </span>,
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
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Controlled value. Mutable — updated internally on user input. Bind to change or input to keep external state in sync.',
            ],
            [
              <InlineCode key="n">placeholder</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Placeholder text. Only visible when the label is floating and the field is empty. Never use as a substitute for the label.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Appends a * indicator to the label and sets the native required attribute on the input.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the input. Renders at 40% opacity and blocks all pointer events.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the input in error state. The border and floating label change to the error colour. Sets aria-invalid="true" on the input.',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Error message shown below the input when error is true. Rendered with role="alert" and linked via aria-describedby so screen readers announce it immediately.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the input when error is false. Use for format hints or constraints. Hidden when the error state is active.',
            ],
            [
              <InlineCode key="n">maxLength</InlineCode>,
              <InlineCode key="t">number | undefined</InlineCode>,
              '—',
              'Maximum number of characters. Forwarded as the native maxlength attribute.',
            ],
            [
              <InlineCode key="n">autocomplete</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML autocomplete attribute. Use standard token values such as "email", "name", "tel", "current-password" to enable browser autofill.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-input. Listen via addEventListener or framework event binding."
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
              <InlineCode key="n">input</InlineCode>,
              <InlineCode key="t">InputEvent</InlineCode>,
              'No',
              'Fires on every keystroke. The native InputEvent is passed as the event detail. Use for live character count or immediate feedback.',
            ],
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              'No',
              'Fires when the input loses focus after the value has changed. Detail is the current string value. Preferred event for form state management and validation triggers.',
            ],
            [
              <InlineCode key="n">focus</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the input gains focus.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the input loses focus. Recommended trigger point for field-level validation.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-input')
  .addEventListener('change', (e) => console.log(e.detail));

// React
<IoInput onChange={(e) => setState(e.detail)} label="Email" />

// Angular
<io-input (change)="handleChange($event)" label="Email"></io-input>

// Vue
<io-input @change="handleChange" label="Email" />`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
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
              <InlineCode key="n">setFocus</InlineCode>,
              <InlineCode key="s">(options?: FocusOptions) =&gt; Promise&lt;void&gt;</InlineCode>,
              'Programmatically moves focus to the inner input element. Use to return focus after a modal closes, or to direct the user to a field after a server-side validation response.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const input = document.querySelector('io-input');
await input.setFocus();

// React (via ref)
const ref = useRef(null);
await ref.current.setFocus({ preventScroll: true });`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-input."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-input has no content slots.</strong>
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
