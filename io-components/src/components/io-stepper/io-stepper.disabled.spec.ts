import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoStep } from './io-step';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

// ─── Helper ────────────────────────────────────────────────────────────────

function getButtonAttrs(step: IoStep): Record<string, unknown> {
  hMock.mockClear();
  (step as any).render();
  const call = hMock.mock.calls.find(
    ([tag]: [unknown]) => tag === 'button',
  ) as [unknown, Record<string, unknown>] | undefined;
  return call?.[1] ?? {};
}

// ─── io-step — disabled step does not emit stepClick ─────────────────────

describe('io-step — disabled step does not emit stepClick', () => {
  let step: IoStep;
  let stepClickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    stepClickMock = vi.fn();
    (step as any).stepClick = { emit: stepClickMock };
  });

  it('does not emit stepClick when disabled=true on a complete step', () => {
    step.disabled = true;

    (step as any).handleClick();

    expect(stepClickMock).not.toHaveBeenCalled();
  });

  it('emits stepClick when disabled=false on a complete step', () => {
    step.disabled = false;

    (step as any).handleClick();

    expect(stepClickMock).toHaveBeenCalledOnce();
    expect(stepClickMock).toHaveBeenCalledWith({ index: 1 });
  });

  it('does not emit stepClick when disabled=true regardless of index', () => {
    step.disabled = true;
    step.index = 2;

    (step as any).handleClick();

    expect(stepClickMock).not.toHaveBeenCalled();
  });
});

// ─── io-step — disabled step has aria-disabled="true" ────────────────────

describe('io-step — disabled step aria-disabled', () => {
  it('sets aria-disabled="true" when disabled=true on a complete step', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = true;

    const attrs = getButtonAttrs(step);

    expect(attrs['aria-disabled']).toBe('true');
  });

  it('does not set aria-disabled when disabled=false on a complete step', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = false;

    const attrs = getButtonAttrs(step);

    expect(attrs['aria-disabled']).toBeUndefined();
  });

  it('does not set aria-disabled when disabled=true on current step (current step stays focusable)', () => {
    const step = new IoStep();
    step.label = 'Details';
    step.status = 'current';
    step.index = 2;
    step.total = 3;
    step.disabled = true;

    const attrs = getButtonAttrs(step);

    // disabled=true overrides current; (!isInteractive && !isCurrent) → false for current,
    // but disabled takes precedence via step__button--disabled class; aria-disabled is driven
    // by (!isInteractive && !isCurrent): isInteractive = isComplete && !disabled = false && false = false
    // isCurrent = true → (!false && !true) = false → aria-disabled remains undefined for current
    // This mirrors the existing spec pattern confirming current steps are always focusable.
    expect(attrs['aria-disabled']).toBeUndefined();
  });

  it('applies step__button--disabled class when disabled=true', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = true;

    const attrs = getButtonAttrs(step);

    expect(String(attrs['class'])).toContain('step__button--disabled');
  });

  it('does not apply step__button--disabled class when disabled=false', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = false;

    const attrs = getButtonAttrs(step);

    expect(String(attrs['class'])).not.toContain('step__button--disabled');
  });

  it('is not disabled by default', () => {
    const step = new IoStep();
    expect(step.disabled).toBe(false);
  });
});

// ─── io-step — non-interactive statuses block stepChange regardless of disabled ──

describe('io-step — non-complete statuses block stepClick emission', () => {
  it('does not emit stepClick for upcoming step (disabled=false)', () => {
    const step = new IoStep();
    step.label = 'Review';
    step.status = 'upcoming';
    step.index = 3;
    step.disabled = false;
    const stepClickMock = vi.fn();
    (step as any).stepClick = { emit: stepClickMock };

    (step as any).handleClick();

    expect(stepClickMock).not.toHaveBeenCalled();
  });

  it('does not emit stepClick for current step (disabled=false)', () => {
    const step = new IoStep();
    step.label = 'Details';
    step.status = 'current';
    step.index = 2;
    step.disabled = false;
    const stepClickMock = vi.fn();
    (step as any).stepClick = { emit: stepClickMock };

    (step as any).handleClick();

    expect(stepClickMock).not.toHaveBeenCalled();
  });

  it('does not emit stepClick for warning step (disabled=false)', () => {
    const step = new IoStep();
    step.label = 'Verify';
    step.status = 'warning';
    step.index = 2;
    step.disabled = false;
    const stepClickMock = vi.fn();
    (step as any).stepClick = { emit: stepClickMock };

    (step as any).handleClick();

    expect(stepClickMock).not.toHaveBeenCalled();
  });
});
