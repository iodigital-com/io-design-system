'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge } from '@/components/api/ApiPrimitives';

export default function IoProductTileApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on io-product-tile. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>heading</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">—</InlineCode>,
              'Required. Product name displayed as the tile heading. Used as the accessible name via aria-labelledby.',
            ],
            [
              <span key="n"><InlineCode>headingTag</InlineCode></span>,
              <InlineCode key="t">&apos;h2&apos; | &apos;h3&apos; | &apos;h4&apos;</InlineCode>,
              <InlineCode key="d">&apos;h2&apos;</InlineCode>,
              'Semantic HTML tag for the heading element. Choose based on page heading hierarchy.',
            ],
            [
              <span key="n"><InlineCode>price</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">—</InlineCode>,
              'Required. Current or sale price displayed in the tile.',
            ],
            [
              <span key="n"><InlineCode>priceOriginal</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Original pre-sale price. When provided, renders with a strikethrough and sr-only labels for screen reader accessibility.',
            ],
            [
              <span key="n"><InlineCode>description</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Optional short description shown below the heading.',
            ],
            [
              <span key="n"><InlineCode>href</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Optional URL. Wraps the tile content in an <a> element. Mutually exclusive with a slotted anchor.',
            ],
            [
              <span key="n"><InlineCode>target</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'Link target — only used when href is set.',
            ],
            [
              <span key="n"><InlineCode>likeButton</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Show a wishlist/like toggle button overlaid on the product image.',
            ],
            [
              <span key="n"><InlineCode>liked</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controls the active state of the like button. Mutable — the component updates this prop when the button is clicked.',
            ],
            [
              <span key="n"><InlineCode>aspect</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;square&apos; | &apos;portrait&apos; | &apos;landscape&apos;</InlineCode>,
              <InlineCode key="d">&apos;square&apos;</InlineCode>,
              'Aspect ratio of the product image container.',
            ],
            [
              <span key="n"><InlineCode>likeLabel</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Add to wishlist&apos;</InlineCode>,
              'Accessible label for the like button in its default (not liked) state.',
            ],
            [
              <span key="n"><InlineCode>unlikeLabel</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Remove from wishlist&apos;</InlineCode>,
              'Accessible label for the like button in its active (liked) state.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-product-tile."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Detail type', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">like</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              'Emitted when the like button is toggled. event.detail contains the new liked state (true = liked, false = unliked).',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default slots for io-product-tile."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">image</InlineCode>,
              'Product image. Use an <img> element with a descriptive alt attribute.',
            ],
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Optional additional content rendered below the price area.',
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ────────────────────────────────── */}
      <section id="css-props" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Consumer override API for io-product-tile. All tokens are in docs/public-css-api.json."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '340px' },
            { label: 'Default', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [<InlineCode key="p">--io-product-tile-media-radius</InlineCode>, <InlineCode key="d">--io-border-radius-sm</InlineCode>, 'Border radius of the image container.'],
            [<InlineCode key="p">--io-product-tile-media-bg</InlineCode>, <InlineCode key="d">--io-bg-surface</InlineCode>, 'Background when no image is slotted.'],
            [<InlineCode key="p">--io-product-tile-like-size</InlineCode>, <InlineCode key="d">2.5rem</InlineCode>, 'Size of the like button (min 44px).'],
            [<InlineCode key="p">--io-product-tile-like-bg</InlineCode>, <InlineCode key="d">--io-bg-surface</InlineCode>, 'Background of the like button.'],
            [<InlineCode key="p">--io-product-tile-like-color</InlineCode>, <InlineCode key="d">--io-text-primary</InlineCode>, 'Icon colour in default (not liked) state.'],
            [<InlineCode key="p">--io-product-tile-like-color-liked</InlineCode>, <InlineCode key="d">--io-color-rouge</InlineCode>, 'Icon colour in liked state.'],
            [<InlineCode key="p">--io-product-tile-price-color</InlineCode>, <InlineCode key="d">--io-text-primary</InlineCode>, 'Price text colour (non-sale).'],
            [<InlineCode key="p">--io-product-tile-price-sale-color</InlineCode>, <InlineCode key="d">--io-color-rouge</InlineCode>, 'Sale price text colour.'],
            [<InlineCode key="p">--io-product-tile-price-original-color</InlineCode>, <InlineCode key="d">--io-text-secondary</InlineCode>, 'Original price text colour.'],
          ]}
        />
      </section>

    </div>
  );
}
