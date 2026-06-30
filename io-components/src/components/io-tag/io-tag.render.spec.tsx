import { describe, expect, h, it, render } from '@stencil/vitest';

describe('io-tag — render snapshots', () => {
  it('renders default state', async () => {
    const { root } = await render(<io-tag>Label</io-tag>);
    expect(root).toMatchSnapshot();
  });

  it('renders semantic variant and appearance combinations', async () => {
    const { root } = await render(
      <div>
        <io-tag variant="neutral" appearance="soft">Neutral Soft</io-tag>
        <io-tag variant="primary" appearance="soft">Primary Soft</io-tag>
        <io-tag variant="primary" appearance="solid">Primary Solid</io-tag>
        <io-tag variant="info" appearance="frosted">Info Frosted</io-tag>
        <io-tag variant="success" appearance="soft">Success</io-tag>
        <io-tag variant="warning" appearance="soft">Warning</io-tag>
        <io-tag variant="error" appearance="soft">Error</io-tag>
        <io-tag variant="subtle" appearance="soft">Subtle</io-tag>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders with deprecated color prop (backwards compat)', async () => {
    const { root } = await render(
      <div>
        <io-tag size="sm" color="default">Default</io-tag>
        <io-tag size="md" color="blue">Blue</io-tag>
      </div>
    );
    expect(root).toMatchSnapshot();
  });

  it('renders disabled state', async () => {
    const { root } = await render(<io-tag disabled>Disabled</io-tag>);
    expect(root).toMatchSnapshot();
  });
});
