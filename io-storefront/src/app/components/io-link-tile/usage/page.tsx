'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';

export default function IoLinkTileUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-link-tile is a navigational tile for rich media contexts — product listings, news indexes, blog cards, and hero feature rows."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <DoOrDontCard type="do">
              Use io-link-tile for navigational cards where the entire surface area should be clickable and lead to a new URL.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a meaningful label — it becomes the accessible name for the embedded anchor.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the gradient prop for tiles placed over photographic imagery to ensure text contrast.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <DoOrDontCard type="dont">
              Do not use io-link-tile when the action triggers a function rather than navigation — use io-button-tile instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not nest interactive elements (buttons, links) inside the default slot — only the tile anchor should be interactive.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="media" className="space-y-4">
        <SectionHeader
          title="Media slot"
          description="The default slot accepts img, picture, or video elements. The tile handles aspect ratio and object-fit automatically."
        />
        <div className="space-y-3">
          <RuleCard label="Always provide alt text">
            When placing an image in the default slot, include an alt attribute. Since the image is aria-hidden inside the tile, the accessible name comes from the label prop — but alt text still serves as a fallback and is required for valid HTML.
          </RuleCard>
          <RuleCard label="Use responsive images">
            Use a picture element with multiple srcset sources for art direction across breakpoints. The tile's CSS object-fit: cover handles cropping automatically.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
