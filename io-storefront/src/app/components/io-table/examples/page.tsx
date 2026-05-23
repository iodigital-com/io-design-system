'use client';

import {
  tableStoryBasic,
  tableStorySortable,
  tableStorySelectable,
  tableStoryFull,
  tableStorySizes,
} from '../io-table.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTableExamplesPage() {
  return (
    <div className="space-y-10">

      {/* ── Basic table ──────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Basic"
          description="A simple data table with a caption and column headers. Rows are read-only with no sort or select interaction."
        />
        <ComponentStory
          story={tableStoryBasic}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
        />
      </section>

      {/* ── Sortable columns ─────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Sortable columns"
          description="Click any column header to sort ascending, click again to sort descending. Keyboard-navigable via Tab + Enter/Space."
        />
        <ComponentStory
          story={tableStorySortable}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
        />
      </section>

      {/* ── Selectable rows ──────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Selectable rows"
          description="Adds a checkbox column for row selection. The select-all checkbox in the header selects or deselects all rows at once."
        />
        <ComponentStory
          story={tableStorySelectable}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
        />
      </section>

      {/* ── Full featured ────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Sortable + Selectable"
          description="Combines sortable columns with row selection for full data management capabilities."
        />
        <ComponentStory
          story={tableStoryFull}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
        />
      </section>

      {/* ── Sizes ────────────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="Size variants"
          description="Three density presets — sm for compact interfaces, md for standard use, lg for spacious layouts."
        />
        <ComponentStory
          story={tableStorySizes}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', gap: 'var(--io-space-6, 24px)' }}
        />
      </section>

    </div>
  );
}
