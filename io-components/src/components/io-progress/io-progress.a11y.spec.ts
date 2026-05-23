import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-progress — a11y', () => {
  it('progressbar with label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<div role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress"></div>`;
    await renderAndCheckA11y(el);
  });

  it('progressbar at 0% has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Loading"></div>`;
    await renderAndCheckA11y(el);
  });

  it('progressbar at 100% has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<div role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" aria-label="Complete"></div>`;
    await renderAndCheckA11y(el);
  });

  it('progressbar mid-progress has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-label="Half way"></div>`;
    await renderAndCheckA11y(el);
  });

  it('progressbar with file upload label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<div role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" aria-label="File upload progress"></div>`;
    await renderAndCheckA11y(el);
  });
});
