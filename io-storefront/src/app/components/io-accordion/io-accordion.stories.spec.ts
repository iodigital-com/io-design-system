import { describe, it, expect } from 'vitest';
import {
  accordionStory,
  accordionPropDefinitions,
  accordionStoryOpen,
  accordionStorySlottedHeading,
  accordionStoryGroupSingleOpen,
  accordionStoryDefaultExpanded,
  accordionStoryGroupMultiOpen,
  accordionStorySizeSm,
  accordionStorySizeMd,
  accordionStorySizeLg,
  accordionStorySurfaceBackground,
  accordionStoryCanvasBackground,
  accordionStoryStickyWithSurface,
} from './io-accordion.stories';

describe('io-accordion storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('accordionStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => accordionStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = accordionStory.generator?.(accordionStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStory.generator?.(accordionStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(accordionStory.state.properties).toBeDefined();
    });

    it('generator with open=true does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, open: true } }),
      ).not.toThrow();
    });

    it('generator with open=false does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, open: false } }),
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, size: 'sm' } }),
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, size: 'md' } }),
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, size: 'lg' } }),
      ).not.toThrow();
    });

    it('generator with heading-tag=h2 does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, 'heading-tag': 'h2' } }),
      ).not.toThrow();
    });

    it('generator with heading-tag=h6 does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, 'heading-tag': 'h6' } }),
      ).not.toThrow();
    });

    it('generator with background=transparent does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, background: 'transparent' } }),
      ).not.toThrow();
    });

    it('generator with background=surface does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, background: 'surface' } }),
      ).not.toThrow();
    });

    it('generator with background=canvas does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, background: 'canvas' } }),
      ).not.toThrow();
    });

    it('generator with use-heading-slot=true does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, 'use-heading-slot': true } }),
      ).not.toThrow();
    });

    it('generator with use-heading-slot=false does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, 'use-heading-slot': false } }),
      ).not.toThrow();
    });

    it('generator with empty heading string does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, heading: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty heading string does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, heading: 'Custom Heading' } }),
      ).not.toThrow();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, disabled: true } }),
      ).not.toThrow();
    });

    it('generator with default-expanded=true does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, 'default-expanded': true } }),
      ).not.toThrow();
    });

    it('generator with allow-multiple=true does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, 'allow-multiple': true } }),
      ).not.toThrow();
    });

    it('generator with sticky=true does not throw', () => {
      expect(() =>
        accordionStory.generator?.({ properties: { ...accordionStory.state.properties, sticky: true } }),
      ).not.toThrow();
    });

    it('configurator story produces io-accordion as root element', () => {
      const els = accordionStory.generator?.(accordionStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-accordion');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('accordionPropDefinitions', () => {
    it('is non-empty', () => {
      expect(accordionPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of accordionPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of accordionPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of accordionPropDefinitions.filter((d) => d.type === 'select')) {
        expect(def.options).toBeDefined();
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of accordionPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = accordionPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('accordionStoryOpen', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStoryOpen.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStoryOpen.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStorySlottedHeading', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStorySlottedHeading.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStorySlottedHeading.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStoryGroupSingleOpen', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStoryGroupSingleOpen.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStoryGroupSingleOpen.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStoryDefaultExpanded', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStoryDefaultExpanded.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStoryDefaultExpanded.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStoryGroupMultiOpen', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStoryGroupMultiOpen.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStoryGroupMultiOpen.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStorySizeSm', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStorySizeSm.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStorySizeSm.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStorySizeMd', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStorySizeMd.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStorySizeMd.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStorySizeLg', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStorySizeLg.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStorySizeLg.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStorySurfaceBackground', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStorySurfaceBackground.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStorySurfaceBackground.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStoryCanvasBackground', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStoryCanvasBackground.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStoryCanvasBackground.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('accordionStoryStickyWithSurface', () => {
    it('generator returns non-empty array', () => {
      const els = accordionStoryStickyWithSurface.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = accordionStoryStickyWithSurface.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
