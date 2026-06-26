'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';


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
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(9 values)</span>
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
                <InlineCode>number</InlineCode>{' '}
                <InlineCode>date</InlineCode>{' '}
                <InlineCode>time</InlineCode>
              </span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Field size aligned with io-button scale and form-control vertical rhythm.',
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
              <span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Validation state. Controls border colour, icon, and message colour.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Validation message shown below the input when state is not none. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the input when state is none. Hidden when any validation state is active.',
            ],
            [
              <InlineCode key="n">maxLength</InlineCode>,
              <InlineCode key="t">number | undefined</InlineCode>,
              '—',
              'Maximum number of characters. Forwarded as the native maxlength attribute.',
            ],
            [
              <InlineCode key="n">counter</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                When <InlineCode>true</InlineCode> and <InlineCode>maxLength</InlineCode> is set,
                renders a visible character counter below the field and a visually-hidden live
                region that announces the current count to screen readers via{' '}
                <InlineCode>aria-describedby</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="n">min</InlineCode>,
              <InlineCode key="t">string | number | undefined</InlineCode>,
              '—',
              'Native minimum value for number/date/time inputs.',
            ],
            [
              <InlineCode key="n">max</InlineCode>,
              <InlineCode key="t">string | number | undefined</InlineCode>,
              '—',
              'Native maximum value for number/date/time inputs.',
            ],
            [
              <InlineCode key="n">step</InlineCode>,
              <InlineCode key="t">string | number | undefined</InlineCode>,
              '—',
              'Native step interval for number/date/time inputs.',
            ],
            [
              <InlineCode key="n">autocomplete</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML autocomplete attribute. Use standard token values such as "email", "name", "tel", "current-password" to enable browser autofill.',
            ],
            [
              <InlineCode key="n">inputMode</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoInputMode</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(8 values)</span>
              </span>,
              <InlineCode key="d">&apos;text&apos;</InlineCode>,
              'Virtual keyboard hint. numeric and tel show digit/phone keyboards on mobile; email and url show domain-optimized keyboards. Wired directly to the native inputmode attribute.',
            ],
            [
              <InlineCode key="n">pattern</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML5 pattern attribute for native validation. Triggers patternMismatch validity state which FACE reports via setValidity.',
            ],
            [
              <span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Reduces padding and height for dense form layouts.',
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
          description="io-input accepts five named slots for placing rich markup in positions that props only support plain text."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">prefix</InlineCode>,
              'Content placed before the input field. Accepts icons, currency symbols, or short text. When populated, hides the prefix padding gap.',
            ],
            [
              <InlineCode key="n">suffix</InlineCode>,
              'Content placed after the input field. Accepts icons, unit labels, or action buttons. When populated, hides the suffix padding gap.',
            ],
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
              <InlineCode key="n">--io-input-border-width</InlineCode>,
              <InlineCode key="d">1px</InlineCode>,
              'Width of the underline border in its resting state.',
            ],
            [
              <InlineCode key="n">--io-input-border-width-focus</InlineCode>,
              <InlineCode key="d">5px</InlineCode>,
              'Width of the underline border when the input is focused.',
            ],
            [
              <InlineCode key="n">--io-input-padding-y</InlineCode>,
              <InlineCode key="d">0.5rem</InlineCode>,
              'Vertical padding inside the input field.',
            ],
            [
              <InlineCode key="n">--io-input-padding-right</InlineCode>,
              <InlineCode key="d">1.2rem</InlineCode>,
              'Right padding that reserves space for the error icon.',
            ],
            [
              <InlineCode key="n">--io-field-focus-offset-y</InlineCode>,
              <InlineCode key="d">-2px</InlineCode>,
              'Vertical offset applied on focus to compensate for the thicker border without shifting surrounding layout.',
            ],
          ]}
        />
      </section>

      {/* ── Accessibility Notes ───────────────────────────────────── */}
      <section id="accessibility-notes" className="space-y-4">
        <SectionHeader
          title="Accessibility Notes"
          description="Behaviour and patterns that affect assistive technology users."
        />
        <EmptyNote>
          The character counter (<InlineCode>maxLength</InlineCode>) announces updates via a visually-hidden{' '}
          <InlineCode>aria-live=&quot;polite&quot;</InlineCode> region, ensuring screen readers hear{' '}
          &quot;12 of 20 characters entered&quot; without interrupting other speech.
        </EmptyNote>
      </section>

    </div>
  );
}
