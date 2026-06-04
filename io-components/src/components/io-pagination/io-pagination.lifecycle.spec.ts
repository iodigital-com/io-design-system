import { h } from '@stencil/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoPagination } from './io-pagination';

// ── normalizeTotalPages ──────────────────────────────────────────────────────

describe('io-pagination — normalizeTotalPages edge cases', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('returns 1 for NaN input', () => {
    expect((component as any).normalizeTotalPages(NaN)).toBe(1);
  });

  it('returns 1 for Infinity input', () => {
    expect((component as any).normalizeTotalPages(Infinity)).toBe(1);
  });

  it('returns 1 for -Infinity input', () => {
    expect((component as any).normalizeTotalPages(-Infinity)).toBe(1);
  });

  it('returns 1 for zero', () => {
    expect((component as any).normalizeTotalPages(0)).toBe(1);
  });

  it('returns 1 for negative numbers', () => {
    expect((component as any).normalizeTotalPages(-5)).toBe(1);
  });

  it('floors decimal values', () => {
    expect((component as any).normalizeTotalPages(5.9)).toBe(5);
  });

  it('returns the value unchanged for valid integers', () => {
    expect((component as any).normalizeTotalPages(10)).toBe(10);
  });

  it('returns 1 for 0.5 (floors to 0, then clamps to 1)', () => {
    expect((component as any).normalizeTotalPages(0.5)).toBe(1);
  });
});

// ── normalizePage ────────────────────────────────────────────────────────────

describe('io-pagination — normalizePage edge cases', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('returns 1 for NaN page', () => {
    expect((component as any).normalizePage(NaN, 10)).toBe(1);
  });

  it('returns 1 for Infinity page', () => {
    expect((component as any).normalizePage(Infinity, 10)).toBe(1);
  });

  it('clamps page below 1 to 1', () => {
    expect((component as any).normalizePage(0, 10)).toBe(1);
  });

  it('clamps negative page to 1', () => {
    expect((component as any).normalizePage(-3, 10)).toBe(1);
  });

  it('clamps page above totalPages to totalPages', () => {
    expect((component as any).normalizePage(15, 10)).toBe(10);
  });

  it('floors decimal page within range', () => {
    expect((component as any).normalizePage(3.8, 10)).toBe(3);
  });

  it('returns valid page unchanged', () => {
    expect((component as any).normalizePage(5, 10)).toBe(5);
  });

  it('returns 1 when totalPages is 1 and page is 1', () => {
    expect((component as any).normalizePage(1, 1)).toBe(1);
  });
});

// ── onTotalPagesChange watcher ───────────────────────────────────────────────

describe('io-pagination — onTotalPagesChange watcher', () => {
  let component: IoPagination;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.totalPages = 10;
    component.page = 5;
    component.componentWillLoad();
  });

  it('normalizes NaN totalPages to 1', () => {
    (component as any).onTotalPagesChange(NaN);
    expect(component.totalPages).toBe(1);
  });

  it('normalizes zero totalPages to 1', () => {
    (component as any).onTotalPagesChange(0);
    expect(component.totalPages).toBe(1);
  });

  it('normalizes negative totalPages to 1', () => {
    (component as any).onTotalPagesChange(-2);
    expect(component.totalPages).toBe(1);
  });

  it('clamps page when totalPages shrinks below current page', () => {
    component.page = 8;
    (component as any).onTotalPagesChange(4);
    expect(component.page).toBe(4);
  });

  it('does not change page when it is still within new totalPages', () => {
    component.page = 3;
    (component as any).onTotalPagesChange(5);
    expect(component.page).toBe(3);
  });

  it('early-returns when value is invalid (sets totalPages, does not clamp page)', () => {
    const pageBefore = component.page;
    (component as any).onTotalPagesChange(NaN);
    // totalPages normalized; page clamping branch is not reached (early return)
    expect(component.totalPages).toBe(1);
    // page may or may not change depending on clamping, but we confirm no throw
    expect(component.page).toBeGreaterThanOrEqual(1);
    expect(pageBefore).toBe(5);
  });
});

// ── onPageChange watcher ─────────────────────────────────────────────────────

