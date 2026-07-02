import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoFieldset } from './io-fieldset';
import { getFieldsetStyles } from './io-fieldset-styles';
import { normaliseAria } from './io-fieldset-utils';

// ── Default props ─────────────────────────────────────────────────────────────

describe('io-fieldset — default props', () => {
  let comp: IoFieldset;

  beforeEach(() => {
    comp = new IoFieldset();
    (comp as any).el = document.createElement('io-fieldset');
    (comp as any).componentId = 'io-fs-test1';
  });

  it('label defaults to undefined (required prop)', () => {
    // label is declared as required but has no runtime enforcement before componentWillLoad
    expect(comp.label).toBeUndefined();
  });

  it('required defaults to false', () => {
    expect(comp.required).toBe(false);
  });

  it('error defaults to false', () => {
    expect(comp.error).toBe(false);
  });

  it('errorMessage defaults to undefined', () => {
    expect(comp.errorMessage).toBeUndefined();
  });

  it('aria defaults to undefined', () => {
    expect(comp.aria).toBeUndefined();
  });
});

// ── Style tokens ──────────────────────────────────────────────────────────────

describe('io-fieldset — style tokens', () => {
  it('uses --io-fieldset-gap token for body gap', () => {
    const styles = getFieldsetStyles();
    expect(styles).toContain('var(--io-fieldset-gap)');
  });

  it('uses --io-fieldset-legend-color token for legend text', () => {
    const styles = getFieldsetStyles();
    expect(styles).toContain('var(--io-fieldset-legend-color)');
  });

  it('uses --io-fieldset-error-color token for error message color', () => {
    const styles = getFieldsetStyles();
    expect(styles).toContain('var(--io-fieldset-error-color)');
  });

  it('uses --io-fieldset-border-error-width token for error border', () => {
    const styles = getFieldsetStyles();
    expect(styles).toContain('var(--io-fieldset-border-error-width)');
  });

  it('contains no hardcoded hex color values', () => {
    const styles = getFieldsetStyles();
    expect(styles).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });

  it('contains @media forced-colors rule', () => {
    const styles = getFieldsetStyles();
    expect(styles).toContain('@media (forced-colors: active)');
  });

  it(':host([error]) rule targets error state', () => {
    const styles = getFieldsetStyles();
    expect(styles).toContain(':host([error])');
  });
});

// ── normaliseAria utility ─────────────────────────────────────────────────────

describe('normaliseAria', () => {
  it('prepends aria- to keys without it', () => {
    const result = normaliseAria({ labelledby: 'my-id' });
    expect(result['aria-labelledby']).toBe('my-id');
  });

  it('passes through keys that already have aria- prefix', () => {
    const result = normaliseAria({ 'aria-labelledby': 'my-id' });
    expect(result['aria-labelledby']).toBe('my-id');
  });

  it('passes role through as-is', () => {
    const result = normaliseAria({ role: 'radiogroup' });
    expect(result['role']).toBe('radiogroup');
  });

  it('handles multiple entries', () => {
    const result = normaliseAria({ role: 'radiogroup', labelledby: 'legend-id', 'aria-describedby': 'desc' });
    expect(result['role']).toBe('radiogroup');
    expect(result['aria-labelledby']).toBe('legend-id');
    expect(result['aria-describedby']).toBe('desc');
  });
});

// ── Render-path tests (vi.mocked(h).mock.calls) ───────────────────────────────

function makeComp(overrides: Partial<IoFieldset> = {}): IoFieldset {
  const comp = new IoFieldset();
  (comp as any).el = document.createElement('io-fieldset');
  (comp as any).componentId = 'io-fs-test1';
  comp.label = 'Test Label';
  Object.assign(comp, overrides);
  return comp;
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

describe('io-fieldset render — default (no error)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
    makeComp().render();
  });

  it('renders a <fieldset> element', () => {
    expect(hCallsForTag('fieldset').length).toBeGreaterThan(0);
  });

  it('renders a <legend> element', () => {
    expect(hCallsForTag('legend').length).toBeGreaterThan(0);
  });

  it('renders a .fieldset__body div', () => {
    const bodyDivs = hCallsForTag('div').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__body'),
    );
    expect(bodyDivs.length).toBeGreaterThan(0);
  });

  it('<fieldset> does NOT have aria-describedby when no error', () => {
    const fieldsetProps = hCallsForTag('fieldset')[0];
    expect(fieldsetProps?.['aria-describedby']).toBeUndefined();
  });

  it('does NOT render .fieldset__error paragraph when error is false', () => {
    const errorPs = hCallsForTag('p').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__error'),
    );
    expect(errorPs.length).toBe(0);
  });

  it('renders a <slot>', () => {
    expect(hCallsForTag('slot').length).toBeGreaterThan(0);
  });
});

describe('io-fieldset render — required', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
    makeComp({ required: true }).render();
  });

  it('renders a .fieldset__required span', () => {
    const requiredSpans = hCallsForTag('span').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__required'),
    );
    expect(requiredSpans.length).toBeGreaterThan(0);
  });

  it('.fieldset__required span has aria-hidden="true"', () => {
    const requiredSpans = hCallsForTag('span').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__required'),
    );
    expect(requiredSpans[0]?.['aria-hidden']).toBe('true');
  });
});

describe('io-fieldset render — error with message', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
    makeComp({ error: true, errorMessage: 'This field is required' }).render();
  });

  it('renders .fieldset__error paragraph', () => {
    const errorPs = hCallsForTag('p').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__error'),
    );
    expect(errorPs.length).toBeGreaterThan(0);
  });

  it('.fieldset__error paragraph has role="alert"', () => {
    const errorPs = hCallsForTag('p').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__error'),
    );
    expect(errorPs[0]?.['role']).toBe('alert');
  });

  it('.fieldset__error paragraph has the correct id', () => {
    const errorPs = hCallsForTag('p').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__error'),
    );
    expect(errorPs[0]?.['id']).toBe('io-fs-test1-error');
  });

  it('<fieldset> has aria-describedby pointing to error id', () => {
    const fieldsetProps = hCallsForTag('fieldset')[0];
    expect(fieldsetProps?.['aria-describedby']).toBe('io-fs-test1-error');
  });
});

describe('io-fieldset render — error=true but no errorMessage', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
    makeComp({ error: true, errorMessage: undefined }).render();
  });

  it('does NOT render .fieldset__error paragraph (no message)', () => {
    const errorPs = hCallsForTag('p').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__error'),
    );
    expect(errorPs.length).toBe(0);
  });

  it('<fieldset> does NOT have aria-describedby (no message)', () => {
    const fieldsetProps = hCallsForTag('fieldset')[0];
    expect(fieldsetProps?.['aria-describedby']).toBeUndefined();
  });
});

describe('io-fieldset render — aria prop', () => {
  it('spreads normalised aria attributes onto <fieldset>', () => {
    vi.mocked(h).mockClear();
    makeComp({ aria: { role: 'radiogroup', labelledby: 'external-id' } }).render();
    const fieldsetProps = hCallsForTag('fieldset')[0];
    expect(fieldsetProps?.['role']).toBe('radiogroup');
    expect(fieldsetProps?.['aria-labelledby']).toBe('external-id');
  });
});

describe('io-fieldset render — no required indicator by default', () => {
  it('no .fieldset__required span when required=false', () => {
    vi.mocked(h).mockClear();
    makeComp({ required: false }).render();
    const requiredSpans = hCallsForTag('span').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('fieldset__required'),
    );
    expect(requiredSpans.length).toBe(0);
  });
});
