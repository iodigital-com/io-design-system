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

describe('io-tabs — render-level prop assertions', () => {
  it('adds tabs--size-small class on the tablist when size="small"', async () => {
    const { root } = await render(
      <io-tabs size="small">
        <button type="button">Tab A</button>
      </io-tabs>
    );
    const tablist = root.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist?.classList.contains('tabs--size-small')).toBe(true);
  });

  it('adds tabs--size-medium class on the tablist when size="medium"', async () => {
    const { root } = await render(
      <io-tabs size="medium">
        <button type="button">Tab A</button>
      </io-tabs>
    );
    const tablist = root.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist?.classList.contains('tabs--size-medium')).toBe(true);
  });

  it('sets aria-labelledby on the tablist when labelledby is provided', async () => {
    const { root } = await render(
      <io-tabs labelledby="heading-id">
        <button type="button">Tab A</button>
      </io-tabs>
    );
    const tablist = root.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist?.getAttribute('aria-labelledby')).toBe('heading-id');
  });

  it('does not set aria-label when labelledby is provided', async () => {
    const { root } = await render(
      <io-tabs labelledby="heading-id" label="fallback label">
        <button type="button">Tab A</button>
      </io-tabs>
    );
    const tablist = root.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist?.hasAttribute('aria-label')).toBe(false);
  });

  it('sets aria-label when labelledby is not provided', async () => {
    const { root } = await render(
      <io-tabs label="My tabs">
        <button type="button">Tab A</button>
      </io-tabs>
    );
    const tablist = root.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist?.getAttribute('aria-label')).toBe('My tabs');
  });

  it('adds tabs--size-compact class on the tablist when size="compact"', async () => {
    const { root } = await render(
      <io-tabs size="compact">
        <button type="button">Tab A</button>
      </io-tabs>
    );
    const tablist = root.shadowRoot?.querySelector('[role="tablist"]');
    expect(tablist?.classList.contains('tabs--size-compact')).toBe(true);
  });
});