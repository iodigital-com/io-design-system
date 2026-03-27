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

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--io-border)] mb-8">
      {/* Live preview — dot grid stage */}
      <div
        className={['p-8 flex items-center justify-center min-h-[var(--io-playground-min-height)]', previewClassName].filter(Boolean).join(' ')}
        data-preview
        style={{
          backgroundColor: 'var(--io-bg-raised)',
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
