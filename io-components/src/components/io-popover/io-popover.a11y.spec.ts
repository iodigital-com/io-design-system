import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-popover — a11y', () => {
  it('open dialog with label has no axe violations', async () => {
    const wrapper = document.createElement('div');

    const trigger = document.createElement('button');
    trigger.textContent = 'Open popover';
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-controls', 'popover-panel');

    const panel = document.createElement('div');
    panel.id = 'popover-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'popover-label');

    const labelEl = document.createElement('span');
    labelEl.id = 'popover-label';
    labelEl.textContent = 'Quick actions';

    const content = document.createElement('p');
    content.textContent = 'Popover body content.';

    panel.appendChild(labelEl);
    panel.appendChild(content);

    wrapper.appendChild(trigger);
    wrapper.appendChild(panel);

    await renderAndCheckA11y(wrapper);
  });

  it('open dialog without label (aria-label fallback) has no axe violations', async () => {
    const wrapper = document.createElement('div');

    const trigger = document.createElement('button');
    trigger.textContent = 'More options';
    trigger.setAttribute('aria-expanded', 'true');

    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'More options');

    const content = document.createElement('p');
    content.textContent = 'Options content here.';
    panel.appendChild(content);

    wrapper.appendChild(trigger);
    wrapper.appendChild(panel);

    await renderAndCheckA11y(wrapper);
  });

  it('closed panel with aria-hidden has no axe violations', async () => {
    const wrapper = document.createElement('div');

    const trigger = document.createElement('button');
    trigger.textContent = 'Open popover';
    trigger.setAttribute('aria-expanded', 'false');

    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Popover');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.display = 'none';

    const content = document.createElement('p');
    content.textContent = 'Hidden content.';
    panel.appendChild(content);

    wrapper.appendChild(trigger);
    wrapper.appendChild(panel);

    await renderAndCheckA11y(wrapper);
  });
});
