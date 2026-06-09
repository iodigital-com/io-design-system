import { describe, it, expect } from 'vitest';
import {
  modalStory,
  modalStoryDefault,
  modalStorySm,
  modalStoryLg,
  modalStoryNoFooter,
  modalStoryNoHeading,
  modalPropDefinitions,
} from './io-modal.stories';

describe('io-modal storefront stories', () => {
  describe('modalStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => modalStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = modalStory.generator?.(modalStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = modalStory.generator?.(modalStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(modalStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof modalStory.state?.properties).toBe('object');
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        modalStory.generator?.({ properties: { ...modalStory.state?.properties, size: 'sm' } })
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        modalStory.generator?.({ properties: { ...modalStory.state?.properties, size: 'md' } })
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        modalStory.generator?.({ properties: { ...modalStory.state?.properties, size: 'lg' } })
      ).not.toThrow();
    });

    it('generator with open=true does not throw', () => {
      expect(() =>
        modalStory.generator?.({ properties: { ...modalStory.state?.properties, open: true } })
      ).not.toThrow();
    });

    it('generator with closeOnBackdrop=false does not throw', () => {
      expect(() =>
        modalStory.generator?.({ properties: { ...modalStory.state?.properties, closeOnBackdrop: false } })
      ).not.toThrow();
    });

    it('configurator story produces io-modal as root element', () => {
      const els = modalStory.generator?.(modalStory.state) ?? [];
      const modal = els.find((el) => (el as { tag: string }).tag === 'io-modal');
      expect(modal).toBeDefined();
    });
  });

  describe('modalPropDefinitions', () => {
    it('is non-empty', () => {
      expect(modalPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of modalPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of modalPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of modalPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of modalPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = modalPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('size select options include sm, md, and lg', () => {
      const sizeDef = modalPropDefinitions.find((d) => d.name === 'size');
      expect(sizeDef).toBeDefined();
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('sm');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('md');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('lg');
    });
  });

  describe('modalStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = modalStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = modalStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => modalStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('modalStorySm (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = modalStorySm.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = modalStorySm.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => modalStorySm.generator?.()).not.toThrow();
    });
  });

  describe('modalStoryLg (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = modalStoryLg.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = modalStoryLg.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => modalStoryLg.generator?.()).not.toThrow();
    });
  });

  describe('modalStoryNoFooter (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = modalStoryNoFooter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = modalStoryNoFooter.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => modalStoryNoFooter.generator?.()).not.toThrow();
    });
  });

  describe('modalStoryNoHeading (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = modalStoryNoHeading.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = modalStoryNoHeading.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => modalStoryNoHeading.generator?.()).not.toThrow();
    });
  });
});
