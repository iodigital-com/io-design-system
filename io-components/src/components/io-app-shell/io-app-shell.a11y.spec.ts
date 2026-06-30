import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-app-shell — a11y', () => {
  it('has no violations with default props', async () => {
    const el = document.createElement('io-app-shell') as HTMLElement;
    const main = document.createElement('p');
    main.textContent = 'Main content';
    el.appendChild(main);
    await renderAndCheckA11y(el);
  });

  it('has no violations with sidebar-start open', async () => {
    const el = document.createElement('io-app-shell') as HTMLElement;
    (el as any).sidebarStartOpen = true;
    const nav = document.createElement('nav');
    nav.setAttribute('slot', 'sidebar-start');
    nav.setAttribute('aria-label', 'Main navigation');
    el.appendChild(nav);
    await renderAndCheckA11y(el);
  });
});
