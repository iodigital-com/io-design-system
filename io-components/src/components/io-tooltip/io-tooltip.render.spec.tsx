import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-tooltip — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(
      <io-tooltip content="Helpful context">
        <button type="button">Trigger</button>
      </io-tooltip>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders each placement', async () => {
    const { root } = await render(
      <div>
        <io-tooltip content="Top" placement="top"><button type="button">Top</button></io-tooltip>
        <io-tooltip content="Bottom" placement="bottom"><button type="button">Bottom</button></io-tooltip>
        <io-tooltip content="Left" placement="left"><button type="button">Left</button></io-tooltip>
        <io-tooltip content="Right" placement="right"><button type="button">Right</button></io-tooltip>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders with light theme', async () => {
    const { root } = await render(
      <io-tooltip content="Light tooltip" theme="light">
        <button type="button">Trigger</button>
      </io-tooltip>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders with dark theme (explicit)', async () => {
    const { root } = await render(
      <io-tooltip content="Dark tooltip" theme="dark">
        <button type="button">Trigger</button>
      </io-tooltip>
    );
    expect(root).toMatchSnapshot();
  });
});