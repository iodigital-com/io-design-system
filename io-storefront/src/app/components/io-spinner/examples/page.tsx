'use client';

import {
  spinnerStorySm,
  spinnerStoryMd,
  spinnerStoryLg,
  spinnerStoryWhite,
  spinnerStoryCurrent,
} from '../io-spinner.stories';

import type { Story } from '@/models/story';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { C, RuleCard, SectionHeader } from '@/components/usage/UsagePrimitives';

const loadingButtonStory: Story<'io-spinner'> = {
  state: { properties: {} },
  generator: () => [
    {
      tag: 'io-button' as const,
      properties: { disabled: true },
      children: [
        {
          tag: 'io-spinner' as const,
          properties: { slot: 'icon', size: 'sm', label: 'Submitting' },
        },
        { tag: 'span' as const, properties: {}, children: ['Submitting...'] },
      ],
    },
  ],
};

export default function IoSpinnerExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Small (16px)" />
        <ComponentStory story={spinnerStorySm} />
      </section>

      <section>
        <ExamplesSectionHeader title="Medium (24px)" />
        <ComponentStory story={spinnerStoryMd} />
      </section>

      <section>
        <ExamplesSectionHeader title="Large (40px)" />
        <ComponentStory story={spinnerStoryLg} />
      </section>

      <section>
        <ExamplesSectionHeader title="White colour — for use on dark or coloured backgrounds" />
        <div
          className="rounded-lg p-8 flex items-center justify-center"
          style={{ background: 'var(--io-color-primary)' }}
        >
          <ComponentStory story={spinnerStoryWhite} />
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Current colour — inherits from surrounding text colour" />
        <ComponentStory story={spinnerStoryCurrent} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Loading button"
          description="Place a small spinner in the button's icon slot while an async action is in progress. Disable the button to prevent double-submission."
        />
        <ComponentStory story={loadingButtonStory} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Page overlay"
          description="Centre a spinner over a card or page region while its content loads. A semi-transparent backdrop communicates that the area is temporarily unavailable."
        />
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--io-border-radius-sm)',
            border: '1px solid var(--io-border)',
            background: 'var(--io-bg-raised)',
            minHeight: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--io-bg-overlay, rgba(255,255,255,0.7))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--io-space-3, 12px)',
            }}
          >
            <io-spinner size="lg" color="primary" label="Loading content" />
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--io-text-secondary)',
              }}
            >
              Loading content…
            </span>
          </div>
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--io-space-2, 8px)',
              padding: 'var(--io-space-4, 16px)',
              width: '100%',
              opacity: 0.25,
            }}
          >
            <div
              style={{
                height: '12px',
                width: '60%',
                borderRadius: '4px',
                background: 'var(--io-bg-surface)',
              }}
            />
            <div
              style={{
                height: '12px',
                width: '80%',
                borderRadius: '4px',
                background: 'var(--io-bg-surface)',
              }}
            />
            <div
              style={{
                height: '12px',
                width: '40%',
                borderRadius: '4px',
                background: 'var(--io-bg-surface)',
              }}
            />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Spinner vs skeleton layout — when to use which"
          description="Choose the right loading indicator based on what the user is waiting for."
        />
        <div className="space-y-3">
          <RuleCard label="Use io-spinner for short, indeterminate waits">
            A form submission, an API call, or any action where the result will replace the current
            view. The spinner communicates activity without implying the shape of what is coming
            next. Keep spinner visibility short — if loading takes more than a few seconds, prefer a
            skeleton or progress bar.
          </RuleCard>
          <RuleCard label="Use a skeleton layout for content with a known shape">
            When loading an article, a card grid, or a profile page — content whose shape you
            already know — implement skeleton placeholders in your own layout to reduce perceived
            wait time by anchoring the user to the incoming content structure.
          </RuleCard>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Reduced motion"
          description="The spin animation automatically respects the user's motion preferences."
        />
        <div className="space-y-3">
          <RuleCard label="Governed by prefers-reduced-motion">
            The <C>io-spinner</C> spin animation is defined entirely in CSS. When a user has enabled
            the <C>prefers-reduced-motion: reduce</C> media query in their OS settings, the
            animation stops — the spinner is still rendered and visible, but it no longer rotates.
            No additional code is required in the consuming application.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
