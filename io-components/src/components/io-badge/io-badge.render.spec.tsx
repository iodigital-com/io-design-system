import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-badge — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-badge>Badge</io-badge>);
    expect(root).toMatchSnapshot();
  });

  it('renders each variant', async () => {
    const { root } = await render(
      <div>
        <io-badge variant="beige">Beige</io-badge>
        <io-badge variant="blue">Blue</io-badge>
        <io-badge variant="dark">Dark</io-badge>
        <io-badge variant="orange">Orange</io-badge>
        <io-badge variant="rouge">Rouge</io-badge>
        <io-badge variant="success">Success</io-badge>
        <io-badge variant="warning">Warning</io-badge>
        <io-badge variant="error">Error</io-badge>
        <io-badge variant="outline">Outline</io-badge>
      </div>
    );
    expect(root).toMatchSnapshot();
  });
});