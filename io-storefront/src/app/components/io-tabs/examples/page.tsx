'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  tabsStoryDefault,
  tabsStoryWithDisabled,
  tabsStoryManyTabs,
} from '../io-tabs.stories';

// ── Panel content demo ─────────────────────────────────────────────────────────

function TabsWithPanels() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' },
    { label: 'Settings', value: 'settings' },
  ];

  const panels: Record<string, React.ReactNode> = {
    overview: (
      <div
        id="panel-overview"
        role="tabpanel"
        aria-label="Overview"
        className="p-5 rounded-lg"
        style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
      >
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          This is the <strong style={{ color: 'var(--io-text-primary)' }}>Overview</strong> panel.
          Consumers render panels separately and manage visibility by comparing each panel&apos;s
          value against the active tab.
        </p>
      </div>
    ),
    details: (
      <div
        id="panel-details"
        role="tabpanel"
        aria-label="Details"
        className="p-5 rounded-lg"
        style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
      >
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          This is the <strong style={{ color: 'var(--io-text-primary)' }}>Details</strong> panel.
          Listen for the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>ioChange</code> event
          to update which panel is shown.
        </p>
      </div>
    ),
    settings: (
      <div
        id="panel-settings"
        role="tabpanel"
        aria-label="Settings"
        className="p-5 rounded-lg"
        style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
      >
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          This is the <strong style={{ color: 'var(--io-text-primary)' }}>Settings</strong> panel.
          Each panel should carry <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;tabpanel&quot;</code> for
          correct assistive technology semantics.
        </p>
      </div>
    ),
  };

  return (
    <div className="space-y-4">
      <io-tabs
        tabs={tabs as unknown}
        active-tab={activeTab}
        onIoChange={(e: CustomEvent<string>) => setActiveTab(e.detail)}
      />
      {panels[activeTab]}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function IoTabsExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Default
        </h2>
        <ComponentStory story={tabsStoryDefault} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          With disabled tab
        </h2>
        <ComponentStory story={tabsStoryWithDisabled} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          Many tabs
        </h2>
        <ComponentStory story={tabsStoryManyTabs} />
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          With panel content
        </h2>
        <p
          className="text-sm mb-4"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
        >
          Consumers manage panel visibility themselves. The component emits{' '}
          <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >
            ioChange
          </code>{' '}
          with the newly active tab value; the application layer conditionally renders the
          corresponding panel.
        </p>
        <TabsWithPanels />
      </section>
    </div>
  );
}
