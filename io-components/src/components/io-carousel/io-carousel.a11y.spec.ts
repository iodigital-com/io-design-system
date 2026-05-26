import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-carousel
 *
 * Tests the native HTML patterns rendered inside io-carousel's Shadow DOM
 * (region landmark, live region, prev/next navigation buttons).
 * Pattern established in io-accordion.a11y.spec.ts and io-button-group.a11y.spec.ts.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-carousel — a11y (ARIA patterns)', () => {
  it('carousel region with accessible label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <section role="region" aria-label="Featured products" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" class="sr-only"></span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          </div>
          <button type="button" aria-label="Previous">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" aria-label="Next">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel region with custom label prop has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <section role="region" aria-label="Latest news" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" class="sr-only"></span>
        <div>
          <div>
            <article>News item 1</article>
            <article>News item 2</article>
          </div>
          <button type="button" aria-label="Previous">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" aria-label="Next">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel with custom prev/next labels has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <section role="region" aria-label="Team members" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" class="sr-only"></span>
        <div>
          <div>
            <div>Alice</div>
            <div>Bob</div>
          </div>
          <button type="button" aria-label="Vorige">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" aria-label="Volgende">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel live region announcing slide change has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <section role="region" aria-label="Carousel" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" class="sr-only">Slide 2 of 4</span>
        <div>
          <div>
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
            <div>Slide 4</div>
          </div>
          <button type="button" aria-label="Previous">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" aria-label="Next">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>
    `;
    await renderAndCheckA11y(el);
  });

  it('carousel with single slide has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <section role="region" aria-label="Highlights" aria-roledescription="carousel">
        <span aria-live="polite" aria-atomic="true" class="sr-only"></span>
        <div>
          <div>
            <div>Only slide</div>
          </div>
          <button type="button" aria-label="Previous">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" aria-label="Next">
            <svg viewBox="0 0 26 16" width="20" height="13" fill="none" aria-hidden="true">
              <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </section>
    `;
    await renderAndCheckA11y(el);
  });
});
