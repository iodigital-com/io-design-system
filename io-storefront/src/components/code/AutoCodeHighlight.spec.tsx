// @vitest-environment jsdom

/**
 * AutoCodeHighlight — security regression tests (#266)
 *
 * Coverage:
 *  - innerHTML sink replaced: highlight output sets real DOM nodes, not raw HTML string
 *  - MutationObserver scoped to #main-content when present
 *  - Already-highlighted blocks are not re-processed (signature guard)
 */

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AutoCodeHighlight } from './AutoCodeHighlight';

vi.mock('next/navigation', () => ({
  usePathname: () => '/test',
}));

vi.mock('highlight.js', () => ({
  default: {
    highlight: () => ({
      value: '<span class="hljs-string">hello</span>',
      language: 'typescript',
    }),
    highlightAuto: () => ({
      value: '<span class="hljs-auto">hello</span>',
      language: 'javascript',
    }),
  },
}));

function addMainContent(): HTMLElement {
  const main = document.createElement('main');
  main.id = 'main-content';
  document.body.appendChild(main);
  return main;
}

async function flushHighlight() {
  // Flush React effects then the scheduled RAF.
  await act(async () => {});
  await act(async () => {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  });
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('AutoCodeHighlight — skip guards', () => {
  it('skips <pre> blocks with the react-syntax-highlighter class', async () => {
    const hljs = await import('highlight.js');
    const spy = vi.spyOn(hljs.default, 'highlightAuto');

    const main = addMainContent();
    const pre = document.createElement('pre');
    pre.className = 'react-syntax-highlighter';
    pre.textContent = 'const x = 1;';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(spy).not.toHaveBeenCalled();
    expect(pre.dataset.ioHighlighted).toBeUndefined();
  });

  it('skips <pre> blocks inside data-no-auto-highlight containers', async () => {
    const hljs = await import('highlight.js');
    const spy = vi.spyOn(hljs.default, 'highlightAuto');

    const main = addMainContent();
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-no-auto-highlight', 'true');
    const pre = document.createElement('pre');
    pre.textContent = 'const x = 1;';
    wrapper.appendChild(pre);
    main.appendChild(wrapper);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(spy).not.toHaveBeenCalled();
    expect(pre.dataset.ioHighlighted).toBeUndefined();
  });

  it('skips <pre> blocks whose ioHighlightSignature already matches', async () => {
    const hljs = await import('highlight.js');
    const spy = vi.spyOn(hljs.default, 'highlightAuto');

    const main = addMainContent();
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = 'const x = 1;';
    pre.appendChild(code);
    pre.dataset.ioHighlightSignature = 'auto::const x = 1;';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(spy).not.toHaveBeenCalled();
  });

  it('normalizes language="html" via data-language to "xml" when calling hljs', async () => {
    const hljs = await import('highlight.js');
    const spy = vi.spyOn(hljs.default, 'highlight');

    const main = addMainContent();
    const pre = document.createElement('pre');
    pre.setAttribute('data-language', 'html');
    pre.textContent = '<div>test</div>';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(spy).toHaveBeenCalledWith('<div>test</div>', { language: 'xml', ignoreIllegals: true });
  });
});

describe('AutoCodeHighlight — innerHTML sink', () => {
  it('populates code element via createContextualFragment, not innerHTML', async () => {
    const createRangeSpy = vi.spyOn(document, 'createRange');

    const main = addMainContent();
    const pre = document.createElement('pre');
    pre.textContent = 'const x = 1;';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    // Verify the safe path was taken — if innerHTML were used instead, createRange would not be called.
    expect(createRangeSpy).toHaveBeenCalled();
    const codeEl = pre.querySelector('code');
    expect(codeEl).not.toBeNull();
    expect(codeEl!.firstChild).not.toBeNull();
    expect((codeEl!.firstChild as Element).tagName.toLowerCase()).toBe('span');
    expect(pre.dataset.ioHighlighted).toBe('true');
  });

  it('skips <pre> blocks that live outside #main-content', async () => {
    addMainContent(); // empty main — no pre blocks inside

    const outsidePre = document.createElement('pre');
    outsidePre.textContent = 'outside code';
    document.body.appendChild(outsidePre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(outsidePre.dataset.ioHighlighted).toBeUndefined();
  });

  it('marks <pre> with only whitespace as highlighted without calling hljs', async () => {
    const hljs = await import('highlight.js');
    const spy = vi.spyOn(hljs.default, 'highlightAuto');

    const main = addMainContent();
    const pre = document.createElement('pre');
    pre.textContent = '   ';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(pre.dataset.ioHighlighted).toBe('true');
    expect(spy).not.toHaveBeenCalled();
  });

  it('falls back to plain text when hljs throws during highlight', async () => {
    const hljs = await import('highlight.js');
    vi.spyOn(hljs.default, 'highlightAuto').mockImplementation(() => {
      throw new Error('hljs failed');
    });

    const main = addMainContent();
    const pre = document.createElement('pre');
    pre.textContent = 'const x = 1;';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    const codeEl = pre.querySelector('code');
    expect(codeEl).not.toBeNull();
    expect(codeEl!.classList.contains('language-plaintext')).toBe(true);
    expect(codeEl!.textContent).toBe('const x = 1;');
    expect(pre.dataset.ioHighlighted).toBe('true');
  });

  it('does not re-highlight blocks with a matching signature (guards against infinite DOM churn)', async () => {
    const hljs = await import('highlight.js');
    // No language class → highlightAuto is used by the component.
    const spy = vi.spyOn(hljs.default, 'highlightAuto');

    const main = addMainContent();
    const pre = document.createElement('pre');
    pre.textContent = 'const z = 3;';
    main.appendChild(pre);

    render(<AutoCodeHighlight />);
    await flushHighlight();

    const firstCallCount = spy.mock.calls.length;
    expect(firstCallCount).toBeGreaterThan(0);

    // Second render with same content — signature guard must prevent re-highlight.
    render(<AutoCodeHighlight />);
    await flushHighlight();

    expect(spy.mock.calls.length).toBe(firstCallCount);
  });
});
