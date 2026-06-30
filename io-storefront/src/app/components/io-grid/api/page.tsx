'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge } from '@/components/api/ApiPrimitives';

export default function IoGridApiPage() {
  return (
    <div className="space-y-16">

      {/* ── io-grid Properties ───────────────────────────────────── */}
      <section id="io-grid-properties" className="space-y-4">
        <SectionHeader
          title="io-grid Properties"
          description="Props on the io-grid container component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '140px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>gap</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Gap between grid cells. Maps to --io-grid-gap-* fluid tokens.',
            ],
            [
              <span key="n"><InlineCode>columns</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">12</InlineCode>,
              'Number of columns in the grid. Clamped to 1–12.',
            ],
            [
              <span key="n"><InlineCode>align</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;start&apos; | &apos;center&apos; | &apos;end&apos; | &apos;stretch&apos;</InlineCode>,
              <InlineCode key="d">&apos;start&apos;</InlineCode>,
              'Align-items for all grid cells (cross-axis alignment).',
            ],
            [
              <span key="n"><InlineCode>justify</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;start&apos; | &apos;center&apos; | &apos;end&apos; | &apos;stretch&apos;</InlineCode>,
              <InlineCode key="d">&apos;stretch&apos;</InlineCode>,
              'Justify-items for all grid cells (inline-axis alignment).',
            ],
          ]}
        />
      </section>

      {/* ── io-grid-item Properties ──────────────────────────────── */}
      <section id="io-grid-item-properties" className="space-y-4">
        <SectionHeader
          title="io-grid-item Properties"
          description="Props on each grid cell component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '140px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>colSpan</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">number | undefined</InlineCode>,
              '—',
              'Number of grid columns this item spans (1–12). When unset, the item uses auto-placement.',
            ],
            [
              <span key="n"><InlineCode>rowSpan</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">number | undefined</InlineCode>,
              '—',
              'Number of grid rows this item spans. Useful for tall cells in a masonry-like layout.',
            ],
            [
              <span key="n"><InlineCode>colStart</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">number | string | undefined</InlineCode>,
              '—',
              'Explicit starting column line (1–12 or "auto"). When combined with colSpan, defines the full column range.',
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ────────────────────────────────── */}
      <section id="css-tokens" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Global layout tokens available on :root. Override to customise the grid system."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '280px' },
            { label: 'Default', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="t">--io-grid-columns</InlineCode>,
              <InlineCode key="d">12</InlineCode>,
              'Default column count inherited by all io-grid instances.',
            ],
            [
              <InlineCode key="t">--io-grid-gap-none</InlineCode>,
              <InlineCode key="d">0px</InlineCode>,
              'Gap for gap="none".',
            ],
            [
              <InlineCode key="t">--io-grid-gap-sm</InlineCode>,
              <InlineCode key="d">clamp(0.5rem, …, 1rem)</InlineCode>,
              'Gap for gap="sm". Fluid 8–16px.',
            ],
            [
              <InlineCode key="t">--io-grid-gap-md</InlineCode>,
              <InlineCode key="d">clamp(1rem, …, 2.25rem)</InlineCode>,
              'Gap for gap="md" (default). Fluid 16–36px.',
            ],
            [
              <InlineCode key="t">--io-grid-gap-lg</InlineCode>,
              <InlineCode key="d">clamp(1.5rem, …, 3rem)</InlineCode>,
              'Gap for gap="lg". Fluid 24–48px.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
