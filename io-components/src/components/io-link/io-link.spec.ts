import { describe, it, expect, vi } from 'vitest';

import { h } from '@stencil/core';

import { IoLink } from './io-link';

describe('io-link — default props', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has variant standalone by default', () => {
    expect(component.variant).toBe('standalone');
  });

  it('has color blue by default', () => {
    expect(component.color).toBe('blue');
  });

  it('has target _self by default', () => {
    expect(component.target).toBe('_self');
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not external by default', () => {
    expect(component.external).toBe(false);
  });

  it('has no rel by default', () => {
    expect(component.rel).toBeUndefined();
  });

  it('has no download by default', () => {
    expect(component.download).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const inner = document.createElement('a');
    inner.className = 'link';
    inner.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(inner) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('setFocus handles missing inner element gracefully', async () => {
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(null) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});

describe('io-link — download prop', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('accepts download prop value', () => {
    component.download = 'file.pdf';
    expect(component.download).toBe('file.pdf');
  });

  it('allows filename in download attribute', () => {
    component.download = 'my-document.pdf';
    expect(component.download).toBe('my-document.pdf');
  });
});

describe('io-link — external link security', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has external prop settable to true', () => {
    component.external = true;
    expect(component.external).toBe(true);
  });

  it('has external prop settable to false', () => {
    component.external = false;
    expect(component.external).toBe(false);
  });
});

describe('io-link — icon prop', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has no icon by default', () => {
    expect(component.icon).toBeUndefined();
  });

  it('accepts an icon name', () => {
    component.icon = 'arrow-right' as any;
    expect(component.icon).toBe('arrow-right');
  });

  it('has no iconSource by default', () => {
    expect(component.iconSource).toBeUndefined();
  });

  it('accepts an iconSource string', () => {
    component.iconSource = '<svg></svg>';
    expect(component.iconSource).toBe('<svg></svg>');
  });
});

describe('io-link — hideLabel prop', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has hideLabel false by default', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('accepts hideLabel true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('hides label when hideLabel is true with auto-rendered external icon', () => {
    component.external = true;
    component.hideLabel = true;
    vi.mocked(h).mockClear();
    component.render();
    const spanCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && (call[1] as Record<string, unknown>)?.['class']?.toString().includes('link__label--hidden')
    );
    expect(spanCall).toBeDefined();
  });
});

describe('io-link — ariaCurrent prop (#791)', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has no ariaCurrent by default', () => {
    expect(component.ariaCurrent).toBeNull();
  });

  it('accepts ariaCurrent="page"', () => {
    component.ariaCurrent = 'page';
    expect(component.ariaCurrent).toBe('page');
  });

  it('accepts ariaCurrent="step"', () => {
    component.ariaCurrent = 'step';
    expect(component.ariaCurrent).toBe('step');
  });

  it('renders aria-current="page" on the anchor', () => {
    component.ariaCurrent = 'page';
    vi.mocked(h).mockClear();
    component.render();
    const aCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'a');
    const attrs = (aCall?.[1] ?? {}) as Record<string, unknown>;
    expect(attrs['aria-current']).toBe('page');
  });

  it('renders aria-current="true" when ariaCurrent is "true"', () => {
    component.ariaCurrent = 'true';
    vi.mocked(h).mockClear();
    component.render();
    const aCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'a');
    const attrs = (aCall?.[1] ?? {}) as Record<string, unknown>;
    expect(attrs['aria-current']).toBe('true');
  });

  it('does not render aria-current when ariaCurrent is "false"', () => {
    component.ariaCurrent = 'false';
    vi.mocked(h).mockClear();
    component.render();
    const aCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'a');
    const attrs = (aCall?.[1] ?? {}) as Record<string, unknown>;
    expect(attrs['aria-current']).toBeUndefined();
  });
});

describe('io-link — external icon auto-render (#821)', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('renders external-link icon when external=true and no explicit icon', () => {
    component.external = true;
    vi.mocked(h).mockClear();
    component.render();
    const iconCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'io-icon' && (call[1] as Record<string, unknown>)?.['name'] === 'external-link',
    );
    expect(iconCall).toBeDefined();
  });

  it('does not auto-render external-link icon when external=false', () => {
    component.external = false;
    vi.mocked(h).mockClear();
    component.render();
    const iconCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'io-icon' && (call[1] as Record<string, unknown>)?.['name'] === 'external-link',
    );
    expect(iconCall).toBeUndefined();
  });

  it('does not auto-render external-link icon when explicit icon is set', () => {
    component.external = true;
    component.icon = 'arrow-right' as any;
    vi.mocked(h).mockClear();
    component.render();
    const externalIconCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'io-icon' && (call[1] as Record<string, unknown>)?.['name'] === 'external-link',
    );
    expect(externalIconCall).toBeUndefined();
  });
});

describe('io-link — disabled keyboard accessibility', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('renders tabIndex 0 and aria-disabled when disabled so keyboard users can still focus the link', () => {
    component.disabled = true;
    vi.mocked(h).mockClear();
    component.render();
    const aCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'a');
    const attrs = (aCall?.[1] ?? {}) as Record<string, unknown>;
    expect(attrs['tabIndex']).toBe(0);
    expect(attrs['aria-disabled']).toBe('true');
  });
});
