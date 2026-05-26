import { describe, it, expect } from 'vitest';
import {
  stepperStory,
  stepperPropDefinitions,
  stepperStoryHorizontal,
  stepperStoryVertical,
  stepperStoryStatuses,
  stepperStoryFiveSteps,
} from './io-stepper.stories';

describe('io-stepper storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('stepperStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => stepperStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = stepperStory.generator?.(stepperStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = stepperStory.generator?.(stepperStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(stepperStory.state?.properties).toBeDefined();
    });

    it('first element has tag io-stepper', () => {
      const els = stepperStory.generator?.(stepperStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-stepper');
    });

    it('generator produces io-step children', () => {
      const els = stepperStory.generator?.(stepperStory.state) ?? [];
      const first = els[0] as { children?: Array<{ tag: string }> };
      expect(Array.isArray(first.children)).toBe(true);
      expect(first.children!.length).toBeGreaterThan(0);
      expect(first.children!.every((c) => c.tag === 'io-step')).toBe(true);
    });

    it('generator forwards current from properties', () => {
      const els = stepperStory.generator?.({ properties: { current: 1 } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.current).toBe(1);
    });

    it('generator forwards orientation from properties', () => {
      const els = stepperStory.generator?.({ properties: { orientation: 'vertical' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.orientation).toBe('vertical');
    });

    it('step before current has complete status', () => {
      const els = stepperStory.generator?.({ properties: { current: 3 } }) ?? [];
      const first = els[0] as { children: Array<{ properties: Record<string, unknown> }> };
      // step at index 1 (label 'Account') is before current=3, should be complete
      expect(first.children[0].properties.status).toBe('complete');
    });

    it('step at current index has current status', () => {
      const els = stepperStory.generator?.({ properties: { current: 2 } }) ?? [];
      const first = els[0] as { children: Array<{ properties: Record<string, unknown> }> };
      // step at index 1 (1-based step 2) should be current
      const currentStep = first.children.find((c) => c.properties.status === 'current');
      expect(currentStep).toBeDefined();
    });

    it('step after current has upcoming status', () => {
      const els = stepperStory.generator?.({ properties: { current: 1 } }) ?? [];
      const first = els[0] as { children: Array<{ properties: Record<string, unknown> }> };
      // steps after current=1 should be upcoming
      const upcomingSteps = first.children.filter((c) => c.properties.status === 'upcoming');
      expect(upcomingSteps.length).toBeGreaterThan(0);
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('stepperPropDefinitions', () => {
    it('is non-empty', () => {
      expect(stepperPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of stepperPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of stepperPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of stepperPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of stepperPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = stepperPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = stepperPropDefinitions.map((d) => d.name);
      expect(names).toContain('current');
      expect(names).toContain('orientation');
    });

    it('orientation prop has horizontal and vertical options', () => {
      const orientationDef = stepperPropDefinitions.find((d) => d.name === 'orientation');
      expect(((orientationDef as unknown as { options: string[] } | undefined))?.options).toEqual(expect.arrayContaining(['horizontal', 'vertical']));
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of stepperPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            stepperStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('stepperStoryHorizontal', () => {
    it('generator returns non-empty array', () => {
      const els = stepperStoryHorizontal.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(stepperStoryHorizontal.state?.properties).toBeDefined();
    });

    it('first element has tag io-stepper', () => {
      const els = stepperStoryHorizontal.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-stepper');
    });

    it('orientation is horizontal', () => {
      const els = stepperStoryHorizontal.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.orientation).toBe('horizontal');
    });

    it('has three io-step children', () => {
      const els = stepperStoryHorizontal.generator?.() ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBe(3);
    });
  });

  describe('stepperStoryVertical', () => {
    it('generator returns non-empty array', () => {
      const els = stepperStoryVertical.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('orientation is vertical', () => {
      const els = stepperStoryVertical.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.orientation).toBe('vertical');
    });
  });

  describe('stepperStoryStatuses', () => {
    it('generator returns non-empty array', () => {
      const els = stepperStoryStatuses.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('children represent all three statuses', () => {
      const els = stepperStoryStatuses.generator?.() ?? [];
      const first = els[0] as { children: Array<{ properties: Record<string, unknown> }> };
      const statuses = first.children.map((c) => c.properties.status);
      expect(statuses).toContain('complete');
      expect(statuses).toContain('current');
      expect(statuses).toContain('upcoming');
    });
  });

  describe('stepperStoryFiveSteps', () => {
    it('generator returns non-empty array', () => {
      const els = stepperStoryFiveSteps.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has five io-step children', () => {
      const els = stepperStoryFiveSteps.generator?.() ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBe(5);
    });
  });
});
