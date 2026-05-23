import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function makeSkeleton(attrs: Record<string, string> = {}): HTMLElement {
  const el = document.createElement('div');
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', attrs['aria-label'] ?? 'Loading');
  return el;
}

describe('io-skeleton — a11y', () => {
  it('text skeleton has no violations', async () => {
    await renderAndCheckA11y(makeSkeleton());
  });

  it('circular skeleton has no violations', async () => {
    const el = makeSkeleton({ 'aria-label': 'Loading avatar' });
    el.style.width = '40px';
    el.style.height = '40px';
    await renderAndCheckA11y(el);
  });

  it('rectangular skeleton has no violations', async () => {
    const el = makeSkeleton({ 'aria-label': 'Loading image' });
    el.style.width = '100%';
    el.style.height = '120px';
    await renderAndCheckA11y(el);
  });

  it('rounded skeleton has no violations', async () => {
    const el = makeSkeleton({ 'aria-label': 'Loading card' });
    el.style.borderRadius = '12px';
    await renderAndCheckA11y(el);
  });

  it('static (animated=false) skeleton has no violations', async () => {
    await renderAndCheckA11y(makeSkeleton({ 'aria-label': 'Loading content' }));
  });

  it('skeleton with explicit width and height has no violations', async () => {
    const el = makeSkeleton({ 'aria-label': 'Loading item' });
    el.style.width = '200px';
    el.style.height = '24px';
    await renderAndCheckA11y(el);
  });

  it('skeleton with custom label has no violations', async () => {
    await renderAndCheckA11y(makeSkeleton({ 'aria-label': 'Loading article' }));
  });
});
