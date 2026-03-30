'use client';

import { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';

export type CodeTab = { label: string; code: string };

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

const getLanguageFromLabel = (label: string): string | undefined => {
  return languageByTabLabel[label.trim().toLowerCase()];
};

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const activeLanguage = getLanguageFromLabel(tabs[active]?.label ?? '');

  return (
    <div>
      {/* Tab strip */}
      <div className="flex border-b" style={{ borderColor: 'var(--io-border)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors cursor-pointer ${
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
      <div className="relative group">
        <CopyButton
          text={tabs[active].code}
          ariaLabel={`Copy ${tabs[active].label} code`}
          className="absolute right-3 top-3 z-10"
        />
        <pre
          className="p-5 pr-16 rounded-b-lg rounded-tr-lg text-sm font-mono overflow-x-auto leading-relaxed"
          data-language={activeLanguage}
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            borderTop: 'none',
            color: 'var(--io-text-primary)',
          }}
        >
          <code>{tabs[active].code}</code>
        </pre>
      </div>
    </div>
  );
}
