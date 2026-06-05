'use client';

import React, { useState, type ReactNode } from 'react';

import { CodeBlock } from './CodeBlock';

import type { FrameworkCode } from '@/models/framework';

type PlaygroundProps = {
  /** The rendered component demo. */
  children: ReactNode;
  /** All four framework code strings shown in the code block. */
  frameworkCode: FrameworkCode;
  /** Pre-expand the code block on mount (useful for examples pages). */
  codeVisible?: boolean;
  /** Extra class names applied to the preview wrapper (e.g. 'w-full max-w-xl'). */
  previewClassName?: string;
  /** Inline styles merged into the preview wrapper — use to override background for dark stages. */
  previewStyle?: React.CSSProperties;
};

/**
 * Playground — live preview area + collapsible syntax-highlighted code block.
 *
 * ┌─────────────────────────────────────────────┐
 * │  demo area (p-8, bg-surface)                │
 * ├─────────────────────────────────────────────┤
 * │  [HTML] [React] [Angular] [Vue]  Copy  Show │
 * ├─────────────────────────────────────────────┤
 * │  <syntax-highlighted html>                  │
 * └─────────────────────────────────────────────┘
 */
export function Playground({ children, frameworkCode, codeVisible = true, previewClassName, previewStyle }: PlaygroundProps) {
  const [showCode, setShowCode] = useState(codeVisible);
  const [previewDark, setPreviewDark] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--io-border)] mb-8">
      {/* Preview toolbar — theme toggle */}
      <div
        className="flex items-center justify-end px-3 py-1.5 border-b border-[var(--io-border)]"
        style={{ backgroundColor: 'var(--io-bg-surface)' }}
      >
        <button
          type="button"
          aria-pressed={previewDark}
          aria-label={previewDark ? 'Switch preview to light mode' : 'Switch preview to dark mode'}
          onClick={() => setPreviewDark((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors"
          style={{
            color: previewDark ? 'var(--io-color-primary)' : 'var(--io-text-secondary)',
            backgroundColor: previewDark ? 'var(--io-accent-bg)' : 'transparent',
            border: '1px solid',
            borderColor: previewDark ? 'var(--io-color-primary)' : 'var(--io-border)',
          }}
        >
          <span aria-hidden="true">{previewDark ? '☀' : '◐'}</span>
          {previewDark ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Live preview — dot grid stage */}
      <div
        className={['p-4 sm:p-8 flex items-center justify-center min-h-[var(--io-playground-min-height)]', previewClassName].filter(Boolean).join(' ')}
        data-preview
        data-theme={previewDark ? 'dark' : undefined}
        style={{
          backgroundColor: previewDark ? 'var(--io-color-dark-bg-base)' : 'var(--io-bg-raised)',
          color: 'var(--io-text-primary)',
          backgroundImage: 'linear-gradient(var(--io-border) 1px, transparent 1px), linear-gradient(to right, var(--io-border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          ...previewStyle,
        }}
      >
        {children}
      </div>

      {/* Tab bar + collapsible code */}
      <CodeBlock
        frameworkCode={frameworkCode}
        visible={showCode}
        onToggle={() => setShowCode((v) => !v)}
      />
    </div>
  );
}
