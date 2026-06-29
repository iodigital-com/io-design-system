import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tab-panel — a11y (tabpanel pattern)', () => {
  it('tabpanel with aria-label has no axe violations', async () => {
    const container = document.createElement('div');

    const tablist = document.createElement('div');
    tablist.setAttribute('role', 'tablist');

    const tab = document.createElement('button');
    tab.setAttribute('type', 'button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab-overview');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('aria-controls', 'panel-overview');
    tab.setAttribute('tabindex', '0');
    tab.textContent = 'Overview';

    tablist.appendChild(tab);

    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', 'panel-overview');
    panel.setAttribute('aria-labelledby', 'tab-overview');
    panel.setAttribute('tabindex', '0');
    panel.textContent = 'Overview content here.';

    container.appendChild(tablist);
    container.appendChild(panel);

    await renderAndCheckA11y(container);
  });

  it('hidden tabpanel has no axe violations', async () => {
    const container = document.createElement('div');

    const tablist = document.createElement('div');
    tablist.setAttribute('role', 'tablist');

    const tab1 = document.createElement('button');
    tab1.setAttribute('type', 'button');
    tab1.setAttribute('role', 'tab');
    tab1.setAttribute('id', 'tab-1');
    tab1.setAttribute('aria-selected', 'true');
    tab1.setAttribute('aria-controls', 'panel-1');
    tab1.setAttribute('tabindex', '0');
    tab1.textContent = 'Overview';

    const tab2 = document.createElement('button');
    tab2.setAttribute('type', 'button');
    tab2.setAttribute('role', 'tab');
    tab2.setAttribute('id', 'tab-2');
    tab2.setAttribute('aria-selected', 'false');
    tab2.setAttribute('aria-controls', 'panel-2');
    tab2.setAttribute('tabindex', '-1');
    tab2.textContent = 'Details';

    tablist.appendChild(tab1);
    tablist.appendChild(tab2);

    const panel1 = document.createElement('div');
    panel1.setAttribute('role', 'tabpanel');
    panel1.setAttribute('id', 'panel-1');
    panel1.setAttribute('aria-labelledby', 'tab-1');
    panel1.setAttribute('tabindex', '0');
    panel1.textContent = 'Overview content';

    const panel2 = document.createElement('div');
    panel2.setAttribute('role', 'tabpanel');
    panel2.setAttribute('id', 'panel-2');
    panel2.setAttribute('aria-labelledby', 'tab-2');
    panel2.setAttribute('tabindex', '0');
    panel2.hidden = true;
    panel2.textContent = 'Details content';

    container.appendChild(tablist);
    container.appendChild(panel1);
    container.appendChild(panel2);

    await renderAndCheckA11y(container);
  });
});
