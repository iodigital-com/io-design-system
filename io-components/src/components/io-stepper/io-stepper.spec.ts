import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoStepper } from './io-stepper';
import { IoStep } from './io-step';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

// ─── Helpers ───────────────────────────────────────────────────────────────

function getButtonAttrs(step: IoStep): Record<string, unknown> {
  hMock.mockClear();
  (step as any).render();
  const call = hMock.mock.calls.find(
    ([tag]: [unknown]) => tag === 'button',
  ) as [unknown, Record<string, unknown>] | undefined;
  return call?.[1] ?? {};
}

function getNavAttrs(stepper: IoStepper): Record<string, unknown> {
  hMock.mockClear();
  (stepper as any).render();
  const call = hMock.mock.calls.find(
    ([tag]: [unknown]) => tag === 'nav',
  ) as [unknown, Record<string, unknown>] | undefined;
  return call?.[1] ?? {};
}

// ─── io-stepper default props ──────────────────────────────────────────────

describe('io-stepper — default props', () => {
  let component: IoStepper;

  beforeEach(() => {
    component = new IoStepper();
    (component as any).el = document.createElement('io-stepper');
  });

  it('has current 1 by default', () => {
    expect(component.current).toBe(1);
  });

  it('has horizontal orientation by default', () => {
    expect(component.orientation).toBe('horizontal');
  });

  it('has ariaLabel "Progress" by default', () => {
    expect(component.ariaLabel).toBe('Progress');
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when orientation is vertical', () => {
    component.orientation = 'vertical';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when current is 3', () => {
    component.current = 3;
    expect(() => component.render()).not.toThrow();
  });
});

// ─── io-stepper ariaLabel prop ─────────────────────────────────────────────

describe('io-stepper — ariaLabel prop', () => {
  it('applies default ariaLabel "Progress" to nav element', () => {
    const stepper = new IoStepper();
    (stepper as any).el = document.createElement('io-stepper');
    const attrs = getNavAttrs(stepper);
    expect(attrs['aria-label']).toBe('Progress');
  });

  it('applies custom ariaLabel to nav element', () => {
    const stepper = new IoStepper();
    (stepper as any).el = document.createElement('io-stepper');
    stepper.ariaLabel = 'Checkout progress';
    const attrs = getNavAttrs(stepper);
    expect(attrs['aria-label']).toBe('Checkout progress');
  });
});

// ─── io-stepper stepChange event ──────────────────────────────────────────

describe('io-stepper — stepChange event', () => {
  it('emits stepChange when onStepClick is called', () => {
    const stepper = new IoStepper();
    (stepper as any).el = document.createElement('io-stepper');
    const emitted: any[] = [];
    (stepper as any).stepChange = { emit: (detail: any) => emitted.push(detail) };

    const fakeEvent = {
      stopPropagation: vi.fn(),
      detail: { index: 2 },
    } as any;
    (stepper as any).onStepClick(fakeEvent);

    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toEqual({ activeStepIndex: 1 });
  });

  it('emits stepChange with correct index for first step', () => {
    const stepper = new IoStepper();
    (stepper as any).el = document.createElement('io-stepper');
    const emitted: any[] = [];
    (stepper as any).stepChange = { emit: (detail: any) => emitted.push(detail) };

    const fakeEvent = {
      stopPropagation: vi.fn(),
      detail: { index: 1 },
    } as any;
    (stepper as any).onStepClick(fakeEvent);

    expect(emitted[0]).toEqual({ activeStepIndex: 0 });
  });
});

// ─── io-stepper updateSteps ────────────────────────────────────────────────

describe('io-stepper — updateSteps()', () => {
  it('sets index, total, and orientation on io-step children', () => {
    const stepper = new IoStepper();
    const mockStep1 = document.createElement('io-step') as any;
    const mockStep2 = document.createElement('io-step') as any;

    const mockEl = {
      querySelectorAll: vi.fn().mockReturnValue([mockStep1, mockStep2]),
    };
    (stepper as any).el = mockEl;
    stepper.current = 1;
    stepper.orientation = 'horizontal';

    (stepper as any).updateSteps();

    expect(mockStep1.index).toBe(1);
    expect(mockStep1.total).toBe(2);
    expect(mockStep1.orientation).toBe('horizontal');
    expect(mockStep2.index).toBe(2);
    expect(mockStep2.total).toBe(2);
    expect(mockStep2.orientation).toBe('horizontal');
  });

  it('propagates vertical orientation to children', () => {
    const stepper = new IoStepper();
    const mockStep = document.createElement('io-step') as any;

    const mockEl = {
      querySelectorAll: vi.fn().mockReturnValue([mockStep]),
    };
    (stepper as any).el = mockEl;
    stepper.orientation = 'vertical';

    (stepper as any).updateSteps();

    expect(mockStep.orientation).toBe('vertical');
    expect(mockStep.total).toBe(1);
  });

  it('handles empty step list without throwing', () => {
    const stepper = new IoStepper();
    (stepper as any).el = {
      querySelectorAll: vi.fn().mockReturnValue([]),
    };
    expect(() => (stepper as any).updateSteps()).not.toThrow();
  });
});

// ─── io-step default props ─────────────────────────────────────────────────

