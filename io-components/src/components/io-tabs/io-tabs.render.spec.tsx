import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-tabs — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(
      <io-tabs>
        <button type="button">Overview</button>
        <button type="button">Details</button>
      </io-tabs>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders active index and disabled tab state', async () => {
    const { root } = await render(
      <io-tabs activeTabIndex={1}>
        <button type="button">Overview</button>
        <button type="button">Details</button>
        <button type="button" disabled>Settings</button>
      </io-tabs>
    );
    expect(root).toMatchSnapshot();
  });
});