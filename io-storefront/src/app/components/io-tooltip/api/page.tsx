'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTooltipApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tooltip Stencil component."
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
              <InlineCode key="n">content</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Tooltip text content displayed in the floating panel.',
            ],
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
              </span>,
              <InlineCode key="d">&apos;top&apos;</InlineCode>,
              '@floating-ui/dom will flip or shift automatically if it overflows the viewport.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tooltip."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tooltip has no events.</strong>
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tooltip has no public methods.</strong>
          {' '}Visibility is managed automatically on hover and focus.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-tooltip."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'The trigger element. Receives aria-describedby automatically in componentDidLoad. Must be a focusable element (button, link, or element with tabindex).',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`<io-tooltip content="Edit this item">
  <io-button variant="ghost" size="sm">
    <!-- icon-only button example -->
    Edit
  </io-button>
</io-tooltip>`}
        </CodeNote>
      </section>

    </div>
  );
}
