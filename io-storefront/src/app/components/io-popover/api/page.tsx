'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoPopoverApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Props passed as HTML attributes or JSX properties on the io-popover element."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '280px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">placement</InlineCode>,
              <span key="t" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                <InlineCode>&apos;top&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;bottom&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;left&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;right&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;auto&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;bottom&apos;</InlineCode>,
              'Preferred placement of the floating panel. auto resolves to bottom.',
            ],
            [
              <InlineCode key="n">open</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controls visibility of the panel. Mutable — reflects back to attribute.',
            ],
            [
              <InlineCode key="n">closeOnClickOutside</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'When true, clicking outside the panel closes it and emits dismiss.',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible label for the popover dialog. Rendered as aria-labelledby target inside the panel.',
            ],
            [
              <InlineCode key="n">ariaLabel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible name applied directly as aria-label on the panel dialog. Use when label is absent and a visible heading is not appropriate.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-popover."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Payload', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">open</InlineCode>,
              <InlineCode key="p">void</InlineCode>,
              'Emitted when the popover opens — via trigger click while closed, or programmatic open prop change. Symmetric with dismiss.',
            ],
            [
              <InlineCode key="n">dismiss</InlineCode>,
              <InlineCode key="p">void</InlineCode>,
              'Emitted when the popover closes via Escape key, outside click, or trigger click while open.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default slots accepted by io-popover."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">trigger</InlineCode>,
              'The activating element — typically an io-button. io-popover manages aria-expanded on this element and returns focus to it on close.',
            ],
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'The popover panel body content. Can contain any HTML or components including buttons, links, and form fields.',
            ],
          ]}
        />
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public methods exposed by io-popover."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>No public methods.</strong>
          {' '}Visibility is managed through the <InlineCode>open</InlineCode> prop, trigger slot click, Escape key, and outside click.
        </EmptyNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Design tokens used by io-popover. Override on the host element or any ancestor."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '260px' },
            { label: 'Default', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-z-dropdown</InlineCode>,
              <InlineCode key="d">30</InlineCode>,
              'Z-index of the popover panel. Shared with other dropdown-level overlays.',
            ],
            [
              <InlineCode key="n">--io-shadow-md</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>global token</span>,
              'Box shadow applied to the panel for depth.',
            ],
            [
              <InlineCode key="n">--io-border-radius-md</InlineCode>,
              <InlineCode key="d">12px</InlineCode>,
              'Border radius of the panel.',
            ],
            [
              <InlineCode key="n">--io-bg-surface</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>global token</span>,
              'Background colour of the panel. Adapts to light and dark themes.',
            ],
            [
              <InlineCode key="n">--io-space-4</InlineCode>,
              <InlineCode key="d">16px</InlineCode>,
              'Minimum padding inside the panel.',
            ],
          ]}
        />
      </section>

      {/* ── Usage examples ───────────────────────────────────────── */}
      <section id="usage" className="space-y-4">
        <SectionHeader
          title="Usage"
          description="Example code for common io-popover patterns."
        />
        <CodeNote label="Basic usage">
{`<!-- HTML -->
<io-popover placement="bottom" label="Options">
  <io-button slot="trigger">More</io-button>
  <p>Popover body content.</p>
</io-popover>`}
        </CodeNote>
        <CodeNote label="React">
{`function App() {
  return (
    <io-popover placement="bottom" label="Options">
      <io-button slot="trigger">More</io-button>
      <p>Popover body content.</p>
    </io-popover>
  );
}`}
        </CodeNote>
        <CodeNote label="Vue">
{`<template>
  <io-popover placement="bottom" label="Options">
    <io-button slot="trigger">More</io-button>
    <p>Popover body content.</p>
  </io-popover>
</template>

<script setup lang="ts">
import { IoPopover, IoButton } from '@iodigital-com/components-vue';
</script>`}
        </CodeNote>
      </section>

    </div>
  );
}
