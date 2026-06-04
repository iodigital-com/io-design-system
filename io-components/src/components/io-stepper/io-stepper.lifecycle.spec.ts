import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoStepper } from './io-stepper';
import { IoStep } from './io-step';

function makeStepper() {
  const s = new IoStepper();
  (s as any).el = { querySelectorAll: vi.fn().mockReturnValue([]) };
  return s;
}

describe('io-stepper — lifecycle methods', () => {
  it('componentDidLoad calls updateSteps', () => {
    const s = makeStepper();
    const spy = vi.spyOn(s as any, 'updateSteps');
    s.componentDidLoad();
    expect(spy).toHaveBeenCalled();
  });

  it('onCurrentChange calls updateSteps', () => {
    const s = makeStepper();
    const spy = vi.spyOn(s as any, 'updateSteps');
    (s as any).onCurrentChange();
    expect(spy).toHaveBeenCalled();
  });

  it('onOrientationChange calls updateSteps', () => {
    const s = makeStepper();
    const spy = vi.spyOn(s as any, 'updateSteps');
    (s as any).onOrientationChange();
    expect(spy).toHaveBeenCalled();
  });

  it('handleSlotChange calls updateSteps', () => {
    const s = makeStepper();
    const spy = vi.spyOn(s as any, 'updateSteps');
    (s as any).handleSlotChange();
    expect(spy).toHaveBeenCalled();
  });
});

describe('io-step — watcher methods', () => {
  let step: IoStep;

  beforeEach(() => {
    step = new IoStep();
    step.label = 'Test step';
  });

  it('onTotalChange does not throw', () => {
    step.total = 5;
    expect(() => (step as any).onTotalChange()).not.toThrow();
  });

  it('onIndexChange does not throw', () => {
    step.index = 2;
    expect(() => (step as any).onIndexChange()).not.toThrow();
  });
});

describe('io-step — render() branch coverage', () => {
  it('render() with index=0 does not throw', () => {
    const step = new IoStep();
    step.label = 'Account';
    step.index = 0;
    step.total = 0;
    expect(() => step.render()).not.toThrow();
  });

  it('render() with isLast=true (index === total) does not throw', () => {
    const step = new IoStep();
    step.label = 'Last';
    step.index = 3;
    step.total = 3;
    expect(() => step.render()).not.toThrow();
  });
});
