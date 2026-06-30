import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-badge — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-badge>Badge</io-badge>);
    expect(root).toMatchSnapshot();
  });

  it('renders semantic variants', async () => {
    const { root } = await render(
      <div>
        <io-badge variant="neutral">Neutral</io-badge>
        <io-badge variant="primary">Primary</io-badge>
        <io-badge variant="info">Info</io-badge>
        <io-badge variant="success">Success</io-badge>
        <io-badge variant="warning">Warning</io-badge>
        <io-badge variant="error">Error</io-badge>
        <io-badge variant="subtle">Subtle</io-badge>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders appearance modifiers', async () => {
    const { root } = await render(
      <div>
        <io-badge variant="primary" appearance="soft">Soft</io-badge>
        <io-badge variant="primary" appearance="solid">Solid</io-badge>
        <io-badge variant="primary" appearance="frosted">Frosted</io-badge>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders deprecated brand-colour variants (backwards compat)', async () => {
    const { root } = await render(
      <div>
        <io-badge variant="beige">Beige</io-badge>
        <io-badge variant="blue">Blue</io-badge>
        <io-badge variant="dark">Dark</io-badge>
        <io-badge variant="orange">Orange</io-badge>
        <io-badge variant="rouge">Rouge</io-badge>
        <io-badge variant="outline">Outline</io-badge>
      </div>
    );
    expect(root).toMatchSnapshot();
  });
});
