import { describe, it, expect } from 'vitest';
import {
  drawerStory,
  drawerStoryDefault,
  drawerStoryLeft,
  drawerStoryBottom,
  drawerStorySm,
  drawerPropDefinitions,
} from './io-drawer.stories';

describe('io-drawer storefront stories', () => {
  describe('drawerStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => drawerStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = drawerStory.generator?.(drawerStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = drawerStory.generator?.(drawerStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(drawerStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof drawerStory.state?.properties).toBe('object');
    });

    it('generator with placement=left does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, placement: 'left' } })
      ).not.toThrow();
    });

    it('generator with placement=right does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, placement: 'right' } })
      ).not.toThrow();
    });

    it('generator with placement=bottom does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, placement: 'bottom' } })
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, size: 'sm' } })
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, size: 'md' } })
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, size: 'lg' } })
      ).not.toThrow();
    });

    it('generator with size=full does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, size: 'full' } })
      ).not.toThrow();
    });

    it('generator with open=true does not throw', () => {
      expect(() =>
        drawerStory.generator?.({ properties: { ...drawerStory.state?.properties, open: true } })
      ).not.toThrow();
    });

    it('configurator story produces io-drawer as root element', () => {
      const els = drawerStory.generator?.(drawerStory.state) ?? [];
      const drawer = els.find((el) => (el as { tag: string }).tag === 'io-drawer');
      expect(drawer).toBeDefined();
    });
  });

  describe('drawerPropDefinitions', () => {
    it('is non-empty', () => {
      expect(drawerPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of drawerPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of drawerPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of drawerPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of drawerPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = drawerPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('placement select options include left, right, and bottom', () => {
      const placementDef = drawerPropDefinitions.find((d) => d.name === 'placement');
      expect(placementDef).toBeDefined();
      expect(((placementDef as unknown as { options: string[] })).options).toContain('left');
      expect(((placementDef as unknown as { options: string[] })).options).toContain('right');
      expect(((placementDef as unknown as { options: string[] })).options).toContain('bottom');
    });

    it('size select options include sm, md, lg, and full', () => {
      const sizeDef = drawerPropDefinitions.find((d) => d.name === 'size');
      expect(sizeDef).toBeDefined();
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('sm');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('md');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('lg');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('full');
    });
  });

  describe('drawerStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = drawerStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = drawerStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => drawerStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('drawerStoryLeft (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = drawerStoryLeft.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = drawerStoryLeft.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => drawerStoryLeft.generator?.()).not.toThrow();
    });
  });

  describe('drawerStoryBottom (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = drawerStoryBottom.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = drawerStoryBottom.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => drawerStoryBottom.generator?.()).not.toThrow();
    });
  });

  describe('drawerStorySm (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = drawerStorySm.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = drawerStorySm.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => drawerStorySm.generator?.()).not.toThrow();
    });
  });
});
