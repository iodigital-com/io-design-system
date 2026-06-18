import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoDivider } from './io-divider';
import { getDividerStyles } from './io-divider-styles';

describe('io-divider — default props', () => {
  let comp: IoDivider;

  beforeEach(() => {
    comp = new IoDivider();
    (comp as any).el = document.createElement('io-divider');
  });

  it('orientation defaults to "horizontal"', () => {
    expect(comp.orientation).toBe('horizontal');
  });

  it('label defaults to undefined', () => {
    expect(comp.label).toBeUndefined();
  });

  it('color defaults to "default"', () => {
    expect(comp.color).toBe('default');
  });
});

describe('io-divider — style tokens', () => {
  it('uses --io-divider-color token for the border', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-color)');
  });

  it('uses --io-divider-thickness token for border width', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-thickness)');
  });

  it('uses --io-divider-gap token for labeled variant', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-gap)');
  });

  it('uses --io-divider-label-size token for label font size', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-label-size)');
  });

  it('uses --io-text-secondary for label color (token-first)', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-text-secondary)');
  });

  it('contains no hardcoded hex color values', () => {
    const styles = getDividerStyles();
    expect(styles).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});

describe('io-divider — ARIA contract (via orientation prop)', () => {
  it('orientation "horizontal" is the default', () => {
    const comp = new IoDivider();
    expect(comp.orientation).toBe('horizontal');
  });

  it('orientation can be set to "vertical"', () => {
    const comp = new IoDivider();
    comp.orientation = 'vertical';
    expect(comp.orientation).toBe('vertical');
  });

  it('label prop carries the accessible text shown in the labeled variant', () => {
    const comp = new IoDivider();
    comp.label = 'or';
    expect(comp.label).toBe('or');
  });

  it('styles include aria-orientation="vertical" markup for vertical divider in shadow styles', () => {
    // The vertical orientation is represented by CSS class; verify the class name is present
    const styles = getDividerStyles();
    expect(styles).toContain('.divider--vertical');
  });
});

// ── Render-path tests (vi.mocked(h).mock.calls) ───────────────────────────────

function makeComp(overrides: Partial<IoDivider> = {}): IoDivider {
  const comp = new IoDivider();
  (comp as any).el = document.createElement('io-divider');
  Object.assign(comp, overrides);
  return comp;
}

