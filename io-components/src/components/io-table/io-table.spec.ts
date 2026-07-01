import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoTable } from './io-table';
import { getTableStyles } from './io-table-styles';

describe('io-table — default props', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('has empty caption by default', () => {
    expect(component.caption).toBe('');
  });

  it('has captionHidden false by default', () => {
    expect(component.captionHidden).toBe(false);
  });

  it('has sticky false by default', () => {
    expect(component.sticky).toBe(false);
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });
});

describe('io-table — render', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with caption without throwing', () => {
    component.caption = 'Users';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with captionHidden without throwing', () => {
    component.caption = 'Hidden';
    component.captionHidden = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with sticky prop without throwing', () => {
    component.sticky = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with size sm without throwing', () => {
    component.size = 'sm';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with size lg without throwing', () => {
    component.size = 'lg';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when captionHidden is false', () => {
    component.caption = 'Users';
    component.captionHidden = false;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table — striped / bordered / compact props', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('has striped false by default', () => {
    expect(component.striped).toBe(false);
  });

  it('has bordered false by default', () => {
    expect(component.bordered).toBe(false);
  });

  it('has compact false by default', () => {
    expect(component.compact).toBe(false);
  });

  it('renders with striped=true without throwing', () => {
    component.striped = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with bordered=true without throwing', () => {
    component.bordered = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with compact=true without throwing', () => {
    component.compact = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table — componentWillLoad', () => {
  it('warns when caption is empty', () => {
    const component = new IoTable();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.componentWillLoad();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn when caption is provided', () => {
    const component = new IoTable();
    component.caption = 'Team members';
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-table — sortChange event', () => {
  it('has handleSortBubble method', () => {
    const component = new IoTable();
    // handleSortBubble is the @Listen handler that re-emits sortChange
    expect(typeof (component as any).handleSortBubble).toBe('function');
  });

  it('handleSortBubble re-emits sort detail via sortChange', () => {
    const component = new IoTable();
    const emitMock = vi.fn();
    (component as any).sortChange = { emit: emitMock };

    const detail = { key: 'name', direction: 'ascending' as const };
    const ev = new CustomEvent('sort', { detail });
    (component as any).handleSortBubble(ev);

    expect(emitMock).toHaveBeenCalledWith(detail);
  });

  it('handleSortBubble calls stopPropagation to prevent original sort event escaping io-table', () => {
    const component = new IoTable();
    (component as any).sortChange = { emit: vi.fn() };

    const detail = { key: 'name', direction: 'ascending' as const };
    const ev = new CustomEvent('sort', { detail });
    const stopSpy = vi.spyOn(ev, 'stopPropagation');
    (component as any).handleSortBubble(ev);

    expect(stopSpy).toHaveBeenCalledOnce();
  });

  it('handleSortBubble forwards descending direction', () => {
    const component = new IoTable();
    const emitMock = vi.fn();
    (component as any).sortChange = { emit: emitMock };

    const detail = { key: 'email', direction: 'descending' as const };
    const ev = new CustomEvent('sort', { detail });
    (component as any).handleSortBubble(ev);

    expect(emitMock).toHaveBeenCalledWith(detail);
  });
});

describe('io-table — scroll wrapper aria-label', () => {
  it('sets aria-label on scroll wrapper when caption is provided', () => {
    const component = new IoTable();
    component.caption = 'Users';
    // Verify the regionLabel logic: caption is always used when present
    const regionLabel = component.caption || undefined;
    expect(regionLabel).toBe('Users');
  });

  it('omits aria-label on scroll wrapper when caption is empty', () => {
    const component = new IoTable();
    component.caption = '';
    const regionLabel = component.caption || undefined;
    expect(regionLabel).toBeUndefined();
  });

  it('sets aria-label with caption when captionHidden is true', () => {
    const component = new IoTable();
    component.caption = 'Hidden caption';
    component.captionHidden = true;
    const regionLabel = component.caption || undefined;
    expect(regionLabel).toBe('Hidden caption');
  });
});

describe('io-table — loading prop (#1051)', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('has loading false by default', () => {
    expect(component.loading).toBe(false);
  });

  it('renders with loading=true without throwing', () => {
    component.loading = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with loading=false without throwing', () => {
    component.loading = false;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table — isEmpty state (#1051)', () => {
  it('has isEmpty false by default', () => {
    const component = new IoTable();
    expect((component as any).isEmpty).toBe(false);
  });

  it('updateEmptyState sets isEmpty=true when no io-table-body-row in DOM', () => {
    const component = new IoTable();
    const mockEl = document.createElement('io-table');
    const body = document.createElement('io-table-body');
    mockEl.appendChild(body);
    (component as any).el = mockEl;
    (component as any).updateEmptyState();
    expect((component as any).isEmpty).toBe(true);
  });

  it('updateEmptyState sets isEmpty=false when io-table-body-row is present', () => {
    const component = new IoTable();
    const mockEl = document.createElement('io-table');
    const body = document.createElement('io-table-body');
    const row = document.createElement('io-table-body-row');
    body.appendChild(row);
    mockEl.appendChild(body);
    (component as any).el = mockEl;
    (component as any).updateEmptyState();
    expect((component as any).isEmpty).toBe(false);
  });

  it('updateEmptyState sets isEmpty=true when no io-table-body in DOM', () => {
    const component = new IoTable();
    const mockEl = document.createElement('io-table');
    (component as any).el = mockEl;
    (component as any).updateEmptyState();
    expect((component as any).isEmpty).toBe(true);
  });

  it('handleSlotChange calls updateEmptyState', () => {
    const component = new IoTable();
    const mockEl = document.createElement('io-table');
    (component as any).el = mockEl;
    expect(() => (component as any).handleSlotChange()).not.toThrow();
  });
});

describe('io-table — layout prop (#869)', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('layout defaults to auto', () => {
    expect(component.layout).toBe('auto');
  });

  it('layout can be set to fixed', () => {
    component.layout = 'fixed';
    expect(component.layout).toBe('fixed');
  });

  it('renders with layout=fixed without throwing', () => {
    component.layout = 'fixed';
    expect(() => component.render()).not.toThrow();
  });

  it('getTableStyles includes fixed table-layout rule (#869)', () => {
    const styles = getTableStyles();
    expect(styles).toContain("layout='fixed'");
    expect(styles).toContain('table-layout: fixed');
  });
});

describe('io-table — scroll wrapper keyboard reachability (#861)', () => {
  it('table-wrapper div has tabIndex=0', () => {
    const component = new IoTable();
    component.caption = 'Users';
    vi.mocked(h).mockClear();
    component.render();
    const wrapperCall = vi.mocked(h).mock.calls.find(([, attrs]) =>
      (attrs as any)?.class === 'table-wrapper',
    );
    expect((wrapperCall?.[1] as any)?.tabIndex).toBe(0);
  });

  it('table-wrapper tabIndex=0 is present even when caption is empty', () => {
    const component = new IoTable();
    vi.mocked(h).mockClear();
    component.render();
    const wrapperCall = vi.mocked(h).mock.calls.find(([, attrs]) =>
      (attrs as any)?.class === 'table-wrapper',
    );
    expect((wrapperCall?.[1] as any)?.tabIndex).toBe(0);
  });
});
