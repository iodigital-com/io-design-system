/**
 * io-switch — render branch coverage
 *
 * Covers branches in io-switch.tsx render() and io-switch-utils.ts that
 * are not exercised by the existing watch/a11y specs.
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoSwitch } from './io-switch';
import {
  sanitizeNameSegment,
  resolveSwitchId,
  getSwitchWrapperClass,
  getSwitchTrackClass,
} from './io-switch-utils';

// ── io-switch-utils.ts ────────────────────────────────────────────────────────

describe('sanitizeNameSegment', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeNameSegment('')).toBe('');
  });

  it('trims whitespace and lowercases', () => {
    expect(sanitizeNameSegment('  Hello World  ')).toBe('hello-world');
  });

  it('strips leading and trailing dashes produced by special chars', () => {
    expect(sanitizeNameSegment('---')).toBe('');
  });

  it('replaces non-alphanumeric characters with dashes', () => {
    expect(sanitizeNameSegment('foo@bar.baz')).toBe('foo-bar-baz');
  });
});

describe('resolveSwitchId', () => {
  it('includes the sanitized name when name is a non-empty string', () => {
    expect(resolveSwitchId('my-field', 'fb')).toBe('io-switch-my-field-fb');
  });

  it('omits name segment when name is undefined (uses fallback only)', () => {
    expect(resolveSwitchId(undefined, 'fb')).toBe('io-switch-fb');
  });

  it('omits name segment when name sanitizes to empty string', () => {
    expect(resolveSwitchId('---', 'fb')).toBe('io-switch-fb');
  });

  it('omits name segment when name is an empty string', () => {
    expect(resolveSwitchId('', 'fb')).toBe('io-switch-fb');
  });
});

describe('getSwitchWrapperClass', () => {
  it('base class only when not disabled and no error', () => {
    expect(getSwitchWrapperClass(false, false)).toBe('switch-wrapper');
  });

  it('includes disabled modifier', () => {
    expect(getSwitchWrapperClass(true, false)).toContain('switch-wrapper--disabled');
  });

  it('includes error modifier', () => {
    expect(getSwitchWrapperClass(false, true)).toContain('switch-wrapper--error');
  });

  it('includes both modifiers when disabled and error', () => {
    const cls = getSwitchWrapperClass(true, true);
    expect(cls).toContain('switch-wrapper--disabled');
    expect(cls).toContain('switch-wrapper--error');
  });
});

describe('getSwitchTrackClass', () => {
  it('base class only when unchecked', () => {
    expect(getSwitchTrackClass(false)).toBe('switch-track');
  });

  it('includes checked modifier when checked', () => {
    expect(getSwitchTrackClass(true)).toContain('switch-track--checked');
  });
});

// ── io-switch.tsx render() branch coverage ────────────────────────────────────

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    reportValidity: vi.fn(),
    checkValidity: vi.fn(),
  };
}

function makeSwitch(overrides: Partial<IoSwitch> & { required?: boolean; error?: boolean; checked?: boolean } = {}) {
  const c = new IoSwitch();
  (c as any).el = document.createElement('io-switch');
  (c as any).internals = makeInternals();
  c.label = 'Test switch';
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

function renderAndGetCalls(c: IoSwitch) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[string, Record<string, unknown>, ...unknown[]]>;
}

describe('io-switch render() — error message branch', () => {
  it('renders error <p> when error=true and errorMessage is set', () => {
    const c = makeSwitch({ error: true });
    c.errorMessage = 'This field is required';
    const calls = renderAndGetCalls(c);

    const errorP = calls.find(([tag, attrs]) => tag === 'p' && String(attrs?.class).includes('switch-error'));
    expect(errorP).toBeDefined();
  });

  it('does not render error <p> when error=false', () => {
    const c = makeSwitch({ error: false });
    const calls = renderAndGetCalls(c);

    const errorP = calls.find(([tag, attrs]) => tag === 'p' && String(attrs?.class).includes('switch-error') && attrs?.role === 'alert');
    expect(errorP).toBeUndefined();
  });
});

describe('io-switch render() — faceInvalid (FACE error) branch', () => {
  it('renders face-error <p> when required=true and switch is unchecked', () => {
    const c = makeSwitch({ required: true, checked: false });
    // componentWillLoad sets faceInvalid=true for required+unchecked
    expect((c as any).faceInvalid).toBe(true);

    const calls = renderAndGetCalls(c);

    const faceErrorP = calls.find(([tag, attrs]) => tag === 'p' && String(attrs?.class).includes('switch-error'));
    expect(faceErrorP).toBeDefined();
  });

  it('aria-invalid is "true" on input when faceInvalid is true', () => {
    const c = makeSwitch({ required: true, checked: false });
    const calls = renderAndGetCalls(c);

    const inputCall = calls.find(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.type === 'checkbox');
    expect(inputCall).toBeDefined();
    expect(inputCall![1]['aria-invalid']).toBe('true');
  });
});

describe('io-switch render() — helper text branch', () => {
  it('renders helper <p> when helperText is set and no error', () => {
    const c = makeSwitch({ error: false });
    c.helperText = 'You can change this later.';
    const calls = renderAndGetCalls(c);

    const helperP = calls.find(([tag, attrs]) => tag === 'p' && String(attrs?.class).includes('switch-helper'));
    expect(helperP).toBeDefined();
  });

  it('does not render helper <p> when error=true (error takes precedence)', () => {
    const c = makeSwitch({ error: true });
    c.errorMessage = 'Required';
    c.helperText = 'Some helper text';
    const calls = renderAndGetCalls(c);

    const helperP = calls.find(([tag, attrs]) => tag === 'p' && String(attrs?.class).includes('switch-helper'));
    expect(helperP).toBeUndefined();
  });
});

describe('io-switch render() — required asterisk branch', () => {
  it('renders required asterisk span when required=true and switch is checked (no faceInvalid)', () => {
    const c = makeSwitch({ required: true, checked: true });
    // checked=true means valid → faceInvalid=false
    expect((c as any).faceInvalid).toBe(false);

    const calls = renderAndGetCalls(c);
    const requiredSpan = calls.find(([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('switch-required'));
    expect(requiredSpan).toBeDefined();
  });

  it('does not render required asterisk when required=false', () => {
    const c = makeSwitch({ required: false });
    const calls = renderAndGetCalls(c);

    const requiredSpan = calls.find(([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('switch-required'));
    expect(requiredSpan).toBeUndefined();
  });
});

describe('io-switch render() — aria-invalid absent when no error', () => {
  it('aria-invalid is undefined on input when no error and no faceInvalid', () => {
    const c = makeSwitch({ error: false, checked: false });
    const calls = renderAndGetCalls(c);

    const inputCall = calls.find(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.type === 'checkbox');
    expect(inputCall).toBeDefined();
    expect(inputCall![1]['aria-invalid']).toBeUndefined();
  });
});

describe('io-switch render() — describedBy combinations', () => {
  it('aria-describedby points to error id when error=true', () => {
    const c = makeSwitch({ error: true });
    c.errorMessage = 'Error!';
    const calls = renderAndGetCalls(c);

    const inputCall = calls.find(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.type === 'checkbox');
    expect(inputCall).toBeDefined();
    const describedBy = inputCall![1]['aria-describedby'] as string;
    expect(describedBy).toContain('error');
  });

  it('aria-describedby points to helper id when helperText is set', () => {
    const c = makeSwitch({ error: false, checked: true });
    c.helperText = 'Helper text';
    const calls = renderAndGetCalls(c);

    const inputCall = calls.find(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.type === 'checkbox');
    expect(inputCall).toBeDefined();
    const describedBy = inputCall![1]['aria-describedby'] as string;
    expect(describedBy).toContain('helper');
  });
});
