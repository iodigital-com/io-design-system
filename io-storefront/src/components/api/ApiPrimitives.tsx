'use client';

import { isValidElement, type ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { CopyButton } from '@/components/CopyButton';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(nodeToText).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeToText(node.props.children);
  }

  return '';
}

// Language inference for CodeNote labels (mirrors CodeTabs logic)
const codeNoteLangMap: Record<string, string> = {
  html: 'xml',
  vue: 'xml',
  angular: 'typescript',
  react: 'tsx',
  'next.js': 'tsx',
  next: 'tsx',
  javascript: 'javascript',
  'vanilla js': 'javascript',
  'vanilla javascript': 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  css: 'css',
  json: 'json',
  bash: 'bash',
  sh: 'bash',
};

function getCodeLanguage(label: string): string {
  return codeNoteLangMap[label.trim().toLowerCase()] ?? 'javascript';
}

export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="block w-1 h-5 rounded-full shrink-0"
          style={{ background: 'var(--io-accent)' }}
          aria-hidden="true"
        />
        <h2
          className="text-lg font-bold"
          style={{ color: 'var(--io-text-primary)', letterSpacing: 'var(--io-heading-tracking-3, -0.015em)' }}
        >
          {title}
        </h2>
      </div>
      <p className="ml-3 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code
      className="text-xs font-mono px-1.5 py-0.5 rounded"
      style={{
        background: 'var(--io-bg-surface)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-primary)',
      }}
    >
      {children}
    </code>
  );
}

export type Column = { label: string; width?: string };

export function ApiTable({
  columns,
  rows,
}: {
  columns: Column[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--io-border)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: 'var(--io-bg-surface)', borderBottom: '1px solid var(--io-border)' }}>
            {columns.map((col) => (
              <th
                key={col.label}
                className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-widest"
                style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em', width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 1 ? 'var(--io-bg-raised)' : 'transparent',
                borderBottom: i < rows.length - 1 ? '1px solid var(--io-border)' : 'none',
              }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 align-top"
                  style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReflectBadge() {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1.5 align-middle"
      style={{ background: 'color-mix(in srgb, var(--io-accent-text) 10%, transparent)', color: 'var(--io-accent-text)', border: '1px solid color-mix(in srgb, var(--io-accent-text) 25%, transparent)' }}
      title="This prop is reflected to a host HTML attribute"
    >
      reflects
    </span>
  );
}

export function MutableBadge() {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1.5 align-middle"
      style={{ background: 'color-mix(in srgb, var(--io-color-warning) 16%, transparent)', color: 'var(--io-text-primary)', border: '1px solid color-mix(in srgb, var(--io-color-warning) 35%, transparent)' }}
      title="This prop is mutable and can be updated internally by the component"
    >
      mutable
    </span>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-5"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {children}
      </p>
    </div>
  );
}

export function CodeNote({ label, children }: { label: string; children: ReactNode }) {
  const codeText = nodeToText(children);
  const { resolvedTheme } = useStorefrontTheme();
  const syntaxStyle = resolvedTheme === 'dark' ? atomOneDark : atomOneLight;
  const language = getCodeLanguage(label);

  return (
    <div
      className="rounded-lg p-4"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
        {label}
      </p>
      <div className="relative group" data-no-auto-highlight="true">
        <CopyButton text={codeText} ariaLabel={`Copy ${label} code`} className="absolute right-2 top-2 z-10" />
        <SyntaxHighlighter
          language={language}
          style={syntaxStyle}
          customStyle={{
            margin: 0,
            padding: '0',
            paddingRight: '4rem',
            background: 'var(--io-bg-raised)',
            fontSize: '0.75rem',
            lineHeight: '1.7',
            overflow: 'auto',
          }}
          showLineNumbers={false}
          wrapLongLines={false}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
