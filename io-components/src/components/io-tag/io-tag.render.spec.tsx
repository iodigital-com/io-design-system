import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-tag — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-tag>Label</io-tag>);
    expect(root).toMatchSnapshot();
  });

  it('renders color and size variants', async () => {
    const { root } = await render(
      <div>
        <io-tag size="sm" color="default">Default</io-tag>
        <io-tag size="md" color="blue">Blue</io-tag>
        <io-tag size="md" color="beige">Beige</io-tag>
        <io-tag size="md" color="dark">Dark</io-tag>
        <io-tag size="md" color="orange">Orange</io-tag>
        <io-tag size="md" color="rouge">Rouge</io-tag>
        <io-tag size="md" color="success">Success</io-tag>
        <io-tag size="md" color="warning">Warning</io-tag>
        <io-tag size="md" color="error">Error</io-tag>
        <io-tag size="md" color="outline">Outline</io-tag>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-tag disabled>Disabled</io-tag>);
    expect(root).toMatchSnapshot();
  });
});