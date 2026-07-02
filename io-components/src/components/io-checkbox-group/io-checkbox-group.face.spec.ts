/**
 * io-checkbox-group — Presentational contract tests (#1162)
 *
 * io-checkbox-group is PRESENTATIONAL-ONLY for form purposes:
 * - It does NOT implement formAssociated or ElementInternals.
 * - It does NOT register a FormData entry itself.
 * - `required` is propagated to all children (each child validates independently).
 * - Each child io-checkbox handles its own FACE / form value submission.
 *
 * These tests lock the contract so any accidental introduction of
 * formAssociated or internals would surface immediately.
 */
import { describe, it, expect, vi } from 'vitest';

import { IoCheckboxGroup } from './io-checkbox-group';

function makeComponent(overrides: Partial<IoCheckboxGroup> = {}) {
  const c = new IoCheckboxGroup();
  const host = document.createElement('io-checkbox-group');
  (c as any).el = host;
  (c as any).change = { emit: vi.fn() };
  c.name = 'options';
  c.required = false;
  c.disabled = false;
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return { c, host };
}

function makeCheckbox(value: string, checked = false) {
  return Object.assign(document.createElement('io-checkbox'), {
    value,
    checked,
    name: '',
    disabled: false,
    required: false,
    state: 'none',
  }) as HTMLElement & {
    value: string;
    checked: boolean;
    name: string;
    disabled: boolean;
    required: boolean;
    state: string;
  };
}

describe('io-checkbox-group — presentational-only contract (#1162)', () => {
  it('does NOT have formAssociated set — group is not a form participant', () => {
    // formAssociated is a static property on the class set by Stencil for FACE components.
    // io-checkbox-group deliberately does not set it.
    expect((IoCheckboxGroup as any).formAssociated).toBeFalsy();
  });

  it('does NOT have internals — no ElementInternals attached', () => {
    const { c } = makeComponent();
    // Internals are only present on formAssociated components.
    expect((c as any).internals).toBeUndefined();
  });

  it('propagates required=true to all child io-checkboxes', () => {
    const { c, host } = makeComponent({ required: true });
    const cb1 = makeCheckbox('a');
    const cb2 = makeCheckbox('b');
    host.appendChild(cb1);
    host.appendChild(cb2);

    (c as any).syncChildren();

    expect(cb1.required).toBe(true);
    expect(cb2.required).toBe(true);
  });

  it('propagates required=false to all child io-checkboxes when group required is false', () => {
    const { c, host } = makeComponent({ required: false });
    const cb1 = makeCheckbox('a');
    cb1.required = true;
    host.appendChild(cb1);

    (c as any).syncChildren();

    expect(cb1.required).toBe(false);
  });

  it('propagates name to all children', () => {
    const { c, host } = makeComponent();
    c.name = 'my-group';
    const cb = makeCheckbox('x');
    host.appendChild(cb);

    (c as any).syncChildren();

    expect(cb.name).toBe('my-group');
  });

  it('does not expose syncFormValue — no FACE lifecycle method', () => {
    const { c } = makeComponent();
    expect(typeof (c as any).syncFormValue).toBe('undefined');
  });

  it('does not expose formResetCallback — no FACE lifecycle method', () => {
    const { c } = makeComponent();
    expect(typeof (c as any).formResetCallback).toBe('undefined');
  });
});

describe('io-checkbox-group — state/message API (#1152)', () => {
  it('state defaults to "none"', () => {
    const { c } = makeComponent();
    expect(c.state).toBe('none');
  });

  it('message defaults to empty string', () => {
    const { c } = makeComponent();
    expect(c.message).toBe('');
  });

  it('propagates state="error" to children via syncChildren', () => {
    const { c, host } = makeComponent({ state: 'error' as any });
    const cb = makeCheckbox('a');
    host.appendChild(cb);

    (c as any).syncChildren();

    expect(cb.state).toBe('error');
  });

  it('propagates state="success" to children via syncChildren', () => {
    const { c, host } = makeComponent({ state: 'success' as any });
    const cb = makeCheckbox('a');
    host.appendChild(cb);

    (c as any).syncChildren();

    expect(cb.state).toBe('success');
  });

  it('state="error" propagates to children via syncChildren', () => {
    const { c, host } = makeComponent({ state: 'error' as any });
    const cb = makeCheckbox('a');
    host.appendChild(cb);

    (c as any).syncChildren();

    expect(cb.state).toBe('error');
  });

  it('state="warning" propagates to children via syncChildren', () => {
    const { c, host } = makeComponent({ state: 'warning' as any });
    const cb = makeCheckbox('a');
    host.appendChild(cb);

    (c as any).syncChildren();

    expect(cb.state).toBe('warning');
  });
});
