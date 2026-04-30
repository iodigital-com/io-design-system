'use client';

import React, { useEffect, useRef, useState } from 'react';

import {
  buttonGroupStoryExclusive,
  buttonGroupStoryMultiSelect,
  buttonGroupStoryDisabled,
  buttonGroupStoryItemDisabled,
} from '../io-button-group.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

// ── Live exclusive demo ────────────────────────────────────────────────────────

function ExclusiveLiveDemo() {
  const [value, setValue] = useState('week');
  const ref = useRef<HTMLIoButtonGroupElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ value: string }>).detail;
      setValue(detail.value as string);
    };
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, []);

  return (
    <div className="space-y-4">
      <io-button-group
        ref={ref}
        exclusive={true}
        value={value}
        label="View period"
      >
        <io-button value="day">Day</io-button>
        <io-button value="week">Week</io-button>
        <io-button value="month">Month</io-button>
      </io-button-group>
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
        Selected: <strong style={{ color: 'var(--io-text-primary)' }}>{value}</strong>
      </p>
    </div>
  );
}

// ── Live multi-select demo ─────────────────────────────────────────────────────

function MultiSelectLiveDemo() {
  const [values, setValues] = useState<string[]>(['mon', 'wed']);
  const ref = useRef<HTMLIoButtonGroupElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ value: string[] }>).detail;
      setValues(detail.value as string[]);
    };
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, []);

  return (
    <div className="space-y-4">
      <io-button-group
        ref={ref}
        exclusive={false}
        label="Working days"
      >
        <io-button value="mon">Mon</io-button>
        <io-button value="tue">Tue</io-button>
        <io-button value="wed">Wed</io-button>
        <io-button value="thu">Thu</io-button>
        <io-button value="fri">Fri</io-button>
      </io-button-group>
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
        Selected:{' '}
        <strong style={{ color: 'var(--io-text-primary)' }}>
          {values.length > 0 ? values.join(', ') : '(none)'}
        </strong>
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function IoButtonGroupExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Exclusive (single-select)" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Set <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>exclusive</code>{' '}
          to enable single-select mode. The container receives <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;radiogroup&quot;</code> and each item{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;radio&quot;</code>.
          Arrow keys move focus and select simultaneously.
        </p>
        <ComponentStory story={buttonGroupStoryExclusive} />
      </section>

      <section>
        <ExamplesSectionHeader title="Exclusive — interactive" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Listen for the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>change</code>{' '}
          event and update your controlled state. The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>detail.value</code>{' '}
          is the newly selected string.
        </p>
        <ExclusiveLiveDemo />
      </section>

      <section>
        <ExamplesSectionHeader title="Multi-select" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Without <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>exclusive</code>,
          each button toggles independently. The container receives <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;group&quot;</code> and each item{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;checkbox&quot;</code>.
          Arrow keys move focus only; Space/Enter toggle selection.
        </p>
        <ComponentStory story={buttonGroupStoryMultiSelect} />
      </section>

      <section>
        <ExamplesSectionHeader title="Multi-select — interactive" />
        <MultiSelectLiveDemo />
      </section>

      <section>
        <ExamplesSectionHeader title="Group disabled" />
        <ComponentStory story={buttonGroupStoryDisabled} />
      </section>

      <section>
        <ExamplesSectionHeader title="Individual item disabled" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Add the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>disabled</code>{' '}
          attribute to an individual <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-button</code>{' '}
          to make only that option unavailable. Keyboard navigation skips disabled items.
        </p>
        <ComponentStory story={buttonGroupStoryItemDisabled} />
      </section>
    </div>
  );
}