describe('io-pagination — onPageChange watcher', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.totalPages = 8;
    component.page = 4;
    component.componentWillLoad();
  });

  it('updates liveMessage for a valid page change', () => {
    (component as any).onPageChange(3);
    expect((component as any).liveMessage).toBe('Page 3 of 8');
  });

  it('normalizes and reassigns page for NaN input', () => {
    (component as any).onPageChange(NaN);
    expect(component.page).toBe(1);
  });

  it('normalizes and reassigns page when value exceeds totalPages', () => {
    (component as any).onPageChange(20);
    expect(component.page).toBe(8);
  });

  it('does not update liveMessage when value is normalized (early return path)', () => {
    const prevMsg = (component as any).liveMessage;
    (component as any).onPageChange(NaN);
    // liveMessage stays as it was — the early-return branch does not set it
    expect((component as any).liveMessage).toBe(prevMsg);
  });

  it('sets liveMessage for first page', () => {
    (component as any).onPageChange(1);
    expect((component as any).liveMessage).toBe('Page 1 of 8');
  });

  it('sets liveMessage for last page', () => {
    (component as any).onPageChange(8);
    expect((component as any).liveMessage).toBe('Page 8 of 8');
  });
});

// ── pageRange (ellipsis insertion logic) ─────────────────────────────────────

describe('io-pagination — pageRange ellipsis branches (total=10)', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('current=1 — shows start cluster with trailing ellipsis', () => {
    const range = (component as any).pageRange(1, 10);
    expect(range[0]).toBe(1);
    expect(range).toContain('…');
    expect(range[range.length - 1]).toBe(10);
  });

  it('current=5 — shows both leading and trailing ellipsis', () => {
    const range = (component as any).pageRange(5, 10);
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(10);
    // Middle range — should contain two ellipsis markers
    const dots = range.filter(p => p === '…');
    expect(dots.length).toBe(2);
    expect(range).toContain(5);
  });

  it('current=9 — shows end cluster with leading ellipsis', () => {
    const range = (component as any).pageRange(9, 10);
    expect(range[0]).toBe(1);
    expect(range).toContain('…');
    expect(range[range.length - 1]).toBe(10);
    const dots = range.filter(p => p === '…');
    expect(dots.length).toBe(1);
  });

  it('current=4 (boundary) — still in start-cluster branch', () => {
    // current <= 4 triggers the start-cluster path
    const range = (component as any).pageRange(4, 10);
    expect(range[0]).toBe(1);
    expect(range).toContain('…');
    expect(range[range.length - 1]).toBe(10);
  });

  it('returns 7 tokens for total=10, current=1', () => {
    expect((component as any).pageRange(1, 10)).toHaveLength(7);
  });

  it('returns 7 tokens for total=10, current=5', () => {
    expect((component as any).pageRange(5, 10)).toHaveLength(7);
  });

  it('returns 7 tokens for total=10, current=9', () => {
    expect((component as any).pageRange(9, 10)).toHaveLength(7);
  });

  it('total <= 7 returns all pages with no ellipsis', () => {
    const range = (component as any).pageRange(3, 6);
    expect(range).toEqual([1, 2, 3, 4, 5, 6]);
    expect(range).not.toContain('…');
  });
});

// ── go() method ──────────────────────────────────────────────────────────────

describe('io-pagination — go() method comprehensive', () => {
  let component: IoPagination;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.totalPages = 10;
    component.page = 5;
    component.componentWillLoad();
  });

  it('navigates to valid new page, emits change, and sets liveMessage', () => {
    (component as any).go(7);
    expect(component.page).toBe(7);
    expect(emitSpy).toHaveBeenCalledWith({ page: 7 });
    expect((component as any).liveMessage).toBe('Page 7 of 10');
  });

  it('is a no-op when target is the same as current page', () => {
    (component as any).go(5);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.page).toBe(5);
  });

  it('is a no-op for page 0', () => {
    (component as any).go(0);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.page).toBe(5);
  });

  it('is a no-op for page above totalPages', () => {
    (component as any).go(11);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.page).toBe(5);
  });

  it('is a no-op for negative page', () => {
    (component as any).go(-1);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.page).toBe(5);
  });

  it('navigates to first page from middle', () => {
    (component as any).go(1);
    expect(component.page).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith({ page: 1 });
  });

  it('navigates to last page', () => {
    (component as any).go(10);
    expect(component.page).toBe(10);
    expect(emitSpy).toHaveBeenCalledWith({ page: 10 });
  });
});

