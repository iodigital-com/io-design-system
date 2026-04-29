import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-input — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-input label="Email" placeholder="name@example.com" />);
    expect(root).toMatchSnapshot();
  });

  it('renders input types', async () => {
    const { root } = await render(
      <div>
        <io-input label="Email" type="email" />
        <io-input label="Search" type="search" />
        <io-input label="Telephone" type="tel" />
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-input label="Disabled" disabled value="Read only" />);
    expect(root).toMatchSnapshot();
  });
});