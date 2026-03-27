'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTagUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-tag is an interactive toggle chip for filtering, categorising, and multi-select scenarios. Each tag represents a single discrete option that can be toggled on or off."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use in filter bars where a user can activate multiple categories simultaneously — e.g. &ldquo;Technology&rdquo;, &ldquo;Design&rdquo;, &ldquo;Product&rdquo;.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>removable=true</C> in input-style tag fields where users have already selected a value and can deselect it by clicking the remove icon.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep tag label text concise — one or two words. Tags are compact UI elements; long text breaks the pill shape and creates visual inconsistency.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Listen to <C>ioToggle</C> to track the new selected value and update your application state accordingly.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use io-tag for single-selection groups where only one option can be active at a time — use radio buttons or a segmented control instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use io-tag as a status badge or non-interactive label. For read-only status indicators, use <C>{'<io-badge>'}</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Mix <C>removable</C> and toggle behaviour in the same tag group — these serve different mental models and combining them confuses users.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show more than eight or nine tags in a group without a &ldquo;Show more&rdquo; affordance. Overloaded filter bars are cognitively expensive.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Sizes ────────────────────────────────────────────────── */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Sizes"
          description="io-tag comes in two sizes. Both meet the 44×44px minimum touch target requirement via their hit area."
        />
        <div className="space-y-3">
          <RuleCard label="md (medium) — default">
            The standard size for filter bars, search result pages, and form contexts. Use md in the vast majority of cases.
          </RuleCard>
          <RuleCard label="sm (small) — compact contexts">
            Use in dense UIs where space is limited — data tables, card metadata rows, or sidebar filters. Only use sm when horizontal space is genuinely constrained; prefer md where possible.
          </RuleCard>
        </div>
      </section>

      {/* ── Colours ──────────────────────────────────────────────── */}
      <section id="colours" className="space-y-6">
        <SectionHeader
          title="Colours"
          description="Colour communicates category or semantic grouping across a tag set. Use consistently within a single group."
        />
        <div className="space-y-3">
          <RuleCard label="default — neutral baseline">
            Use for general-purpose tags with no semantic colour coding. Works on all standard background surfaces. The most versatile option.
          </RuleCard>
          <RuleCard label="blue — brand accent">
            Use to highlight a primary category or to align with the io brand in a context where colour coding adds meaningful structure.
          </RuleCard>
          <RuleCard label="beige — warm neutral">
            Use for editorial, content, or lifestyle categories. Pairs well with default and blue in mixed-colour tag groups.
          </RuleCard>
        </div>
      </section>

      {/* ── Removable tags ───────────────────────────────────────── */}
      <section id="removable" className="space-y-6">
        <SectionHeader
          title="Removable tags"
          description="Set removable=true when the tag represents an item that has already been selected and can be deselected."
        />
        <div className="space-y-3">
          <RuleCard label="Typical pattern — input tag field">
            Removable tags appear after a user has typed or selected a value — e.g. a multi-select autocomplete or a keyword entry field. Each tag in the field represents one confirmed selection. The remove icon (×) allows the user to deselect that individual item.
          </RuleCard>
          <RuleCard label="Do not combine removable with selected toggle">
            Removable tags should not also fire <C>ioToggle</C>. The remove icon is the interaction trigger. If you need both toggle and remove in the same group, reconsider the information architecture.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Tag labels should be short, consistent, and unambiguous within their group."
        />
        <div className="space-y-3">
          <RuleCard label="Use noun phrases, not verbs">
            Tag labels should name a category or attribute: &ldquo;React&rdquo;, &ldquo;Remote&rdquo;, &ldquo;Full time&rdquo;. Avoid action verbs: &ldquo;Filter by React&rdquo; is too long and redundant in a filter context.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first word and proper nouns: &ldquo;Design systems&rdquo;, &ldquo;TypeScript&rdquo;. Avoid ALL CAPS.
          </RuleCard>
          <RuleCard label="Keep length consistent within a group">
            Variable tag lengths look irregular. If one tag wraps to two lines, either shorten it or increase the container width. Short, predictable labels create clean scanning patterns.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
