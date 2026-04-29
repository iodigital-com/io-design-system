import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-spinner — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-spinner />);
    expect(root).toMatchSnapshot();
  });

  it('renders sizes and colors', async () => {
    const { root } = await render(
      <div>
        <io-spinner size="sm" color="primary" />
        <io-spinner size="md" color="white" />
        <io-spinner size="lg" color="current" />
      </div>
    );
    expect(root).toMatchSnapshot();
  });
});