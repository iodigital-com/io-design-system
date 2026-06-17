import { Component, Prop, Host, h } from '@stencil/core';

import { getBreadcrumbItemStyles } from './io-breadcrumb-item-styles';

/**
 * io-breadcrumb-item
 * ==================
 * Individual breadcrumb item used as a child of io-breadcrumb.
 *
 * Renders as an <li> containing either an <a> (when href is set and current is false)
 * or a <span> (when no href or when current is true).
 *
 * The parent io-breadcrumb automatically sets current=true on the last item
 * if no item has current set explicitly.
 *
 * @example
 * <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
 * <io-breadcrumb-item href="/docs" target="_blank" item-label="Documentation (opens in new tab)">Docs</io-breadcrumb-item>
 * <io-breadcrumb-item current>Digital Strategy</io-breadcrumb-item>
 */
@Component({
  tag: 'io-breadcrumb-item',
  shadow: { delegatesFocus: true },
})
export class IoBreadcrumbItem {
  // ── Props ─────────────────────────────────────────────────────

  /** URL this breadcrumb item links to. When omitted the item renders as plain text. */
  @Prop() href?: string;

  /** Whether this item represents the current page. Adds aria-current="page". */
  @Prop({ reflect: true }) current = false;

  /**
   * Anchor target attribute (e.g. '_blank', '_self').
   * When set to '_blank', rel="noopener noreferrer" is added automatically (WCAG 3.2.2).
   */
  @Prop() target?: string;

  /**
   * Accessible label override for the anchor or span.
   * Use when the slot text is insufficient — e.g. an icon-only item,
   * or when a "_blank" link needs context like "opens in new tab".
   * Maps to aria-label on the rendered <a> or <span> (WCAG 4.1.2).
   */
  @Prop() itemLabel?: string;

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { href, current, target, itemLabel } = this;
    const isLink = !!href && !current;
    const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

    return (
      <Host>
        <style>{getBreadcrumbItemStyles()}</style>
        <li>
          {isLink ? (
            <a href={href} target={target} rel={rel} aria-label={itemLabel || undefined}>
              <slot />
            </a>
          ) : (
            <span aria-current={current ? 'page' : undefined} aria-label={itemLabel || undefined}>
              <slot />
            </span>
          )}
        </li>
        {/* Separator is a sibling of <li>, not inside it. display:contents on :host
            collapses the host so both flow as direct flex children of the parent <ol>.
            aria-hidden ensures screen readers skip the purely decorative character. */}
        {!current && <span class="breadcrumb__separator" aria-hidden="true" />}
      </Host>
    );
  }
}
