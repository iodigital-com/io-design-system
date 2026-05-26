'use client';

import React, { useEffect, useRef, useState } from 'react';

import {
  tabsBarStoryDefault,
  tabsBarStoryWithDisabled,
  tabsBarStoryManyTabs,
} from '../io-tabs-bar.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

// ── Router-driven demo ─────────────────────────────────────────────────────────

function TabsBarWithRouterContent() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsBarRef = useRef<HTMLIoTabsBarElement | null>(null);

  const tabs = ['Overview', 'Details', 'Settings'];

  const panels: React.ReactNode[] = [
    <div
      key="overview"
      role="tabpanel"
      aria-label="Overview panel"
      className="p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        This is the <strong style={{ color: 'var(--io-text-primary)' }}>Overview</strong> panel.
        In a real router-driven app, this content would be rendered by the router at a URL like{' '}
        <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>/products/overview</code>.{' '}
        <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-tabs-bar</code>{' '}
        only provides the visual tab strip; your router owns the content.
      </p>
    </div>,
    <div
      key="details"
      role="tabpanel"
      aria-label="Details panel"
      className="p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        This is the <strong style={{ color: 'var(--io-text-primary)' }}>Details</strong> panel.
        Listen for the{' '}
        <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>update</code>{' '}
        event and navigate to the corresponding route in your router handler.
      </p>
    </div>,
    <div
      key="settings"
      role="tabpanel"
      aria-label="Settings panel"
      className="p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        This is the <strong style={{ color: 'var(--io-text-primary)' }}>Settings</strong> panel.
        Unlike <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-tabs</code>,
        there are no managed panel slots — the consumer owns content completely.
      </p>
    </div>,
  ];

  useEffect(() => {
    const el = tabsBarRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ activeTabIndex: number }>).detail;
      setActiveTabIndex(detail.activeTabIndex);
    };
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <div className="space-y-4">
      <io-tabs-bar ref={tabsBarRef} active-tab-index={activeTabIndex} label="Product sections">
        {tabs.map((label) => (
          <button key={label} type="button">
            {label}
          </button>
        ))}
      </io-tabs-bar>
      {panels.map((panel, index) => (
        <div key={index} hidden={index !== activeTabIndex}>
          {panel}
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function IoTabsBarExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={tabsBarStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="With disabled tab" />
        <ComponentStory story={tabsBarStoryWithDisabled} />
      </section>

      <section>
        <ExamplesSectionHeader title="Many tabs" />
        <ComponentStory story={tabsBarStoryManyTabs} />
      </section>

      <section>
        <ExamplesSectionHeader title="With simulated router content" />
        <p
          className="text-sm mb-4"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
        >
          <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >
            io-tabs-bar
          </code>{' '}
          emits{' '}
          <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >
            update
          </code>{' '}
          with{' '}
          <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >
            {'{ activeTabIndex }'}
          </code>
          . In a real application the handler calls <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >router.push(tabRoutes[e.detail.activeTabIndex])</code>; here we simulate
          that by conditionally rendering a panel.
        </p>
        <TabsBarWithRouterContent />
      </section>
    </div>
  );
}
