'use client';

import {
  fieldsetStoryDefault,
  fieldsetStoryRequired,
  fieldsetStoryError,
} from '../io-fieldset.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoFieldsetExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Default" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          A basic fieldset grouping two text inputs under a shared legend. The legend text is
          announced by screen readers before each child control.
        </p>
        <ComponentStory story={fieldsetStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Required" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code>{' '}
          prop adds a visual{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>*</code>{' '}
          indicator with{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>aria-hidden=&quot;true&quot;</code>.
          Each child control must also carry <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>required</code> individually.
        </p>
        <ComponentStory story={fieldsetStoryRequired} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          When <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>error</code>{' '}
          and <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>{' '}
          are both set, the legend changes color and an error paragraph with{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>role=&quot;alert&quot;</code>{' '}
          is rendered below the group.
        </p>
        <ComponentStory story={fieldsetStoryError} />
      </section>

    </div>
  );
}
