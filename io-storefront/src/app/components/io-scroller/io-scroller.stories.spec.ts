import { describe, it, expect } from 'vitest';
import {
  scrollerStory,
  scrollerStoryDefault,
  scrollerStoryVertical,
  scrollerStoryShowScrollbar,
  scrollerPropDefinitions,
} from './io-scroller.stories';

describe('scrollerStory (configurator)', () => {
  it('returns elements without args', () => {
    const result = scrollerStory.generator?.();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('returns elements with default state', () => {
    const result = scrollerStory.generator?.(scrollerStory.state);
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('every element has a tag', () => {
    const result = scrollerStory.generator?.() as { tag: string }[];
    result.forEach(el => expect(typeof el.tag).toBe('string'));
  });

  it('state.properties is defined', () => {
    expect(scrollerStory.state?.properties).toBeDefined();
    expect(typeof scrollerStory.state?.properties).toBe('object');
  });

  it('defaults orientation to horizontal', () => {
    const result = scrollerStory.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.orientation).toBe('horizontal');
  });

  it('passes orientation=vertical override', () => {
    const result = scrollerStory.generator?.({ properties: { orientation: 'vertical' } }) as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.orientation).toBe('vertical');
  });

  it('defaults showScrollbar to false', () => {
    const result = scrollerStory.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.showScrollbar).toBe(false);
  });

  it('passes showScrollbar=true override', () => {
    const result = scrollerStory.generator?.({ properties: { showScrollbar: true } }) as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.showScrollbar).toBe(true);
  });

  it('passes label override', () => {
    const result = scrollerStory.generator?.({ properties: { label: 'Scroll region' } }) as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.label).toBe('Scroll region');
  });

  it.each(['horizontal', 'vertical'])('does not throw for orientation=%s', (orientation) => {
    expect(() => scrollerStory.generator?.({ properties: { orientation } })).not.toThrow();
  });

  it('vertical orientation produces child links', () => {
    const result = scrollerStory.generator?.({ properties: { orientation: 'vertical' } }) as {
      tag: string;
      children: { tag: string }[];
    }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.children?.length).toBeGreaterThan(0);
    expect(scroller?.children[0].tag).toBe('io-link');
  });

  it('horizontal orientation produces a div wrapper with io-tag chips', () => {
    const result = scrollerStory.generator?.({ properties: { orientation: 'horizontal' } }) as {
      tag: string;
      children: { tag: string; children: { tag: string }[] }[];
    }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    const wrapper = scroller?.children?.[0];
    expect(wrapper?.tag).toBe('div');
    expect(wrapper?.children?.length).toBeGreaterThan(0);
    expect(wrapper?.children[0].tag).toBe('io-tag');
  });
});

describe('scrollerStoryDefault', () => {
  it('does not throw', () => {
    expect(() => scrollerStoryDefault.generator?.()).not.toThrow();
  });

  it('returns non-empty array', () => {
    const result = scrollerStoryDefault.generator?.();
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('every element has a tag', () => {
    const result = scrollerStoryDefault.generator?.() as { tag: string }[];
    result.forEach(el => expect(typeof el.tag).toBe('string'));
  });

  it('uses horizontal orientation', () => {
    const result = scrollerStoryDefault.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.orientation).toBe('horizontal');
  });
});

describe('scrollerStoryVertical', () => {
  it('does not throw', () => {
    expect(() => scrollerStoryVertical.generator?.()).not.toThrow();
  });

  it('uses vertical orientation', () => {
    const result = scrollerStoryVertical.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.orientation).toBe('vertical');
  });
});

describe('scrollerStoryShowScrollbar', () => {
  it('does not throw', () => {
    expect(() => scrollerStoryShowScrollbar.generator?.()).not.toThrow();
  });

  it('sets showScrollbar to true', () => {
    const result = scrollerStoryShowScrollbar.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const scroller = result.find(el => el.tag === 'io-scroller');
    expect(scroller?.properties?.showScrollbar).toBe(true);
  });
});

describe('scrollerPropDefinitions', () => {
  it('is non-empty', () => {
    expect(scrollerPropDefinitions.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty name', () => {
    scrollerPropDefinitions.forEach(def => expect(typeof def.name).toBe('string'));
    scrollerPropDefinitions.forEach(def => expect(def.name.length).toBeGreaterThan(0));
  });

  it('every type matches expected values', () => {
    scrollerPropDefinitions.forEach(def =>
      expect(['string', 'boolean', 'select', 'number']).toContain(def.type),
    );
  });

  it('select entries have options', () => {
    scrollerPropDefinitions
      .filter(def => def.type === 'select')
      .forEach(def => expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0));
  });

  it('every entry has defaultValue defined', () => {
    scrollerPropDefinitions.forEach(def => expect(def.defaultValue !== undefined).toBe(true));
  });

  it('names are unique', () => {
    const names = scrollerPropDefinitions.map(def => def.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('orientation options are horizontal and vertical', () => {
    const orientation = scrollerPropDefinitions.find(def => def.name === 'orientation');
    expect(((orientation as unknown as { options: string[] } | undefined))?.options).toEqual(expect.arrayContaining(['horizontal', 'vertical']));
  });
});
