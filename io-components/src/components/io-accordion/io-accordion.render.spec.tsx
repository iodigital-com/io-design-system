import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-accordion — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-accordion heading="Section heading" />);
    expect(root).toMatchSnapshot();
  });

  it('renders open state', async () => {
    const { root } = await render(<io-accordion heading="Expanded section" open />);
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-accordion heading="Disabled section" disabled />);
    expect(root).toMatchSnapshot();
  });
});