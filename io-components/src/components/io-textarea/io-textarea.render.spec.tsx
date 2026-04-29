import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-textarea — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-textarea label="Message" placeholder="Write here" />);
    expect(root).toMatchSnapshot();
  });

  it('renders resize modes', async () => {
    const { root } = await render(
      <div>
        <io-textarea label="None" resize="none" />
        <io-textarea label="Vertical" resize="vertical" />
        <io-textarea label="Auto" resize="auto" />
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-textarea label="Disabled" disabled value="Read only" />);
    expect(root).toMatchSnapshot();
  });
});