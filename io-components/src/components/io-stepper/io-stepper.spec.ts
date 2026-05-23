import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoStepper } from './io-stepper';
import { IoStep } from './io-step';

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
