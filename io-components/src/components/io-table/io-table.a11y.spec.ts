/**
 * io-table — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-table renders internally.
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-table — a11y (ARIA patterns)', () => {
  it('basic table with caption and scoped column headers has no violations', async () => {
    const table = document.createElement('table');

    const caption = document.createElement('caption');
    caption.textContent = 'User list';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    ['Name', 'Role', 'Status'].forEach((label) => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = label;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');

    ['Alice', 'Admin', 'Active'].forEach((val) => {
      const td = document.createElement('td');
      td.textContent = val;
      dataRow.appendChild(td);
    });

    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    await renderAndCheckA11y(table);
  });

  it('sortable column header with aria-sort has no violations', async () => {
    const table = document.createElement('table');

    const caption = document.createElement('caption');
    caption.textContent = 'Sorted table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'col';
    th.setAttribute('aria-sort', 'ascending');
    th.setAttribute('tabindex', '0');
    th.textContent = 'Name';
    headerRow.appendChild(th);

    const th2 = document.createElement('th');
    th2.scope = 'col';
    th2.textContent = 'Role';
    headerRow.appendChild(th2);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');

    ['Alice', 'Admin'].forEach((val) => {
      const td = document.createElement('td');
      td.textContent = val;
      dataRow.appendChild(td);
    });

    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    await renderAndCheckA11y(table);
  });

  it('selectable table row with aria-selected has no violations', async () => {
    const table = document.createElement('table');

    const caption = document.createElement('caption');
    caption.textContent = 'Selectable table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const selectTh = document.createElement('th');
    selectTh.scope = 'col';
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.setAttribute('aria-label', 'Select all rows');
    selectTh.appendChild(selectAllCheckbox);
    headerRow.appendChild(selectTh);

    const nameTh = document.createElement('th');
    nameTh.scope = 'col';
    nameTh.textContent = 'Name';
    headerRow.appendChild(nameTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    dataRow.setAttribute('aria-selected', 'false');

    const selectTd = document.createElement('td');
    const rowCheckbox = document.createElement('input');
    rowCheckbox.type = 'checkbox';
    rowCheckbox.setAttribute('aria-label', 'Select row 1');
    selectTd.appendChild(rowCheckbox);
    dataRow.appendChild(selectTd);

    const nameTd = document.createElement('td');
    nameTd.textContent = 'Alice';
    dataRow.appendChild(nameTd);

    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    await renderAndCheckA11y(table);
  });

  it('sortable-but-unsorted column header with aria-sort="none" has no violations', async () => {
    const table = document.createElement('table');

    const caption = document.createElement('caption');
    caption.textContent = 'Unsorted table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'col';
    th.setAttribute('aria-sort', 'none');
    th.setAttribute('tabindex', '0');
    th.textContent = 'Name';
    headerRow.appendChild(th);

    const th2 = document.createElement('th');
    th2.scope = 'col';
    th2.textContent = 'Role';
    headerRow.appendChild(th2);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');

    ['Alice', 'Admin'].forEach((val) => {
      const td = document.createElement('td');
      td.textContent = val;
      dataRow.appendChild(td);
    });

    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    await renderAndCheckA11y(table);
  });

  it('select-all checkbox in indeterminate state has no violations', async () => {
    const table = document.createElement('table');

    const caption = document.createElement('caption');
    caption.textContent = 'Partially selected table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const selectTh = document.createElement('th');
    selectTh.scope = 'col';
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.setAttribute('aria-label', 'Select all rows');
    // indeterminate is set via DOM property (not attr) — axe sees the native state
    selectAllCheckbox.indeterminate = true;
    selectTh.appendChild(selectAllCheckbox);
    headerRow.appendChild(selectTh);

    const nameTh = document.createElement('th');
    nameTh.scope = 'col';
    nameTh.textContent = 'Name';
    headerRow.appendChild(nameTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    [['Alice', true], ['Bob', false]].forEach(([name, selected]) => {
      const row = document.createElement('tr');
      const selectTd = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('aria-label', 'Select row');
      checkbox.checked = selected as boolean;
      selectTd.appendChild(checkbox);
      row.appendChild(selectTd);

      const nameTd = document.createElement('td');
      nameTd.textContent = name as string;
      row.appendChild(nameTd);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    await renderAndCheckA11y(table);
  });

  it('table with visually hidden caption (sr-only) has no violations', async () => {
    const wrapper = document.createElement('div');

    const table = document.createElement('table');
    table.setAttribute('aria-label', 'Users');

    const caption = document.createElement('caption');
    caption.textContent = 'Users';
    caption.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = 'Name';
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = 'Alice';
    dataRow.appendChild(td);
    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    wrapper.appendChild(table);

    await renderAndCheckA11y(wrapper);
  });
});
