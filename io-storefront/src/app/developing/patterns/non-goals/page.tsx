'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';
import { PageHeader } from '@/components/layout/PageHeader';

export default function PatternsNonGoalsPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Component Non-goals"
        description="A record of deliberate component gaps — features io intentionally does not ship, and why. Reference this list before raising new component requests from external design-system comparisons."
        tabs={[]}
      />

      <section id="brand-shield" className="space-y-6">
        <SectionHeader
          title="Brand-shield / crest component"
          description="io does not ship a dedicated shield logo component."
        />
        <div className="space-y-4">
          <RuleCard label="Use io-wordmark + a custom asset instead">
            Some design systems render a shield or crest SVG as a web component so brand consumers can
            embed it without managing the asset themselves. io already ships io-wordmark for the analogous
            use case. Any brand-specific shield, crest, or logo asset that is not the iO wordmark should
            be embedded directly as an{' '}
            <code style={{ fontSize: '0.85em' }}>&lt;img&gt;</code> or inline SVG in the consuming
            application — not wrapped in a design-system component.
          </RuleCard>
          <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
            Rationale: brand assets change outside the design system release cycle. A component wrapper
            couples the asset to the system versioning, creating a maintenance burden for every brand
            variation. Consumers own their brand assets; the design system owns the layout and tokens
            that surround them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DoOrDontCard type="do">
              Use <code style={{ fontSize: '0.85em' }}>&lt;io-wordmark&gt;</code> for the iO logo,
              and a plain <code style={{ fontSize: '0.85em' }}>&lt;img src=&quot;shield.svg&quot;&gt;</code>{' '}
              with appropriate alt text for any other brand asset.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not request an <code style={{ fontSize: '0.85em' }}>io-crest</code> or
              <code style={{ fontSize: '0.85em' }}>io-logo</code> wrapper component — it couples
              brand asset changes to design system releases.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="display-typography" className="space-y-6">
        <SectionHeader
          title="Display typography component"
          description="io does not ship a dedicated display-level heading component beyond io-heading."
        />
        <div className="space-y-4">
          <RuleCard label="io-heading is the sole display-level typographic primitive">
            Some design systems have shipped a separate display-level heading component for oversized
            marketing headlines, only to later remove it in favour of the standard heading component.
            io-heading already covers the same use case — it accepts a size prop that scales from
            heading-6 through heading-1 and a display variant for above-fold hero text.
          </RuleCard>
          <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
            Rationale: a separate display component creates a parallel typographic hierarchy that
            drifts away from the main scale over time. All display-level text uses the same size tokens
            and font settings as headings — there is no semantic or technical reason to split them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DoOrDontCard type="do">
              Use <code style={{ fontSize: '0.85em' }}>&lt;io-heading size=&quot;5xl&quot;&gt;</code>{' '}
              for hero-level display text. The size scale covers all typographic needs from small
              labels to full-bleed headlines.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not request an <code style={{ fontSize: '0.85em' }}>io-display</code> component —
              it would duplicate io-heading with no functional benefit. Other design systems removed
              this pattern for the same reason.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="per-type-inputs" className="space-y-6">
        <SectionHeader
          title="Per-type input components"
          description="io does not ship separate input-email, input-tel, input-url, input-number, input-time, input-month, or input-week components."
        />
        <div className="space-y-4">
          <RuleCard label="io-input's type prop covers all HTML5 native input types">
            Some design systems ship nine sibling input components — one per native HTML input type —
            each baking in type-appropriate validation messages, default autocomplete hints, and
            default inputmode values. io-input collapses these into a single component with a{' '}
            <code style={{ fontSize: '0.85em' }}>type</code> prop. The io-input component also
            exposes first-class <code style={{ fontSize: '0.85em' }}>inputMode</code> and{' '}
            <code style={{ fontSize: '0.85em' }}>autoComplete</code> props so consumers can provide
            the right mobile keyboard and autofill hints themselves.
          </RuleCard>
          <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
            Rationale: nine near-identical components are harder to maintain and harder to discover.
            The correct combination of <code style={{ fontSize: '0.85em' }}>type</code>,{' '}
            <code style={{ fontSize: '0.85em' }}>inputMode</code>,{' '}
            <code style={{ fontSize: '0.85em' }}>autoComplete</code>, and{' '}
            <code style={{ fontSize: '0.85em' }}>pattern</code> is documented in the{' '}
            <a href="/developing/patterns/input-types" style={{ color: 'var(--io-accent-text)' }}>
              Input-type recipes
            </a>{' '}
            patterns page. If real-world FACE validation gaps emerge for a specific native type,
            revisit adding a dedicated wrapper at that point.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DoOrDontCard type="do">
              Use <code style={{ fontSize: '0.85em' }}>&lt;io-input type=&quot;tel&quot; inputMode=&quot;tel&quot; autoComplete=&quot;tel&quot;&gt;</code>{' '}
              for phone number fields. Consult the Input-type recipes page for the right combination
              per use case.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not request per-type input clones (io-input-email, io-input-tel, etc.) — they are
              addressed by the existing type prop and documented recipes.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="how-to-raise" className="space-y-6">
        <SectionHeader
          title="Raising a new component request"
          description="Before opening a GitHub issue for a new component, check this list and the existing component inventory."
        />
        <div className="space-y-4">
          <RuleCard label="Check the component inventory first">
            The full list of 46 storefront components and internal sub-components is in the{' '}
            <a href="/developing/component-status" style={{ color: 'var(--io-accent-text)' }}>
              Component Status
            </a>{' '}
            page. Check whether a composition of existing components covers the need before requesting
            a new primitive.
          </RuleCard>
          <RuleCard label="Cite the reference design system in issues">
            When raising a request inspired by another design system, link to the specific component
            and note whether it is stable, beta, or removed. This saves triage time and
            prevents re-surfacing already-resolved decisions like the three non-goals above.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
