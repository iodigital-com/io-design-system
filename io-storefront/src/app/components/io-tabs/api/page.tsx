'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, MutableBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tabs Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute. Props marked 'mutable' are updated internally by the component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n">
                <InlineCode>activeTabIndex</InlineCode>
                <MutableBadge />
                <ReflectBadge />
              </span>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              <span key="desc">
                The 0-based index of the currently active tab. This is the primary controlled-state
                prop — pass the current index down, and update it in response to the{' '}
                <InlineCode>update</InlineCode> event. Mutable — updated internally when the user
                activates a tab. Reflected to the host attribute <InlineCode>active-tab-index</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Optional accessible label applied to the internal tablist via{' '}
                <InlineCode>aria-label</InlineCode>. Recommended when multiple tablists appear on the same page.
              </span>,
            ],
            [
              <InlineCode key="n">size</InlineCode>,
              <InlineCode key="t">&apos;small&apos; | &apos;medium&apos;</InlineCode>,
              <InlineCode key="d">&apos;small&apos;</InlineCode>,
              <span key="desc">
                Visual size of the tab list. <InlineCode>medium</InlineCode> increases tab height and font
                size for prominent navigation contexts.
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
                Reduces tab button padding using density tokens. Useful for dense layouts where vertical
                space is constrained. Reflected to the host attribute <InlineCode>compact</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="n">labelledby</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                ID of an element that labels this tab group. Sets{' '}
                <InlineCode>aria-labelledby</InlineCode> on the internal tablist element (ARIA 4.1.2).
                Use instead of <InlineCode>label</InlineCode> when the labelling element already exists
                in the DOM.
              </span>,
            ],
            [
              <InlineCode key="n">panelIds</InlineCode>,
              <InlineCode key="t">string[] | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Array of panel element IDs mapped 1:1 by index to the slotted tab buttons. When
                provided, each tab button receives <InlineCode>aria-controls</InlineCode> pointing to
                its associated panel — required for full ARIA APG tabpanel pattern compliance.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-tabs uses a default slot to project tab trigger buttons."
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
                One <InlineCode>{'<button type="button">'}</InlineCode> per tab. The component
                assigns <InlineCode>role=&quot;tab&quot;</InlineCode>,{' '}
                <InlineCode>aria-selected</InlineCode>, and <InlineCode>tabindex</InlineCode> to
                each button automatically. Add the HTML <InlineCode>disabled</InlineCode> attribute
                to prevent a tab from being activated.
              </span>,
            ],
          ]}
        />
        <CodeNote label="HTML">
{`<io-tabs active-tab-index="0">
  <button type="button">Overview</button>
  <button type="button">Details</button>
  <button type="button" disabled>Settings</button>
</io-tabs>`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tabs."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '200px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">update</InlineCode>,
              <InlineCode key="t">{'{ activeTabIndex: number }'}</InlineCode>,
              'No',
              'Fires when the user activates a different tab (via click, Enter, or Space). Does NOT fire when activeTabIndex is changed programmatically — only on direct user interaction. Update your controlled state with the emitted activeTabIndex.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// HTML
<io-tabs active-tab-index="0">
  <button type="button">Overview</button>
  <button type="button">Details</button>
</io-tabs>

<script>
  document.querySelector('io-tabs')
    .addEventListener('update', (e) => {
      console.log('Active tab:', e.detail.activeTabIndex);
    });
</script>

// React
import { useState, useRef, useEffect } from 'react';

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const handler = (e: Event) =>
      setActiveTabIndex((e as CustomEvent<{ activeTabIndex: number }>).detail.activeTabIndex);
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <io-tabs ref={tabsRef} active-tab-index={activeTabIndex}>
      <button type="button">Overview</button>
      <button type="button">Details</button>
    </io-tabs>
  );
}

// Angular (standalone)
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IoTabs } from '@iodigital-com/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoTabs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-tabs [activeTabIndex]="activeTabIndex()" (update)="onUpdate($event)">
      <button type="button">Overview</button>
      <button type="button">Details</button>
    </io-tabs>
  \`,
})
export class AppComponent {
  activeTabIndex = signal(0);

  onUpdate(e: CustomEvent<{ activeTabIndex: number }>) {
    this.activeTabIndex.set(e.detail.activeTabIndex);
  }
}

// Vue
<template>
  <io-tabs
    :active-tab-index="activeTabIndex"
    @update="e => activeTabIndex.value = e.detail.activeTabIndex"
  >
    <button type="button">Overview</button>
    <button type="button">Details</button>
  </io-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const activeTabIndex = ref(0);
</script>`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tabs exposes no public methods.</strong>
          {' '}All interactions are driven by the <InlineCode>activeTabIndex</InlineCode> prop and the{' '}
          <InlineCode>update</InlineCode> event.
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
              <InlineCode key="n">--io-tabs-track-color</InlineCode>,
              <InlineCode key="d">var(--io-border)</InlineCode>,
              'Colour of the full-width baseline track line under the tab list.',
            ],
            [
              <InlineCode key="n">--io-tabs-indicator-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Colour of the active-tab indicator border drawn below the selected tab.',
            ],
            [
              <InlineCode key="n">--io-tabs-icon-size</InlineCode>,
              <InlineCode key="d">var(--io-icon-size-sm)</InlineCode>,
              'Size of icon elements placed inside tab buttons.',
            ],
            [
              <InlineCode key="n">--io-tabs-icon-gap</InlineCode>,
              <InlineCode key="d">var(--io-space-1)</InlineCode>,
              'Gap between an icon and the tab label text.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
