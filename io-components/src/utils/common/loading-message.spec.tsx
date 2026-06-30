import { describe, it, expect } from 'vitest';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { Component, Prop, State } from '@stencil/core';
import { LoadingMessage } from './loading-message';

// Minimal host component to exercise LoadingMessage
@Component({ tag: 'test-loading-host', shadow: false })
class TestLoadingHost {
  @Prop() loading = false;
  @State() initialLoading = false;
  @State() id = 'test-loading';

  render() {
    return (
      <div>
        <LoadingMessage
          id={this.id}
          loading={this.loading}
          initialLoading={this.initialLoading}
        />
      </div>
    );
  }
}

describe('LoadingMessage', () => {
  it('renders empty span on initial mount when loading=false and initialLoading=false', async () => {
    const page = await newSpecPage({
      components: [TestLoadingHost],
      html: `<test-loading-host></test-loading-host>`,
    });
    const span = page.root?.querySelector('#test-loading');
    expect(span).toBeDefined();
    expect(span?.textContent?.trim()).toBe('');
  });

  it('renders "Loading" when loading=true and initialLoading=true', async () => {
    const page = await newSpecPage({
      components: [TestLoadingHost],
      html: `<test-loading-host></test-loading-host>`,
    });
    page.rootInstance.loading = true;
    page.rootInstance.initialLoading = true;
    await page.waitForChanges();
    const span = page.root?.querySelector('#test-loading');
    expect(span?.textContent?.trim()).toBe('Loading');
  });

  it('renders "Loading finished" when loading=false and initialLoading=true', async () => {
    const page = await newSpecPage({
      components: [TestLoadingHost],
      html: `<test-loading-host></test-loading-host>`,
    });
    page.rootInstance.loading = false;
    page.rootInstance.initialLoading = true;
    await page.waitForChanges();
    const span = page.root?.querySelector('#test-loading');
    expect(span?.textContent?.trim()).toBe('Loading finished');
  });

  it('uses custom loadingDescription when provided', async () => {
    @Component({ tag: 'test-loading-custom', shadow: false })
    class TestLoadingCustom {
      @State() loading = true;
      @State() initialLoading = true;

      render() {
        return (
          <LoadingMessage
            id="custom-loading"
            loading={this.loading}
            initialLoading={this.initialLoading}
            loadingDescription="Aan het laden"
            loadingFinishedDescription="Laden voltooid"
          />
        );
      }
    }

    const page = await newSpecPage({
      components: [TestLoadingCustom],
      html: `<test-loading-custom></test-loading-custom>`,
    });
    const span = page.root?.querySelector('#custom-loading');
    expect(span?.textContent?.trim()).toBe('Aan het laden');

    page.rootInstance.loading = false;
    await page.waitForChanges();
    expect(span?.textContent?.trim()).toBe('Laden voltooid');
  });

  it('renders span with role=status and aria-live=polite', async () => {
    const page = await newSpecPage({
      components: [TestLoadingHost],
      html: `<test-loading-host></test-loading-host>`,
    });
    const span = page.root?.querySelector('#test-loading');
    expect(span?.getAttribute('role')).toBe('status');
    expect(span?.getAttribute('aria-live')).toBe('polite');
    expect(span?.getAttribute('aria-atomic')).toBe('true');
  });
});
