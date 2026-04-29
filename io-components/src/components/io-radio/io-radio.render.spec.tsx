import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-radio — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-radio label="Option A" name="choice" value="a" />);
    expect(root).toMatchSnapshot();
  });

  it('renders checked state', async () => {
    const { root } = await render(<io-radio label="Selected" name="choice" value="b" checked />);
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-radio label="Disabled" name="choice" value="c" disabled />);
    expect(root).toMatchSnapshot();
  });
});