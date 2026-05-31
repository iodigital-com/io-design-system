'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, MutableBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoButtonGroupApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-button-group Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute. Props marked 'mutable' are updated internally by the component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n">
                <InlineCode>exclusive</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                When true, enables single-select (radiogroup) mode. Arrow keys move focus and select simultaneously.
                When false (default), enables multi-select (checkbox group) mode — arrow keys only move focus.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>value</InlineCode>
                <MutableBadge />
              </span>,
              <InlineCode key="t">string | string[]</InlineCode>,
              <span key="d"><InlineCode>&apos;&apos;</InlineCode> / <InlineCode>[]</InlineCode></span>,
              <span key="desc">
                The selected value(s). In exclusive mode, a string matching one of the item values (or empty string
                for no selection; default <InlineCode>&apos;&apos;</InlineCode>). In multi-select mode, a string array
                of active values (default <InlineCode>[]</InlineCode>). Mutable — updated internally when the user
                selects an item.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>disabled</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Disables all buttons in the group. No selection changes are possible and pointer events are
                suppressed. Individual items can also be disabled via the <InlineCode>disabled</InlineCode>{' '}
                attribute on the child <InlineCode>io-button</InlineCode> element.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Accessible label applied to the group container via <InlineCode>aria-label</InlineCode>.
                Strongly recommended — without it, assistive technologies cannot identify the group purpose.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>size</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">IoButtonGroupSize</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              <span key="desc">
                Size preset propagated to all slotted <InlineCode>io-button</InlineCode> children.
                Accepts <InlineCode>&apos;sm&apos;</InlineCode>, <InlineCode>&apos;md&apos;</InlineCode> (default), or{' '}
                <InlineCode>&apos;lg&apos;</InlineCode>. The value is reflected to the host attribute and forwarded
                via the <InlineCode>slotchange</InlineCode> event and{' '}
                <InlineCode>@Watch(&apos;size&apos;)</InlineCode> so both initial render and dynamic changes
                propagate correctly.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>compact</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Reduces height and padding for compact contexts like toolbars.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-button-group accepts io-button children as declarative item definitions."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Expected content' },
          ]}
          rows={[
            [
              <span key="s" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              <span key="d">
                One <InlineCode>{'<io-button value="...">Label</io-button>'}</InlineCode> per item.
                The component reads the <InlineCode>value</InlineCode> attribute and text content from each
                child at load time and renders internal buttons. Add the HTML{' '}
                <InlineCode>disabled</InlineCode> attribute to an individual child to prevent that
                specific item from being selected.
              </span>,
            ],
          ]}
        />
        <CodeNote label="HTML">
{`<io-button-group value="week" exclusive label="View period">
  <io-button value="day">Day</io-button>
  <io-button value="week">Week</io-button>
  <io-button value="month" disabled>Month</io-button>
</io-button-group>`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-button-group."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '120px' },
            { label: 'Detail type', width: '260px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">{'{ value: string | string[] }'}</InlineCode>,
              'No',
              <span key="d">
                Fires when the selection changes. In exclusive mode, <InlineCode>detail.value</InlineCode>{' '}
                is the newly selected string. In multi-select mode, it is the full updated string array.
                Does not fire for disabled items or when the group is disabled.
              </span>,
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// HTML — exclusive mode
<io-button-group id="period" value="week" exclusive label="View period">
  <io-button value="day">Day</io-button>
  <io-button value="week">Week</io-button>
  <io-button value="month">Month</io-button>
</io-button-group>

<script>
  document.getElementById('period').addEventListener('change', (e) => {
    console.log('Selected:', e.detail.value); // e.g. "month"
  });
</script>

// React — exclusive mode
import { useState, useRef, useEffect } from 'react';

function DateRangePicker() {
  const [value, setValue] = useState('week');
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => setValue(e.detail.value);
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, []);

  return (
    <io-button-group ref={ref} exclusive value={value} label="View period">
      <io-button value="day">Day</io-button>
      <io-button value="week">Week</io-button>
      <io-button value="month">Month</io-button>
    </io-button-group>
  );
}

// React — multi-select mode
function WeekdayFilter() {
  const [values, setValues] = useState(['mon', 'wed']);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => setValues(e.detail.value);
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, []);

  return (
    <io-button-group ref={ref} label="Working days">
      <io-button value="mon">Mon</io-button>
      <io-button value="tue">Tue</io-button>
      <io-button value="wed">Wed</io-button>
      <io-button value="thu">Thu</io-button>
      <io-button value="fri">Fri</io-button>
    </io-button-group>
  );
}`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-button-group exposes no public methods.</strong>
          {' '}All interactions are driven by the <InlineCode>value</InlineCode> prop and the{' '}
          <InlineCode>change</InlineCode> event.
        </EmptyNote>
      </section>

      {/* ── Types ────────────────────────────────────────────────────────── */}
      <section id="types" className="space-y-4">
        <SectionHeader
          title="Types"
          description="TypeScript type aliases exported from the io-button-group package."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '220px' },
            { label: 'Definition', width: '260px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">IoButtonGroupSize</InlineCode>,
              <InlineCode key="d">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <span key="desc">
                Size preset for the button group. Intentionally excludes <InlineCode>&apos;xl&apos;</InlineCode>{' '}
                (available on standalone <InlineCode>io-button</InlineCode>) because an extra-large segmented
                control is rarely appropriate for UI toolbars or filter groups.
              </span>,
            ],
          ]}
        />
      </section>

    </div>
  );
}
