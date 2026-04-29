import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-modal — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-modal heading="Confirm action">Body copy</io-modal>);
    expect(root).toMatchSnapshot();
  });

  it('renders each size', async () => {
    const { root } = await render(
      <div>
        <io-modal heading="Small" size="sm">Small body</io-modal>
        <io-modal heading="Medium" size="md">Medium body</io-modal>
        <io-modal heading="Large" size="lg">Large body</io-modal>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders slotted footer actions', async () => {
    const { root } = await render(
      <io-modal heading="Open modal" description="Important context">
        <p>Modal body content.</p>
        <button slot="footer" type="button">Cancel</button>
        <button slot="footer" type="button">Confirm</button>
      </io-modal>
    );
    expect(root).toMatchSnapshot();
  });
});