'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoTableApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-table Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '280px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">caption</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Visible table caption. Always provide one — it is the primary accessible name for screen readers. Use captionHidden to hide it visually when a heading already identifies the table.',
            ],
            [
              <InlineCode key="n">captionHidden</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the caption using a .sr-only CSS class while keeping it announced by screen readers.',
            ],
            [
              <InlineCode key="n">columns</InlineCode>,
              <InlineCode key="t">{'Array<{ key: string; label: string; sortable?: boolean }>'}</InlineCode>,
              <InlineCode key="d">[]</InlineCode>,
              'Column definitions. Each item maps a data key to a header label. Set sortable on individual columns to override the global sortable prop.',
            ],
            [
              <InlineCode key="n">rows</InlineCode>,
              <InlineCode key="t">{'Record<string, unknown>[]'}</InlineCode>,
              <InlineCode key="d">[]</InlineCode>,
              'Row data objects. Each key should correspond to a column key. Values are rendered as strings via String(value).',
            ],
            [
              <InlineCode key="n">sortable</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Enables sorting on all columns globally. Individual columns can further override with their own sortable prop.',
            ],
            [
              <InlineCode key="n">selectable</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Prepends a checkbox column to every row, plus a select-all checkbox in the header.',
            ],
            [
              <span key="n"><InlineCode>sticky</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Applies position: sticky; top: 0 to the thead, so the column headers remain visible while scrolling long tables.',
            ],
            [
              <InlineCode key="n">sortKey</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Key of the currently sorted column. Update this from your sort handler to control the active sort indicator.',
            ],
            [
              <InlineCode key="n">sortDirection</InlineCode>,
              <InlineCode key="t">&apos;ascending&apos; | &apos;descending&apos; | &apos;none&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Current sort direction. Update from your sort handler alongside sortKey.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Row density preset. sm reduces cell padding for compact UIs; lg increases padding for spacious layouts.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-table. Listen via addEventListener or framework event binding."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '320px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">sort</InlineCode>,
              <InlineCode key="t">{'{ key: string; direction: \'ascending\' | \'descending\' }'}</InlineCode>,
              'Fired when a sortable column header is clicked or activated via Enter/Space. The consumer is responsible for sorting the rows array and feeding the result back via the rows prop.',
            ],
            [
              <InlineCode key="n">rowSelect</InlineCode>,
              <InlineCode key="t">{'{ selectedRows: Record<string, unknown>[] }'}</InlineCode>,
              'Fired when any row checkbox or the select-all checkbox changes. The detail contains all currently selected row objects.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const table = document.querySelector('io-table');

table.addEventListener('sort', (e) => {
  console.log(e.detail); // { key: 'name', direction: 'ascending' }
});

table.addEventListener('rowSelect', (e) => {
  console.log(e.detail.selectedRows); // Array of selected row objects
});

// React
<io-table
  onSort={(e) => handleSort(e.detail)}
  onRowSelect={(e) => handleSelect(e.detail.selectedRows)}
/>`}
        </CodeNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Design tokens used internally. Override on the host element or any ancestor."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-border</InlineCode>,
              'Row separator border colour. Defaults to the global border token.',
            ],
            [
              <InlineCode key="n">--io-bg-surface</InlineCode>,
              'Header background colour. Defaults to the global surface background token.',
            ],
            [
              <InlineCode key="n">--io-bg-raised</InlineCode>,
              'Row hover background colour. Defaults to the global raised background token.',
            ],
            [
              <InlineCode key="n">--io-text-primary</InlineCode>,
              'Primary cell text colour.',
            ],
            [
              <InlineCode key="n">--io-text-secondary</InlineCode>,
              'Header cell text colour.',
            ],
            [
              <InlineCode key="n">--io-color-primary</InlineCode>,
              'Selected row background tint and checkbox accent colour.',
            ],
            [
              <InlineCode key="n">--io-font-size-sm</InlineCode>,
              'Cell font size for md and lg density.',
            ],
            [
              <InlineCode key="n">--io-font-size-xs</InlineCode>,
              'Cell font size for sm density.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
