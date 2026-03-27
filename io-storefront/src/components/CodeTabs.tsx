'use client';

import React, { useState } from 'react';

export type CodeTab = { label: string; code: string };

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);

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
      <pre
        className="p-5 rounded-b-lg rounded-tr-lg text-sm font-mono overflow-x-auto leading-relaxed"
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
  );
}
