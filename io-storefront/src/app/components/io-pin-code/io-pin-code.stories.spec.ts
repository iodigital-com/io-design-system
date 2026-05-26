import { describe, it, expect } from 'vitest';
import {
  pinCodeStory,
  pinCodePropDefinitions,
  pinCodeStorySixDigit,
  pinCodeStoryPassword,
  pinCodeStoryError,
  pinCodeStorySuccess,
} from './io-pin-code.stories';

describe('io-pin-code storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('pinCodeStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => pinCodeStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = pinCodeStory.generator?.(pinCodeStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = pinCodeStory.generator?.(pinCodeStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(pinCodeStory.state?.properties).toBeDefined();
    });

    it('generator forwards label from properties', () => {
      const els = pinCodeStory.generator?.({ properties: { label: 'Custom label' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Custom label');
    });

    it('generator forwards length from properties', () => {
      const els = pinCodeStory.generator?.({ properties: { length: 6 } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.length).toBe(6);
    });

    it('generator forwards type from properties', () => {
      const els = pinCodeStory.generator?.({ properties: { type: 'password' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.type).toBe('password');
    });

    it('generator forwards disabled from properties', () => {
      const els = pinCodeStory.generator?.({ properties: { disabled: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });

    it('generator forwards required from properties', () => {
      const els = pinCodeStory.generator?.({ properties: { required: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.required).toBe(true);
    });

    it('generator forwards state from properties', () => {
      const els = pinCodeStory.generator?.({ properties: { state: 'error' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.state).toBe('error');
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('pinCodePropDefinitions', () => {
    it('is non-empty', () => {
      expect(pinCodePropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of pinCodePropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of pinCodePropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of pinCodePropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of pinCodePropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = pinCodePropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = pinCodePropDefinitions.map((d) => d.name);
      expect(names).toContain('label');
      expect(names).toContain('length');
      expect(names).toContain('type');
      expect(names).toContain('disabled');
      expect(names).toContain('required');
      expect(names).toContain('state');
      expect(names).toContain('message');
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of pinCodePropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            pinCodeStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('pinCodeStorySixDigit', () => {
    it('generator returns non-empty array', () => {
      const els = pinCodeStorySixDigit.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces a length-6 pin code element', () => {
      const els = pinCodeStorySixDigit.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.length).toBe(6);
    });

    it('first element has tag io-pin-code', () => {
      const els = pinCodeStorySixDigit.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-pin-code');
    });
  });

  describe('pinCodeStoryPassword', () => {
    it('generator returns non-empty array', () => {
      const els = pinCodeStoryPassword.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces a password type element', () => {
      const els = pinCodeStoryPassword.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.type).toBe('password');
    });
  });

  describe('pinCodeStoryError', () => {
    it('generator returns non-empty array', () => {
      const els = pinCodeStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces an error state element', () => {
      const els = pinCodeStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.state).toBe('error');
    });
  });

  describe('pinCodeStorySuccess', () => {
    it('generator returns non-empty array', () => {
      const els = pinCodeStorySuccess.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces a success state element', () => {
      const els = pinCodeStorySuccess.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.state).toBe('success');
    });
  });

});
