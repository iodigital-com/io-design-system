'use client';

import { CodeTabs } from '@/components/CodeTabs';
import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Local helpers ─────────────────────────────────────────────────────────────

function SizeCard({ size, height, use }: { size: string; height: string; use: string }) {
  return (
    <div
      className="p-5 rounded-lg flex flex-col gap-3"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}
        >
          {size}
        </span>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
          {height}
        </span>
      </div>
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
        {use}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoButtonUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Buttons communicate available actions. Choose the right variant, weight, and state to clearly signal what will happen when the user interacts."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use a solid blue button for the single primary call-to-action on a page or section.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use ghost when multiple equal-weight actions appear together — none should overpower the others.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the link variant for inline text-level navigation within a paragraph or content block.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the loading state to give immediate feedback when an action triggers an async operation.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Place two solid buttons of equal visual weight side by side — establish a clear hierarchy.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use disabled state without providing context — always explain why an action is unavailable.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use ghost-white outside a dark or strongly coloured background — it becomes invisible on light surfaces.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Mix button sizes within a single button group — choose one size and apply it consistently.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Variants ─────────────────────────────────────────────── */}
      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="Three visual fills cover the full range of action weight — from dominant CTA to subtle inline navigation. See the Examples tab for live previews of every colour combination."
        />
        <div className="space-y-3">
          <SubsectionTitle>Solid</SubsectionTitle>
          <RuleCard label="Filled background — highest visual weight">
            Use solid buttons for primary actions that deserve maximum prominence: form submissions, key CTAs,
            and navigational anchors. Each colour carries its own brand character — blue signals trust and
            direction, orange signals energy, black signals authority.
          </RuleCard>
        </div>
        <div className="space-y-3">
          <SubsectionTitle>Ghost</SubsectionTitle>
          <RuleCard label="Transparent fill with coloured border — medium visual weight">
            Ghost buttons share space without competing. Use them for secondary actions that sit alongside a
            primary solid, or in groups where all actions carry equal weight. On hover the border fills with
            the matching solid colour. The white ghost variant is only legible on dark or strongly coloured backgrounds.
          </RuleCard>
        </div>
        <div className="space-y-3">
          <SubsectionTitle>Link</SubsectionTitle>
          <RuleCard label="No fill or border — lowest visual weight">
            The link variant sits within prose or UI chrome without drawing attention. It renders an animated
            underline on hover. Use it for supplementary navigation, help text anchors, or &ldquo;read more&rdquo; patterns
            where a button border would feel heavy.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Three size presets driven by padding and font-size tokens. Choose based on context density, not personal preference."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SizeCard
            size="sm"
            height="~31px"
            use="Compact UI — data tables, inline toolbars, tag inputs, or anywhere vertical space is at a premium."
          />
          <SizeCard
            size="md"
            height="42px"
            use="Default for most contexts — forms, modals, cards, and standard page content."
          />
          <SizeCard
            size="lg"
            height="50px"
            use="Hero sections and high-impact CTAs where the button must anchor the layout."
          />
        </div>
      </section>

      {/* ── Arrow icon ───────────────────────────────────────────── */}
      <section id="arrow-icon" className="space-y-6">
        <SectionHeader
          title="Arrow icon"
          description="An optional animated arrow reinforces directionality — it nudges on hover to signal movement. Omit the arrow prop entirely to hide it."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RuleCard label="forward">
            Slides right on hover. Use for navigation, &ldquo;next&rdquo;, or &ldquo;proceed&rdquo; actions where movement is away from the current context.
          </RuleCard>
          <RuleCard label="back">
            Rotated 180° at rest, slides left on hover. Use for &ldquo;back&rdquo; or &ldquo;previous&rdquo; navigation where movement returns to a prior state.
          </RuleCard>
          <RuleCard label="down">
            Rotated 90° at rest, slides downward on hover. Use for scroll anchors or expand triggers that reveal content below.
          </RuleCard>
        </div>
        <RuleCard label="arrowPlacement prop">
          By default the arrow renders to the right of the label. Set <C>arrowPlacement=&quot;left&quot;</C> to
          place it before the label — useful for &ldquo;back&rdquo; navigation where the visual direction should lead the text.
        </RuleCard>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="Disabled and loading states communicate that an action is temporarily unavailable or in progress."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RuleCard label="Disabled">
            Reduces opacity to <C>var(--io-state-disabled-opacity)</C> and sets <C>pointer-events: none</C>.
            Use sparingly — always pair with a tooltip or helper text explaining why the action is unavailable.
            The element remains in the DOM and is discoverable by screen readers via <C>aria-disabled=&quot;true&quot;</C>.
          </RuleCard>
          <RuleCard label="Loading">
            Replaces the label with a centred spinner while preserving the button&apos;s dimensions — no layout
            shift. Sets <C>aria-busy=&quot;true&quot;</C> so screen readers announce the in-progress state.
            Prefer loading over disabled for async operations where the action will become available again.
          </RuleCard>
        </div>
      </section>

      {/* ── As a link ────────────────────────────────────────────── */}
      <section id="as-a-link" className="space-y-6">
        <SectionHeader
          title="As a link"
          description="Adding an href prop renders the element as a native anchor tag while retaining all button styles and behaviour."
        />
        <RuleCard label="Automatic tag switching">
          When <C>href</C> is provided, the inner element switches from <C>{'<button>'}</C> to <C>{'<a>'}</C> — fully
          semantic for navigation. The <C>target</C> and <C>rel</C> props are forwarded to the anchor.
          When <C>disabled</C> or <C>loading</C> is set, the <C>href</C> is removed so the link cannot be followed.
        </RuleCard>
        <CodeTabs
          tabs={[
            {
              label: 'HTML',
              code: `<io-button href="/pricing" color="blue" variant="solid" arrow="forward">
  See pricing
</io-button>

<!-- External link — opens in new tab -->
<io-button
  href="https://io.digital"
  target="_blank"
  rel="noreferrer noopener"
  color="black"
  variant="ghost"
>
  Visit io Digital
</io-button>`,
            },
            {
              label: 'React',
              code: `import { IoButton } from '@io-digital/components-react';

// Internal navigation
<IoButton href="/pricing" color="blue" variant="solid" arrow="forward">
  See pricing
</IoButton>

// External link — opens in new tab
<IoButton
  href="https://io.digital"
  target="_blank"
  rel="noreferrer noopener"
  color="black"
  variant="ghost"
>
  Visit io Digital
</IoButton>`,
            },
            {
              label: 'Angular',
              code: `<!-- Internal navigation -->
<io-button href="/pricing" color="blue" variant="solid" arrow="forward">
  See pricing
</io-button>

<!-- External link — opens in new tab -->
<io-button
  href="https://io.digital"
  target="_blank"
  rel="noreferrer noopener"
  color="black"
  variant="ghost"
>
  Visit io Digital
</io-button>`,
            },
            {
              label: 'Vue',
              code: `<!-- Internal navigation -->
<io-button href="/pricing" color="blue" variant="solid" arrow="forward">
  See pricing
</io-button>

<!-- External link — opens in new tab -->
<io-button
  href="https://io.digital"
  target="_blank"
  rel="noreferrer noopener"
  color="black"
  variant="ghost"
>
  Visit io Digital
</io-button>`,
            },
          ]}
        />
      </section>

    </div>
  );
}
