import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputSearch } from './io-input-search';

describe('io-input-search — default props', () => {
  let component: IoInputSearch;

  beforeEach(() => {
    component = new IoInputSearch();
    (component as any).el = document.createElement('io-input-search');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).clear = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
  });

  it('value defaults to empty string', () => { expect(component.value).toBe(''); });
  it('required defaults to false', () => { expect(component.required).toBe(false); });
  it('disabled defaults to false', () => { expect(component.disabled).toBe(false); });
  it('state defaults to none', () => { expect(component.state).toBe('none'); });
  it('hideLabel defaults to false', () => { expect(component.hideLabel).toBe(false); });
  it('size defaults to md', () => { expect(component.size).toBe('md'); });
  it('autocomplete defaults to off', () => { expect(component.autocomplete).toBe('off'); });
  it('clearAriaLabel defaults to Clear search', () => { expect(component.clearAriaLabel).toBe('Clear search'); });

  it('generates inputId in componentWillLoad', () => {
    component.label = 'Search';
    (component as any).componentWillLoad();
    expect((component as any).inputId).toBeTruthy();
  });

  it('hasValue false when value empty at load', () => {
    component.label = 'Search';
    component.value = '';
    (component as any).componentWillLoad();
    expect((component as any).hasValue).toBe(false);
  });

  it('hasValue true when value set at load', () => {
    component.label = 'Search';
    component.value = 'hello';
    (component as any).componentWillLoad();
    expect((component as any).hasValue).toBe(true);
  });

  it('renders type=search on native input', () => {
    component.label = 'Search';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['type']).toBe('search');
  });

  it('passes disabled to native input', () => {
    component.label = 'Search';
    component.disabled = true;
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['disabled']).toBe(true);
  });

  it('sets aria-invalid when state is error', () => {
    component.label = 'Search';
    component.state = 'error';
    component.message = 'Invalid';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-invalid']).toBe('true');
  });

  it('applies size class to input field', () => {
    component.label = 'Search';
    component.size = 'sm';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('input-field--sm');
  });

  it('clear button hidden class when hasValue is false', () => {
    component.label = 'Search';
    component.value = '';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const btnCall = vi.mocked(h).mock.calls.find(
      (c) => c[0] === 'button' && (c[1] as Record<string, unknown>)?.['aria-label'] === 'Clear search'
    );
    const props = (btnCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('search-clear--hidden');
  });
});

describe('io-input-search — spellCheck prop (#913)', () => {
  let component: IoInputSearch;

  beforeEach(() => {
    component = new IoInputSearch();
    (component as any).el = document.createElement('io-input-search');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).clear = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Search';
    (component as any).componentWillLoad();
  });

  it('spellCheck defaults to undefined', () => {
    expect(component.spellCheck).toBeUndefined();
  });

  it('passes spellcheck=true to native input', () => {
    component.spellCheck = true;
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['spellcheck']).toBe(true);
  });

  it('passes spellcheck=false to native input', () => {
    component.spellCheck = false;
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['spellcheck']).toBe(false);
  });

  it('spellcheck is undefined when prop is not set', () => {
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['spellcheck']).toBeUndefined();
  });
});

describe('io-input-search — label/description/message slots (#931)', () => {
  let component: IoInputSearch;

  beforeEach(() => {
    component = new IoInputSearch();
    (component as any).el = document.createElement('io-input-search');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).clear = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Search';
    (component as any).componentWillLoad();
  });

  it('hasLabelSlot defaults to false', () => {
    expect((component as any).hasLabelSlot).toBe(false);
  });

  it('hasDescriptionSlot defaults to false', () => {
    expect((component as any).hasDescriptionSlot).toBe(false);
  });

  it('hasMessageSlot defaults to false', () => {
    expect((component as any).hasMessageSlot).toBe(false);
  });

  it('renders label slot element in label', () => {
    vi.mocked(h).mockClear();
    component.render();
    const slotCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]) => tag === 'slot' && (attrs as any)?.name === 'label',
    );
    expect(slotCall).toBeDefined();
  });

  it('renders description slot element', () => {
    vi.mocked(h).mockClear();
    component.render();
    const slotCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]) => tag === 'slot' && (attrs as any)?.name === 'description',
    );
    expect(slotCall).toBeDefined();
  });

  it('renders message slot element when state is error', () => {
    component.state = 'error';
    component.message = 'Error message';
    vi.mocked(h).mockClear();
    component.render();
    const slotCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]) => tag === 'slot' && (attrs as any)?.name === 'message',
    );
    expect(slotCall).toBeDefined();
  });

  it('handleLabelSlotChange sets hasLabelSlot true when elements assigned', () => {
    const div = document.createElement('div');
    const mockSlot = { assignedElements: () => [div] } as unknown as HTMLSlotElement;
    const event = { target: mockSlot } as unknown as Event;
    (component as any).handleLabelSlotChange(event);
    expect((component as any).hasLabelSlot).toBe(true);
  });

  it('handleDescriptionSlotChange sets hasDescriptionSlot true when elements assigned', () => {
    const div = document.createElement('div');
    const mockSlot = { assignedElements: () => [div] } as unknown as HTMLSlotElement;
    const event = { target: mockSlot } as unknown as Event;
    (component as any).handleDescriptionSlotChange(event);
    expect((component as any).hasDescriptionSlot).toBe(true);
  });

  it('handleMessageSlotChange sets hasMessageSlot true when elements assigned', () => {
    const div = document.createElement('div');
    const mockSlot = { assignedElements: () => [div] } as unknown as HTMLSlotElement;
    const event = { target: mockSlot } as unknown as Event;
    (component as any).handleMessageSlotChange(event);
    expect((component as any).hasMessageSlot).toBe(true);
  });
});
