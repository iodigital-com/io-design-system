'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, AriaTable, ComplianceCard } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoProductTileAccessibilityPage() {
  return (
    <div className="space-y-16">

      {/* ── Screen reader behaviour ──────────────────────────────── */}
      <section id="screen-reader-behaviour" className="space-y-6">
        <SectionHeader
          title="Screen reader behaviour"
          description="io-product-tile ensures all pricing information is communicated to assistive technologies regardless of visual presentation."
        />
        <AriaTable
          rows={[
            {
              attribute: 'aria-labelledby',
              value: <code key="v" className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>headingId</code>,
              description: 'The tile wrapper (a or div) is labelled by the product heading. When the tile is a link, the accessible name of the link is the product name.',
            },
            {
              attribute: 'aria-pressed',
              value: <><code key="t" className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>true</code> / <code key="f" className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>false</code></>,
              description: 'Set on the like button when likeButton is true. Reflects the current liked state so screen readers announce toggled / not toggled.',
            },
            {
              attribute: 'aria-label',
              value: <span key="v" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>likeLabel / unlikeLabel</span>,
              description: 'The like button\'s accessible label changes based on liked state. Default: "Add to wishlist" (not liked) and "Remove from wishlist" (liked).',
            },
          ]}
        />
      </section>

      {/* ── Keyboard interaction ─────────────────────────────────── */}
      <section id="keyboard-interaction" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="Keyboard behaviour when the tile has interactive elements."
        />
        <KeyboardTable
          rows={[
            {
              key: <Kbd>Tab</Kbd>,
              action: 'Moves focus to the next interactive element: the link wrapper (if href is set), then the like button (if likeButton is true). Non-interactive tiles are skipped.',
            },
            {
              key: <span className="flex items-center gap-1"><Kbd>Enter</Kbd><span style={{ color: 'var(--io-text-muted)' }}>/</span><Kbd>Space</Kbd><span style={{ color: 'var(--io-text-muted)' }}>on like button</span></span>,
              action: 'Toggles the liked state and emits the like event with the new boolean value.',
            },
            {
              key: <Kbd>Enter</Kbd>,
              action: 'When focused on the tile link (href set), navigates to the href URL.',
            },
          ]}
        />
      </section>

      {/* ── WCAG 2.2 compliance ──────────────────────────────────── */}
      <section id="wcag-compliance" className="space-y-6">
        <SectionHeader
          title="WCAG 2.2 compliance"
          description="io-product-tile is tested against WCAG 2.2 Level AA."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComplianceCard
            criterion="1.1.1"
            level="A"
            title="Non-text Content"
            note="Slot an img with a descriptive alt attribute in the image slot. The like button provides an accessible label via aria-label."
          />
          <ComplianceCard
            criterion="1.3.1"
            level="A"
            title="Info and Relationships"
            note="The original price uses an s (strikethrough) element for semantic struck-through text. Screen-reader-only labels 'Sale price:' and 'Original price:' provide explicit context."
          />
          <ComplianceCard
            criterion="1.4.1"
            level="A"
            title="Use of Colour"
            note="Sale prices are differentiated by both colour (rouge) and an sr-only text label. The strikethrough on the original price provides a non-colour indicator."
          />
          <ComplianceCard
            criterion="2.1.1"
            level="A"
            title="Keyboard"
            note="All interactive elements (like button, href link) are keyboard operable. Tab order is logical within the tile."
          />
          <ComplianceCard
            criterion="2.4.4"
            level="A"
            title="Link Purpose"
            note="When href is provided, the tile renders as an anchor with aria-labelledby pointing to the heading. The link purpose is unambiguous from context."
          />
          <ComplianceCard
            criterion="2.5.8"
            level="AA"
            title="Target Size"
            note="The like button has a minimum 44x44px touch target controlled by --io-product-tile-like-size (default 2.5rem, min enforced via min-width/min-height)."
          />
          <ComplianceCard
            criterion="4.1.2"
            level="A"
            title="Name, Role, Value"
            note="The like button has aria-pressed reflecting its current liked/unliked state. The heading is associated with the tile wrapper via aria-labelledby."
          />
        </div>
      </section>

      {/* ── Best practices ───────────────────────────────────────── */}
      <section id="best-practices" className="space-y-4">
        <SectionHeader
          title="Best practices"
          description="Guidelines for building inclusive product tile experiences."
        />
        <RuleCard label="Always provide an alt attribute on the image">
          When slotting an img into the image slot, use a descriptive alt attribute that conveys the product. Empty alt is acceptable only if the product heading already provides the context.
        </RuleCard>
        <RuleCard label="Override likeLabel and unlikeLabel to match your product terminology">
          The default labels are generic. Update them to match your brand language: &ldquo;Save to wishlist&rdquo; / &ldquo;Remove from wishlist&rdquo; or &ldquo;Add to favourites&rdquo; / &ldquo;Remove from favourites&rdquo;.
        </RuleCard>
        <RuleCard label="Provide priceOriginal when showing a sale price">
          Without the original price, screen readers only hear the sale amount. Providing priceOriginal triggers the sr-only sale/original labels so the price difference is announced in context.
        </RuleCard>
      </section>

    </div>
  );
}
