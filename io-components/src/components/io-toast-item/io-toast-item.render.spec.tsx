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

  it('renders CTA as button when actionLabel is set without actionHref', async () => {
    const { root } = await render(<io-toast-item text="Your file is ready." actionLabel="Download" />);
    expect(root).toMatchSnapshot();
  });

  it('renders CTA as anchor when actionLabel and actionHref are both set', async () => {
    const { root } = await render(<io-toast-item text="New release available." actionLabel="View changelog" actionHref="/changelog" />);
    expect(root).toMatchSnapshot();
  });
});