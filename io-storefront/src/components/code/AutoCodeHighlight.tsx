'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const tryGetExplicitLanguage = (element: HTMLElement): string | undefined => {
  const dataLanguage = element.getAttribute('data-language');
  if (dataLanguage) {
    return dataLanguage.toLowerCase();
  }

  const classMatch = element.className.match(/language-([\w-]+)/i);
  if (classMatch?.[1]) {
    return classMatch[1].toLowerCase();
  }

  return undefined;
};

const normalizeLanguage = (language: string): string => {
  switch (language) {
    case 'ts':
      return 'typescript';
    case 'js':
      return 'javascript';
    case 'sh':
    case 'shell':
      return 'bash';
    case 'html':
      return 'xml';
    default:
      return language;
  }
};

export function AutoCodeHighlight() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let rafId: number | null = null;

    const scheduleHighlight = (run: () => void) => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        rafId = null;
        run();
      });
    };

    const highlight = async () => {
      const hljsModule = await import('highlight.js');

      if (cancelled) {
        return;
      }

      const hljs = hljsModule.default;

      const preBlocks = Array.from(document.querySelectorAll('pre')) as HTMLPreElement[];

      preBlocks.forEach((pre) => {
        if (pre.className.includes('react-syntax-highlighter') || pre.querySelector('code.hljs')) {
          return;
        }

        if (pre.closest('[data-no-auto-highlight="true"]')) {
          return;
        }

        const existingCode = pre.querySelector('code');
        const codeEl = existingCode ?? document.createElement('code');

        if (!existingCode) {
          codeEl.textContent = pre.textContent ?? '';
          pre.textContent = '';
          pre.appendChild(codeEl);
        }

        const rawText = codeEl.textContent ?? '';
        if (!rawText.trim()) {
          pre.dataset.ioHighlighted = 'true';
          return;
        }

        const explicitLanguage = tryGetExplicitLanguage(pre) ?? tryGetExplicitLanguage(codeEl);
        const normalizedLanguage = explicitLanguage ? normalizeLanguage(explicitLanguage) : undefined;
        const signature = `${normalizedLanguage ?? 'auto'}::${rawText}`;

        if (pre.dataset.ioHighlightSignature === signature) {
          return;
        }

        try {
          const result = normalizedLanguage
            ? hljs.highlight(rawText, { language: normalizedLanguage, ignoreIllegals: true })
            : hljs.highlightAuto(rawText);

          const languageClass = result.language ? `language-${result.language}` : 'language-plaintext';
          codeEl.className = '';
          codeEl.classList.add('hljs', languageClass);
          codeEl.innerHTML = result.value;
          pre.dataset.ioHighlighted = 'true';
          pre.dataset.ioHighlightSignature = signature;
        } catch {
          codeEl.className = '';
          codeEl.classList.add('hljs', 'language-plaintext');
          codeEl.textContent = rawText;
          pre.dataset.ioHighlighted = 'true';
          pre.dataset.ioHighlightSignature = signature;
        }
      });
    };

    scheduleHighlight(highlight);

    observer = new MutationObserver(() => {
      scheduleHighlight(highlight);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['data-language', 'class'],
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  return null;
}
