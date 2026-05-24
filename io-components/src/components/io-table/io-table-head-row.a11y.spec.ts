/**
 * io-table-head-row — WCAG AA accessibility pattern tests
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-table-head-row — a11y (ARIA patterns)', () => {
  function buildTable(selectable: boolean, indeterminate = false): HTMLTableElement {
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Test table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    if (selectable) {
      const selectTh = document.createElement('th');
      selectTh.scope = 'col';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('aria-label', 'Select all rows');
      if (indeterminate) checkbox.indeterminate = true;
      selectTh.appendChild(checkbox);
      tr.appendChild(selectTh);
    }

    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = 'Name';
    tr.appendChild(th);

    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = 'Alice';
    dataRow.appendChild(td);
    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    return table;
  }

  it('non-selectable head row has no violations', async () => {
    await renderAndCheckA11y(buildTable(false));
  });

  it('selectable head row with select-all checkbox has no violations', async () => {
    await renderAndCheckA11y(buildTable(true));
  });

  it('selectable head row with indeterminate checkbox has no violations', async () => {
    await renderAndCheckA11y(buildTable(true, true));
  });
});
