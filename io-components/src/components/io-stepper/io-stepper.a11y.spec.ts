/**
 * io-stepper — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-stepper and io-step
 * render internally (a <nav>, <ol>, <li> with aria-current and screen-reader text).
 * Full component-level axe auditing against the Shadow DOM requires the Stencil
 * render environment (vitest.render.config.ts) and is out of scope for unit tests.
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-stepper — a11y (ARIA patterns)', () => {
  it('nav with ol list of steps has no violations', async () => {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Progress');

    const ol = document.createElement('ol');

    const li1 = document.createElement('li');
    li1.setAttribute('aria-current', 'step');
    const sr1 = document.createElement('span');
    sr1.textContent = 'Step 1: Account, current';
    li1.appendChild(sr1);
    ol.appendChild(li1);

    const li2 = document.createElement('li');
    const sr2 = document.createElement('span');
    sr2.textContent = 'Step 2: Details, upcoming';
    li2.appendChild(sr2);
    ol.appendChild(li2);

    nav.appendChild(ol);

    await renderAndCheckA11y(nav);
  });

  it('stepper with complete, current, and upcoming steps has no violations', async () => {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Progress');

    const ol = document.createElement('ol');

    // Complete step
    const liComplete = document.createElement('li');
    const srComplete = document.createElement('span');
    srComplete.textContent = 'Step 1: Account, complete';
    liComplete.appendChild(srComplete);
    ol.appendChild(liComplete);

    // Current step
    const liCurrent = document.createElement('li');
    liCurrent.setAttribute('aria-current', 'step');
    const srCurrent = document.createElement('span');
    srCurrent.textContent = 'Step 2: Details, current';
    liCurrent.appendChild(srCurrent);
    ol.appendChild(liCurrent);

    // Upcoming step
    const liUpcoming = document.createElement('li');
    const srUpcoming = document.createElement('span');
    srUpcoming.textContent = 'Step 3: Review, upcoming';
    liUpcoming.appendChild(srUpcoming);
    ol.appendChild(liUpcoming);

    nav.appendChild(ol);

    await renderAndCheckA11y(nav);
  });

  it('single-step stepper has no violations', async () => {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Progress');

    const ol = document.createElement('ol');
    const li = document.createElement('li');
    li.setAttribute('aria-current', 'step');
    const sr = document.createElement('span');
    sr.textContent = 'Step 1: Confirm, current';
    li.appendChild(sr);
    ol.appendChild(li);
    nav.appendChild(ol);

    await renderAndCheckA11y(nav);
  });
});
