/**
 * io-table-head-cell — WCAG AA accessibility pattern tests
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-table-head-cell — a11y (ARIA patterns)', () => {
  function buildTable(thContent: (th: HTMLTableCellElement) => void): HTMLTableElement {
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Test table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'col';
    thContent(th);
    tr.appendChild(th);

    const th2 = document.createElement('th');
    th2.scope = 'col';
    th2.textContent = 'Role';
    tr.appendChild(th2);

    thead.appendChild(tr);
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

    return table;
  }

  it('non-sortable column header has no violations', async () => {
    const table = buildTable((th) => {
      th.textContent = 'Name';
    });
    await renderAndCheckA11y(table);
  });

  it('sortable column header with button inside th (APG pattern) and aria-sort="none" has no violations', async () => {
    const table = buildTable((th) => {
      th.setAttribute('aria-sort', 'none');
      // ARIA APG sort-button pattern: focusable <button> inside th, not tabindex on th
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Name';
      th.appendChild(btn);
    });
    await renderAndCheckA11y(table);
  });

  it('sortable column header with button inside th and aria-sort="ascending" has no violations', async () => {
    const table = buildTable((th) => {
      th.setAttribute('aria-sort', 'ascending');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Name';
      th.appendChild(btn);
    });
    await renderAndCheckA11y(table);
  });

  it('sortable column header with button inside th and aria-sort="descending" has no violations', async () => {
    const table = buildTable((th) => {
      th.setAttribute('aria-sort', 'descending');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Name';
      th.appendChild(btn);
    });
    await renderAndCheckA11y(table);
  });
});
