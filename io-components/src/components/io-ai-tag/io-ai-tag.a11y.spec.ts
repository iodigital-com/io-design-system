import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-ai-tag — a11y (ARIA patterns)', () => {
  it('default ai-tag (generated) has no axe violations', async () => {
    const el = document.createElement('span');
    el.setAttribute('role', 'status');
    el.textContent = 'AI-generated';
    await renderAndCheckA11y(el);
  });

  it('abbreviation variant uses abbr element semantics', async () => {
    const el = document.createElement('span');
    el.innerHTML = '<abbr title="artificial intelligence">AI</abbr>';
    await renderAndCheckA11y(el);
  });

  it('modified variant has no axe violations', async () => {
    const el = document.createElement('span');
    el.textContent = 'AI-modified';
    await renderAndCheckA11y(el);
  });

  it('Dutch locale generated variant has no axe violations', async () => {
    const el = document.createElement('span');
    el.textContent = 'AI-gegenereerd';
    await renderAndCheckA11y(el);
  });

  it('inline usage in paragraph context has no axe violations', async () => {
    const el = document.createElement('p');
    el.innerHTML = 'This article was <span>AI-generated</span>.';
    await renderAndCheckA11y(el);
  });
});
