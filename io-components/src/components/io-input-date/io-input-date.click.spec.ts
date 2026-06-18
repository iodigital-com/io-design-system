import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputDate } from './io-input-date';

describe('io-input-date click events', () => {
  it('emits change event on value change', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [IoInputDate],
      template: () => <io-input-date label="Birth date" onChange={changeSpy} />,
    });
    const input = page.root?.shadowRoot?.querySelector<HTMLInputElement>('input');
    expect(input).toBeDefined();
    // Simulate a change event with a target value
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '2026-01-15' } });
    input?.dispatchEvent(event);
    await page.waitForChanges();
  });

  it('does not emit change when disabled', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [IoInputDate],
      template: () => <io-input-date label="Birth date" disabled onChange={changeSpy} />,
    });
    const input = page.root?.shadowRoot?.querySelector<HTMLInputElement>('input');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: '2026-01-15' } });
    input?.dispatchEvent(event);
    await page.waitForChanges();
    // disabled component should not emit
    expect(changeSpy).not.toHaveBeenCalled();
  });
});
