'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsBarUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-tabs-bar provides a standalone tab navigation strip without any panel management. Use it when your application router — not a slot-based component — controls which content is displayed."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>io-tabs-bar</C> when tab content is owned by a URL router (Next.js App Router,
              Angular Router, React Router). The tab bar fires <C>update</C>; your handler calls{' '}
              <C>router.push(routes[index])</C>.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>io-tabs</C> instead when all tab content lives on the same page and you want
              slot-based panel switching. Reserve <C>io-tabs-bar</C> for routing scenarios.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Control <C>activeTabIndex</C> from your router state so the correct tab is highlighted
              on direct URL navigation and browser back/forward.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep the number of tabs between two and seven for optimal readability and viewport fit.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use <C>io-tabs-bar</C> as a replacement for primary site navigation. It is designed
              for in-page or in-section view switching, not top-level routing.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Render panel content as sibling slots inside <C>io-tabs-bar</C> — it has no panel
              slot. Manage content in your own layout outside the component.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Disable a tab without explaining why. If a tab must be disabled, prefer showing its
              destination in a locked state with an explanation rather than removing access entirely.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Leave <C>activeTabIndex</C> out of sync with the current URL. Always derive the prop
              from router state so users navigating with the browser back button see the correct
              active indicator.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Differences from io-tabs ──────────────────────────────────────── */}
      <section id="vs-io-tabs" className="space-y-6">
        <SectionHeader
          title="io-tabs-bar vs io-tabs"
          description="Both components render a tab strip with identical visual styles, keyboard navigation, and ARIA semantics. The key difference is what they manage."
        />
        <div className="space-y-3">
          <RuleCard label="io-tabs manages panel content via slots">
            <C>io-tabs</C> is a complete tab widget: you slot in buttons and panel content, and
            the component shows the active panel automatically. The content must live on the same
            page inside the component.
          </RuleCard>
          <RuleCard label="io-tabs-bar manages only the strip">
            <C>io-tabs-bar</C> renders the visual tab bar and emits <C>update</C> when the user
            activates a tab. There are no panel slots. Your router or application layer owns the
            content entirely — enabling URL-based navigation and deep linking.
          </RuleCard>
          <RuleCard label="Identical prop and event API">
            Both components share the same <C>activeTabIndex</C> prop, <C>label</C> prop, and
            <C>update</C> event. Migrating between them requires only changing the tag name and
            removing panel markup.
          </RuleCard>
          <RuleCard label="Not sure which to use?">
            See the{' '}
            <a
              href="/components/io-tabs/usage#vs-io-tabs-bar"
              style={{ color: 'var(--io-color-primary)', textDecoration: 'underline' }}
            >
              io-tabs usage page
            </a>{' '}
            for a side-by-side decision guide.
          </RuleCard>
        </div>
      </section>

      {/* ── Router integration ───────────────────────────────────────────────── */}
      <section id="router-integration" className="space-y-6">
        <SectionHeader
          title="Router integration"
          description="The recommended pattern for io-tabs-bar is to derive activeTabIndex from the current URL and navigate on update."
        />
        <div className="space-y-3">
          <RuleCard label="Derive activeTabIndex from the URL">
            Map your route paths to tab indices. Read the active path from your router on every
            render and pass the matching index as <C>activeTabIndex</C>. This ensures the correct
            tab is highlighted on direct URL access, browser back/forward, and deep links.
          </RuleCard>
          <RuleCard label="Navigate on update">
            In the <C>update</C> event handler, call <C>router.push(tabRoutes[e.detail.activeTabIndex])</C>.
            The router then updates the URL, which triggers a re-render with the new{' '}
            <C>activeTabIndex</C>.
          </RuleCard>
          <RuleCard label="Render tab content in the router outlet">
            Place panel content in your router outlet (e.g. Next.js{' '}
            <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>children</code>),
            not inside <C>io-tabs-bar</C>. Each route segment renders its own panel page.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Follow the same label conventions as io-tabs for consistent tab patterns across your application."
        />
        <div className="space-y-3">
          <RuleCard label="Use nouns, not verbs">
            Label tabs with the content name: &ldquo;Overview&rdquo;, &ldquo;Activity&rdquo;,
            &ldquo;Members&rdquo;. Avoid action phrases that imply the tab performs an action.
          </RuleCard>
          <RuleCard label="Use sentence case">
            Capitalise only the first letter and proper nouns: &ldquo;Team members&rdquo;,
            &ldquo;API keys&rdquo;. Avoid title case.
          </RuleCard>
          <RuleCard label="Keep labels parallel">
            All tab labels in a bar should follow the same grammatical pattern — mixing single-word
            labels with full phrases in the same bar is disorienting.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
