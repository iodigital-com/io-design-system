'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoProgressUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-progress communicates the percentage completion of a determinate operation. Use it when you know the total steps or bytes and can calculate a meaningful percentage in real time."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for file uploads, downloads, and data imports where you can calculate exact progress as a percentage.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use in multi-step forms and wizard flows to communicate how far the user is through the journey.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Provide an <C>aria-label</C> that describes what is being measured — e.g. <C>&quot;Upload progress&quot;</C> or <C>&quot;Step 2 of 4&quot;</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>show-label</C> to render a visible percentage for operations where the exact figure helps users decide whether to wait or cancel.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for indeterminate operations where you cannot calculate a real percentage. Use <C>io-spinner</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use progress and spinner simultaneously in the same loading region. Choose one indicator per zone.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Omit <C>aria-label</C> — without a label, screen readers cannot communicate what is loading to the user.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Set a value above 100 or below 0 — these are clamped automatically, but values outside range indicate a logic error in the caller.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Colour semantics ─────────────────────────────────────── */}
      <section id="colour-semantics" className="space-y-6">
        <SectionHeader
          title="Colour semantics"
          description="Each colour variant carries a semantic meaning. Choose the one that accurately represents the state of the operation."
        />
        <div className="space-y-3">
          <RuleCard label="blue — neutral progress (default)">
            Use for standard operations with no implied outcome yet — initial file uploads, background sync, or any multi-step flow in progress. Blue is the default and should be used when the operation is running normally.
          </RuleCard>
          <RuleCard label="orange — brand accent for creative or media progress">
            Use for progress within creative tools, media upload pipelines, or brand-prominent moments where the iO orange accent is contextually appropriate.
          </RuleCard>
          <RuleCard label="success — operation complete or healthy">
            Switch to <C>success</C> when progress reaches 100% and the operation completed without errors. Also appropriate for progress within a healthy threshold — e.g. &quot;disk usage under 50%&quot;.
          </RuleCard>
          <RuleCard label="warning — approaching a limit or threshold">
            Use when the value indicates the user is nearing a resource limit — e.g. storage at 85% capacity, or a quota nearly exhausted. Pair with a visible label or helper text explaining what the threshold means.
          </RuleCard>
          <RuleCard label="error — operation failed or limit exceeded">
            Switch to <C>error</C> when the operation has failed, been rejected, or a hard limit has been exceeded. Always pair with an error message — colour alone is not sufficient to communicate an error state.
          </RuleCard>
        </div>
      </section>

      {/* ── Size selection ───────────────────────────────────────── */}
      <section id="size-selection" className="space-y-6">
        <SectionHeader
          title="Size selection"
          description="Choose a track height appropriate to the visual weight and context of the progress indicator."
        />
        <div className="space-y-3">
          <RuleCard label="sm (4px) — subtle, embedded contexts">
            Use in compact layouts, table rows, or embedded panels where the progress bar should recede visually. The thinner track is less prominent and works well alongside dense UI.
          </RuleCard>
          <RuleCard label="md (8px) — standard (default)">
            The default track height. Suitable for most standalone progress contexts including file uploads, wizard flows, and form completion meters.
          </RuleCard>
          <RuleCard label="lg (12px) — prominent, feature-level feedback">
            Use when the progress is the primary focus of the view — e.g. an onboarding flow or a full-screen installation wizard. The larger track makes the state unmistakable.
          </RuleCard>
        </div>
      </section>

      {/* ── Accessibility ────────────────────────────────────────── */}
      <section id="accessibility" className="space-y-6">
        <SectionHeader
          title="Accessibility"
          description="io-progress is a non-interactive element. Screen reader support depends on providing a meaningful aria-label."
        />
        <div className="space-y-3">
          <RuleCard label="Always provide an aria-label">
            The <C>label</C> prop is exposed as <C>aria-label</C> on the host. Without it, screen readers announce only the numeric value with no context. Always provide a description like <C>&quot;Upload progress&quot;</C> or <C>&quot;Step 3 of 5&quot;</C>.
          </RuleCard>
          <RuleCard label="Use show-label for sighted users where precision matters">
            The <C>show-label</C> prop renders a visible percentage text below the track. This is marked <C>aria-hidden=&quot;true&quot;</C> — the ARIA value comes from <C>aria-valuenow</C> on the host, not the visible text. Do not use show-label as a substitute for an accessible label.
          </RuleCard>
          <RuleCard label="Colour alone is never sufficient to communicate state changes">
            When switching colour to <C>error</C> or <C>warning</C>, always provide a visible text message alongside the progress bar. Users with colour vision deficiencies cannot distinguish the semantic meaning of the fill colour without supplementary content.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
