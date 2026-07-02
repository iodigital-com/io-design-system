import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-text-list-item — a11y (ARIA patterns)', () => {
  it('list item inside a ul has no violations', async () => {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');
    li.textContent = 'Item content';
    ul.appendChild(li);
    await renderAndCheckA11y(ul);
  });

  it('list item with text content has no violations', async () => {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = 'A list item';
    ul.appendChild(li);
    await renderAndCheckA11y(ul);
  });
});
