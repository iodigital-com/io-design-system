'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoTextListUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-text-list is a typography primitive for presenting items in a list. Choose the tag that matches the semantic meaning of the content."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>tag=&quot;ul&quot;</C> for unordered content where sequence does not matter, such as feature lists or navigation links.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>tag=&quot;ol&quot;</C> for ordered content where sequence is meaningful, such as steps in a process or ranked results.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Slot <C>&lt;li&gt;</C> elements directly as children for proper list semantics.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>size</C> and <C>color</C> to match the surrounding typographic context — for example <C>size=&quot;sm&quot;</C> inside a card with secondary body copy.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use io-text-list for navigation — use a <C>&lt;nav&gt;</C> landmark with an <C>&lt;ul&gt;</C> directly.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not rely on color alone to convey meaning — always pair semantic colors (<C>success</C>, <C>warning</C>, <C>error</C>) with descriptive text or an icon.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not slot elements other than <C>&lt;li&gt;</C> as direct children — the browser will correct the DOM but screen readers may misinterpret the list structure.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use io-text-list for headings — use <C>&lt;io-heading&gt;</C> to maintain a correct document outline.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Tag ──────────────────────────────────────────────────── */}
      <section id="tag" className="space-y-6">
        <SectionHeader
          title="Tag"
          description="The tag prop selects the semantic list element rendered in the DOM."
        />
        <div className="space-y-3">
          <RuleCard label="ul — Unordered list (default)">
            Use when the items have no inherent sequence. The browser renders a bullet marker by default.
            Maps to the <C>&lt;ul&gt;</C> HTML element.
          </RuleCard>
          <RuleCard label="ol — Ordered list">
            Use when sequence matters — installation steps, ranked results, legal clauses.
            Maps to the <C>&lt;ol&gt;</C> HTML element and renders numbered markers by default.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="Six size values cover all list typography contexts, matching the io-text scale."
        />
        <div className="space-y-3">
          <RuleCard label="xs — Fine print and captions">
            Use for dense metadata lists and legal footnotes. Maps to <C>--io-font-size-xs</C> (12px).
          </RuleCard>
          <RuleCard label="sm — Secondary and helper lists">
            Use for helper lists, secondary metadata, and supporting information. Maps to <C>--io-font-size-sm</C> (14px).
          </RuleCard>
          <RuleCard label="base — Default body lists">
            The standard reading size for body-copy lists. Maps to <C>--io-font-size-base</C> (16px).
          </RuleCard>
          <RuleCard label="lg — Lead or intro lists">
            Use for featured or introductory lists that open a section. Maps to <C>--io-font-size-lg</C> (18px).
          </RuleCard>
          <RuleCard label="xl — Callout lists">
            Use sparingly for prominent lists that need extra visual weight. Maps to <C>--io-font-size-xl</C> (20px).
          </RuleCard>
          <RuleCard label="inherit — Inherits from parent">
            Defers font-size to the parent element. Use when the list is nested inside another io typography component.
          </RuleCard>
        </div>
      </section>

      {/* ── Colors ───────────────────────────────────────────────── */}
      <section id="colors" className="space-y-6">
        <SectionHeader
          title="Colors"
          description="Semantic color roles share the same token set as io-text. Token values respond to light and dark mode automatically."
        />
        <div className="space-y-3">
          <RuleCard label="primary — Default list text">
            Use for all standard lists. Maps to <C>--io-text-primary</C>.
          </RuleCard>
          <RuleCard label="secondary — De-emphasised list text">
            Use for supporting or supplementary lists. Maps to <C>--io-text-secondary</C>.
          </RuleCard>
          <RuleCard label="disabled — Non-interactive state">
            Use only when the surrounding interactive context is disabled. Maps to <C>--io-text-disabled</C>.
          </RuleCard>
          <RuleCard label="inverse — Text on dark backgrounds">
            Use on dark or brand-colored surfaces. Maps to <C>--io-text-inverse</C>.
          </RuleCard>
          <RuleCard label="success / warning / error — Semantic feedback">
            Use alongside status indicators and system alerts. Always pair with descriptive text, never rely on color alone.
          </RuleCard>
          <RuleCard label="info — Informational content">
            Use for informational or neutral advisory lists. Maps to <C>--io-text-info</C>. Always pair with descriptive text, never rely on color alone.
          </RuleCard>
          <RuleCard label="inherit — Inherits from parent">
            Defers text color to the parent element. Use when the list is nested inside a component that already sets a color context.
          </RuleCard>
        </div>
      </section>

      {/* ── io-text-list-item ────────────────────────────────────── */}
      <section id="io-text-list-item" className="space-y-6">
        <SectionHeader
          title="io-text-list-item"
          description="io-text-list-item is a dedicated child component that provides slot-based content projection into a list item. It renders directly into the parent list's DOM (shadow: false) and carries role=&quot;listitem&quot; automatically."
        />
        <div className="space-y-3">
          <RuleCard label="Recommended child element">
            Use <C>&lt;io-text-list-item&gt;</C> when you need to project rich markup (icons, links, badges)
            into a list item via the default slot. The component handles the <C>role=&quot;listitem&quot;</C>{' '}
            attribute for you.
          </RuleCard>
          <RuleCard label="Raw &lt;li&gt; still works">
            Plain <C>&lt;li&gt;</C> elements slotted directly into <C>io-text-list</C> remain fully
            supported. Use them when the list item content is plain text with no component composition.
          </RuleCard>
          <RuleCard label="Must be a direct child of io-text-list">
            <C>io-text-list-item</C> logs a console warning if it is placed outside of{' '}
            <C>io-text-list</C>. It relies on the parent list element for proper list semantics
            and inherited typography styles.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
