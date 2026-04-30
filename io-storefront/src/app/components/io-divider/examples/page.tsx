'use client';

import {
  dividerStoryHorizontal,
  dividerStoryVertical,
  dividerStoryLabeled,
} from '../io-divider.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoDividerExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Horizontal (default)" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Renders as a semantic <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>&lt;hr&gt;</code>{' '}
          element with <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;separator&quot;</code>.
          Fills its container width. Color and thickness are token-driven.
        </p>
        <ComponentStory story={dividerStoryHorizontal} />
      </section>

      <section>
        <ExamplesSectionHeader title="Vertical" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Renders as a{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>div</code>{' '}
          with{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;separator&quot; aria-orientation=&quot;vertical&quot;</code>.
          Use inside flex row containers — the component uses{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>align-self: stretch</code>{' '}
          to fill its parent&apos;s cross-axis height automatically.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '40px' }}>
          <span style={{ color: 'var(--io-text-secondary)', fontSize: '14px' }}>Section A</span>
          <io-divider orientation="vertical" />
          <span style={{ color: 'var(--io-text-secondary)', fontSize: '14px' }}>Section B</span>
          <io-divider orientation="vertical" />
          <span style={{ color: 'var(--io-text-secondary)', fontSize: '14px' }}>Section C</span>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Labeled" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>{' '}
          prop renders text centred between two lines. Common use case: login forms with an &quot;or&quot; separator between primary and social sign-in methods.
        </p>
        <ComponentStory story={dividerStoryLabeled} />
      </section>

      <section>
        <ExamplesSectionHeader title="Labeled variants" />
        <div className="space-y-4">
          <io-divider label="or" />
          <io-divider label="and" />
          <io-divider label="continue with" />
        </div>
      </section>

    </div>
  );
}
