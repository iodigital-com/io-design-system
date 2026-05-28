'use client';

import Link from 'next/link';
import { SectionHeader, InlineCode, ApiTable, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTooltipApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Attribute API"
          description="Tooltip now behaves as a global attribute directive on any focusable trigger element."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">io-tooltip</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Tooltip text content displayed in the global floating overlay.',
            ],
            [
              <InlineCode key="n">io-tooltip-placement</InlineCode>,
              <span key="t" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                <InlineCode>&apos;top&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;bottom&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;left&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;right&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;top&apos;</InlineCode>,
              'Preferred placement. @floating-ui/dom flips/shifts automatically when needed.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by the tooltip system."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>No tooltip events are emitted.</strong>
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public calls for the tooltip system."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>No public methods.</strong>
          {' '}Visibility is managed automatically through hover/focus/blur and Escape dismissal.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Compatibility Wrapper"
          description="Legacy <io-tooltip> remains as a non-breaking wrapper that maps props to trigger attributes."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>Prefer attributes on trigger elements.</strong>
          {' '}Use <InlineCode>io-tooltip</InlineCode> directly on controls. Keep <InlineCode>&lt;io-tooltip&gt;</InlineCode>
          only while migrating older markup.
        </EmptyNote>
        <CodeNote label="Usage">
{`<!-- HTML — attribute directly on any focusable element -->
<io-button
  io-tooltip="Edit this item"
  io-tooltip-placement="top"
>
  Edit
</io-button>

// React — pass attributes as props on Stencil components
function App() {
  return (
    <io-button io-tooltip="Save changes" io-tooltip-placement="top">
      Save
    </io-button>
  );
}

// Angular (standalone) — bind attributes directly
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IoButton } from '@iodigital-com/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-button
      io-tooltip="Save changes"
      io-tooltip-placement="top"
    >
      Save
    </io-button>
  \`,
})
export class AppComponent {}

// Vue — pass as regular HTML attributes
<template>
  <io-button
    io-tooltip="Save changes"
    io-tooltip-placement="top"
  >
    Save
  </io-button>
</template>

<script setup lang="ts">
import { IoButton } from '@iodigital-com/components-vue';
</script>`}
        </CodeNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          This component has no component-level override tokens. All visual properties are governed by global design tokens documented in the <Link href="/styles/tokens" className="underline">Token Explorer</Link>.
        </p>
      </section>

    </div>
  );
}
