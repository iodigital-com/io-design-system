import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-toast — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-toast />);
    expect(root).toMatchSnapshot();
  });

  it('renders active toast item state', async () => {
    const { root, waitForChanges } = await render(<io-toast />);
    const toast = root as HTMLIoToastElement;
    await toast.addToast({ text: 'Settings saved.', variant: 'success', duration: 0 });
    await waitForChanges();
    expect(toast).toMatchSnapshot();
  });
});