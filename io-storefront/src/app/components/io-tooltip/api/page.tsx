'use client';

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
{`<io-button
  variant="ghost"
  size="sm"
  io-tooltip="Edit this item"
  io-tooltip-placement="top"
>
  Edit
</io-button>`}
        </CodeNote>
      </section>

    </div>
  );
}
