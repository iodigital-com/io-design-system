import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputSearch } from './io-input-search';

describe('io-input-search click events', () => {
  it('clears value when clear button is clicked', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="hello" />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('.search-clear');
    expect(clearBtn).toBeDefined();
    clearBtn!.click();
    await page.waitForChanges();
    expect(page.rootInstance.value).toBe('');
  });

  it('hides clear button after clearing', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="hello" />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('.search-clear');
    clearBtn!.click();
    await page.waitForChanges();
    const updatedClearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(updatedClearBtn?.classList.contains('search-clear--hidden')).toBe(true);
  });

  it('emits clear event when clear button is clicked', async () => {
    const clearSpy = jest.fn();
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="hello" onClear={clearSpy} />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('.search-clear');
    clearBtn!.click();
    await page.waitForChanges();
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});
