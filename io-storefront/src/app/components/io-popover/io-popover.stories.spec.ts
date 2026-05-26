import { describe, it, expect } from 'vitest';
import {
  popoverStory,
  popoverStoryBottom,
  popoverStoryTop,
  popoverStoryRight,
  popoverStoryLeft,
  popoverStoryRichContent,
  popoverPropDefinitions,
} from './io-popover.stories';

describe('popoverStory (configurator)', () => {
  it('returns elements without args', () => {
    const result = popoverStory.generator?.();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('returns elements with default state', () => {
    const result = popoverStory.generator?.(popoverStory.state);
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('every element has a tag', () => {
    const result = popoverStory.generator?.() as { tag: string }[];
    result.forEach(el => expect(typeof el.tag).toBe('string'));
  });

  it('state.properties is defined', () => {
    expect(popoverStory.state?.properties).toBeDefined();
    expect(typeof popoverStory.state?.properties).toBe('object');
  });

  it('defaults placement to bottom', () => {
    const result = popoverStory.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.placement).toBe('bottom');
  });

  it('passes placement override', () => {
    const result = popoverStory.generator?.({ properties: { placement: 'top' } }) as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.placement).toBe('top');
  });

  it('passes label override', () => {
    const result = popoverStory.generator?.({ properties: { label: 'My label' } }) as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.label).toBe('My label');
  });

  it('passes closeOnClickOutside override', () => {
    const result = popoverStory.generator?.({ properties: { closeOnClickOutside: false } }) as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.closeOnClickOutside).toBe(false);
  });

  it.each(['top', 'bottom', 'left', 'right', 'auto'])('does not throw for placement=%s', (placement) => {
    expect(() => popoverStory.generator?.({ properties: { placement } })).not.toThrow();
  });

  it('configurator story produces io-popover as root element', () => {
    const els = popoverStory.generator?.(popoverStory.state) ?? [];
    expect((els[0] as { tag: string }).tag).toBe('io-popover');
  });
});

describe('popoverStoryBottom', () => {
  it('does not throw', () => {
    expect(() => popoverStoryBottom.generator?.()).not.toThrow();
  });

  it('returns non-empty array', () => {
    const result = popoverStoryBottom.generator?.();
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('uses bottom placement', () => {
    const result = popoverStoryBottom.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.placement).toBe('bottom');
  });
});

describe('popoverStoryTop', () => {
  it('does not throw', () => {
    expect(() => popoverStoryTop.generator?.()).not.toThrow();
  });

  it('uses top placement', () => {
    const result = popoverStoryTop.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.placement).toBe('top');
  });
});

describe('popoverStoryRight', () => {
  it('does not throw', () => {
    expect(() => popoverStoryRight.generator?.()).not.toThrow();
  });

  it('uses right placement', () => {
    const result = popoverStoryRight.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.placement).toBe('right');
  });
});

describe('popoverStoryLeft', () => {
  it('does not throw', () => {
    expect(() => popoverStoryLeft.generator?.()).not.toThrow();
  });

  it('uses left placement', () => {
    const result = popoverStoryLeft.generator?.() as { tag: string; properties: Record<string, unknown> }[];
    const popover = result.find(el => el.tag === 'io-popover');
    expect(popover?.properties?.placement).toBe('left');
  });
});

describe('popoverStoryRichContent', () => {
  it('does not throw', () => {
    expect(() => popoverStoryRichContent.generator?.()).not.toThrow();
  });

  it('returns non-empty array', () => {
    const result = popoverStoryRichContent.generator?.();
    expect(Array.isArray(result)).toBe(true);
    expect((result as unknown[]).length).toBeGreaterThan(0);
  });

  it('every element has a tag', () => {
    const result = popoverStoryRichContent.generator?.() as { tag: string }[];
    result.forEach(el => expect(typeof el.tag).toBe('string'));
  });
});

describe('popoverPropDefinitions', () => {
  it('is non-empty', () => {
    expect(popoverPropDefinitions.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty name', () => {
    popoverPropDefinitions.forEach(def => expect(typeof def.name).toBe('string'));
    popoverPropDefinitions.forEach(def => expect(def.name.length).toBeGreaterThan(0));
  });

  it('every type matches expected values', () => {
    popoverPropDefinitions.forEach(def =>
      expect(['string', 'boolean', 'select', 'number']).toContain(def.type),
    );
  });

  it('select entries have options', () => {
    popoverPropDefinitions
      .filter(def => def.type === 'select')
      .forEach(def => expect((def.options as string[]).length).toBeGreaterThan(0));
  });

  it('every entry has defaultValue defined', () => {
    popoverPropDefinitions.forEach(def => expect(def.defaultValue).toBeDefined());
  });

  it('names are unique', () => {
    const names = popoverPropDefinitions.map(def => def.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('placement options include all four directions plus auto', () => {
    const placement = popoverPropDefinitions.find(def => def.name === 'placement');
    expect(placement?.options).toEqual(expect.arrayContaining(['top', 'bottom', 'left', 'right', 'auto']));
  });
});
