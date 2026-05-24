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
              Add <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>sortable</code> to{' '}
              <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-table-head-cell</code>{' '}
              only on columns where ordering provides genuine value.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Add <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>selectable</code> to{' '}
              <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-table-head-row</code> and{' '}
              <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-table-body-row</code>{' '}
              when users need to act on multiple rows at once.
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

      {/* ── Basic usage ──────────────────────────────────────── */}
      <section id="basic-usage" className="space-y-6">
        <SectionHeader
          title="Basic usage"
          description="Compose io-table using its slot-based sub-components. Each sub-component maps directly to a semantic table element."
        />
        <CodeTabs
          tabs={[
            {
              label: 'HTML',
              code: `<io-table caption="Team members">
  <io-table-head>
    <io-table-head-row>
      <io-table-head-cell>Name</io-table-head-cell>
      <io-table-head-cell>Role</io-table-head-cell>
      <io-table-head-cell>Status</io-table-head-cell>
    </io-table-head-row>
  </io-table-head>
  <io-table-body>
    <io-table-body-row>
      <io-table-body-cell>Alice Müller</io-table-body-cell>
      <io-table-body-cell>Admin</io-table-body-cell>
      <io-table-body-cell>Active</io-table-body-cell>
    </io-table-body-row>
    <io-table-body-row>
      <io-table-body-cell>Bob Janssen</io-table-body-cell>
      <io-table-body-cell>Editor</io-table-body-cell>
      <io-table-body-cell>Active</io-table-body-cell>
    </io-table-body-row>
  </io-table-body>
</io-table>`,
            },
            {
              label: 'React',
              code: `export function TeamTable() {
  return (
    <io-table caption="Team members">
      <io-table-head>
        <io-table-head-row>
          <io-table-head-cell>Name</io-table-head-cell>
          <io-table-head-cell>Role</io-table-head-cell>
          <io-table-head-cell>Status</io-table-head-cell>
        </io-table-head-row>
      </io-table-head>
      <io-table-body>
        <io-table-body-row>
          <io-table-body-cell>Alice Müller</io-table-body-cell>
          <io-table-body-cell>Admin</io-table-body-cell>
          <io-table-body-cell>Active</io-table-body-cell>
        </io-table-body-row>
      </io-table-body>
    </io-table>
  );
}`,
            },
            {
              label: 'Angular',
              code: `@Component({
  selector: 'app-team-table',
  template: \`
    <io-table caption="Team members">
      <io-table-head>
        <io-table-head-row>
          <io-table-head-cell>Name</io-table-head-cell>
          <io-table-head-cell>Role</io-table-head-cell>
          <io-table-head-cell>Status</io-table-head-cell>
        </io-table-head-row>
      </io-table-head>
      <io-table-body>
        <io-table-body-row *ngFor="let row of rows">
          <io-table-body-cell>{{ row.name }}</io-table-body-cell>
          <io-table-body-cell>{{ row.role }}</io-table-body-cell>
          <io-table-body-cell>{{ row.status }}</io-table-body-cell>
        </io-table-body-row>
      </io-table-body>
    </io-table>
  \`,
})
export class TeamTableComponent {
  rows = [
    { name: 'Alice Müller', role: 'Admin', status: 'Active' },
    { name: 'Bob Janssen', role: 'Editor', status: 'Active' },
  ];
}`,
            },
            {
              label: 'Vue',
              code: `<template>
  <io-table caption="Team members">
    <io-table-head>
      <io-table-head-row>
        <io-table-head-cell>Name</io-table-head-cell>
        <io-table-head-cell>Role</io-table-head-cell>
        <io-table-head-cell>Status</io-table-head-cell>
      </io-table-head-row>
    </io-table-head>
    <io-table-body>
      <io-table-body-row v-for="row in rows" :key="row.name">
        <io-table-body-cell>{{ row.name }}</io-table-body-cell>
        <io-table-body-cell>{{ row.role }}</io-table-body-cell>
        <io-table-body-cell>{{ row.status }}</io-table-body-cell>
      </io-table-body-row>
    </io-table-body>
  </io-table>
</template>

<script setup>
const rows = [
  { name: 'Alice Müller', role: 'Admin', status: 'Active' },
  { name: 'Bob Janssen', role: 'Editor', status: 'Active' },
];
</script>`,
            },
          ]}
        />
      </section>

      {/* ── Sorting ──────────────────────────────────────────── */}
      <section id="sorting" className="space-y-6">
        <SectionHeader
          title="Sorting"
          description="Add sortable to io-table-head-cell columns. Each cell emits a sort event — your code controls the actual sorted order."
        />
        <RuleCard label="Consumer-controlled sort">
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-table-head-cell</code>{' '}
          emits <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>sort</code>{' '}
          with <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'{ key, direction }'}</code>.
          Update the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>sort-direction</code>{' '}
          prop and re-render the slotted rows sorted. The cell is a pure presenter.
        </RuleCard>
        <CodeTabs
          tabs={[
            {
              label: 'HTML',
              code: `<io-table id="my-table" caption="Users">
  <io-table-head>
    <io-table-head-row>
      <io-table-head-cell id="th-name" sortable sort-key="name">Name</io-table-head-cell>
      <io-table-head-cell id="th-role" sortable sort-key="role">Role</io-table-head-cell>
    </io-table-head-row>
  </io-table-head>
  <io-table-body id="tbody"></io-table-body>
</io-table>

<script>
  let rows = [
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob',   role: 'Editor' },
  ];
  let sortKey = '';
  let sortDir = 'none';

  function renderRows() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    rows.forEach(row => {
      const tr = document.createElement('io-table-body-row');
      ['name', 'role'].forEach(key => {
        const td = document.createElement('io-table-body-cell');
        td.textContent = row[key];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  document.querySelectorAll('io-table-head-cell').forEach(th => {
    th.addEventListener('sort', (e) => {
      sortKey = e.detail.key;
      sortDir = e.detail.direction;
      document.querySelectorAll('io-table-head-cell').forEach(c => {
        c.sortDirection = c.sortKey === sortKey ? sortDir : 'none';
      });
      rows = [...rows].sort((a, b) => {
        const av = String(a[sortKey]), bv = String(b[sortKey]);
        return sortDir === 'ascending' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
      renderRows();
    });
  });

  renderRows();
</script>`,
            },
            {
              label: 'React',
              code: `import { useState, useCallback } from 'react';

const INITIAL_ROWS = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'Editor' },
];

export function SortableTable() {
  const [rows, setRows]           = useState(INITIAL_ROWS);
  const [sortKey, setSortKey]     = useState('');
  const [sortDir, setSortDir]     = useState('none');

  const handleSort = useCallback((key: string) => (e: CustomEvent) => {
    const { direction } = e.detail;
    setSortKey(key);
    setSortDir(direction);
    setRows(prev =>
      [...prev].sort((a, b) => {
        const av = String(a[key]), bv = String(b[key]);
        return direction === 'ascending' ? av.localeCompare(bv) : bv.localeCompare(av);
      }),
    );
  }, []);

  return (
    <io-table caption="Users">
      <io-table-head>
        <io-table-head-row>
          <io-table-head-cell sortable sort-key="name"
            sort-direction={sortKey === 'name' ? sortDir : 'none'}
            onSort={handleSort('name')}>Name</io-table-head-cell>
          <io-table-head-cell sortable sort-key="role"
            sort-direction={sortKey === 'role' ? sortDir : 'none'}
            onSort={handleSort('role')}>Role</io-table-head-cell>
        </io-table-head-row>
      </io-table-head>
      <io-table-body>
        {rows.map(row => (
          <io-table-body-row key={row.name}>
            <io-table-body-cell>{row.name}</io-table-body-cell>
            <io-table-body-cell>{row.role}</io-table-body-cell>
          </io-table-body-row>
        ))}
      </io-table-body>
    </io-table>
  );
}`,
            },
          ]}
        />
      </section>

      {/* ── Selection ────────────────────────────────────────── */}
      <section id="selection" className="space-y-6">
        <SectionHeader
          title="Row selection"
          description="Add selectable to io-table-head-row and each io-table-body-row to enable checkbox selection."
        />
        <RuleCard label="select and selectAll events">
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-table-body-row</code>{' '}
          emits <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>select</code>{' '}
          with <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'{ selected: boolean }'}</code>.{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-table-head-row</code>{' '}
          emits <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>selectAll</code>{' '}
          with <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'{ checked: boolean }'}</code>.
          Drive <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>selected</code>,{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>select-all-checked</code>, and{' '}
          <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>select-all-indeterminate</code>{' '}
          from your state.
        </RuleCard>
        <RuleCard label="Pair with a bulk-actions bar">
          Show a contextual action bar (delete, export) only when the selected row count is greater than zero.
          Announce the count to screen readers with an <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-live</code> region.
        </RuleCard>
      </section>

    </div>
  );
}
