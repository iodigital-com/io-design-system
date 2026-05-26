import { describe, it, expect } from 'vitest';
import {
  badgeStory,
  badgePropDefinitions,
  badgeStoryVariants,
  badgeStorySizes,
} from './io-badge.stories';

describe('io-badge storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('badgeStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => badgeStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = badgeStory.generator?.(badgeStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = badgeStory.generator?.(badgeStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(badgeStory.state?.properties).toBeDefined();
    });

    it('generator with variant=beige does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'beige' } }),
      ).not.toThrow();
    });

    it('generator with variant=blue does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'blue' } }),
      ).not.toThrow();
    });

    it('generator with variant=dark does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'dark' } }),
      ).not.toThrow();
    });

    it('generator with variant=orange does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'orange' } }),
      ).not.toThrow();
    });

    it('generator with variant=rouge does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'rouge' } }),
      ).not.toThrow();
    });

    it('generator with variant=success does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'success' } }),
      ).not.toThrow();
    });

    it('generator with variant=warning does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'warning' } }),
      ).not.toThrow();
    });

    it('generator with variant=error does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'error' } }),
      ).not.toThrow();
    });

    it('generator with variant=outline does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, variant: 'outline' } }),
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, size: 'sm' } }),
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        badgeStory.generator?.({ properties: { ...badgeStory.state?.properties, size: 'md' } }),
      ).not.toThrow();
    });

    it('configurator story produces io-badge as root element', () => {
      const els = badgeStory.generator?.(badgeStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-badge');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('badgePropDefinitions', () => {
    it('is non-empty', () => {
      expect(badgePropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of badgePropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of badgePropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of badgePropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of badgePropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = badgePropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('badgeStoryVariants', () => {
    it('generator returns non-empty array', () => {
      const els = badgeStoryVariants.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = badgeStoryVariants.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('badgeStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = badgeStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = badgeStorySizes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
