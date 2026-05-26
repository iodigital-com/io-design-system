import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function makeRadioGroup(label: string, items: Array<{ label: string; checked: boolean }>): HTMLElement {
  const group = document.createElement('div');
  group.setAttribute('role', 'radiogroup');
  group.setAttribute('aria-label', label);

  for (const item of items) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', item.checked ? 'true' : 'false');
    btn.setAttribute('tabindex', item.checked ? '0' : '-1');
    btn.textContent = item.label;
    group.appendChild(btn);
  }
  return group;
}

function makeCheckboxGroup(label: string, items: Array<{ label: string; checked: boolean }>): HTMLElement {
  const group = document.createElement('div');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', label);

  for (const item of items) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('role', 'checkbox');
    btn.setAttribute('aria-checked', item.checked ? 'true' : 'false');
    btn.setAttribute('tabindex', item.checked ? '0' : '-1');
    btn.textContent = item.label;
    group.appendChild(btn);
  }
  return group;
}

describe('io-button-group — a11y', () => {
  it('exclusive (radiogroup) with label and one selected item has no violations', async () => {
    const el = makeRadioGroup('View period', [
      { label: 'Day', checked: false },
      { label: 'Week', checked: true },
      { label: 'Month', checked: false },
    ]);
    await renderAndCheckA11y(el);
  });

  it('multi-select (group) with label and mixed selection has no violations', async () => {
    const el = makeCheckboxGroup('Filter tags', [
      { label: 'React', checked: true },
      { label: 'Vue', checked: false },
      { label: 'Angular', checked: true },
    ]);
    await renderAndCheckA11y(el);
  });

  it('fully disabled group has no violations', async () => {
    const group = document.createElement('div');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', 'View period');
    group.setAttribute('aria-disabled', 'true');

    ['Day', 'Week', 'Month'].forEach((label) => {
      const btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('tabindex', '-1');
      btn.setAttribute('disabled', '');
      btn.textContent = label;
      group.appendChild(btn);
    });

    await renderAndCheckA11y(group);
  });

  it('column direction exclusive (radiogroup) has no violations', async () => {
    const el = makeRadioGroup('Actions', [
      { label: 'Edit', checked: true },
      { label: 'Delete', checked: false },
      { label: 'Archive', checked: false },
    ]);
    await renderAndCheckA11y(el);
  });

  it('column direction multi-select (group) has no violations', async () => {
    const el = makeCheckboxGroup('Permissions', [
      { label: 'Read', checked: true },
      { label: 'Write', checked: true },
      { label: 'Admin', checked: false },
    ]);
    await renderAndCheckA11y(el);
  });
});
