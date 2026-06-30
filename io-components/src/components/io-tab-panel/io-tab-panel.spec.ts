import { describe, it, expect, vi } from 'vitest';

import { IoTabPanel } from './io-tab-panel';

function makeComponent() {
  const component = new IoTabPanel();
  const el = document.createElement('io-tab-panel');
  (component as any).el = el;
  (component as any).label = 'Overview';
  return component;
}

describe('io-tab-panel — default props', () => {
  it('has hidden=false by default', () => {
    const c = makeComponent();
    expect(c.hidden).toBe(false);
  });

  it('has no labelledBy by default', () => {
    const c = makeComponent();
    expect(c.labelledBy).toBeUndefined();
  });

  it('has no panelId by default', () => {
    const c = makeComponent();
    expect(c.panelId).toBeUndefined();
  });
});

describe('io-tab-panel — componentWillLoad', () => {
  it('generates a resolvedId when el has no id', () => {
    const c = makeComponent();
    (c as any).el.id = '';
    c.componentWillLoad();
    expect((c as any).resolvedId).toBeTruthy();
    expect((c as any).resolvedId).toMatch(/^io-tab-panel-/);
  });

  it('uses panelId prop when set', () => {
    const c = makeComponent();
    c.panelId = 'custom-panel';
    c.componentWillLoad();
    expect((c as any).resolvedId).toBe('custom-panel');
  });

  it('uses el.id when already set', () => {
    const c = makeComponent();
    (c as any).el.id = 'existing-id';
    c.componentWillLoad();
    expect((c as any).resolvedId).toBe('existing-id');
  });

  it('logs error when label is missing', () => {
    const c = makeComponent();
    (c as any).label = '';
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    c.componentWillLoad();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('label'));
    consoleSpy.mockRestore();
  });

  it('does not log error when label is provided', () => {
    const c = makeComponent();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    c.componentWillLoad();
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('io-tab-panel — hidden prop', () => {
  it('hidden can be set to true', () => {
    const c = makeComponent();
    c.hidden = true;
    expect(c.hidden).toBe(true);
  });

  it('hidden can be toggled', () => {
    const c = makeComponent();
    c.hidden = true;
    c.hidden = false;
    expect(c.hidden).toBe(false);
  });
});
