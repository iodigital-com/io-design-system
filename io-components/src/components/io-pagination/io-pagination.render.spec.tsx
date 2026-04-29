import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-pagination — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-pagination />);
    expect(root).toMatchSnapshot();
  });

  it('renders mid-range pagination', async () => {
    const { root } = await render(<io-pagination page={5} totalPages={12} />);
    expect(root).toMatchSnapshot();
  });
});