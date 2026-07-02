import { describe, it, expect } from 'vitest';
import {
  fieldsetStory,
  fieldsetStoryDefault,
  fieldsetStoryRequired,
  fieldsetStoryError,
  fieldsetPropDefinitions,
} from './io-fieldset.stories';

describe('io-fieldset storefront stories', () => {

  // ── Configurator story ──────────────────────────────────────────────────────

  describe('fieldsetStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => fieldsetStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = fieldsetStory.generator?.(fieldsetStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = fieldsetStory.generator?.(fieldsetStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(fieldsetStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof fieldsetStory.state?.properties).toBe('object');
    });

    it('root element tag is io-fieldset', () => {
      const els = fieldsetStory.generator?.(fieldsetStory.state) ?? [];
      const root = els[0] as { tag: string };
      expect(root.tag).toBe('io-fieldset');
    });

    it('generator with error=true does not throw', () => {
      expect(() =>
        fieldsetStory.generator?.({
          properties: { ...fieldsetStory.state?.properties, error: true, errorMessage: 'Required' },
        })
      ).not.toThrow();
    });

    it('generator with required=true does not throw', () => {
      expect(() =>
        fieldsetStory.generator?.({
          properties: { ...fieldsetStory.state?.properties, required: true },
        })
      ).not.toThrow();
    });

    it('frameworkCode does not throw with default state', () => {
      expect(() =>
        (fieldsetStory as { frameworkCode?: (state?: unknown) => unknown }).frameworkCode?.(fieldsetStory.state)
      ).not.toThrow();
    });

    it('frameworkCode with required=true includes required in HTML', () => {
      const code = (fieldsetStory as { frameworkCode?: (state?: unknown) => { html: string } }).frameworkCode?.({
        properties: { label: 'Test', required: true, error: false, errorMessage: '' },
      });
      expect(code?.html).toContain('required');
    });

    it('frameworkCode with error+errorMessage includes both in HTML', () => {
      const code = (fieldsetStory as { frameworkCode?: (state?: unknown) => { html: string } }).frameworkCode?.({
        properties: { label: 'Test', required: false, error: true, errorMessage: 'Fix this' },
      });
      expect(code?.html).toContain('error');
      expect(code?.html).toContain('Fix this');
    });

    it('frameworkCode without error omits errorMessage from HTML', () => {
      const code = (fieldsetStory as { frameworkCode?: (state?: unknown) => { html: string } }).frameworkCode?.({
        properties: { label: 'Test', required: false, error: false, errorMessage: 'ignored' },
      });
      expect(code?.html).not.toContain('error-message');
    });
  });

  // ── fieldsetPropDefinitions ─────────────────────────────────────────────────

  describe('fieldsetPropDefinitions', () => {
    it('is non-empty', () => {
      expect(fieldsetPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of fieldsetPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of fieldsetPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of fieldsetPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = fieldsetPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes label, required, error, and errorMessage', () => {
      const names = fieldsetPropDefinitions.map((d) => d.name);
      expect(names).toContain('label');
      expect(names).toContain('required');
      expect(names).toContain('error');
      expect(names).toContain('errorMessage');
    });
  });

  // ── Named example stories ───────────────────────────────────────────────────

  describe('fieldsetStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = fieldsetStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root tag is io-fieldset', () => {
      const els = fieldsetStoryDefault.generator?.() ?? [];
      const root = els[0] as { tag: string };
      expect(root.tag).toBe('io-fieldset');
    });

    it('does not throw', () => {
      expect(() => fieldsetStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('fieldsetStoryRequired (named story)', () => {
    it('generator returns non-empty array', () => {
      const els = fieldsetStoryRequired.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has required property', () => {
      const els = fieldsetStoryRequired.generator?.() ?? [];
      const root = els[0] as { tag: string; properties?: Record<string, unknown> };
      expect(root.properties?.['required']).toBe(true);
    });

    it('does not throw', () => {
      expect(() => fieldsetStoryRequired.generator?.()).not.toThrow();
    });
  });

  describe('fieldsetStoryError (named story)', () => {
    it('generator returns non-empty array', () => {
      const els = fieldsetStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has error=true', () => {
      const els = fieldsetStoryError.generator?.() ?? [];
      const root = els[0] as { tag: string; properties?: Record<string, unknown> };
      expect(root.properties?.['error']).toBe(true);
    });

    it('root element has errorMessage', () => {
      const els = fieldsetStoryError.generator?.() ?? [];
      const root = els[0] as { tag: string; properties?: Record<string, unknown> };
      expect(typeof root.properties?.['errorMessage']).toBe('string');
      expect((root.properties?.['errorMessage'] as string).length).toBeGreaterThan(0);
    });

    it('does not throw', () => {
      expect(() => fieldsetStoryError.generator?.()).not.toThrow();
    });
  });

});
