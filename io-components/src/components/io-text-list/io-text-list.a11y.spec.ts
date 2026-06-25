import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-text-list — a11y (ARIA patterns)', () => {
  it('unordered list with list items has no violations', async () => {
    const el = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = 'First item';
    el.appendChild(li);
    await renderAndCheckA11y(el);
  });

  it('ordered list with list items has no violations', async () => {
    const el = document.createElement('ol');
    const li = document.createElement('li');
    li.textContent = 'First step';
    el.appendChild(li);
    await renderAndCheckA11y(el);
  });

  it('list nested inside a main landmark has no violations', async () => {
    const main = document.createElement('main');
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    li1.textContent = 'Item one';
    const li2 = document.createElement('li');
    li2.textContent = 'Item two';
    ul.appendChild(li1);
    ul.appendChild(li2);
    main.appendChild(ul);
    await renderAndCheckA11y(main);
  });

  it('list with multiple items has no violations', async () => {
    const el = document.createElement('ul');
    ['Alpha', 'Beta', 'Gamma'].forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      el.appendChild(li);
    });
    await renderAndCheckA11y(el);
  });
});
