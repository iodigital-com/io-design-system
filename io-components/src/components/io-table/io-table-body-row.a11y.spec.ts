/**
 * io-table-body-row — WCAG AA accessibility pattern tests
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-table-body-row — a11y (ARIA patterns)', () => {
  function buildTable(selectable: boolean, selected = false, rowLabel = 'Alice'): HTMLTableElement {
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Test table';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    if (selectable) {
      const selectTh = document.createElement('th');
      selectTh.scope = 'col';
      // sr-only text satisfies empty-table-header rule
      const srOnly = document.createElement('span');
      srOnly.className = 'sr-only';
      srOnly.textContent = 'Selection';
      selectTh.appendChild(srOnly);
      headerRow.appendChild(selectTh);
    }
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = 'Name';
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');

    if (selectable) {
      const selectTd = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('aria-label', `Select ${rowLabel}`);
      checkbox.checked = selected;
      selectTd.appendChild(checkbox);
      dataRow.appendChild(selectTd);
    }

    const td = document.createElement('td');
    td.textContent = rowLabel;
    dataRow.appendChild(td);

    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    return table;
  }

  it('non-selectable body row has no violations', async () => {
    await renderAndCheckA11y(buildTable(false));
  });

  it('selectable body row with unique aria-label has no violations', async () => {
    await renderAndCheckA11y(buildTable(true, false, 'Alice'));
  });

  it('selected body row has no violations', async () => {
    await renderAndCheckA11y(buildTable(true, true, 'Alice'));
  });
});
