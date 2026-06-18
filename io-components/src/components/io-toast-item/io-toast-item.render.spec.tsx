import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-toast-item — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-toast-item text="Notification" />);
    expect(root).toMatchSnapshot();
  });

  it('renders each variant', async () => {
    const variants = ['neutral', 'success', 'error', 'warning', 'info'] as const;
    for (const variant of variants) {
      const { root } = await render(<io-toast-item text={variant} variant={variant} />);
      expect(root).toMatchSnapshot(`${variant} variant`);
    }
  });
});