import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import { getAccordionStyles } from './io-accordion-styles';
import { getAccordionBaseId, getAccordionItemClass } from './io-accordion-utils';

import type { IoAccordionBackground, IoAccordionHeadingTag, IoAccordionSize, IoAccordionUpdateDetail } from './types';

/**
 * io-accordion
 * =============
 * Collapsible sections with animated +/− icon and title indent animation.
 * Extracted from the "Our expertise" section of the iO Brand & Business page.
 *
 * PDS-style: one accordion instance controls one content section.
 *
 * @example
 * <io-accordion></io-accordion>
 *
 */
@Component({
  tag: 'io-accordion',
  shadow: { delegatesFocus: true },
})
export class IoAccordion {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Open state for the accordion item */
  @Prop({ reflect: true, mutable: true }) open = false;

  /** Heading text fallback when heading slot is not provided */
  @Prop() heading = '';

  /** Semantic heading tag wrapping the trigger button */
  @Prop({ attribute: 'heading-tag' }) headingTag: IoAccordionHeadingTag = 'h3';

  /** Size preset — controls trigger padding and title font size */
  @Prop({ reflect: true }) size: IoAccordionSize = 'md';

  /** Prevents interaction and applies reduced-opacity styling */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Background fill variant for the accordion host element.
   * - `transparent` (default): no background fill
   * - `surface`: `var(--io-bg-surface)` — subtle fill for card/nested layouts
   * - `canvas`: `var(--io-bg-page)` — page-level fill
   */
  @Prop({ reflect: true }) background: IoAccordionBackground = 'transparent';

  /**
   * When `true`, the accordion trigger becomes `position: sticky; top: 0`
   * so it remains visible while scrolling through long expanded content.
   *
   * Note: `sticky` is only meaningful when `background` is `surface` or `canvas`.
   * Using `sticky=true` with `background="transparent"` will log a development
   * warning because a transparent sticky header causes content to bleed through.
   */
  @Prop({ reflect: true }) sticky = false;

  /**
   * Expands this panel on the very first render.
   * Has no effect after initial render — use the `open` prop for runtime control.
   *
   * Note: setting `defaultExpanded` on multiple siblings whose `allowMultiple`
   * is `false` (the default) will leave all of them open at initial render,
   * because coordination events are not dispatched during `componentWillLoad`.
   * Only one `defaultExpanded` accordion per group is recommended when
   * `allowMultiple` is `false`.
   */
  @Prop() defaultExpanded = false;

  /**
   * When `false` (default), opening this accordion dispatches a coordination
   * event so sibling accordions sharing the same parent auto-close (single-open
   * group behaviour). Set to `true` to allow multiple panels open at once.
   *
   * The coordination event is dispatched by the *opener* unconditionally;
   * each receiver decides independently whether to auto-close based on its
   * own `allowMultiple` value. This means accordions with `allowMultiple=false`
   * will auto-close even if the opener has `allowMultiple=true`.
   */
  @Prop({ reflect: true }) allowMultiple = false;

  private baseId = '';

  /** Cached parent reference for listener add/remove symmetry. */
  private groupParent: HTMLElement | null = null;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when accordion open state is toggled */
  @Event() update!: EventEmitter<IoAccordionUpdateDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.baseId = getAccordionBaseId(this.el.id);
    if (this.defaultExpanded && !this.open) {
      this.open = true;
    }
    if (this.sticky && this.background === 'transparent') {
      console.warn(
        '[io-accordion] sticky=true with background="transparent" is not meaningful. ' +
          'The sticky trigger will have no background, causing content to bleed through. ' +
          'Set background="surface" or background="canvas" to use sticky correctly.',
      );
    }
  }

  componentDidLoad() {
    this.groupParent = this.el.parentElement;
    this.groupParent?.addEventListener('accordion-group-open', this.handleGroupOpen);
  }

  disconnectedCallback() {
    this.groupParent?.removeEventListener('accordion-group-open', this.handleGroupOpen);
    this.groupParent = null;
  }

  /**
   * Handles the `accordion-group-open` coordination event.
   * When `allowMultiple=false`, closes self if another accordion in the same
   * parent group opened.
   */
  private handleGroupOpen = (event: Event) => {
    const e = event as CustomEvent<{ source: HTMLElement }>;
    if (this.allowMultiple) return;
    if (e.detail.source === this.el) return;
    if (this.open) {
      this.open = false;
      this.update.emit({ open: false });
    }
  };

  private toggleSingle = () => {
    if (this.disabled) return;
    this.open = !this.open;
    this.update.emit({ open: this.open });
    // Always dispatch on open — each receiver's own `allowMultiple` flag
    // decides whether to auto-close. This ensures mixed-mode groups work
    // correctly: an opener with `allowMultiple=true` still notifies siblings
    // that have `allowMultiple=false`.
    if (this.open) {
      this.el.dispatchEvent(
        new CustomEvent('accordion-group-open', {
          bubbles: true,
          detail: { source: this.el },
        }),
      );
    }
  };

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Expanded panel content shown when the accordion is open.
   * @slot heading - Trigger label text. Falls back to the `heading` prop when not provided.
   */
  render() {
    const headingTag = this.headingTag as keyof HTMLElementTagNameMap;
    const HeadingTag = headingTag;
    const isOpen = this.open;
    const itemClass = getAccordionItemClass({ open: isOpen, disabled: this.disabled });
    const triggerId = `${this.baseId}-trigger`;
    const panelId = `${this.baseId}-panel`;

    return (
      <Host>
        <style>{getAccordionStyles()}</style>
        <div class="accordion">
          <div class={itemClass}>
            <HeadingTag class="accordion-heading">
              <button
                id={triggerId}
                class="accordion-trigger"
                aria-expanded={String(isOpen)}
                aria-controls={panelId}
                aria-disabled={this.disabled ? 'true' : undefined}
                disabled={this.disabled}
                onClick={this.toggleSingle}
              >
                <span class="accordion-title">
                  <slot name="heading">{this.heading}</slot>
                </span>
                <span class="accordion-icon" aria-hidden="true" />
              </button>
            </HeadingTag>
            <div
              id={panelId}
              class="accordion-panel"
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen || undefined}
            >
              <div class="accordion-panel-inner">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
