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

  it('renders CTA as button when action is set without href', async () => {
    const { root } = await render(<io-toast-item text="Your file is ready." actions={[{ label: 'Download' }]} />);
    expect(root).toMatchSnapshot();
  });

  it('renders CTA as anchor when action has href', async () => {
    const { root } = await render(<io-toast-item text="New release available." actions={[{ label: 'View changelog', href: '/changelog' }]} />);
    expect(root).toMatchSnapshot();
  });
});