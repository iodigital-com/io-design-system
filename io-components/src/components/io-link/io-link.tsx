import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';

import { getLinkStyles } from './io-link-styles';
import { getLinkClassName, resolveLinkRel, resolveLinkTarget, shouldBlockLinkClick } from './io-link-utils';

import type { IoLinkVariant, IoLinkColor } from './types';

/**
 * io-link
 * ========
 * Animated underline hyperlink — io Digital's branded link element.
 *
 * Two variants:
 *  - standalone: no underline at rest, grows from left on hover (CTA links)
 *  - inline:     underline at rest, slides out on hover (body text links)
 *
 * Inherits font-size and line-height from surrounding text.
 *
 * @example
 * <io-link href="/about">Learn about us</io-link>
 * <io-link href="/contact" variant="inline">Contact us</io-link>
 * <io-link href="https://example.com" external>Open in new tab</io-link>
 */
@Component({
  tag: 'io-link',
  shadow: { delegatesFocus: true },
})
export class IoLink {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Underline animation behaviour */
  @Prop({ reflect: true }) variant: IoLinkVariant = 'standalone';

  /** Text colour */
  @Prop({ reflect: true }) color: IoLinkColor = 'blue';

  /** Destination URL */
  @Prop() href!: string;

  /** Link target. Overridden to '_blank' when external is true. */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute. Overridden to 'noopener noreferrer' when external is true. */
  @Prop() rel: string | undefined;

  /** Automatically sets target="_blank" and rel="noopener noreferrer" */
  @Prop() external = false;

  /** Downloadable file name. Enables download behavior on click. */
  @Prop() download: string | undefined;

  /** Disables the link — removes href and blocks click */
  @Prop({ reflect: true }) disabled = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires on click. Not fired when disabled. */
  @Event() click!: EventEmitter<MouseEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the link */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const inner = this.el.shadowRoot?.querySelector<HTMLElement>('.link');
    inner?.focus(options);
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    if (shouldBlockLinkClick(this.disabled)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.click.emit(ev);
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, color, href, target, rel, external, disabled, download } = this;
    const resolvedTarget = resolveLinkTarget(target, external);
    const resolvedRel = resolveLinkRel(rel, resolvedTarget, external);
    
    // Compute aria-label: append "(opens in new tab)" for external links
    const linkText = this.el.textContent?.trim() || '';
    const ariaLabel = external && linkText ? `${linkText}, opens in new tab` : undefined;

    return (
      <Host>
        <style>{getLinkStyles()}</style>
        <a
          class={getLinkClassName(variant, color, disabled)}
          href={disabled ? undefined : href}
          target={resolvedTarget}
          rel={resolvedRel}
          download={download}
          aria-label={ariaLabel}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={this.handleClick}
        >
          <slot />
        </a>
      </Host>
    );
  }
}
