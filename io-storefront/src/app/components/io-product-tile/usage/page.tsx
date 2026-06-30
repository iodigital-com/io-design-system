'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';

export default function IoProductTileUsagePage() {
  return (
    <div className="space-y-16">

      <section className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-product-tile is designed for commerce listing pages where you need a consistent tile layout with accessible price communication."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RuleCard label="Use for product grids">
            Place io-product-tile in product listing pages, search result grids, and recommendation carousels.
          </RuleCard>
          <RuleCard label="Use the href prop for link tiles">
            Set the href prop to make the entire tile a navigable link. This ensures the link wraps the content correctly with keyboard and screen reader support.
          </RuleCard>
          <RuleCard label="Do not set both href and a slotted anchor">
            Providing both an href prop and a slotted anchor element creates ambiguous link behaviour. Use one or the other.
          </RuleCard>
          <RuleCard label="Do not omit priceOriginal context">
            If you show a sale price, always provide priceOriginal so screen readers can announce both prices with context labels.
          </RuleCard>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Price accessibility pattern"
          description="When priceOriginal is provided, the component renders sr-only span labels so assistive technologies announce both values clearly."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DoOrDontCard type="do">
            Provide both price and priceOriginal. Screen readers announce: &ldquo;Sale price: €39,00 / Original price: €79,00&rdquo;. The sighted user sees the strikethrough; the AT user hears the labels.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not use colour alone for sale indication. Relying only on the rouge sale price colour violates WCAG 1.4.1 (use of colour). The sr-only labels and the strikethrough &lt;s&gt; element provide non-colour differentiation.
          </DoOrDontCard>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Like button"
          description="The optional like button lets users add products to a wishlist. It is a togglable button with aria-pressed semantics."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RuleCard label="Use likeLabel and unlikeLabel">
            Override the default labels to match your product&apos;s wishlist terminology: &ldquo;Add to favourites&rdquo; / &ldquo;Remove from favourites&rdquo;.
          </RuleCard>
          <RuleCard label="Listen to the like event">
            Bind to the like event to persist wishlist state. The event.detail contains the new liked boolean.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
