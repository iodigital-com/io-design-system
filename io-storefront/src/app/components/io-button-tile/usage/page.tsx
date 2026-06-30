'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';

export default function IoButtonTileUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-button-tile is for media tiles that trigger an action — opening a modal, adding to a cart, or toggling a state — rather than navigating to a URL."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <DoOrDontCard type="do">
              Use io-button-tile when the tile click triggers a JavaScript function or state change.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a meaningful label for the accessible button name.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the loading prop to prevent double-submit and give immediate feedback on async operations.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <DoOrDontCard type="dont">
              Do not use io-button-tile for navigation — use io-link-tile instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not disable a tile without providing a tooltip or explanation — users need to understand why the action is unavailable.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="vs-link-tile" className="space-y-4">
        <SectionHeader
          title="io-button-tile vs io-link-tile"
          description="Choose the right variant based on what happens when the user activates the tile."
        />
        <div className="space-y-3">
          <RuleCard title="Use io-link-tile when...">
            The tile leads to another page or resource via an anchor href. Search engines can crawl it. Right-click → Open in new tab works.
          </RuleCard>
          <RuleCard title="Use io-button-tile when...">
            The tile activates a JavaScript action: opens a modal, adds an item to a collection, starts a process, or toggles UI state.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
