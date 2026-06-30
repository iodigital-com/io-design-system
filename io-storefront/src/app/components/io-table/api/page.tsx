'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoTableApiPage() {
  return (
    <div className="space-y-16">

      {/* ── io-table Properties ──────────────────────────────────── */}
      <section id="io-table-properties" className="space-y-4">
        <SectionHeader
          title="io-table — Properties"
          description="Props on the root io-table container. Sub-component props are documented separately below."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '100px' },
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
              <span key="n"><InlineCode>sticky</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Applies position: sticky; top: 0 to all th elements inside io-table-head-cell, so column headers remain visible while scrolling long tables.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Row density preset. sm reduces cell padding for compact UIs; lg increases padding for spacious layouts.',
            ],
            [
              <span key="n"><InlineCode>striped</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Applies alternating row background colours to improve scanability in data-dense tables.',
            ],
            [
              <span key="n"><InlineCode>bordered</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Adds visible borders between all cells. Useful when table data contains values that need clear column delineation.',
            ],
            [
              <span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Further reduces cell padding beyond the sm size for dense information displays. Stacks with the size prop.',
            ],
            [
              <span key="n"><InlineCode>layout</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;auto&apos; | &apos;fixed&apos;</InlineCode>,
              <InlineCode key="d">&apos;auto&apos;</InlineCode>,
              "CSS table-layout algorithm. 'auto' sizes columns by content width; 'fixed' distributes column width equally and ignores content. Use 'fixed' for performance on large tables or when you need equal-width columns.",
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              "When true, overlays the table body with the 'loading' named slot content and applies aria-busy='true' to the scroll wrapper. The table layout does not shift — the overlay is absolutely positioned. Use with a spinner or skeleton in the loading slot.",
            ],
          ]}
        />
      </section>

      {/* ── io-table Slots ───────────────────────────────────────── */}
      <section id="io-table-slots" className="space-y-4">
        <SectionHeader
          title="io-table — Slots"
          description="Named slots for empty-state and loading overlay content."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">(default)</InlineCode>,
              'Slot for io-table-head, io-table-body, and other table structure elements.',
            ],
            [
              <InlineCode key="n">empty</InlineCode>,
              'Rendered in the table body region when io-table-body has no io-table-body-row children. Detected automatically via slotchange. Use for zero-state messages, illustrations, or CTAs.',
            ],
            [
              <InlineCode key="n">loading</InlineCode>,
              'Rendered as an absolutely-positioned overlay above the table body when the loading prop is true. Use for spinners, skeleton rows, or any loading indicator. aria-busy="true" is applied automatically to the scroll wrapper.',
            ],
          ]}
        />
      </section>

      {/* ── io-table-head-cell Properties ────────────────────────── */}
      <section id="io-table-head-cell-properties" className="space-y-4">
        <SectionHeader
          title="io-table-head-cell — Properties"
          description="Renders a <th scope='col'>. Set sortable to enable click-to-sort."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">sortable</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Enables click-to-sort on this column header. Adds a sort icon and keyboard activation.',
            ],
            [
              <InlineCode key="n">sortDirection</InlineCode>,
              <InlineCode key="t">&apos;ascending&apos; | &apos;descending&apos; | &apos;none&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Consumer-controlled sort direction for this column. Update in response to the sort event. See the Accessibility tab for details on the tri-state design.',
            ],
            [
              <InlineCode key="n">sortKey</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Identifier passed back in the sort event detail. Use it to know which column was sorted. Prefer a field name like \'name\' or \'email\' over a numeric index.',
            ],
            [
              <InlineCode key="n">hideLabel</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Visually hides the column header label using a .sr-only wrapper while keeping it accessible to screen readers. Use for columns where the visual context (e.g. a select-all checkbox) makes the label redundant visually but an accessible name is still required.',
            ],
            [
              <InlineCode key="n">multiline</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Allows the column header text to wrap onto multiple lines. By default, headers truncate with an ellipsis. Set to true for long column headings in fixed-layout tables.',
            ],
          ]}
        />
      </section>

      {/* ── io-table-head-row Properties ─────────────────────────── */}
      <section id="io-table-head-row-properties" className="space-y-4">
        <SectionHeader
          title="io-table-head-row — Properties"
          description="Renders a <tr> in the thead. Set selectable to prepend a select-all checkbox."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '220px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">selectable</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders a select-all checkbox <th> before the slotted head cells.',
            ],
            [
              <InlineCode key="n">selectionState</InlineCode>,
              <InlineCode key="t">&apos;none&apos; | &apos;some&apos; | &apos;all&apos;</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Preferred tri-state API. none = checkbox unchecked, some = indeterminate, all = checked. When set, this overrides selectAllChecked and selectAllIndeterminate.',
            ],
            [
              <InlineCode key="n">selectAllChecked</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controlled checked state of the select-all checkbox. Superseded by selectionState when that prop is set.',
            ],
            [
              <InlineCode key="n">selectAllIndeterminate</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders the checkbox in an indeterminate state when true and selectAllChecked is false. Communicates partial selection to screen readers via aria-checked="mixed". Superseded by selectionState when that prop is set.',
            ],
          ]}
        />
      </section>

      {/* ── io-table-body-row Properties ─────────────────────────── */}
      <section id="io-table-body-row-properties" className="space-y-4">
        <SectionHeader
          title="io-table-body-row — Properties"
          description="Renders a <tr> in the tbody. Set selectable to prepend a per-row selection checkbox."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '200px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>selectable</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders a selection checkbox <td> before the slotted body cells.',
            ],
            [
              <span key="n"><InlineCode>selected</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controlled selected state of this row. Drives the checkbox checked state and the row highlight background.',
            ],
            [
              <InlineCode key="n">rowLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;row&apos;</InlineCode>,
              'Accessible label used in the checkbox aria-label: "Select {rowLabel}". Set to the row\'s primary identifier (e.g. the person\'s name) so each checkbox has a unique, descriptive label for screen reader users.',
            ],
          ]}
        />
      </section>

      {/* ── io-table-body-cell Properties ────────────────────────── */}
      <section id="io-table-body-cell-properties" className="space-y-4">
        <SectionHeader
          title="io-table-body-cell — Properties"
          description="Renders a <td>. Accepts optional colspan and rowspan for merged cells."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '200px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">colspan</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">—</InlineCode>,
              'Maps to the native colSpan attribute. Merges the cell across the specified number of columns.',
            ],
            [
              <InlineCode key="n">rowspan</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">—</InlineCode>,
              'Maps to the native rowSpan attribute. Merges the cell across the specified number of rows.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-table and its sub-components. Listen via addEventListener or framework event binding."
        />
        <ApiTable
          columns={[
            { label: 'Component', width: '200px' },
            { label: 'Event', width: '140px' },
            { label: 'Detail type', width: '300px' },
            { label: 'Bubbles', width: '80px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="c">io-table</InlineCode>,
              <InlineCode key="n">sortChange</InlineCode>,
              <InlineCode key="t">{'{ key: string; direction: \'ascending\' | \'descending\' | \'none\' }'}</InlineCode>,
              'No',
              'Aggregated sort event re-emitted by io-table when any column sort button is clicked. Prefer this over listening to individual column sort events. detail contains the column key identifier and the new sort direction.',
            ],
            [
              <InlineCode key="c">io-table-head-cell</InlineCode>,
              <InlineCode key="n">sort</InlineCode>,
              <InlineCode key="t">{'{ key: string; direction: \'ascending\' | \'descending\' | \'none\' }'}</InlineCode>,
              'Yes',
              'Fired when a sortable column header button is clicked or activated via Enter/Space. Bubbles up to io-table where it is re-emitted as sortChange.',
            ],
            [
              <InlineCode key="c">io-table-head-row</InlineCode>,
              <InlineCode key="n">selectAll</InlineCode>,
              <InlineCode key="t">{'{ checked: boolean }'}</InlineCode>,
              'Yes',
              'Fired when the select-all checkbox changes.',
            ],
            [
              <InlineCode key="c">io-table-body-row</InlineCode>,
              <InlineCode key="n">select</InlineCode>,
              <InlineCode key="t">{'{ selected: boolean }'}</InlineCode>,
              'Yes',
              'Fired when a row\'s selection checkbox changes.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS — preferred: single sortChange listener on io-table
const table = document.querySelector('io-table');
table.addEventListener('sortChange', (e) => {
  console.log(e.detail); // { key: 'name', direction: 'ascending' }
  // Update sortDirection prop on the relevant io-table-head-cell
  // and re-sort your data accordingly.
});

const headRow = document.querySelector('io-table-head-row');
headRow.addEventListener('selectAll', (e) => {
  console.log(e.detail); // { checked: true }
});

const bodyRows = document.querySelectorAll('io-table-body-row');
bodyRows.forEach((row, i) => {
  row.addEventListener('select', (e) => {
    console.log(i, e.detail); // { selected: true }
  });
});`}
        </CodeNote>
      </section>

      {/* ── Accessibility Notes ───────────────────────────────────── */}
      <section id="accessibility" className="space-y-4">
        <SectionHeader
          title="Accessibility Notes"
          description="Implementation details that inform correct usage and assistive-technology support."
        />
        <ApiTable
          columns={[
            { label: 'Pattern', width: '260px' },
            { label: 'Detail' },
          ]}
          rows={[
            [
              'ARIA APG sort-button pattern',
              'Each sortable column header renders a native <button> inside the <th> element. This follows the WAI-ARIA Authoring Practices Guide table sort pattern. The aria-sort attribute is placed on the <th> (which has an implicit columnheader role), not on the button itself, so screen readers announce sort state when navigating column headers.',
            ],
            [
              'Scroll wrapper accessible name (WCAG 1.3.1)',
              'The horizontal scroll wrapper is rendered as role="region" and receives aria-label from the caption prop. This gives the landmark an accessible name so screen reader users can distinguish it from other landmarks on the page. Always provide a meaningful caption.',
            ],
            [
              'Caption visibility',
              'Use captionHidden to visually hide the caption when a heading already identifies the table. The caption remains in the DOM and is announced by screen readers, satisfying the accessible name requirement without visual duplication.',
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Design tokens used by the table sub-components. Override on io-table or any ancestor."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-table-row-selected-bg</InlineCode>,
              'Background colour of a selected body row. Defaults to --io-color-primary-muted.',
            ],
            [
              <InlineCode key="n">--io-table-empty-min-height</InlineCode>,
              'Minimum height of the empty-state region when no rows are present. Defaults to 120px. Override to control the visual size of the zero-state area.',
            ],
            [
              <InlineCode key="n">--io-table-loading-bg</InlineCode>,
              'Background colour of the loading overlay. Defaults to a semi-transparent page background (color-mix). Override to match your table\'s surface colour.',
            ],
            [
              <InlineCode key="n">--io-border</InlineCode>,
              'Row separator border colour.',
            ],
            [
              <InlineCode key="n">--io-bg-surface</InlineCode>,
              'Header background colour.',
            ],
            [
              <InlineCode key="n">--io-bg-raised</InlineCode>,
              'Row hover background colour.',
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
              'Checkbox accent colour.',
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
