import { describe, it, expect } from 'vitest';

import { IoOptgroup } from './io-optgroup';

describe('io-optgroup — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = new IoOptgroup();
    (c as any).el = document.createElement('io-optgroup');
    c.label = 'Leadership';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=true does not throw', () => {
    const c = new IoOptgroup();
    (c as any).el = document.createElement('io-optgroup');
    c.label = 'Disabled Group';
    c.disabled = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=false does not throw', () => {
    const c = new IoOptgroup();
    (c as any).el = document.createElement('io-optgroup');
    c.label = 'Active Group';
    c.disabled = false;
    expect(() => (c as any).render()).not.toThrow();
  });
});
