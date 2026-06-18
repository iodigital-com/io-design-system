import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoStepper } from './io-stepper';
import { IoStep } from './io-step';

// ─── io-stepper stepChange via enabled step click ─────────────────────────

describe('io-stepper — stepChange event via enabled step click', () => {
  let stepper: IoStepper;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    stepper = new IoStepper();
    (stepper as any).el = document.createElement('io-stepper');
    emitMock = vi.fn();
    (stepper as any).stepChange = { emit: emitMock };
  });

  it('emits stepChange with activeStepIndex 0 when first step is clicked', () => {
    const fakeEvent = {
      stopPropagation: vi.fn(),
      detail: { index: 1 },
    } as any;

    (stepper as any).onStepClick(fakeEvent);

    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ activeStepIndex: 0 });
  });

  it('emits stepChange with activeStepIndex 1 when second step is clicked', () => {
    const fakeEvent = {
      stopPropagation: vi.fn(),
      detail: { index: 2 },
    } as any;

    (stepper as any).onStepClick(fakeEvent);

    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ activeStepIndex: 1 });
  });

  it('emits stepChange with activeStepIndex 2 when third step is clicked', () => {
    const fakeEvent = {
      stopPropagation: vi.fn(),
      detail: { index: 3 },
    } as any;

    (stepper as any).onStepClick(fakeEvent);

    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ activeStepIndex: 2 });
  });

  it('calls stopPropagation on the received stepClick event', () => {
    const fakeEvent = {
      stopPropagation: vi.fn(),
      detail: { index: 1 },
    } as any;

    (stepper as any).onStepClick(fakeEvent);

    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });

  it('converts 1-based step index to 0-based activeStepIndex', () => {
    const results: number[] = [];
    emitMock.mockImplementation((detail: { activeStepIndex: number }) => {
      results.push(detail.activeStepIndex);
    });

    for (let i = 1; i <= 5; i++) {
      const fakeEvent = {
        stopPropagation: vi.fn(),
        detail: { index: i },
      } as any;
      (stepper as any).onStepClick(fakeEvent);
    }

    expect(results).toEqual([0, 1, 2, 3, 4]);
  });
});

// ─── io-step handleClick — enabled step emits stepClick ──────────────────

describe('io-step — handleClick emits stepClick for enabled complete step', () => {
  let step: IoStep;
  let stepClickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    step = new IoStep();
    step.label = 'Account';
    step.status = 'complete';
    step.index = 1;
    step.total = 3;
    step.disabled = false;
    stepClickMock = vi.fn();
    (step as any).stepClick = { emit: stepClickMock };
  });

  it('emits stepClick with correct index when complete non-disabled step is clicked', () => {
    (step as any).handleClick();

    expect(stepClickMock).toHaveBeenCalledOnce();
    expect(stepClickMock).toHaveBeenCalledWith({ index: 1 });
  });

  it('emits stepClick with correct index for second complete step', () => {
    step.index = 2;

    (step as any).handleClick();

    expect(stepClickMock).toHaveBeenCalledOnce();
    expect(stepClickMock).toHaveBeenCalledWith({ index: 2 });
  });
});