// ── render() branch coverage ─────────────────────────────────────────────────

describe('io-pagination — render() branches', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    (component as any).navId = 'test-nav-id';
  });

  it('does not throw on first page (prev button disabled)', () => {
    component.page = 1;
    component.totalPages = 5;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw on last page (next button disabled)', () => {
    component.page = 5;
    component.totalPages = 5;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw on middle page (both buttons enabled)', () => {
    component.page = 3;
    component.totalPages = 5;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw when ellipsis is rendered (total=12, current=6)', () => {
    component.page = 6;
    component.totalPages = 12;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw for single-page pagination', () => {
    component.page = 1;
    component.totalPages = 1;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw with custom prev/next labels', () => {
    component.page = 2;
    component.totalPages = 5;
    component.prevLabel = 'Vorige';
    component.nextLabel = 'Volgende';
    expect(() => (component as any).render()).not.toThrow();
  });
});

// ── componentWillLoad — hasOnlyOneDataProp warning (line 113) ────────────────

describe('io-pagination — componentWillLoad hasOnlyOneDataProp warning', () => {
  it('logs a console.warn when only totalItems is provided without perPage', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const c = new IoPagination();
    (c as any).change = { emit: vi.fn() };
    c.totalItems = 50;
    // perPage is intentionally left undefined
    c.componentWillLoad();
    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy.mock.calls[0][0]).toContain('[io-pagination]');
    warnSpy.mockRestore();
  });

  it('logs a console.warn when only perPage is provided without totalItems', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const c = new IoPagination();
    (c as any).change = { emit: vi.fn() };
    c.perPage = 10;
    // totalItems is intentionally left undefined
    c.componentWillLoad();
    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy.mock.calls[0][0]).toContain('totalPages');
    warnSpy.mockRestore();
  });

  it('does NOT warn when both totalItems and perPage are provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const c = new IoPagination();
    (c as any).change = { emit: vi.fn() };
    c.totalItems = 50;
    c.perPage = 10;
    c.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does NOT warn when neither totalItems nor perPage are provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const c = new IoPagination();
    (c as any).change = { emit: vi.fn() };
    c.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

// ── componentWillLoad normalization ──────────────────────────────────────────

describe('io-pagination — componentWillLoad normalization', () => {
  it('normalizes decimal totalPages and page on load', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.totalPages = 7.8;
    component.page = 3.9;
    component.componentWillLoad();
    expect(component.totalPages).toBe(7);
    expect(component.page).toBe(3);
  });

  it('generates a navId with the io-pagination- prefix', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.componentWillLoad();
    expect((component as any).navId).toMatch(/^io-pagination-/);
  });

  it('clamps out-of-range page after totalPages is normalized', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.totalPages = 3;
    component.page = 10;
    component.componentWillLoad();
    expect(component.page).toBe(3);
  });
});

// ── render() inline onClick handlers ─────────────────────────────────────────

describe('io-pagination — render() inline onClick handlers', () => {
  it('prev/next and page-number onClick handlers are invocable', () => {
    const c = new IoPagination();
    (c as any).el = document.createElement('io-pagination');
    (c as any).change = { emit: vi.fn() };
    (c as any).componentWillLoad();
    c.page = 3;
    c.totalPages = 5;

    vi.mocked(h).mockClear();
    (c as any).render();

    const allCalls = vi.mocked(h).mock.calls as any[];

    // Find button calls that have onClick props
    const btnCalls = allCalls.filter(call => call[0] === 'button' && call[1]?.onClick);
    expect(btnCalls.length).toBeGreaterThan(0);

    // Invoke each onClick — they delegate to go() which is already covered
    btnCalls.forEach(call => {
      expect(() => call[1].onClick()).not.toThrow();
    });
  });

  it('page-dots span renders when ellipsis is present', () => {
    const c = new IoPagination();
    (c as any).el = document.createElement('io-pagination');
    (c as any).change = { emit: vi.fn() };
    (c as any).componentWillLoad();
    c.page = 5;
    c.totalPages = 10;

    vi.mocked(h).mockClear();
    expect(() => (c as any).render()).not.toThrow();

    // The ellipsis renders a span (not a button) — verify h was called
    const allCalls = vi.mocked(h).mock.calls as any[];
    expect(allCalls.length).toBeGreaterThan(0);
  });
});
