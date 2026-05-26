import { describe, it, expect } from 'vitest';

import { getAccordionBaseId, getAccordionItemClass } from './io-accordion-utils';

describe('getAccordionBaseId', () => {
  it('returns hostId when provided', () => {
    expect(getAccordionBaseId('my-accordion')).toBe('my-accordion');
  });

  it('generates a random id when hostId is empty string', () => {
    const id = getAccordionBaseId('');
    expect(id).toMatch(/^io-accordion-/);
  });

  it('generates unique ids on successive calls with empty hostId', () => {
    const id1 = getAccordionBaseId('');
    const id2 = getAccordionBaseId('');
    expect(id1).not.toBe(id2);
  });
});

describe('getAccordionItemClass', () => {
  it('returns base classes when closed and not disabled', () => {
    const cls = getAccordionItemClass({ open: false, disabled: false });
    expect(cls).toBe('accordion-item accordion-item--first');
  });

  it('adds open modifier when open is true', () => {
    const cls = getAccordionItemClass({ open: true, disabled: false });
    expect(cls).toContain('accordion-item--open');
  });

  it('adds disabled modifier when disabled is true', () => {
    const cls = getAccordionItemClass({ open: false, disabled: true });
    expect(cls).toContain('accordion-item--disabled');
  });

  it('adds both open and disabled modifiers when both are true', () => {
    const cls = getAccordionItemClass({ open: true, disabled: true });
    expect(cls).toContain('accordion-item--open');
    expect(cls).toContain('accordion-item--disabled');
  });

  it('does not include open modifier when open is false', () => {
    const cls = getAccordionItemClass({ open: false, disabled: false });
    expect(cls).not.toContain('accordion-item--open');
  });

  it('does not include disabled modifier when disabled is false', () => {
    const cls = getAccordionItemClass({ open: true, disabled: false });
    expect(cls).not.toContain('accordion-item--disabled');
  });
});
