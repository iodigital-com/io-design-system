import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-toast-item — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-toast-item text="Notification" />);
    expect(root).toMatchSnapshot();
  });

  it('renders each variant', async () => {
    const { root } = await render(
      <div>
        <io-toast-item text="Neutral" variant="neutral" />
        <io-toast-item text="Success" variant="success" />
        <io-toast-item text="Error" variant="error" />
        <io-toast-item text="Warning" variant="warning" />
        <io-toast-item text="Info" variant="info" />
      </div>
    );
    expect(root).toMatchSnapshot();
  });
});