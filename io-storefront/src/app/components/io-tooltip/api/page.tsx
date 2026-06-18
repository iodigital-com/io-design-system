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
                <InlineCode>&apos;top-start&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;top-end&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;bottom&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;bottom-start&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;bottom-end&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;left&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;left-start&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;left-end&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;right&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;right-start&apos;</InlineCode>
                {' | '}
                <InlineCode>&apos;right-end&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;top&apos;</InlineCode>,
              'Preferred placement. All 12 floating-ui placements are supported. The component auto-flips to an available placement if the preferred one would clip outside the viewport.',
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

      {/* ── Accessibility Notes ───────────────────────────────────── */}
      <section id="accessibility" className="space-y-4">
        <SectionHeader
          title="Accessibility Notes"
          description="WCAG compliance details and keyboard/pointer interaction behaviour."
        />
        <ApiTable
          columns={[
            { label: 'Criterion', width: '220px' },
            { label: 'Details' },
          ]}
          rows={[
            [
              <span key="c">WCAG 1.4.13 Content on Hover</span>,
              <span key="d">
                The tooltip overlay is hoverable — moving the pointer from the trigger into the
                tooltip keeps it visible. A 150 ms hide delay (configurable via{' '}
                <InlineCode>--io-tooltip-hide-delay</InlineCode>) gives the pointer time to
                travel from trigger to tooltip without it dismissing. This allows users to copy
                text or click links inside the tooltip.
              </span>,
            ],
          ]}
        />
      </section>

    </div>
  );
}
