import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-button — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-button>Click me</io-button>);
    expect(root).toMatchSnapshot();
  });

  it('renders each variant', async () => {
    const { root } = await render(
      <div>
        <io-button variant="solid">Solid</io-button>
        <io-button variant="ghost">Ghost</io-button>
        <io-button variant="link">Link</io-button>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-button disabled>Disabled</io-button>);
    expect(root).toMatchSnapshot();
  });
});