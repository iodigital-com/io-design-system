import { describe, it, expect } from 'vitest';
import {
  wordmarkStory,
  wordmarkPropDefinitions,
  wordmarkStoryVariants,
  wordmarkStoryMarkSizes,
  wordmarkStoryLockupSizes,
  wordmarkStoryMarkColors,
  wordmarkStoryLockupColors,
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
      expect((els[0] as { tag: string }).tag).toBe('io-wordmark');
    });

    it('generator respects size override', () => {
      const els = wordmarkStory.generator?.({ properties: { size: 'lg' } }) ?? [];
      expect((els[0] as { properties: Record<string, unknown> }).properties.size).toBe('lg');
    });

    it('generator respects variant override', () => {
      const els = wordmarkStory.generator?.({ properties: { variant: 'lockup' } }) ?? [];
      expect((els[0] as { properties: Record<string, unknown> }).properties.variant).toBe('lockup');
    });

    it('generator respects color override', () => {
      const els = wordmarkStory.generator?.({ properties: { color: 'black' } }) ?? [];
      expect((els[0] as { properties: Record<string, unknown> }).properties.color).toBe('black');
    });

    it('state.properties includes variant', () => {
      expect((wordmarkStory.state?.properties as Record<string, unknown>).variant).toBeDefined();
    });

    it('state.properties includes color', () => {
      expect((wordmarkStory.state?.properties as Record<string, unknown>).color).toBeDefined();
    });

    it('state.properties includes size', () => {
      expect((wordmarkStory.state?.properties as Record<string, unknown>).size).toBeDefined();
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

    it('includes variant select with mark/lockup options', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'variant');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      const opts = (def as unknown as { options: string[] }).options;
      expect(opts).toContain('mark');
      expect(opts).toContain('lockup');
      expect(opts).not.toContain('text');
      expect(def!.defaultValue).toBe('mark');
    });

    it('includes color select with blue/black/white/beige options', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'color');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      const opts = (def as unknown as { options: string[] }).options;
      expect(opts).toContain('blue');
      expect(opts).toContain('black');
      expect(opts).toContain('white');
      expect(opts).toContain('beige');
      expect(def!.defaultValue).toBe('blue');
    });

    it('includes size select with sm/md/lg/xl options', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      const opts = (def as unknown as { options: string[] }).options;
      expect(opts).toContain('sm');
      expect(opts).toContain('md');
      expect(opts).toContain('lg');
      expect(opts).toContain('xl');
      expect(def!.defaultValue).toBe('md');
    });

    it('includes ariaLabel definition of type string', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'ariaLabel');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });

    it('does not include mono', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'mono');
      expect(def).toBeUndefined();
    });

    it('does not include href', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'href');
      expect(def).toBeUndefined();
    });

    it('does not include target', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'target');
      expect(def).toBeUndefined();
    });

    it('does not include rel', () => {
      const def = wordmarkPropDefinitions.find((d) => d.name === 'rel');
      expect(def).toBeUndefined();
    });
  });

  describe('wordmarkStoryVariants', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStoryVariants.generator?.()).not.toThrow();
    });

    it('generator returns 2 elements (mark and lockup)', () => {
      expect(wordmarkStoryVariants.generator?.()!.length).toBe(2);
    });

    it('elements cover mark/lockup variants', () => {
      const els = wordmarkStoryVariants.generator?.() ?? [];
      const variants = els.map((el) => (el as { properties: Record<string, unknown> }).properties.variant);
      expect(variants).toContain('mark');
      expect(variants).toContain('lockup');
      expect(variants).not.toContain('text');
    });
  });

  describe('wordmarkStoryMarkSizes', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStoryMarkSizes.generator?.()).not.toThrow();
    });

    it('generator returns 4 elements', () => {
      expect(wordmarkStoryMarkSizes.generator?.()!.length).toBe(4);
    });

    it('all elements have variant=mark', () => {
      const els = wordmarkStoryMarkSizes.generator?.() ?? [];
      for (const el of els) {
        expect((el as { properties: Record<string, unknown> }).properties.variant).toBe('mark');
      }
    });

    it('elements cover all four sizes sm/md/lg/xl', () => {
      const els = wordmarkStoryMarkSizes.generator?.() ?? [];
      const sizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.size);
      expect(sizes).toContain('sm');
      expect(sizes).toContain('md');
      expect(sizes).toContain('lg');
      expect(sizes).toContain('xl');
    });
  });

  describe('wordmarkStoryLockupSizes', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStoryLockupSizes.generator?.()).not.toThrow();
    });

    it('generator returns 4 elements', () => {
      expect(wordmarkStoryLockupSizes.generator?.()!.length).toBe(4);
    });

    it('all elements have variant=lockup', () => {
      const els = wordmarkStoryLockupSizes.generator?.() ?? [];
      for (const el of els) {
        expect((el as { properties: Record<string, unknown> }).properties.variant).toBe('lockup');
      }
    });
  });

  describe('wordmarkStoryMarkColors', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStoryMarkColors.generator?.()).not.toThrow();
    });

    it('generator returns 4 elements (blue/black/white/beige)', () => {
      expect(wordmarkStoryMarkColors.generator?.()!.length).toBe(4);
    });

    it('elements cover blue/black/white/beige colors', () => {
      const els = wordmarkStoryMarkColors.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: Record<string, unknown> }).properties.color);
      expect(colors).toContain('blue');
      expect(colors).toContain('black');
      expect(colors).toContain('white');
      expect(colors).toContain('beige');
    });

    it('all elements have variant=mark', () => {
      const els = wordmarkStoryMarkColors.generator?.() ?? [];
      for (const el of els) {
        expect((el as { properties: Record<string, unknown> }).properties.variant).toBe('mark');
      }
    });
  });

  describe('wordmarkStoryLockupColors', () => {
    it('generator does not throw', () => {
      expect(() => wordmarkStoryLockupColors.generator?.()).not.toThrow();
    });

    it('generator returns 3 elements (blue/black/white)', () => {
      expect(wordmarkStoryLockupColors.generator?.()!.length).toBe(3);
    });

    it('elements cover blue/black/white colors', () => {
      const els = wordmarkStoryLockupColors.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: Record<string, unknown> }).properties.color);
      expect(colors).toContain('blue');
      expect(colors).toContain('black');
      expect(colors).toContain('white');
    });

    it('all elements have variant=lockup', () => {
      const els = wordmarkStoryLockupColors.generator?.() ?? [];
      for (const el of els) {
        expect((el as { properties: Record<string, unknown> }).properties.variant).toBe('lockup');
      }
    });
  });
});
