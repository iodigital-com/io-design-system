import { describe, it, expect } from 'vitest';
import {
  wordmarkStory,
  wordmarkPropDefinitions,
  wordmarkStorySizes,
  wordmarkStoryMono,
} from './io-wordmark.stories';

describe('io-wordmark storefront stories', () => {
  describe('wordmarkStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => wordmarkStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = wordmarkStory.generator?.(wordmarkStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = wordmarkStory.generator?.(wordmarkStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(wordmarkStory.state?.properties).toBeDefined();
    });

    it('generator produces io-wordmark tag', () => {
      const els = wordmarkStory.generator?.(wordmarkStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-wordmark');
    });

    it('generator respects size override', () => {
      const els = wordmarkStory.generator?.({ properties: { size: 'lg' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('lg');
    });

    it('generator respects mono override', () => {
      const els = wordmarkStory.generator?.({ properties: { mono: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.mono).toBe(true);
    });

    it('generator strips empty-string href to avoid href=""', () => {
      const els = wordmarkStory.generator?.({ properties: { href: '' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.href).toBeUndefined();
    });

    it('generator includes href when non-empty', () => {
      const els = wordmarkStory.generator?.({ properties: { href: 'https://example.com' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.href).toBe('https://example.com');
    });

    it('generator strips empty-string target', () => {
      const els = wordmarkStory.generator?.({ properties: { target: '' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.target).toBeUndefined();
    });

    it('generator includes target when non-empty', () => {
      const els = wordmarkStory.generator?.({ properties: { target: '_blank' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.target).toBe('_blank');
    });

    it('state.properties includes size', () => {
      expect((wordmarkStory.state?.properties as Record<string, unknown>).size).toBeDefined();
    });

    it('state.properties includes mono', () => {
      expect((wordmarkStory.state?.properties as Record<string, unknown>).mono).toBeDefined();
    });
  });

  describe('wordmarkPropDefinitions', () => {
    it('is non-empty', () => {
      expect(wordmarkPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of wordmarkPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of wordmarkPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of wordmarkPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of wordmarkPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = wordmarkPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes size select with sm/md/lg/xl options', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('sm');
      expect(((def as unknown as { options: string[] })).options).toContain('md');
      expect(((def as unknown as { options: string[] })).options).toContain('lg');
      expect(((def as unknown as { options: string[] })).options).toContain('xl');
      expect(def!.defaultValue).toBe('md');
    });

    it('includes mono definition of type boolean', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'mono');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
      expect(def!.defaultValue).toBe(false);
    });

    it('includes href definition of type string', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'href');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });

    it('includes target definition of type string', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'target');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });

    it('includes rel definition of type string', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'rel');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });
  });

  describe('wordmarkStorySizes', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStorySizes.generator?.()).not.toThrow();
    });

    it('generator returns 4 elements (one per size)', () => {
      const els = wordmarkStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(4);
    });

    it('each element is an io-wordmark', () => {
      const els = wordmarkStorySizes.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-wordmark');
      }
    });

    it('elements cover all four sizes sm/md/lg/xl', () => {
      const els = wordmarkStorySizes.generator?.() ?? [];
      const sizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.size);
      expect(sizes).toContain('sm');
      expect(sizes).toContain('md');
      expect(sizes).toContain('lg');
      expect(sizes).toContain('xl');
    });
  });

  describe('wordmarkStoryMono', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStoryMono.generator?.()).not.toThrow();
    });

    it('generator returns 2 elements (color and mono)', () => {
      const els = wordmarkStoryMono.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(2);
    });

    it('each element is an io-wordmark', () => {
      const els = wordmarkStoryMono.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-wordmark');
      }
    });

    it('first element has mono=false (color variant)', () => {
      const els = wordmarkStoryMono.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.mono).toBe(false);
    });

    it('second element has mono=true (monochrome variant)', () => {
      const els = wordmarkStoryMono.generator?.() ?? [];
      const second = els[1] as { properties: Record<string, unknown> };
      expect(second.properties.mono).toBe(true);
    });
  });
});
