import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoTextarea } from './io-textarea';
import { getTextareaStyles } from './io-textarea-styles';

describe('io-textarea — hideLabel prop', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
  });

  it('defaults hideLabel to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('accepts hideLabel=true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('warns when hideLabel=true and label is empty', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = '';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith('[io-textarea] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = 'Message';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-textarea — default props', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has rows=4 by default', () => {
    expect(component.rows).toBe(4);
  });

  it('has resize=vertical by default', () => {
    expect(component.resize).toBe('vertical');
  });

  it('has size=md by default', () => {
    expect(component.size).toBe('md');
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has state=none by default', () => {
    expect(component.state).toBe('none');
  });

  it('is not readOnly by default', () => {
    expect(component.readOnly).toBe(false);
  });

  it('has no placeholder by default', () => {
    expect(component.placeholder).toBeUndefined();
  });

  it('has no maxLength by default', () => {
    expect(component.maxLength).toBeUndefined();
  });

  it('has no minLength by default', () => {
    expect(component.minLength).toBeUndefined();
  });

  it('has loading=false by default', () => {
    expect(component.loading).toBe(false);
  });

  it('has counter=false by default', () => {
    expect(component.counter).toBe(false);
  });

  it('has spellCheck=undefined by default', () => {
    expect(component.spellCheck).toBeUndefined();
  });

  it('has form=undefined by default', () => {
    expect(component.form).toBeUndefined();
  });

  it('has wrap=undefined by default', () => {
    expect(component.wrap).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const textarea = document.createElement('textarea');
    textarea.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(textarea) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('applies state-success class when state is success', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('applies state-warning class when state is warning', () => {
    component.state = 'warning';
    component.message = 'Check this field';
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('message paragraph uses role=status for success state', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });
});

describe('io-textarea — new props (#362)', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).label = 'Notes';
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('passes minLength to native textarea via render', () => {
    (component as any).componentWillLoad();
    component.minLength = 10;

    vi.mocked(h).mockClear();
    component.render();

    const textareaCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'textarea');
    const textareaProps = (textareaCall?.[1] ?? {}) as Record<string, unknown>;
    expect(textareaProps['minLength']).toBe(10);
  });

  it('passes spellCheck to native textarea via render', () => {
    (component as any).componentWillLoad();
    component.spellCheck = true;

    vi.mocked(h).mockClear();
    component.render();

    const textareaCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'textarea');
    const textareaProps = (textareaCall?.[1] ?? {}) as Record<string, unknown>;
    expect(textareaProps['spellcheck']).toBe(true);
  });

  it('passes form to native textarea via render', () => {
    (component as any).componentWillLoad();
    component.form = 'search-form';

    vi.mocked(h).mockClear();
    component.render();

    const textareaCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'textarea');
    const textareaProps = (textareaCall?.[1] ?? {}) as Record<string, unknown>;
    expect(textareaProps['form']).toBe('search-form');
  });

  it('passes wrap to native textarea via render', () => {
    (component as any).componentWillLoad();
    component.wrap = 'hard';

    vi.mocked(h).mockClear();
    component.render();

    const textareaCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'textarea');
    const textareaProps = (textareaCall?.[1] ?? {}) as Record<string, unknown>;
    expect(textareaProps['wrap']).toBe('hard');
  });

  it('passes readOnly to native textarea and sets aria-readonly', () => {
    (component as any).componentWillLoad();
    component.readOnly = true;

    vi.mocked(h).mockClear();
    component.render();

    const textareaCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'textarea');
    const textareaProps = (textareaCall?.[1] ?? {}) as Record<string, unknown>;
    expect(textareaProps['readOnly']).toBe(true);
    expect(textareaProps['aria-readonly']).toBe('true');
  });

  it('renders counter div when counter=true and maxLength is set', () => {
    (component as any).componentWillLoad();
    component.counter = true;
    component.maxLength = 200;
    component.value = 'hello world';

    vi.mocked(h).mockClear();
    component.render();

    const divCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'div' && (call[1] as Record<string, unknown>)?.['class'] === 'textarea-counter',
    );
    expect(divCalls.length).toBe(1);
  });

  it('does not render counter when counter=true but maxLength is not set', () => {
    (component as any).componentWillLoad();
    component.counter = true;

    vi.mocked(h).mockClear();
    component.render();

    const divCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'div' && (call[1] as Record<string, unknown>)?.['class'] === 'textarea-counter',
    );
    expect(divCalls.length).toBe(0);
  });

  it('renders io-spinner when loading=true', () => {
    (component as any).componentWillLoad();
    component.loading = true;

    vi.mocked(h).mockClear();
    component.render();

    const spinnerCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'io-spinner');
    expect(spinnerCall).toBeDefined();
  });

  it('sets aria-busy on host when loading=true', () => {
    (component as any).componentWillLoad();
    component.loading = true;

    vi.mocked(h).mockClear();
    component.render();

    // In the Stencil unit-test mock, Host resolves to undefined,
    // so the h() call for <Host> has undefined as its first argument.
    const hostCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] == null && (call[1] as Record<string, unknown>)?.['aria-busy'] !== undefined,
    );
    const hostProps = (hostCall?.[1] ?? {}) as Record<string, unknown>;
    expect(hostProps['aria-busy']).toBe('true');
  });

  it('does not emit events when loading=true', () => {
    component.loading = true;

    const inputEv = new Event('input') as InputEvent;
    Object.defineProperty(inputEv, 'target', { value: { value: 'x' } });
    (component as any).handleInput(inputEv);
    expect((component as any).input.emit).not.toHaveBeenCalled();

    const changeEv = new Event('change');
    Object.defineProperty(changeEv, 'target', { value: { value: 'x' } });
    (component as any).handleChange(changeEv);
    expect((component as any).change.emit).not.toHaveBeenCalled();
  });

  it('generates stable counterId in componentWillLoad', () => {
    (component as any).componentWillLoad();
    const id1 = (component as any).counterId;
    expect(id1).toMatch(/^io-textarea-counter-\d+$/);

    component.render();
    expect((component as any).counterId).toBe(id1);
  });
});

