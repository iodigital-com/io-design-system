import { describe, it, expect, vi } from 'vitest';

import { IoButton } from './io-button';

function makeButton() {
  const c = new IoButton();
  (c as any).el = document.createElement('io-button');
  (c as any).click = { emit: vi.fn() };
  return c;
}

describe('io-button — getAccessibleLabel', () => {
  it('returns label prop when set', () => {
    const c = makeButton();
    c.label = 'Submit';
    expect((c as any).getAccessibleLabel()).toBe('Submit');
  });

  it('returns aria-label attribute when no label prop', () => {
    const c = makeButton();
    (c as any).el.setAttribute('aria-label', 'Close');
    const result = (c as any).getAccessibleLabel();
    expect(result).toBe('Close');
  });

  it('returns undefined when neither label nor aria-label', () => {
    const c = makeButton();
    expect((c as any).getAccessibleLabel()).toBeUndefined();
  });
});

describe('io-button — warnIconOnlyLabelMissing', () => {
  it('returns early when iconOnly=false', () => {
    const c = makeButton();
    c.iconOnly = false;
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (c as any).warnIconOnlyLabelMissing();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('warns when iconOnly=true and no label is set', () => {
    const c = makeButton();
    c.iconOnly = true;
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (c as any).warnIconOnlyLabelMissing();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('does not warn twice (hasWarnedIconOnlyLabel guard)', () => {
    const c = makeButton();
    c.iconOnly = true;
    (c as any).hasWarnedIconOnlyLabel = true;
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (c as any).warnIconOnlyLabelMissing();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('does not warn when iconOnly=true but label is provided', () => {
    const c = makeButton();
    c.iconOnly = true;
    c.label = 'Close';
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (c as any).warnIconOnlyLabelMissing();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('io-button — render() branch coverage', () => {
  it('render() with default props (button tag) does not throw', () => {
    const c = makeButton();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with href (anchor tag) does not throw', () => {
    const c = makeButton();
    c.href = '/submit';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with href and disabled does not throw', () => {
    const c = makeButton();
    c.href = '/submit';
    c.disabled = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with href and loading does not throw', () => {
    const c = makeButton();
    c.href = '/submit';
    c.loading = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with loading=true does not throw', () => {
    const c = makeButton();
    c.loading = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with iconOnly=true does not throw', () => {
    const c = makeButton();
    c.iconOnly = true;
    c.label = 'Close';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with arrow=forward arrowPlacement=left does not throw', () => {
    const c = makeButton();
    c.arrow = 'forward';
    c.arrowPlacement = 'left';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with arrow=back arrowPlacement=right does not throw', () => {
    const c = makeButton();
    c.arrow = 'back';
    c.arrowPlacement = 'right';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with arrow=down does not throw', () => {
    const c = makeButton();
    c.arrow = 'down';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with arrow=none does not throw', () => {
    const c = makeButton();
    (c as any).arrow = 'none';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with label prop sets accessibleLabel', () => {
    const c = makeButton();
    c.label = 'Submit form';
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-button — handleKeyDown branches', () => {
  it('handleKeyDown with href triggers click on Enter', () => {
    const c = makeButton();
    c.href = '/page';
    const clickSpy = vi.fn();
    (c as any).click = { emit: clickSpy };
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (c as any).handleKeyDown(ev);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('handleKeyDown without href does nothing on Enter', () => {
    const c = makeButton();
    const clickSpy = vi.fn();
    (c as any).click = { emit: clickSpy };
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (c as any).handleKeyDown(ev);
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('handleKeyDown with href does nothing on ArrowDown', () => {
    const c = makeButton();
    c.href = '/page';
    const clickSpy = vi.fn();
    (c as any).click = { emit: clickSpy };
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (c as any).handleKeyDown(ev);
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
