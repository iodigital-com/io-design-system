'use client';

import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { CopyButton } from '@/components/CopyButton';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

export type CodeTab = { label: string; code: string; language?: string };

const languageByTabLabel: Record<string, string> = {
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

const getLanguageFromLabel = (label: string): string => {
  return languageByTabLabel[label.trim().toLowerCase()] ?? 'typescript';
};

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const { resolvedTheme } = useStorefrontTheme();

  const activeTab = tabs[active];
  const activeLanguage = activeTab?.language ?? getLanguageFromLabel(activeTab?.label ?? '');
  const syntaxStyle = resolvedTheme === 'dark' ? atomOneDark : atomOneLight;

  return (
    <div>
      {/* Tab strip */}
      <div className="flex overflow-x-auto border-b" style={{ borderColor: 'var(--io-border)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer ${
              i === active
                ? 'border-[var(--io-accent)] text-[var(--io-text-primary)]'
                : 'border-transparent text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] hover:border-[var(--io-border)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code panel */}
      <div className="relative group" data-no-auto-highlight="true">
        <CopyButton
          text={activeTab.code}
          ariaLabel={`Copy ${activeTab.label} code`}
          className="absolute right-3 top-3 z-10"
        />
        <SyntaxHighlighter
          language={activeLanguage}
          style={syntaxStyle}
          customStyle={{
            margin: 0,
            padding: '1.25rem 1.25rem',
            paddingRight: '4rem',
            background: 'var(--io-bg-raised)',
            fontSize: '0.8125rem',
            lineHeight: '1.65',
            borderRadius: '0 0 0.5rem 0.5rem',
            border: '1px solid var(--io-border)',
            borderTop: 'none',
            overflow: 'auto',
          }}
          showLineNumbers={false}
          wrapLongLines={false}
        >
          {activeTab.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
