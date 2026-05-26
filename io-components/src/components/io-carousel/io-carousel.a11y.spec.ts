import { describe, it } from 'vitest';

/**
 * io-carousel — WCAG 2.1 AA — accessibility pattern tests
 *
 * Tests the native HTML ARIA patterns rendered inside io-carousel's Shadow DOM
 * (role="region" with aria-label / aria-labelledby, live region for slide
 * announcements, and navigation button labels).
 *
 * Full component-level auditing against the Shadow DOM requires the Stencil
 * render environment (vitest.render.config.ts) and is out of scope here.
 * These tests verify the ARIA scaffold that the component constructs.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-carousel — a11y (ARIA region pattern)', () => {
  it('carousel region with aria-label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="region" aria-label="Featured articles" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"></span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
          </div>
          <button aria-label="Previous" type="button">Prev</button>
          <button aria-label="Next" type="button">Next</button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel region with aria-labelledby pointing to heading has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="region" aria-labelledby="carousel-heading-1" aria-roledescription="carousel">
        <div id="carousel-heading-1">
          <h2>Featured Articles</h2>
        </div>
        <span aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"></span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
          </div>
          <button aria-label="Previous" type="button">Prev</button>
          <button aria-label="Next" type="button">Next</button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel with heading and description slots has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="region" aria-labelledby="carousel-heading-2" aria-roledescription="carousel">
        <div id="carousel-heading-2">
          <h2>Our Products</h2>
        </div>
        <div>
          <p>Browse our latest catalogue.</p>
        </div>
        <span aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"></span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
          </div>
          <button aria-label="Previous" type="button">Prev</button>
          <button aria-label="Next" type="button">Next</button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel with controls slot has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="region" aria-label="Testimonials" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"></span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
          </div>
          <button aria-label="Previous" type="button">Prev</button>
          <button aria-label="Next" type="button">Next</button>
          <div aria-label="Slide indicators" role="group">
            <button aria-label="Go to slide 1" aria-current="true" type="button"></button>
            <button aria-label="Go to slide 2" type="button"></button>
          </div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('live region announcement has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="region" aria-label="Image carousel" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Slide 2 of 4</span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
          </div>
          <button aria-label="Previous" type="button">Prev</button>
          <button aria-label="Next" type="button">Next</button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
