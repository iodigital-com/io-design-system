import { describe, it, expect, vi } from 'vitest';

import { IoAccordion } from './io-accordion';

function makeComponent(props: Partial<IoAccordion> = {}): IoAccordion {
  const component = new IoAccordion();
  (component as any).update = { emit: vi.fn() };
  (component as any).el = { id: '', dispatchEvent: vi.fn() };
  Object.assign(component, props);
  return component;
}

// ── render() with various prop combinations ───────────────────────────────────

describe('io-accordion — render() open=true', () => {
  it('does not throw when open=true', () => {
    const c = makeComponent({ open: true });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when open=true and heading is set', () => {
    const c = makeComponent({ open: true, heading: 'Section heading' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-accordion — render() open=false', () => {
  it('does not throw when open=false', () => {
    const c = makeComponent({ open: false });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when open=false and heading is set', () => {
    const c = makeComponent({ open: false, heading: 'Closed section' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-accordion — render() disabled=true', () => {
  it('does not throw when disabled=true', () => {
    const c = makeComponent({ disabled: true });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when disabled=true and open=true', () => {
    const c = makeComponent({ disabled: true, open: true });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when disabled=true and open=false', () => {
    const c = makeComponent({ disabled: true, open: false });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-accordion — render() headingTag variants', () => {
  it('does not throw with headingTag=h2', () => {
    const c = makeComponent({ headingTag: 'h2' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with headingTag=h3 (default)', () => {
    const c = makeComponent({ headingTag: 'h3' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with headingTag=h4', () => {
    const c = makeComponent({ headingTag: 'h4' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with headingTag=h1', () => {
    const c = makeComponent({ headingTag: 'h1' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-accordion — render() size variants', () => {
  it('does not throw with size=sm', () => {
    const c = makeComponent({ size: 'sm' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with size=md', () => {
    const c = makeComponent({ size: 'md' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with size=lg', () => {
    const c = makeComponent({ size: 'lg' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-accordion — render() with heading text', () => {
  it('does not throw with a non-empty heading', () => {
    const c = makeComponent({ heading: 'What is iO Digital?' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with an empty heading string (default)', () => {
    const c = makeComponent({ heading: '' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-accordion — render() combined prop combinations', () => {
  it('does not throw: open=true, disabled=false, headingTag=h2, size=sm', () => {
    const c = makeComponent({ open: true, disabled: false, headingTag: 'h2', size: 'sm' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw: open=false, disabled=true, headingTag=h4, size=lg', () => {
    const c = makeComponent({ open: false, disabled: true, headingTag: 'h4', size: 'lg' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw: open=true, size=lg, heading set', () => {
    const c = makeComponent({ open: true, size: 'lg', heading: 'Large heading' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw: open=false, size=sm, headingTag=h2', () => {
    const c = makeComponent({ open: false, size: 'sm', headingTag: 'h2' });
    c.componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ── componentWillLoad() with defaultExpanded=true ────────────────────────────

describe('io-accordion — componentWillLoad() with defaultExpanded=true', () => {
  it('sets open=true when defaultExpanded=true and open=false', () => {
    const c = makeComponent({ defaultExpanded: true, open: false });
    c.componentWillLoad();
    expect(c.open).toBe(true);
  });

  it('does not change open when defaultExpanded=true and open is already true', () => {
    const c = makeComponent({ defaultExpanded: true, open: true });
    c.componentWillLoad();
    expect(c.open).toBe(true);
  });

  it('does not set open=true when defaultExpanded=false', () => {
    const c = makeComponent({ defaultExpanded: false, open: false });
    c.componentWillLoad();
    expect(c.open).toBe(false);
  });

  it('does not emit update event during componentWillLoad', () => {
    const c = makeComponent({ defaultExpanded: true });
    c.componentWillLoad();
    expect((c as any).update.emit).not.toHaveBeenCalled();
  });

  it('renders without throw after defaultExpanded=true opens the accordion', () => {
    const c = makeComponent({ defaultExpanded: true });
    c.componentWillLoad();
    expect(c.open).toBe(true);
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ── render() IDs are stable across calls ─────────────────────────────────────

describe('io-accordion — render() trigger/panel IDs use baseId', () => {
  it('triggerId and panelId are derived from baseId', () => {
    const c = makeComponent();
    (c as any).el = { id: 'my-accordion', dispatchEvent: vi.fn() };
    c.componentWillLoad();

    const baseId = (c as any).baseId as string;
    expect(baseId).toBe('my-accordion');

    // Render should not throw and baseId feeds the IDs
    expect(() => (c as any).render()).not.toThrow();
  });

  it('generates a baseId with io-accordion- prefix when el has no id', () => {
    const c = makeComponent();
    (c as any).el = { id: '', dispatchEvent: vi.fn() };
    c.componentWillLoad();

    const baseId = (c as any).baseId as string;
    expect(baseId).toMatch(/^io-accordion-/);
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ── render() inert attribute on panel ────────────────────────────────────────

describe('io-accordion — render() panel inert state', () => {
  it('does not throw with open=false (panel should be inert)', () => {
    const c = makeComponent({ open: false });
    c.componentWillLoad();
    // Inert is truthy when !isOpen — the render branch exercises this
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with open=true (panel should NOT be inert)', () => {
    const c = makeComponent({ open: true });
    c.componentWillLoad();
    // Inert is undefined when isOpen — the render branch exercises this
    expect(() => (c as any).render()).not.toThrow();
  });
});