describe('io-step — default props', () => {
  it('has status upcoming by default', () => {
    const step = new IoStep();
    expect(step.status).toBe('upcoming');
  });

  it('has index 0 by default', () => {
    const step = new IoStep();
    expect(step.index).toBe(0);
  });

  it('has total 0 by default', () => {
    const step = new IoStep();
    expect(step.total).toBe(0);
  });

  it('has horizontal orientation by default', () => {
    const step = new IoStep();
    expect(step.orientation).toBe('horizontal');
  });

  it('has disabled false by default', () => {
    const step = new IoStep();
    expect(step.disabled).toBe(false);
  });

  it('renders without throwing for status=current', () => {
    const step = new IoStep();
    step.label = 'Details';
    step.status = 'current';
    step.index = 2;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });

  it('renders without throwing for status=complete', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });

  it('renders without throwing for status=upcoming', () => {
    const step = new IoStep();
    step.label = 'Review';
    step.status = 'upcoming';
    step.index = 3;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });

  it('renders without throwing for status=warning', () => {
    const step = new IoStep();
    step.label = 'Verify';
    step.status = 'warning';
    step.index = 2;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });

  it('renders without throwing for vertical orientation', () => {
    const step = new IoStep();
    step.label = 'Payment';
    step.status = 'current';
    step.orientation = 'vertical';
    expect(() => step.render()).not.toThrow();
  });

  it('renders without throwing when index equals total (last step)', () => {
    const step = new IoStep();
    step.label = 'Confirm';
    step.status = 'upcoming';
    step.index = 3;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });
});

// ─── io-step button wrapper ────────────────────────────────────────────────

describe('io-step — button wrapper (WCAG 2.1.1/4.1.2)', () => {
  it('renders a <button> element in the step', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    hMock.mockClear();
    step.render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'button');
    expect(buttonCall).toBeDefined();
  });

  it('aria-current="step" is set on current step button', () => {
    const step = new IoStep();
    step.label = 'Details';
    step.status = 'current';
    step.index = 2;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-current']).toBe('step');
  });

  it('aria-current is not set on non-current steps', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-current']).toBeUndefined();
  });

  it('aria-disabled="true" is set on upcoming step button', () => {
    const step = new IoStep();
    step.label = 'Review';
    step.status = 'upcoming';
    step.index = 3;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-disabled']).toBe('true');
  });

  it('aria-disabled is not set on complete (interactive) step', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-disabled']).toBeUndefined();
  });

  it('aria-disabled is not set on current step (current is focusable, not disabled)', () => {
    const step = new IoStep();
    step.label = 'Details';
    step.status = 'current';
    step.index = 2;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-disabled']).toBeUndefined();
  });

  it('button has type="button" to prevent accidental form submission', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['type']).toBe('button');
  });
});

// ─── io-step stepClick event ───────────────────────────────────────────────

describe('io-step — stepClick event', () => {
  it('emits stepClick when complete non-disabled step handleClick is called', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.disabled = false;

    const emitted: any[] = [];
    (step as any).stepClick = { emit: (detail: any) => emitted.push(detail) };

    (step as any).handleClick();

    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toEqual({ index: 1 });
  });

  it('does not emit stepClick for upcoming step', () => {
    const step = new IoStep();
    step.label = 'Review';
    step.status = 'upcoming';
    step.index = 3;

    const emitted: any[] = [];
    (step as any).stepClick = { emit: (detail: any) => emitted.push(detail) };

    (step as any).handleClick();

    expect(emitted).toHaveLength(0);
  });

  it('does not emit stepClick for current step', () => {
    const step = new IoStep();
    step.label = 'Details';
    step.status = 'current';
    step.index = 2;

    const emitted: any[] = [];
    (step as any).stepClick = { emit: (detail: any) => emitted.push(detail) };

    (step as any).handleClick();

    expect(emitted).toHaveLength(0);
  });

  it('does not emit stepClick when disabled=true even if complete', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.disabled = true;

    const emitted: any[] = [];
    (step as any).stepClick = { emit: (detail: any) => emitted.push(detail) };

    (step as any).handleClick();

    expect(emitted).toHaveLength(0);
  });

  it('does not emit stepClick for warning step', () => {
    const step = new IoStep();
    step.label = 'Verify';
    step.status = 'warning';
    step.index = 2;

    const emitted: any[] = [];
    (step as any).stepClick = { emit: (detail: any) => emitted.push(detail) };

    (step as any).handleClick();

    expect(emitted).toHaveLength(0);
  });
});

// ─── io-step warning status ────────────────────────────────────────────────

describe('io-step — warning status', () => {
  it('renders without throwing for status=warning', () => {
    const step = new IoStep();
    step.label = 'Verify';
    step.status = 'warning';
    step.index = 2;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });

  it('aria-disabled is set for warning step (non-interactive)', () => {
    const step = new IoStep();
    step.label = 'Verify';
    step.status = 'warning';
    step.index = 2;
    step.total = 3;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-disabled']).toBe('true');
  });

  it('renders a warning SVG icon for status=warning', () => {
    const step = new IoStep();
    step.label = 'Verify';
    step.status = 'warning';
    step.index = 2;
    step.total = 3;
    hMock.mockClear();
    step.render();
    // Warning icon is an SVG with class step__warning-icon
    const svgCall = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'svg' &&
        attrs &&
        typeof attrs === 'object' &&
        (attrs as Record<string, unknown>)['class'] === 'step__warning-icon',
    );
    expect(svgCall).toBeDefined();
  });
});

// ─── io-step disabled prop ─────────────────────────────────────────────────

describe('io-step — disabled prop', () => {
  it('renders without throwing when disabled=true', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = true;
    expect(() => step.render()).not.toThrow();
  });

  it('aria-disabled is set when disabled=true on complete step', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = true;
    const attrs = getButtonAttrs(step);
    expect(attrs['aria-disabled']).toBe('true');
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
});
