'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import {
  tabsStoryDefault,
  tabsStoryWithDisabled,
  tabsStoryManyTabs,
} from '../io-tabs.stories';

// ── Panel content demo ─────────────────────────────────────────────────────────

function TabsWithPanels() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef<HTMLElement & { activeTabIndex?: number }>(null);

  const tabs = ['Overview', 'Details', 'Settings'];

  const panels: React.ReactNode[] = [
    <div
      key="overview"
      role="tabpanel"
      aria-label="Overview"
      className="p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        This is the <strong style={{ color: 'var(--io-text-primary)' }}>Overview</strong> panel.
        Consumers render panels separately and manage visibility by comparing each panel&apos;s
        index against <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>activeTabIndex</code>.
      </p>
    </div>,
    <div
      key="details"
      role="tabpanel"
      aria-label="Details"
      className="p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        This is the <strong style={{ color: 'var(--io-text-primary)' }}>Details</strong> panel.
        Listen for the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>update</code> event
        to update which panel is shown.
      </p>
    </div>,
    <div
      key="settings"
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
    </div>,
  ];

  useEffect(() => {
    const el = tabsRef.current;
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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore — Stencil web component not in JSX intrinsic elements */}
      <io-tabs ref={tabsRef} active-tab-index={activeTabIndex}>
        {tabs.map(label => (
          <button key={label} type="button">{label}</button>
        ))}
        {/* @ts-ignore — closing tag */}
      </io-tabs>
      {panels[activeTabIndex]}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function IoTabsExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={tabsStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="With disabled tab" />
        <ComponentStory story={tabsStoryWithDisabled} />
      </section>

      <section>
        <ExamplesSectionHeader title="Many tabs" />
        <ComponentStory story={tabsStoryManyTabs} />
      </section>

      <section>
        <ExamplesSectionHeader title="With panel content" />
        <p
          className="text-sm mb-4"
          style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
        >
          Consumers manage panel visibility themselves. The component emits{' '}
          <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >
            update
          </code>{' '}
          with <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
          >
            {'{ activeTabIndex }'}
          </code>; the application layer conditionally renders the
          corresponding panel by index.
        </p>
        <TabsWithPanels />
      </section>
    </div>
  );
}

