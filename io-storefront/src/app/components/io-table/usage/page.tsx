'use client';

import { CodeTabs } from '@/components/CodeTabs';
import { DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoTableUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Tables present structured relational data where comparing values across rows matters."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use a table when data has clear column relationships — for example, a list of users with name, role, and status.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Add a caption that describes the table&apos;s content clearly — it is required for screen reader users.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use sortable columns when there is a meaningful order — alphabetically, by date, or by numeric value.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the selectable prop when users need to act on multiple rows at once (bulk delete, bulk export).
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use a table for layout purposes — use CSS Grid or Flexbox instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Omit the caption — always provide one, even if you hide it visually with captionHidden.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Make every column sortable — sort only columns where ordering provides genuine value.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use tables for fewer than two rows of data — a simple list is often clearer.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Sorting ──────────────────────────────────────────── */}
      <section id="sorting" className="space-y-6">
        <SectionHeader
          title="Sorting"
          description="The table emits an sort event — your code controls the actual sorted order."
        />
        <RuleCard label="Consumer-controlled sort">
          io-table emits <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>sort</code>{' '}
          with the column key and new direction. Update the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>rows</code>,{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>sortKey</code>, and{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>sortDirection</code> props
          from your component state. This design keeps the table a pure presenter.
        </RuleCard>
        <CodeTabs
          tabs={[
            {
              label: 'HTML',
              code: `<io-table id="my-table" caption="Users" sortable></io-table>

<script>
  const table = document.getElementById('my-table');
  let rows = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'Editor' },
  ];
  let sortKey = '';
  let sortDir = 'none';

  function render() {
    table.columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ];
    table.rows = rows;
    table.sortKey = sortKey;
    table.sortDirection = sortDir;
  }

  table.addEventListener('sort', (e) => {
    sortKey = e.detail.key;
    sortDir = e.detail.direction;
    rows = [...rows].sort((a, b) => {
      const aVal = String(a[sortKey]);
      const bVal = String(b[sortKey]);
      return sortDir === 'ascending'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    render();
  });

  render();
</script>`,
            },
            {
              label: 'React',
              code: `import { useState, useCallback } from 'react';

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
];

const INITIAL_ROWS = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'Editor' },
];

export function UsersTable() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('none');

  const handleSort = useCallback((e) => {
    const { key, direction } = e.detail;
    setSortKey(key);
    setSortDirection(direction);
    setRows((prev) =>
      [...prev].sort((a, b) => {
        const aVal = String(a[key]);
        const bVal = String(b[key]);
        return direction === 'ascending'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }),
    );
  }, []);

  return (
    <io-table
      caption="Users"
      sortable
      columns={COLUMNS}
      rows={rows}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={handleSort}
    />
  );
}`,
            },
            {
              label: 'Angular',
              code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-users-table',
  template: \`
    <io-table
      caption="Users"
      [sortable]="true"
      [columns]="columns"
      [rows]="rows"
      [sortKey]="sortKey"
      [sortDirection]="sortDirection"
      (sort)="handleSort($event)"
    ></io-table>
  \`,
})
export class UsersTableComponent {
  columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ];
  rows = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'Editor' },
  ];
  sortKey = '';
  sortDirection = 'none';

  handleSort(event: CustomEvent) {
    const { key, direction } = event.detail;
    this.sortKey = key;
    this.sortDirection = direction;
    this.rows = [...this.rows].sort((a, b) => {
      const aVal = String(a[key]);
      const bVal = String(b[key]);
      return direction === 'ascending'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }
}`,
            },
            {
              label: 'Vue',
              code: `<template>
  <io-table
    caption="Users"
    :sortable="true"
    :columns="columns"
    :rows="rows"
    :sort-key="sortKey"
    :sort-direction="sortDirection"
    @io-sort="handleSort"
  />
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
];
const rows = ref([
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'Editor' },
]);
const sortKey = ref('');
const sortDirection = ref('none');

function handleSort(event) {
  const { key, direction } = event.detail;
  sortKey.value = key;
  sortDirection.value = direction;
  rows.value = [...rows.value].sort((a, b) => {
    const aVal = String(a[key]);
    const bVal = String(b[key]);
    return direction === 'ascending'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });
}
</script>`,
            },
          ]}
        />
      </section>

      {/* ── Selection ────────────────────────────────────────── */}
      <section id="selection" className="space-y-6">
        <SectionHeader
          title="Row selection"
          description="Use selectable when users need to act on multiple rows — bulk delete, export, or batch update."
        />
        <RuleCard label="rowSelect event">
          When any checkbox is toggled, io-table emits <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>rowSelect</code>{' '}
          with <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'{ selectedRows: Record<string, unknown>[] }'}</code>{' '}
          — an array of the currently selected row objects. Use this to drive your bulk-action UI.
        </RuleCard>
        <RuleCard label="Pair with a bulk-actions bar">
          Show a contextual action bar (delete, export) only when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>selectedRows.length {'>'} 0</code>.
          Announce the count to screen readers with an <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live</code> region.
        </RuleCard>
      </section>

    </div>
  );
}
