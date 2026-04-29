import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-select — render snapshots', () => {
  const options = [
    { label: 'Netherlands', value: 'nl' },
    { label: 'Belgium', value: 'be' },
    { label: 'Germany', value: 'de', disabled: true },
  ];

  it('renders default state', async () => {
    const { root } = await render(<io-select label="Country" placeholder="Choose" options={options} />);
    expect(root).toMatchSnapshot();
  });

  it('renders selected value state', async () => {
    const { root } = await render(<io-select label="Country" options={options} value="be" />);
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-select label="Country" options={options} disabled />);
    expect(root).toMatchSnapshot();
  });
});