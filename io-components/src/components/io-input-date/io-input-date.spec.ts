import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputDate } from './io-input-date';

describe('io-input-date — default props', () => {
  let component: IoInputDate;

  beforeEach(() => {
    component = new IoInputDate();
    (component as any).el = document.createElement('io-input-date');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
  });

  it('value defaults to empty string', () => { expect(component.value).toBe(''); });
  it('required defaults to false', () => { expect(component.required).toBe(false); });
  it('disabled defaults to false', () => { expect(component.disabled).toBe(false); });
  it('state defaults to none', () => { expect(component.state).toBe('none'); });
  it('hideLabel defaults to false', () => { expect(component.hideLabel).toBe(false); });
  it('size defaults to md', () => { expect(component.size).toBe('md'); });
  it('message defaults to empty string', () => { expect(component.message).toBe(''); });
  it('min defaults to undefined', () => { expect(component.min).toBeUndefined(); });
  it('max defaults to undefined', () => { expect(component.max).toBeUndefined(); });

  it('generates inputId in componentWillLoad', () => {
    component.label = 'Birth date';
    (component as any).componentWillLoad();
    expect((component as any).inputId).toBeTruthy();
  });

  it('renders type=date on native input', () => {
    component.label = 'Birth date';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['type']).toBe('date');
  });

  it('passes min/max to native input', () => {
    component.label = 'Birth date';
    component.min = '2000-01-01';
    component.max = '2026-12-31';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['min']).toBe('2000-01-01');
    expect(props['max']).toBe('2026-12-31');
  });

  it('passes disabled to native input', () => {
    component.label = 'Birth date';
    component.disabled = true;
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['disabled']).toBe(true);
  });

  it('sets aria-invalid when state is error', () => {
    component.label = 'Birth date';
    component.state = 'error';
    component.message = 'Invalid date';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-invalid']).toBe('true');
  });

  it('does not set aria-invalid when state is none', () => {
    component.label = 'Birth date';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-invalid']).toBeUndefined();
  });

  it('applies size class to input field', () => {
    component.label = 'Birth date';
    component.size = 'lg';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('input-field--lg');
  });
});

describe('io-input-date — spellCheck prop (#913)', () => {
  let component: IoInputDate;

  beforeEach(() => {
    component = new IoInputDate();
    (component as any).el = document.createElement('io-input-date');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Birth date';
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

describe('io-input-date — label/description/message slots (#931)', () => {
  let component: IoInputDate;

  beforeEach(() => {
    component = new IoInputDate();
    (component as any).el = document.createElement('io-input-date');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Birth date';
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
    component.message = 'Invalid date';
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
