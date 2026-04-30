import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-select — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(
      <io-select label="Country" placeholder="Choose">
        <io-option value="nl" label="Netherlands"></io-option>
        <io-option value="be" label="Belgium"></io-option>
        <io-option value="de" label="Germany" disabled></io-option>
      </io-select>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders selected value state', async () => {
    const { root } = await render(
      <io-select label="Country" value="be">
        <io-option value="nl" label="Netherlands"></io-option>
        <io-option value="be" label="Belgium"></io-option>
        <io-option value="de" label="Germany" disabled></io-option>
      </io-select>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(
      <io-select label="Country" disabled>
        <io-option value="nl" label="Netherlands"></io-option>
        <io-option value="be" label="Belgium"></io-option>
        <io-option value="de" label="Germany" disabled></io-option>
      </io-select>
    );
    expect(root).toMatchSnapshot();
  });
});
