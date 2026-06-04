import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-tabs
 *
 * Tests the native HTML patterns rendered inside io-tabs's Shadow DOM
 * (a div with role="tablist" and aria-orientation="horizontal"; slotted
 * <button> children receive aria-selected and tabindex via the component).
 * Full component-level auditing against the Shadow DOM requires the
 * Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tabs — a11y (ARIA patterns)', () => {
  it('tablist with labeled tab buttons has no axe violations', async () => {
    const tablist = document.createElement('div');
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-orientation', 'horizontal');

    const tab1 = document.createElement('button');
    tab1.setAttribute('type', 'button');
    tab1.setAttribute('role', 'tab');
    tab1.setAttribute('aria-selected', 'true');
    tab1.setAttribute('tabindex', '0');
    tab1.textContent = 'Overview';

    const tab2 = document.createElement('button');
    tab2.setAttribute('type', 'button');
    tab2.setAttribute('role', 'tab');
    tab2.setAttribute('aria-selected', 'false');
    tab2.setAttribute('tabindex', '-1');
    tab2.textContent = 'Details';

    const tab3 = document.createElement('button');
    tab3.setAttribute('type', 'button');
    tab3.setAttribute('role', 'tab');
    tab3.setAttribute('aria-selected', 'false');
    tab3.setAttribute('tabindex', '-1');
    tab3.disabled = true;
    tab3.textContent = 'Settings';

    tablist.appendChild(tab1);
    tablist.appendChild(tab2);
    tablist.appendChild(tab3);

    await renderAndCheckA11y(tablist);
  });

  it('tablist with aria-label has no axe violations', async () => {
    const tablist = document.createElement('div');
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-orientation', 'horizontal');
    tablist.setAttribute('aria-label', 'Product sections');

    const tab1 = document.createElement('button');
    tab1.setAttribute('type', 'button');
    tab1.setAttribute('role', 'tab');
    tab1.setAttribute('aria-selected', 'true');
    tab1.setAttribute('tabindex', '0');
    tab1.textContent = 'Usage';

    const tab2 = document.createElement('button');
    tab2.setAttribute('type', 'button');
    tab2.setAttribute('role', 'tab');
    tab2.setAttribute('aria-selected', 'false');
    tab2.setAttribute('tabindex', '-1');
    tab2.textContent = 'API';

    tablist.appendChild(tab1);
    tablist.appendChild(tab2);

    await renderAndCheckA11y(tablist);
  });

  it('tabpanel associated with active tab has no axe violations', async () => {
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
    panel.textContent = 'Overview content here.';

    container.appendChild(tablist);
    container.appendChild(panel);

    await renderAndCheckA11y(container);
  });
});
