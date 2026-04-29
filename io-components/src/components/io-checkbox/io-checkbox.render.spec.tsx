import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-checkbox — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-checkbox label="Accept terms" />);
    expect(root).toMatchSnapshot();
  });

  it('renders checked and indeterminate states', async () => {
    const { root } = await render(
      <div>
        <io-checkbox label="Checked" checked />
        <io-checkbox label="Indeterminate" indeterminate />
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-checkbox label="Disabled" disabled helperText="Unavailable" />);
    expect(root).toMatchSnapshot();
  });
});