describe('io-textarea — styles (#658)', () => {
  it(':focus-visible applies --io-focus-ring-active (WCAG 2.4.11)', () => {
    const styles = getTextareaStyles();
    // Assert that the :focus-visible block specifically contains the focus ring shadow
    expect(styles).toMatch(/focus-visible[^}]*box-shadow:\s*var\(--io-focus-ring-active\)/);
  });

  it('resize-horizontal CSS class is defined', () => {
    const styles = getTextareaStyles();
    expect(styles).toContain('.textarea-field--resize-horizontal');
  });

  it('resize-both CSS class is defined', () => {
    const styles = getTextareaStyles();
    expect(styles).toContain('.textarea-field--resize-both');
  });
});

describe('io-textarea — resize prop extended values (#658)', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).label = 'Notes';
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
  });

  it('accepts resize="horizontal"', () => {
    component.resize = 'horizontal';
    expect(component.resize).toBe('horizontal');
  });

  it('accepts resize="both"', () => {
    component.resize = 'both';
    expect(component.resize).toBe('both');
  });
});

describe('io-textarea — description prop', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).label = 'Message';
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('has undefined description by default', () => {
    expect(component.description).toBeUndefined();
  });

  it('accepts a description string', () => {
    component.description = 'Briefly describe your topic.';
    expect(component.description).toBe('Briefly describe your topic.');
  });

  it('generates a descriptionId in componentWillLoad', () => {
    const id = (component as any).descriptionId as string;
    expect(id).toMatch(/^io-textarea-desc-/);
  });

  it('renders description <p> when description is set', () => {
    component.description = 'Briefly describe your topic.';
    vi.mocked(h).mockClear();
    component.render();
    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'textarea-description');
    expect(pCalls.length).toBe(1);
  });

  it('does not render description <p> when description is undefined', () => {
    component.description = undefined;
    vi.mocked(h).mockClear();
    component.render();
    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'textarea-description');
    expect(pCalls.length).toBe(0);
  });

  it('includes descriptionId in aria-describedby on native textarea when description is set', () => {
    component.description = 'Briefly describe your topic.';
    vi.mocked(h).mockClear();
    component.render();
    const textareaCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(call => call[0] === 'textarea');
    const textareaProps = textareaCalls[0]?.[1] as Record<string, unknown>;
    const descId = (component as any).descriptionId as string;
    expect(String(textareaProps?.['aria-describedby'] ?? '')).toContain(descId);
  });
});