function hCallProps(tag: string): Record<string, unknown> | undefined {
  const call = vi.mocked(h).mock.calls.find((args) => args[0] === tag);
  return call?.[1] as Record<string, unknown> | undefined;
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

describe('io-divider render — horizontal (default)', () => {
  let comp: IoDivider;

  beforeEach(() => {
    comp = makeComp();
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('renders an <hr> element', () => {
    expect(hCallsForTag('hr').length).toBeGreaterThan(0);
  });

  it('<hr> does NOT carry an explicit role attribute (hr has implicit role=separator)', () => {
    expect(hCallProps('hr')?.['role']).toBeUndefined();
  });

  it('<hr> does NOT carry aria-orientation (horizontal is the ARIA default for role=separator)', () => {
    expect(hCallProps('hr')?.['aria-orientation']).toBeUndefined();
  });

  it('does NOT render a <div> separator for the horizontal variant', () => {
    const divCalls = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(divCalls).toHaveLength(0);
  });
});

describe('io-divider render — vertical', () => {
  let comp: IoDivider;

  beforeEach(() => {
    comp = makeComp({ orientation: 'vertical' });
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('renders a <div> with role="separator" for the vertical variant', () => {
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('vertical <div> has aria-orientation="vertical"', () => {
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-orientation']).toBe('vertical');
  });

  it('vertical <div> carries the .divider--vertical class', () => {
    const separatorDivs = hCallsForTag('div').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider--vertical'),
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('does NOT render an <hr> for the vertical variant', () => {
    expect(hCallsForTag('hr')).toHaveLength(0);
  });
});

describe('io-divider render — labeled', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('labeled wrapper has role="separator"', () => {
    makeComp({ label: 'or' }).render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('labeled wrapper always has aria-orientation="horizontal"', () => {
    makeComp({ label: 'or', orientation: 'horizontal' }).render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-orientation']).toBe('horizontal');
  });

  it('aria-orientation remains "horizontal" even when orientation prop is "vertical"', () => {
    makeComp({ label: 'or', orientation: 'vertical' }).render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
    expect(separatorDivs[0]?.['aria-orientation']).toBe('horizontal');
  });

  it('labeled wrapper carries the .divider--labeled class', () => {
    makeComp({ label: 'or' }).render();
    const labeledDivs = hCallsForTag('div').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider--labeled'),
    );
    expect(labeledDivs.length).toBeGreaterThan(0);
  });

  it('renders two decorative line spans with aria-hidden="true"', () => {
    makeComp({ label: 'or' }).render();
    const hiddenSpans = hCallsForTag('span').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['aria-hidden'] === 'true',
    );
    expect(hiddenSpans).toHaveLength(2);
  });

  it('renders a .divider__label span', () => {
    makeComp({ label: 'or' }).render();
    const labelSpans = hCallsForTag('span').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider__label'),
    );
    expect(labelSpans.length).toBeGreaterThan(0);
  });

  it('does NOT render an <hr> when label is set', () => {
    makeComp({ label: 'or' }).render();
    expect(hCallsForTag('hr')).toHaveLength(0);
  });
});

// ── Color prop tests ──────────────────────────────────────────────────────────

describe('io-divider — color prop', () => {
  it('defaults to "default"', () => {
    const comp = makeComp();
    expect(comp.color).toBe('default');
  });

  it('can be set to "subtle"', () => {
    const comp = makeComp({ color: 'subtle' } as Partial<IoDivider>);
    expect(comp.color).toBe('subtle');
  });

  it('can be set to "strong"', () => {
    const comp = makeComp({ color: 'strong' } as Partial<IoDivider>);
    expect(comp.color).toBe('strong');
  });

  it('renders without throwing for each color variant', () => {
    const colors = ['subtle', 'default', 'strong'] as const;
    for (const color of colors) {
      const comp = makeComp({ color } as Partial<IoDivider>);
      expect(() => comp.render()).not.toThrow();
    }
  });

  it('styles include :host([color="subtle"]) rule using --io-border-rgb token', () => {
    const styles = getDividerStyles();
    expect(styles).toContain(':host([color="subtle"])');
    expect(styles).toContain('rgba(var(--io-border-rgb), 0.5)');
  });

  it('styles include :host([color="strong"]) rule using --io-border-hover token', () => {
    const styles = getDividerStyles();
    expect(styles).toContain(':host([color="strong"])');
    expect(styles).toContain('var(--io-border-hover)');
  });

  it('styles include :host([color="default"]) rule using --io-divider-color token', () => {
    const styles = getDividerStyles();
    expect(styles).toContain(':host([color="default"])');
    expect(styles).toContain('var(--io-divider-color)');
  });

  it('styles contain no hardcoded hex values in color variant rules (token-first governance)', () => {
    const styles = getDividerStyles();
    expect(styles).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});

// ── Accessibility: aria-label on labeled divider ────────────────────────

describe('io-divider render — labeled variant aria-label', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('labeled divider carries aria-label={label} on the separator div', () => {
    makeComp({ label: 'or' }).render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-label']).toBe('or');
  });

  it('aria-label value matches the label prop text', () => {
    makeComp({ label: 'and' }).render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-label']).toBe('and');
  });

  it('aria-label remains set even when slot contains content', () => {
    const comp = makeComp({ label: 'separator' });
    (comp as any).hasSlotContent = true;
    vi.mocked(h).mockClear();
    comp.render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-label']).toBe('separator');
  });
});

// ── Slot content handling ────────────────────────────────────────────────

describe('io-divider render — slot content', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('hasSlotContent defaults to false', () => {
    const comp = makeComp({ label: 'or' });
    expect((comp as any).hasSlotContent).toBe(false);
  });

  it('slot is rendered when label is set', () => {
    makeComp({ label: 'or' }).render();
    const slots = hCallsForTag('slot');
    expect(slots.length).toBeGreaterThan(0);
  });

  it('label text renders as fallback when hasSlotContent is false', () => {
    const comp = makeComp({ label: 'or' });
    (comp as any).hasSlotContent = false;
    vi.mocked(h).mockClear();
    comp.render();
    // Verify that the label is still rendered as content
    const labelSpans = hCallsForTag('span').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider__label'),
    );
    expect(labelSpans.length).toBeGreaterThan(0);
  });
});

// ── Forced-colors media query ────────────────────────────────────────────

describe('io-divider — forced-colors (Windows High Contrast Mode)', () => {
  it('styles include @media (forced-colors: active) rule', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('@media (forced-colors: active)');
  });

  it('forced-colors rule sets .divider border-top-color to ButtonText', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('border-top-color: ButtonText');
  });

  it('forced-colors rule sets .divider--vertical border-left-color to ButtonText', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('border-left-color: ButtonText');
  });

  it('forced-colors rule sets .divider__line background to ButtonText', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('background: ButtonText');
  });
});
