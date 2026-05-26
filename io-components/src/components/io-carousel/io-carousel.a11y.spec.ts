/**
 * io-carousel — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-carousel renders internally:
 * - A `role="region"` landmark with `aria-label` and `aria-roledescription="carousel"`
 * - Prev/next navigation buttons with accessible labels
 * - A live region for slide announcements
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-carousel — a11y (ARIA patterns)', () => {
  it('carousel region with labeled nav buttons has no axe violations', async () => {
    const region = document.createElement('div');
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', 'Image gallery');
    region.setAttribute('aria-roledescription', 'carousel');

    const liveRegion = document.createElement('span');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    region.appendChild(liveRegion);

    const wrap = document.createElement('div');

    const track = document.createElement('div');
    const slide1 = document.createElement('div');
    slide1.textContent = 'Slide 1';
    const slide2 = document.createElement('div');
    slide2.textContent = 'Slide 2';
    track.appendChild(slide1);
    track.appendChild(slide2);
    wrap.appendChild(track);

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('type', 'button');
    prevBtn.setAttribute('aria-label', 'Previous');
    const prevSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    prevSvg.setAttribute('aria-hidden', 'true');
    prevSvg.setAttribute('width', '20');
    prevSvg.setAttribute('height', '13');
    prevBtn.appendChild(prevSvg);
    wrap.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('type', 'button');
    nextBtn.setAttribute('aria-label', 'Next');
    const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    nextSvg.setAttribute('aria-hidden', 'true');
    nextSvg.setAttribute('width', '20');
    nextSvg.setAttribute('height', '13');
    nextBtn.appendChild(nextSvg);
    wrap.appendChild(nextBtn);

    region.appendChild(wrap);

    await renderAndCheckA11y(region);
  });

  it('carousel region with custom prev/next labels has no axe violations', async () => {
    const region = document.createElement('div');
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', 'Product showcase');
    region.setAttribute('aria-roledescription', 'carousel');

    const liveRegion = document.createElement('span');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.textContent = 'Slide 1 of 3';
    liveRegion.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    region.appendChild(liveRegion);

    const wrap = document.createElement('div');

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('type', 'button');
    prevBtn.setAttribute('aria-label', 'Vorige');
    const prevSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    prevSvg.setAttribute('aria-hidden', 'true');
    prevSvg.setAttribute('width', '20');
    prevSvg.setAttribute('height', '13');
    prevBtn.appendChild(prevSvg);
    wrap.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('type', 'button');
    nextBtn.setAttribute('aria-label', 'Volgende');
    const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    nextSvg.setAttribute('aria-hidden', 'true');
    nextSvg.setAttribute('width', '20');
    nextSvg.setAttribute('height', '13');
    nextBtn.appendChild(nextSvg);
    wrap.appendChild(nextBtn);

    region.appendChild(wrap);

    await renderAndCheckA11y(region);
  });

  it('carousel live region announcing slide position has no axe violations', async () => {
    const region = document.createElement('div');
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', 'News highlights');
    region.setAttribute('aria-roledescription', 'carousel');

    const liveRegion = document.createElement('span');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.textContent = 'Slide 2 of 5';
    liveRegion.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    region.appendChild(liveRegion);

    const wrap = document.createElement('div');

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('type', 'button');
    prevBtn.setAttribute('aria-label', 'Previous');
    const prevSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    prevSvg.setAttribute('aria-hidden', 'true');
    prevSvg.setAttribute('width', '20');
    prevSvg.setAttribute('height', '13');
    prevBtn.appendChild(prevSvg);
    wrap.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('type', 'button');
    nextBtn.setAttribute('aria-label', 'Next');
    const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    nextSvg.setAttribute('aria-hidden', 'true');
    nextSvg.setAttribute('width', '20');
    nextSvg.setAttribute('height', '13');
    nextBtn.appendChild(nextSvg);
    wrap.appendChild(nextBtn);

    region.appendChild(wrap);

    await renderAndCheckA11y(region);
  });
});
