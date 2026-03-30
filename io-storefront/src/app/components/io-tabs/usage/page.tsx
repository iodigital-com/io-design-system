'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-tabs provides horizontal tab navigation for switching between distinct views within the same page context. Use it when content is logically grouped and users benefit from being able to compare sections or jump between them without a full page transition."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for content that belongs to the same entity — for example, an &ldquo;Overview&rdquo;,
              &ldquo;Details&rdquo;, and &ldquo;Settings&rdquo; view on a single record page.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep the number of tabs between two and seven. Fewer than two provides no benefit;
              more than seven overwhelms users and risks overflow on small viewports.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use concise, noun-based tab labels: &ldquo;Overview&rdquo;, &ldquo;Activity&rdquo;,
              &ldquo;Members&rdquo;. Labels should describe the content, not the action.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always set an initial <C>activeTab</C> so the correct panel is visible on first render.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use tabs as a substitute for page navigation or a stepper. If the order matters
              and users must complete steps in sequence, use a stepper component instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use tabs to replace a primary navigation bar. Tabs are for in-page view switching,
              not site-level routing.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Disable a tab without explaining why. If a tab must be disabled, consider showing
              the panel in a locked or empty state with an explanation rather than disabling the tab.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use verb-based tab labels such as &ldquo;View details&rdquo; or &ldquo;Open settings&rdquo;.
              Tabs are navigation, not actions.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Panel content management ──────────────────────────────────────── */}
      <section id="panel-content" className="space-y-6">
        <SectionHeader
          title="Panel content management"
          description="io-tabs does not render panel content. The component is a pure navigation control — consumers are responsible for rendering and showing the correct panel based on the active tab value."
        />
        <div className="space-y-3">
          <RuleCard label="Listen for change to update the active view">
            Register an event listener on the <C>change</C> event. The event detail is the{' '}
            <C>value</C> string of the newly activated tab. Update your application state accordingly
            and conditionally render the matching panel.
          </RuleCard>
          <RuleCard label="Apply role=&quot;tabpanel&quot; to each panel element">
            Each panel element must carry <C>role=&quot;tabpanel&quot;</C>. When using the recommended
            naming convention, set <C>id=&quot;panel-{'{value}'}&quot;</C> on the panel element so it
            can be linked from the tab via <C>aria-controls</C>.
          </RuleCard>
          <RuleCard label="Hide inactive panels correctly">
            Use <C>hidden</C>, <C>display: none</C>, or conditional rendering to remove inactive
            panels from the accessibility tree. Panels that are merely invisible but still in the
            DOM are still navigable by screen readers.
          </RuleCard>
          <RuleCard label="Preserve panel state during tab switching">
            If panels contain forms or user input, consider keeping all panels mounted and using CSS
            visibility rather than unmounting them. This prevents input loss when the user switches
            back to a panel.
          </RuleCard>
        </div>
      </section>

      {/* ── Configuring tabs ─────────────────────────────────────────────── */}
      <section id="configuring-tabs" className="space-y-6">
        <SectionHeader
          title="Configuring tabs"
          description="The tabs prop accepts an array of IoTabItem objects. Each item describes one tab button."
        />
        <div className="space-y-3">
          <RuleCard label="label — the visible tab name">
            The <C>label</C> field is the text displayed on the tab button. It also serves as the
            accessible name for <C>role=&quot;tab&quot;</C>. Keep labels short and descriptive — one to
            three words is ideal.
          </RuleCard>
          <RuleCard label="value — the unique identifier">
            The <C>value</C> field is the string emitted in the <C>change</C> event detail and
            compared against <C>activeTab</C> to determine which tab is selected. Values must be
            unique within the tabs array.
          </RuleCard>
          <RuleCard label="disabled — per-tab availability">
            Set <C>disabled: true</C> on an individual <C>IoTabItem</C> to prevent that tab from
            being activated. Disabled tabs remain focusable during keyboard navigation (roving
            tabindex skips them for activation, but they are still reachable). There is no
            top-level disabled prop — disable tabs individually via the array.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Consistent and predictable label copy helps users understand what to expect from each tab before activating it."
        />
        <div className="space-y-3">
          <RuleCard label="Use nouns, not verbs">
            Tab labels should name the content: &ldquo;Activity&rdquo;, &ldquo;Members&rdquo;,
            &ldquo;Permissions&rdquo;. Avoid action phrases like &ldquo;Manage members&rdquo; or
            &ldquo;View activity&rdquo; — they imply the tab performs an action rather than
            navigating to a view.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first letter and proper nouns: &ldquo;Team members&rdquo;,
            &ldquo;API keys&rdquo;. Avoid title case for every word unless it is a proper name.
          </RuleCard>
          <RuleCard label="Keep labels parallel in structure">
            All tab labels in a set should follow the same grammatical pattern. Do not mix
            single-word labels (&ldquo;Overview&rdquo;) with full phrases (&ldquo;Manage your
            settings&rdquo;) in the same tab bar.
          </RuleCard>
          <RuleCard label="Avoid truncating labels">
            If a label is too long to fit, shorten the text rather than truncating with an ellipsis.
            Truncated tab labels are confusing and inaccessible to screen reader users who hear
            only what the DOM contains.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
