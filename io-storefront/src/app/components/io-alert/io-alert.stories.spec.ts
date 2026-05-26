import { describe, it, expect } from 'vitest';
import { alertStory, alertPropDefinitions } from './io-alert.stories';

describe('io-alert storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('alertStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => alertStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = alertStory.generator?.(alertStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = alertStory.generator?.(alertStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(alertStory.state.properties).toBeDefined();
    });

    it('generator with variant=info does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, variant: 'info' } }),
      ).not.toThrow();
    });

    it('generator with variant=success does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, variant: 'success' } }),
      ).not.toThrow();
    });

    it('generator with variant=warning does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, variant: 'warning' } }),
      ).not.toThrow();
    });

    it('generator with variant=error does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, variant: 'error' } }),
      ).not.toThrow();
    });

    it('generator with empty heading does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, heading: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty heading does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, heading: 'Session warning' } }),
      ).not.toThrow();
    });

    it('generator with dismissible=true does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, dismissible: true } }),
      ).not.toThrow();
    });

    it('generator with dismissible=false does not throw', () => {
      expect(() =>
        alertStory.generator?.({ properties: { ...alertStory.state.properties, dismissible: false } }),
      ).not.toThrow();
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('alertPropDefinitions', () => {
    it('is non-empty', () => {
      expect(alertPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of alertPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of alertPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of alertPropDefinitions.filter((d) => d.type === 'select')) {
        expect(def.options).toBeDefined();
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of alertPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = alertPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });

    it('variant definition includes info, success, warning, error options', () => {
      const variantDef = alertPropDefinitions.find((d) => d.name === 'variant');
      expect(variantDef).toBeDefined();
      expect(variantDef!.options).toContain('info');
      expect(variantDef!.options).toContain('success');
      expect(variantDef!.options).toContain('warning');
      expect(variantDef!.options).toContain('error');
    });
  });
});
