'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSwitchApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-switch Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              'Label text rendered next to the switch. This is the only accessible name for the field — it must always be set. A dev warning is logged if missing.',
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
              'Value submitted with the form when the switch is checked. Passed as the value field in the change event detail.',
            ],
            [
              <span key="n"><InlineCode>checked</InlineCode></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether the switch is on. Mutable — updated internally on user interaction. Bind to change to keep external state in sync.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Sets the native required attribute on the input. When required and unchecked, sets FACE valueMissing validity.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the switch. Renders at reduced opacity and blocks all pointer events. Sets the native disabled attribute on the input element.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Shows a loading spinner overlaid on the track and blocks all interaction. Use during async operations triggered by the switch.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the switch in error state. The track turns red when off. Sets aria-invalid="true" on the input.',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Error message shown below the switch when error is true. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the switch when error is false. Hidden when the error state is active.',
            ],
            [
              <span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders a smaller track and thumb for dense UI contexts. Override size via --io-switch-track-width-compact, --io-switch-track-height-compact, and --io-switch-thumb-size-compact.',
            ],
            [
              <InlineCode key="n">hideLabel</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the label text using a clip-rect sr-only pattern while keeping it accessible to screen readers via the <label> association. Use when surrounding context makes the label redundant visually.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-switch."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '220px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">{'{ checked: boolean; value: string }'}</InlineCode>,
              'No',
              'Fires when the user toggles the switch. The detail contains the new checked state and the current value string.',
            ],
            [
              <InlineCode key="n">blur</InlineCode>,
              <InlineCode key="t">FocusEvent</InlineCode>,
              'No',
              'Fires when the switch loses focus. Use for validation-on-blur patterns. Not emitted when the switch is disabled or loading.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-switch')
  .addEventListener('change', (e) => {
    console.log('checked:', e.detail.checked, 'value:', e.detail.value);
  });

// React
<IoSwitch
  label="Enable notifications"
  onChange={(e) => setEnabled(e.detail.checked)}
/>

// Angular
<io-switch label="Enable notifications" (change)="onToggle($event)"></io-switch>

// Vue
<io-switch label="Enable notifications" @change="handleToggle" />`}
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
              'Programmatically moves focus to the native switch input element.',
            ],
            [
              <InlineCode key="n">checkValidity</InlineCode>,
              <InlineCode key="s">() =&gt; Promise&lt;boolean&gt;</InlineCode>,
              'Checks validity without showing browser UI. Returns true if valid.',
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
          description="Content slots available on io-switch."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-switch has no content slots.</strong>
          {' '}All content is passed through props:{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>, and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>.
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
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-switch-track-width</InlineCode>,
              <InlineCode key="d">2.75rem</InlineCode>,
              'Width of the pill-shaped track.',
            ],
            [
              <InlineCode key="n">--io-switch-track-height</InlineCode>,
              <InlineCode key="d">1.5rem</InlineCode>,
              'Height of the pill-shaped track.',
            ],
            [
              <InlineCode key="n">--io-switch-track-radius</InlineCode>,
              <InlineCode key="d">9999px</InlineCode>,
              'Border radius of the track — fully rounded by default.',
            ],
            [
              <InlineCode key="n">--io-switch-thumb-size</InlineCode>,
              <InlineCode key="d">1.25rem</InlineCode>,
              'Width and height of the circular thumb.',
            ],
            [
              <InlineCode key="n">--io-switch-thumb-radius</InlineCode>,
              <InlineCode key="d">9999px</InlineCode>,
              'Border radius of the thumb — fully rounded by default.',
            ],
            [
              <InlineCode key="n">--io-switch-thumb-offset-off</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Thumb left offset from the track edge when the switch is off.',
            ],
            [
              <InlineCode key="n">--io-switch-thumb-offset-on</InlineCode>,
              <InlineCode key="d">calc(track-width - thumb-size - 2px)</InlineCode>,
              'Thumb left offset when the switch is on. Computed from track and thumb sizes.',
            ],
            [
              <InlineCode key="n">--io-switch-track-width-compact</InlineCode>,
              <InlineCode key="d">2rem</InlineCode>,
              'Track width when compact=true.',
            ],
            [
              <InlineCode key="n">--io-switch-track-height-compact</InlineCode>,
              <InlineCode key="d">1.125rem</InlineCode>,
              'Track height when compact=true.',
            ],
            [
              <InlineCode key="n">--io-switch-thumb-size-compact</InlineCode>,
              <InlineCode key="d">0.875rem</InlineCode>,
              'Thumb width and height when compact=true.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
