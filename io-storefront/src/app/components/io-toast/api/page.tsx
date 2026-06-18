'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoToastApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-toast Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '160px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '130px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">position</InlineCode>,
              <InlineCode key="t">IoToastPosition</InlineCode>,
              <InlineCode key="d">&apos;bottom-end&apos;</InlineCode>,
              'Where on screen the toast stack appears. Reflects to the host attribute. One of: top-start, top-center, top-end, bottom-start, bottom-center, bottom-end.',
            ],
          ]}
        />
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the io-toast element reference."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '280px' },
            { label: 'Returns', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="m">addToast(message: IoToastMessage)</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Enqueue a notification. The message is added to the FIFO queue and displayed when the current toast (if any) has been dismissed. The promise resolves once the message has been enqueued.',
            ],
          ]}
        />

        <div className="space-y-4 mt-6">
          <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
            IoToastMessage type
          </p>
          <ApiTable
            columns={[
              { label: 'Property', width: '160px' },
              { label: 'Type', width: '200px' },
              { label: 'Required', width: '100px' },
              { label: 'Default', width: '110px' },
              { label: 'Description' },
            ]}
            rows={[
              [
                <InlineCode key="n">text</InlineCode>,
                <InlineCode key="t">string</InlineCode>,
                'Yes',
                '—',
                'The notification message text displayed inside the toast.',
              ],
              [
                <InlineCode key="n">variant</InlineCode>,
                <InlineCode key="t">IoToastVariant</InlineCode>,
                'No',
                <InlineCode key="d">&apos;neutral&apos;</InlineCode>,
                'Visual and semantic variant of the toast. One of: neutral, success, error, warning, info.',
              ],
              [
                <InlineCode key="n">duration</InlineCode>,
                <InlineCode key="t">number</InlineCode>,
                'No',
                <InlineCode key="d">6000</InlineCode>,
                'Time in milliseconds before the toast auto-dismisses. Set to 0 for a persistent toast that requires manual dismissal.',
              ],
              [
                <InlineCode key="n">persistent</InlineCode>,
                <InlineCode key="t">boolean</InlineCode>,
                'No',
                <InlineCode key="d">false</InlineCode>,
                'When true the toast will not auto-dismiss and must be manually closed. Error-variant toasts are always treated as persistent regardless of this flag.',
              ],
              [
                <InlineCode key="n">actionLabel</InlineCode>,
                <InlineCode key="t">string | undefined</InlineCode>,
                'No',
                '—',
                'Label for an optional call-to-action rendered beside the notification text. When omitted, no action is shown. When set alongside actionHref, renders an anchor; otherwise renders a button that emits the action event on io-toast-item.',
              ],
              [
                <InlineCode key="n">actionHref</InlineCode>,
                <InlineCode key="t">string | undefined</InlineCode>,
                'No',
                '—',
                'When set alongside actionLabel, renders the CTA as an anchor pointing to this URL (opens in the same tab). When omitted, the CTA is a button.',
              ],
            ]}
          />
        </div>

        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-toast').addToast({ text: 'Saved!', variant: 'success' });

// React
const toastRef = useRef(null);
<io-toast ref={toastRef} />
toastRef.current?.addToast({ text: 'Saved!', variant: 'success' });

// Angular — inject ToastManager, place <io-toast> once in the app shell
constructor(private toast: ToastManager) {}
this.toast.addToast({ text: 'Saved!', variant: 'success' });

// Vue
const toast = ref(null);
toast.value?.addToast({ text: 'Saved!', variant: 'success' });`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-toast."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-toast has no events of its own.</strong>
          {' '}Notification lifecycle (enqueue, display, dismiss) is managed entirely by the component
          internals. Use the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>addToast()</code>{' '}
          method to enqueue messages imperatively. The{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>action</code>{' '}
          event from the internal{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-toast-item</code>{' '}
          bubbles through the shadow boundary and can be caught on{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;io-toast&gt;</code>{' '}
          directly.
        </EmptyNote>
      </section>

      {/* ── io-toast-item Props ───────────────────────────────────── */}
      <section id="io-toast-item-properties" className="space-y-4">
        <SectionHeader
          title="io-toast-item Properties"
          description="Props on the internal io-toast-item sub-component. Not intended for direct use — io-toast manages this automatically. Documented here for completeness and framework wrapper consumers."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '160px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '130px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">text</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Notification text displayed in the toast body.',
            ],
            [
              <InlineCode key="n">variant</InlineCode>,
              <InlineCode key="t">IoToastVariant</InlineCode>,
              <InlineCode key="d">&apos;neutral&apos;</InlineCode>,
              'Visual variant controlling the colour accent and icon. Reflects to the host attribute. One of: neutral, success, error, warning, info.',
            ],
            [
              <InlineCode key="n">actionLabel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Label for an optional call-to-action rendered beside the notification text. When omitted, no action is shown. When set without actionHref, renders a button that emits the action event. When set with actionHref, renders an anchor.',
            ],
            [
              <InlineCode key="n">actionHref</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'When set alongside actionLabel, renders the CTA as an <a> element pointing to this URL. When omitted, the CTA is a button.',
            ],
          ]}
        />
      </section>

      {/* ── io-toast-item Events ──────────────────────────────────── */}
      <section id="io-toast-item-events" className="space-y-4">
        <SectionHeader
          title="io-toast-item Events"
          description="Custom events emitted by the internal io-toast-item sub-component."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail', width: '120px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">dismiss</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'Yes',
              'Fires when the user clicks the dismiss (×) button. io-toast listens to this event internally to dequeue the current message.',
            ],
            [
              <InlineCode key="n">action</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'Yes',
              'Fires when the user clicks the action button (only when actionLabel is set and actionHref is not). Bubbles and is composed — consumers can listen directly on <io-toast> or any ancestor. Not fired for anchor-based CTAs.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-toast."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-toast has no slots.</strong>
          {' '}Content is fully managed by the component. Toast notifications are rendered by the
          internal <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-toast-item</code>{' '}
          element, which is created and destroyed programmatically by the queue manager.
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
              <InlineCode key="n">--io-toast-max-width</InlineCode>,
              <InlineCode key="d">400px</InlineCode>,
              'Maximum width of the toast container. On mobile viewports under 480px the container expands to full width automatically.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
