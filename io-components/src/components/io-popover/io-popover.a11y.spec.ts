import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoPopover } from './io-popover';
import { getPanelFocusableElements } from './io-popover-utils';

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

  it('trigger has aria-controls linking to panel id', async () => {
    const wrapper = document.createElement('div');
    const triggerId = 'popover-trigger-ctrl';
    const panelId = 'popover-panel-ctrl';

    const trigger = document.createElement('button');
    trigger.id = triggerId;
    trigger.textContent = 'Open';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', panelId);

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Popover');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.display = 'none';
    panel.textContent = 'Popover content.';

    wrapper.appendChild(trigger);
    wrapper.appendChild(panel);

    expect(trigger.getAttribute('aria-controls')).toBe(panelId);
    await renderAndCheckA11y(wrapper);
  });
});

describe('io-popover — focus trap', () => {
  let component: IoPopover;
  let panelEl: HTMLElement;

  beforeEach(() => {
    component = new IoPopover();
    (component as any).el = document.createElement('io-popover');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    (component as any).panelEl = undefined;
  });

  it('componentWillLoad assigns labelId and panelId', () => {
    const labelId = (component as any).labelId as string;
    const panelId = (component as any).panelId as string;
    expect(labelId).toMatch(/^io-popover-label-/);
    expect(panelId).toMatch(/^io-popover-panel-/);
  });

  it('componentWillLoad logs error when label is absent', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    component.label = undefined;
    (component as any).componentWillLoad();
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('[io-popover]'));
    errorSpy.mockRestore();
  });

  it('componentWillLoad does not log error when label is present', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    component.label = 'Quick actions';
    (component as any).componentWillLoad();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('attachFocusTrap registers a keydown listener on the panel element', () => {
    panelEl = document.createElement('div');
    const addSpy = vi.spyOn(panelEl, 'addEventListener');
    (component as any).panelEl = panelEl;

    (component as any).attachFocusTrap();

    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('detachFocusTrap removes the keydown listener from the panel element', () => {
    panelEl = document.createElement('div');
    const removeSpy = vi.spyOn(panelEl, 'removeEventListener');
    (component as any).panelEl = panelEl;

    (component as any).attachFocusTrap();
    (component as any).detachFocusTrap();

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect((component as any).focusTrapHandler).toBeUndefined();
  });

  it('attachFocusTrap is a no-op when panelEl is absent', () => {
    (component as any).panelEl = undefined;
    expect(() => (component as any).attachFocusTrap()).not.toThrow();
  });

  it('detachFocusTrap is a no-op when panelEl is absent', () => {
    (component as any).panelEl = undefined;
    expect(() => (component as any).detachFocusTrap()).not.toThrow();
  });
});

describe('io-popover — getPanelFocusableElements utility', () => {
  it('returns focusable elements from the shadow panel', () => {
    const panel = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Close';
    panel.appendChild(btn);

    const focusable = getPanelFocusableElements(panel);
    expect(focusable).toContain(btn);
  });

  it('returns empty array when panel has no focusable children', () => {
    const panel = document.createElement('div');
    panel.textContent = 'Just text';
    expect(getPanelFocusableElements(panel)).toHaveLength(0);
  });
});
