import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-link — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-link href="/about">Learn more</io-link>);
    expect(root).toMatchSnapshot();
  });

  it('renders each variant', async () => {
    const { root } = await render(
      <div>
        <io-link href="/about" variant="standalone">Standalone</io-link>
        <io-link href="/about" variant="inline">Inline</io-link>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-link href="/about" disabled>Unavailable</io-link>);
    expect(root).toMatchSnapshot();
  });
});