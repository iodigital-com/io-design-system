'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSpinnerUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-spinner communicates that an operation is in progress and the user should wait. Use it when the duration is unknown or expected to be brief."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use during data fetching — API requests, form submissions, file uploads — where the page or a region must wait for a response before rendering.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use inside buttons to replace the button label during a pending action, indicating the operation is underway without disabling the affordance entirely.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a meaningful <C>label</C> prop. The default <C>&apos;Loading&apos;</C> is acceptable for generic states; for specific operations prefer a contextual label such as <C>&apos;Saving changes&apos;</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>color=&quot;white&quot;</C> when the spinner appears on a coloured or dark background to maintain the required contrast ratio.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for operations that take longer than roughly 10 seconds — switch to a progress bar or step indicator so users understand how much of the task remains.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use multiple spinners simultaneously on the same view. A single spinner in the most prominent loading region is less disorienting than several competing animations.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Remove the spinner from the DOM while the operation is still in flight. The spinner is the only feedback the user has — removing it prematurely implies the operation has finished.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use the spinner decoratively or as a purely ornamental animation. Every spinner should correspond to a real async operation.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Size guidelines ──────────────────────────────────────── */}
      <section id="size-guidelines" className="space-y-6">
        <SectionHeader
          title="Size guidelines"
          description="Choose a size that is proportionate to the content area it represents. Overscaling a spinner is distracting; underscaling makes it invisible."
        />
        <div className="space-y-3">
          <RuleCard label="sm (16px) — inline and tight contexts">
            Use in dense UI regions where space is constrained: inside icon-only buttons, table cells, or alongside a short text label on the same line. At 16px the spinner is subtle and unobtrusive.
          </RuleCard>
          <RuleCard label="md (24px) — default for most contexts">
            The standard size for the majority of loading states: full buttons, small cards, form submission feedback. Visible without dominating the layout.
          </RuleCard>
          <RuleCard label="lg (40px) — page-level and hero loading">
            Use when an entire page section or primary content area is loading. At 40px the spinner commands attention and clearly signals a significant operation. Avoid using <C>lg</C> inside compact components.
          </RuleCard>
        </div>
      </section>

      {/* ── Colour guidelines ────────────────────────────────────── */}
      <section id="colour-guidelines" className="space-y-6">
        <SectionHeader
          title="Colour guidelines"
          description="Match the spinner colour to its background to maintain contrast and visual consistency with the surrounding design."
        />
        <div className="space-y-3">
          <RuleCard label="primary — default for light backgrounds">
            Uses <C>--io-color-primary</C> (brand blue). Appropriate for all standard light-background contexts. Do not use on coloured or dark backgrounds.
          </RuleCard>
          <RuleCard label="white — for coloured and dark backgrounds">
            Renders the spinner in white. Use inside solid-colour buttons, on hero images, or on any dark surface where the primary blue would be invisible or low-contrast.
          </RuleCard>
          <RuleCard label="current — inherits from surrounding text colour">
            Uses <C>currentColor</C>. The spinner automatically matches the inherited text colour of its parent element. Useful when embedding the spinner inside a text node or a custom-coloured context that is not covered by <C>primary</C> or <C>white</C>.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="The label prop is visually hidden but announced by screen readers. Write it as if it will be read aloud to the user."
        />
        <div className="space-y-3">
          <RuleCard label="Use a verb phrase that describes the operation">
            Prefer <C>&apos;Saving changes&apos;</C>, <C>&apos;Uploading file&apos;</C>, or <C>&apos;Loading results&apos;</C> over the generic <C>&apos;Loading&apos;</C> whenever context is available. Specific labels reduce uncertainty for screen reader users.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first word: <C>&apos;Loading search results&apos;</C> not <C>&apos;Loading Search Results&apos;</C>. Avoid trailing punctuation — the label is not a full sentence in the traditional sense.
          </RuleCard>
          <RuleCard label="Keep labels short">
            Screen readers announce the label as soon as the spinner enters the live region. A concise label — two to four words — is announced quickly and does not interrupt the user&apos;s flow.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
