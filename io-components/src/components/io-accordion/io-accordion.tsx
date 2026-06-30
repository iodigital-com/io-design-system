import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import { getAccordionStyles } from './io-accordion-styles';
import { getAccordionBaseId, getAccordionItemClass, getSiblingTriggers } from './io-accordion-utils';

import type { IoAccordionAlignMarker, IoAccordionBackground, IoAccordionHeadingTag, IoAccordionSize, IoAccordionUpdateDetail } from './types';

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

  /** Dense layout mode — reduces trigger padding independent of the size preset */
  @Prop({ reflect: true }) compact = false;

  /**
   * Position of the expand/collapse marker icon.
   * - `end` (default): icon appears after the title (right side in LTR)
   * - `start`: icon appears before the title (left side in LTR)
   */
  @Prop({ reflect: true, attribute: 'align-marker' }) alignMarker: IoAccordionAlignMarker = 'end';

  /** Prevents interaction and applies reduced-opacity styling */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Background fill variant for the accordion host element.
   * - `transparent` (default): no background fill
   * - `surface`: `var(--io-bg-surface)` — subtle fill for card/nested layouts
   * - `canvas`: `var(--io-bg-page)` — page-level fill
   * - `frosted`: `backdrop-filter: blur(12px)` — for accordions placed over image/video backdrops
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
   * When multiple siblings have `defaultExpanded=true` and `allowMultiple=false`,
   * only the first in DOM order remains open after mount (coordinated in `componentDidLoad`).
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

  /**
   * When `true`, indents the panel content to visually align with the summary
   * text column (past the expand/collapse icon). Useful when `alignMarker="start"`.
   *
   * Drives via `--io-accordion-indent` token. Register in `docs/public-css-api.json`.
   */
  @Prop({ reflect: true }) indent = false;

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

    // #1066: coordinate defaultExpanded across siblings on mount.
    // When multiple siblings have defaultExpanded=true and open=true and
    // allowMultiple=false, keep only the first in DOM order.
    if (this.defaultExpanded && this.open && !this.allowMultiple) {
      const openSiblings = this.el.parentElement?.querySelectorAll<HTMLElement>(
        'io-accordion[default-expanded][open]',
      );
      if (openSiblings && openSiblings.length > 1 && openSiblings[0] !== this.el) {
        this.open = false;
      }
    }
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

  /**
   * #1087: Handle ArrowUp/ArrowDown/Home/End keyboard navigation between
   * sibling accordion trigger buttons within the same parent element.
   * Disabled headers are skipped; wrapping is not applied.
   */
  private handleTriggerKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;

    event.preventDefault();

    const siblings = getSiblingTriggers(this.el);
    if (siblings.length === 0) return;

    const currentIndex = siblings.indexOf(this.el);

    let targetIndex = currentIndex;
    if (key === 'ArrowDown') {
      targetIndex = currentIndex + 1;
      while (targetIndex < siblings.length) {
        if (!siblings[targetIndex].hasAttribute('disabled')) break;
        targetIndex++;
      }
    } else if (key === 'ArrowUp') {
      targetIndex = currentIndex - 1;
      while (targetIndex >= 0) {
        if (!siblings[targetIndex].hasAttribute('disabled')) break;
        targetIndex--;
      }
    } else if (key === 'Home') {
      targetIndex = 0;
      while (targetIndex < siblings.length) {
        if (!siblings[targetIndex].hasAttribute('disabled')) break;
        targetIndex++;
      }
    } else if (key === 'End') {
      targetIndex = siblings.length - 1;
      while (targetIndex >= 0) {
        if (!siblings[targetIndex].hasAttribute('disabled')) break;
        targetIndex--;
      }
    }

    if (targetIndex !== currentIndex && targetIndex >= 0 && targetIndex < siblings.length) {
      const target = siblings[targetIndex];
      // Focus the trigger button inside the shadow root of the target accordion.
      const targetButton = target.shadowRoot?.querySelector<HTMLButtonElement>('.accordion-trigger');
      targetButton?.focus();
    }
  };

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Expanded panel content shown when the accordion is open.
   * @slot heading - Trigger label text (deprecated — use `summary` slot instead). Falls back to the `heading` prop when not provided.
   * @slot summary - Free-form trigger content. Replaces the heading slot for rich trigger markup.
   * @slot summary-before - Content rendered as a flex sibling before the trigger button. Interactive children remain operable.
   * @slot summary-after - Content rendered as a flex sibling after the trigger button. Interactive children remain operable.
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
              {/* #1042: summary-before slot — rendered outside button so interactive children work */}
              <slot name="summary-before" />
              <button
                id={triggerId}
                class="accordion-trigger"
                aria-expanded={String(isOpen)}
                aria-controls={panelId}
                aria-disabled={this.disabled ? 'true' : undefined}
                onClick={this.toggleSingle}
                onKeyDown={this.handleTriggerKeyDown}
              >
                <span class="accordion-title">
                  {/* #1042: summary slot supersedes heading slot; heading slot kept for backwards compat */}
                  <slot name="summary">
                    <slot name="heading">{this.heading}</slot>
                  </slot>
                </span>
                <span class="accordion-icon" aria-hidden="true" />
              </button>
              {/* #1042: summary-after slot — rendered outside button so interactive children work */}
              <slot name="summary-after" />
            </HeadingTag>
            <div
              id={panelId}
              class="accordion-panel"
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen || undefined}
            >
              <div class={`accordion-panel-inner${this.indent ? ' accordion-panel-inner--indent' : ''}`}>
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
