'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  buttonStorySolid,
  buttonStoryGhost,
  buttonStoryGhostWhite,
  buttonStoryArrows,
  buttonStorySizes,
  buttonStoryStates,
} from '../io-button.stories';

// ── Local helpers ─────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h2
        className="text-base font-bold"
        style={{ color: 'var(--io-text-primary)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
          {description}
        </p>
      )}
    </div>
  );
}

function StageLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase mt-2 mb-6"
      style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}
    >
      {children}
    </p>
  );
}

// ── Dark stage override — for ghost-white and any dark-bg sections ─────────────

const DARK_STAGE: React.CSSProperties = {
  backgroundColor: 'var(--io-color-grey-6, #242424)',
  backgroundImage: 'none',
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function IoButtonExamplesPage() {
  return (
    <div className="space-y-10">

      {/* ── Solid variants ───────────────────────────────────── */}
      <section>
        <SectionHeader
          title="Solid"
          description="Filled backgrounds — use for primary actions. Hover to see the snappy transition."
        />
        <ComponentStory story={buttonStorySolid} previewClassName="flex-wrap gap-3 items-center" />
        <StageLabel>
          radius: borderRadius.pill · transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1)
        </StageLabel>
      </section>

      {/* ── Ghost / outline variants ─────────────────────────── */}
      <section>
        <SectionHeader
          title="Ghost"
          description="Transparent fill with a coloured border — fills with the matching solid on hover."
        />
        <ComponentStory story={buttonStoryGhost} previewClassName="flex-wrap gap-3 items-center" />
        <ComponentStory
          story={buttonStoryGhostWhite}
          previewClassName="flex-wrap gap-3 items-center"
          previewStyle={DARK_STAGE}
        />
        <StageLabel>
          border: 2px solid · background: transparent → fills on hover
        </StageLabel>
      </section>

      {/* ── Sizes ───────────────────────────────────────────── */}
      <section>
        <SectionHeader
          title="Sizes"
          description="Three size presets driven by padding and font-size tokens."
        />
        <ComponentStory story={buttonStorySizes} previewClassName="flex-wrap gap-3 items-end" />
        <StageLabel>
          sm: space-2/space-4 · md: space-3/space-6 · lg: space-4/space-8
        </StageLabel>
      </section>

      {/* ── Arrow icon ──────────────────────────────────────── */}
      <section>
        <SectionHeader
          title="With arrow icon"
          description="Three directions — forward, back, down. Hover to see translateX(6px) animation."
        />
        <ComponentStory story={buttonStoryArrows} previewClassName="flex-wrap gap-3 items-center" />
        <StageLabel>
          SVG arrow · forward: translateX(6px) · back: rotate(180deg) translateX(6px) · down: rotate(90deg) translateX(5px)
        </StageLabel>
      </section>

      {/* ── States ──────────────────────────────────────────── */}
      <section>
        <SectionHeader
          title="States"
          description="Disabled and loading states reduce opacity and block interaction."
        />
        <ComponentStory story={buttonStoryStates} previewClassName="flex-wrap gap-3 items-center" />
        <StageLabel>
          opacity: var(--io-state-disabled-opacity) · cursor: not-allowed · pointer-events: none
        </StageLabel>
      </section>

    </div>
  );
}
