'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { ConfiguratorControls } from './ConfiguratorControls';
import { Playground } from './Playground';

import type { FrameworkCode } from '@/models/framework';
import type { PropDefinition } from '@/models/propDefinition';
import type { Story, StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import { createElements } from '@/utils/generator/generator';

const RESET_DELAY_MS = 2000;

type ConfiguratorProps = {
  tagName: HTMLTagOrComponent;
  story: Story<HTMLTagOrComponent>;
  propDefinitions: PropDefinition[];
  previewClassName?: string;
  previewStyle?: React.CSSProperties;
};

function getDefaultValue(def: PropDefinition): unknown {
  if (def.defaultValue !== undefined) return def.defaultValue;
  if (def.type === 'boolean') return false;
  if (def.type === 'number') return 0;
  if (def.type === 'select') return def.options[0];
  return '';
}

function parseParamValue(def: PropDefinition, raw: string): unknown {
  if (def.type === 'boolean') return raw === 'true';
  if (def.type === 'number') {
    const n = Number(raw);
    return Number.isFinite(n) ? n : getDefaultValue(def);
  }
  if (def.type === 'select') {
    return def.options.includes(raw) ? raw : getDefaultValue(def);
  }
  return raw;
}

function buildInitialState(
  story: Story<HTMLTagOrComponent>,
  propDefinitions: PropDefinition[],
  searchParams: URLSearchParams,
): StoryState<HTMLTagOrComponent> {
  const base = story.state ?? {};
  const baseProps = base.properties ?? {};
  const merged: Record<string, unknown> = { ...baseProps };

  for (const def of propDefinitions) {
    const raw = searchParams.get(def.name);
    if (raw === null) continue;
    merged[def.name] = parseParamValue(def, raw);
  }

  return { ...base, properties: merged };
}

function buildSearchParams(
  properties: Partial<Record<string, unknown>>,
  propDefinitions: PropDefinition[],
): string {
  const params = new URLSearchParams();
  for (const def of propDefinitions) {
    const value = properties[def.name];
    if (value === undefined) continue;
    const defaultVal = getDefaultValue(def);
    const strValue = String(value);
    const strDefault = String(defaultVal);
    if (strValue !== strDefault) {
      params.set(def.name, strValue);
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

function CopyLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function fallbackCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function ConfiguratorInner({ story, propDefinitions, previewClassName, previewStyle }: ConfiguratorProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize from story defaults only — URL params applied client-side below.
  // buildInitialState with searchParams during SSR would produce different initial state
  // than the server-rendered HTML when the URL contains search params → React #418.
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(
    () => (story.state ?? {}) as StoryState<HTMLTagOrComponent>,
  );

  // Apply URL search params once after mount; skip on subsequent renders.
  const urlParamsApplied = useRef(false);
  useEffect(() => {
    if (urlParamsApplied.current) return;
    urlParamsApplied.current = true;
    const initial = buildInitialState(story, propDefinitions, searchParams);
    const base = (story.state ?? {}) as StoryState<HTMLTagOrComponent>;
    const baseProps = base.properties ?? {};
    const merged = initial.properties ?? {};
    const hasUrlParams = Object.keys(merged).some(
      (k) => String(merged[k]) !== String((baseProps as Record<string, unknown>)[k]),
    );
    if (hasUrlParams) setExampleState(initial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [exampleElement, setExampleElement] = useState<ReactNode>(() =>
    createElements(story.generator(exampleState), setExampleState),
  );

  const [frameworkCode, setFrameworkCode] = useState<FrameworkCode>(() => {
    if (typeof story.frameworkCode === 'function') return story.frameworkCode(exampleState);
    if (story.frameworkCode) return story.frameworkCode;
    const g = story.generator(exampleState);
    return {
      html: generateHtmlMarkup(g),
      react: generateReactMarkup(g),
      angular: generateAngularMarkup(g),
      vue: generateVueMarkup(g),
    };
  });

  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const syncUrl = useCallback(
    (properties: Partial<Record<string, unknown>>) => {
      const qs = buildSearchParams(properties, propDefinitions);
      window.history.replaceState(null, '', `${pathname}${qs}`);
    },
    [pathname, propDefinitions],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: state change drives re-render
  useEffect(() => {
    const generated = story.generator(exampleState);
    setExampleElement(createElements(generated, setExampleState));
    if (typeof story.frameworkCode === 'function') {
      setFrameworkCode(story.frameworkCode(exampleState));
    } else if (story.frameworkCode) {
      setFrameworkCode(story.frameworkCode);
    } else {
      setFrameworkCode({
        html: generateHtmlMarkup(generated),
        react: generateReactMarkup(generated),
        angular: generateAngularMarkup(generated),
        vue: generateVueMarkup(generated),
      });
    }
    syncUrl(exampleState.properties ?? {});
  }, [exampleState]);

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        fallbackCopy(url);
      }
      setCopied(true);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-end mb-2"
      >
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 rounded-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--io-border-focus)]"
          style={{
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 500,
            border: '1px solid var(--io-border)',
            borderRadius: '6px',
            color: copied ? 'var(--io-color-primary)' : 'var(--io-text-secondary)',
            background: copied ? 'var(--io-accent-bg)' : 'transparent',
            borderColor: copied ? 'var(--io-color-primary)' : 'var(--io-border)',
          }}
          aria-label="Copy link to this configuration"
        >
          {copied ? <CheckIcon /> : <CopyLinkIcon />}
          <span>{copied ? 'Copied!' : 'Copy link'}</span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Link copied!' : ''}
        </span>
      </div>
      <Playground frameworkCode={frameworkCode} previewClassName={previewClassName} previewStyle={previewStyle}>{exampleElement}</Playground>
      <ConfiguratorControls
        propDefinitions={propDefinitions}
        storyState={exampleState}
        setStoryState={setExampleState}
      />
    </div>
  );
}

export function Configurator(props: ConfiguratorProps) {
  return (
    <Suspense>
      <ConfiguratorInner {...props} />
    </Suspense>
  );
}
