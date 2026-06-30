import { describe, it, expect } from 'vitest';
import { buttonTileStory, buttonTilePropDefinitions, buttonTileStoryStates } from './io-button-tile.stories';

describe('io-button-tile storefront stories', () => {
  describe('buttonTileStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => buttonTileStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = buttonTileStory.generator?.(buttonTileStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(buttonTileStory.state?.properties).toBeDefined();
    });
  });

  describe('buttonTilePropDefinitions', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(buttonTilePropDefinitions)).toBe(true);
      expect(buttonTilePropDefinitions.length).toBeGreaterThan(0);
    });
  });

  describe('named stories', () => {
    it('buttonTileStoryStates returns 3 elements', () => {
      const els = buttonTileStoryStates.generator?.();
      expect(els?.length).toBe(3);
    });
  });
});
