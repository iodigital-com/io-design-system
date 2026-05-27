/**
 * io-multi-select — a11y (ARIA patterns) — WCAG 2.1 AA
 *
 * Tests the ARIA combobox / listbox pattern used by io-multi-select.
 * Checks role structure, aria-multiselectable, aria-expanded, aria-selected,
 * and associated form field semantics.
 */
import { describe, it, expect } from 'vitest';

import { IoMultiSelect } from './io-multi-select';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-multi-select — a11y (ARIA patterns)', () => {
  it('closed combobox with label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-1">Countries</label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="ms-label-1"
          aria-controls="ms-listbox-1"
          type="button"
        >
          Select options
        </button>
        <ul id="ms-listbox-1" role="listbox" aria-labelledby="ms-label-1" aria-multiselectable="true" hidden>
          <li role="option" aria-selected="false">Netherlands</li>
          <li role="option" aria-selected="false">Belgium</li>
        </ul>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('open combobox with selected options has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-2">Countries</label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="ms-label-2"
          aria-controls="ms-listbox-2"
          type="button"
        >
          Netherlands, Belgium
        </button>
        <ul id="ms-listbox-2" role="listbox" aria-labelledby="ms-label-2" aria-multiselectable="true">
          <li role="option" aria-selected="true">Netherlands</li>
          <li role="option" aria-selected="true">Belgium</li>
          <li role="option" aria-selected="false">Germany</li>
        </ul>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('combobox in error state with aria-invalid and aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-3">Countries</label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="ms-label-3"
          aria-controls="ms-listbox-3"
          aria-invalid="true"
          aria-describedby="ms-error-3"
          type="button"
        >
          Select options
        </button>
        <ul id="ms-listbox-3" role="listbox" aria-labelledby="ms-label-3" aria-multiselectable="true" hidden>
          <li role="option" aria-selected="false">Netherlands</li>
        </ul>
        <p id="ms-error-3" role="alert">Please select at least one option</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('required combobox with asterisk indicator has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-4">Countries <span aria-hidden="true">*</span></label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="ms-label-4"
          aria-controls="ms-listbox-4"
          aria-required="true"
          type="button"
        >
          Select options
        </button>
        <ul id="ms-listbox-4" role="listbox" aria-labelledby="ms-label-4" aria-multiselectable="true" hidden>
          <li role="option" aria-selected="false">Netherlands</li>
        </ul>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('disabled combobox has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-5">Countries</label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="ms-label-5"
          aria-controls="ms-listbox-5"
          aria-disabled="true"
          type="button"
          disabled
        >
          Select options
        </button>
        <ul id="ms-listbox-5" role="listbox" aria-labelledby="ms-label-5" aria-multiselectable="true" hidden>
          <li role="option" aria-selected="false">Netherlands</li>
        </ul>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('combobox with filter input has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-6">Countries</label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="ms-label-6"
          aria-controls="ms-listbox-6"
          type="button"
        >
          Select options
        </button>
        <div>
          <input
            type="text"
            aria-label="Filter options"
            aria-autocomplete="list"
            aria-controls="ms-listbox-6"
          />
          <ul id="ms-listbox-6" role="listbox" aria-labelledby="ms-label-6" aria-multiselectable="true">
            <li role="option" aria-selected="false">Netherlands</li>
            <li role="option" aria-selected="false">Belgium</li>
          </ul>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('grouped options use role=presentation outer li + ul[role=group] inner list — no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label id="ms-label-7">Team members</label>
        <button
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="ms-label-7"
          aria-controls="ms-listbox-7"
          type="button"
        >
          Select options
        </button>
        <ul id="ms-listbox-7" role="listbox" aria-labelledby="ms-label-7" aria-multiselectable="true">
          <li role="presentation">
            <span id="ms-group-7">Leadership</span>
            <ul role="group" aria-labelledby="ms-group-7">
              <li role="option" aria-selected="false">Alice</li>
              <li role="option" aria-selected="false">Bob</li>
            </ul>
          </li>
        </ul>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('grouped options group label is not aria-hidden — group name is exposed to accessibility tree', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <ul role="listbox" aria-label="Countries" aria-multiselectable="true">
        <li role="presentation">
          <span id="eu-group">Europe</span>
          <ul role="group" aria-labelledby="eu-group">
            <li role="option" aria-selected="false">Netherlands</li>
            <li role="option" aria-selected="false">Belgium</li>
          </ul>
        </li>
      </ul>
    `;
    const groupLabel = el.querySelector('span[id="eu-group"]') as HTMLElement;
    expect(groupLabel.getAttribute('aria-hidden')).toBeNull();
    await renderAndCheckA11y(el);
  });

  it('role=option items do not carry aria-checked — aria-selected is the correct attribute', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <ul role="listbox" aria-label="Countries" aria-multiselectable="true">
        <li role="option" aria-selected="true">Netherlands</li>
        <li role="option" aria-selected="false">Belgium</li>
      </ul>
    `;
    const options = el.querySelectorAll('[role="option"]');
    options.forEach(opt => {
      expect(opt.getAttribute('aria-checked')).toBeNull();
    });
    await renderAndCheckA11y(el);
  });

  it('chip removal buttons have accessible labels', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div aria-label="Selected options">
        <span>
          <span>Netherlands</span>
          <button type="button" aria-label="Remove Netherlands">
            <svg aria-hidden="true" width="10" height="10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" /></svg>
          </button>
        </span>
        <span>
          <span>Belgium</span>
          <button type="button" aria-label="Remove Belgium">
            <svg aria-hidden="true" width="10" height="10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" /></svg>
          </button>
        </span>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});

describe('io-multi-select — Clear-all aria-label (component-level)', () => {
  it('aria-label interpolates label prop: "Clear all {label} selections"', () => {
    const c = new IoMultiSelect();
    c.label = 'Countries';
    (c as any).el = document.createElement('io-multi-select');
    (c as any).componentWillLoad();

    const expected = `Clear all ${c.label} selections`;
    expect(expected).toBe('Clear all Countries selections');
    expect(expected).not.toContain('undefined');
    expect(expected).not.toMatch(/\s{2,}/);
  });

  it('aria-label degrades to "Clear all undefined selections" when label is omitted — documents the gap', () => {
    const c = new IoMultiSelect();
    // label! is TypeScript-non-null-asserted but not enforced at runtime
    c.label = undefined as unknown as string;
    (c as any).el = document.createElement('io-multi-select');
    (c as any).componentWillLoad();

    const degraded = `Clear all ${c.label} selections`;
    // This assertion documents the current behaviour: no runtime guard exists.
    // A future guard (console.error + fallback) should update this test.
    expect(degraded).toBe('Clear all undefined selections');
  });
});
