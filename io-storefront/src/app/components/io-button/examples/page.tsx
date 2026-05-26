'use client';

import {
  buttonStorySolid,
  buttonStoryGhost,
  buttonStoryGhostWhite,
  buttonStoryArrows,
  buttonStorySizes,
  buttonStoryIconOnly,
  buttonStoryStates,
} from '../io-button.stories';

import type { CSSProperties, ReactNode } from 'react';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

function StageLabel({ children }: { children: ReactNode }) {
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

const DARK_STAGE: CSSProperties = {
  backgroundColor: 'var(--io-color-grey-6, #242424)',
  backgroundImage: 'none',
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function IoButtonExamplesPage() {
  return (
    <div className="space-y-10">

      {/* ── Solid variants ───────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
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
        <ExamplesSectionHeader
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
        <ExamplesSectionHeader
          title="Sizes"
          description="Four size presets driven by control-size tokens and spacing rhythm."
        />
        <ComponentStory story={buttonStorySizes} previewClassName="flex-wrap gap-3 items-end" />
        <StageLabel>
          sm: ~31px · md: 42px · lg: 50px · xl: 56px
        </StageLabel>
      </section>

      <section>
        <ExamplesSectionHeader
          title="Icon only"
          description="Square icon-only actions for compact UI. Always provide an accessible label."
        />
        <ComponentStory story={buttonStoryIconOnly} previewClassName="flex-wrap gap-3 items-end" />
        <StageLabel>
          iconOnly=true · label required for accessible name
        </StageLabel>
      </section>

      {/* ── Arrow icon ──────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
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
        <ExamplesSectionHeader
          title="States"
          description="Disabled and loading states reduce opacity and block interaction."
        />
        <ComponentStory story={buttonStoryStates} previewClassName="flex-wrap gap-3 items-center" />
        <StageLabel>
          opacity: var(--io-state-disabled-opacity) · cursor: not-allowed · pointer-events: none
        </StageLabel>
      </section>

      {/* ── RTL layout ───────────────────────────────────────── */}
      <section>
        <ExamplesSectionHeader
          title="RTL layout"
          description="In a right-to-left context the forward arrow mirrors to point left and the back arrow points right. Wrap the page or section with dir=&quot;rtl&quot; to activate."
        />
        <div
          dir="rtl"
          className="p-4 sm:p-8 flex flex-wrap gap-3 items-center rounded-lg border border-[var(--io-border)]"
          style={{ backgroundColor: 'var(--io-bg-raised)' }}
        >
          <io-button variant="solid" color="blue" arrow="forward">قدم</io-button>
          <io-button variant="solid" color="blue" arrow="back">عودة</io-button>
          <io-button variant="ghost" color="blue" arrow="forward">اقرأ المزيد</io-button>
          <io-button variant="solid" color="orange" arrow="forward">اكتشف</io-button>
        </div>
        <StageLabel>
          dir=&quot;rtl&quot; · forward arrow mirrors left · back arrow mirrors right · translateX animates inward
        </StageLabel>
      </section>

    </div>
  );
}
