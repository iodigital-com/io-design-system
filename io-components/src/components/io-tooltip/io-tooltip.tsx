import { Component, Prop, Element, Host, Watch, h } from '@stencil/core';
import type { IoTooltipPlacement } from './types';

/**
 * io-tooltip
 * ===========
 * Compatibility wrapper around the global [io-tooltip] attribute API.
 *
 * New usage should place `io-tooltip` and `io-tooltip-placement` attributes
 * directly on the trigger element. This wrapper is kept to avoid breaking
 * existing markup and simply maps props to attributes on the first child.
 *
 * @example
 * <io-tooltip content="More information">
 *   <io-button>Info</io-button>
 * </io-tooltip>
 */
@Component({
  tag: 'io-tooltip',
  shadow: false,
})
export class IoTooltip {
  @Element() el!: HTMLElement;

  private trigger?: HTMLElement;
  private observer?: MutationObserver;

  // ── Props ─────────────────────────────────────────────────────

  /** Tooltip text content */
  @Prop() content = '';

  /** Preferred placement of the tooltip relative to the trigger */
  @Prop() placement: IoTooltipPlacement = 'top';

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.syncTriggerAttributes();

    // Keep compatibility wrapper stable when frameworks replace the first child.
    this.observer = new MutationObserver(() => this.syncTriggerAttributes());
    this.observer.observe(this.el, { childList: true });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.observer = undefined;
    this.clearTriggerAttributes();
  }

  @Watch('content')
  onContentChange() {
    this.syncTriggerAttributes();
  }

  @Watch('placement')
  onPlacementChange() {
    this.syncTriggerAttributes();
  }

  private getTrigger(): HTMLElement | undefined {
    const first = this.el.querySelector(':scope > *');
    return first instanceof HTMLElement ? first : undefined;
  }

  private syncTriggerAttributes() {
    const trigger = this.getTrigger();
    if (!trigger) return;

    if (this.trigger && this.trigger !== trigger) {
      this.clearTriggerAttributes();
    }

    this.trigger = trigger;
    trigger.setAttribute('io-tooltip', this.content);
    trigger.setAttribute('io-tooltip-placement', this.placement);
  }

  private clearTriggerAttributes() {
    if (!this.trigger) return;
    if (this.trigger.getAttribute('io-tooltip') === this.content) {
      this.trigger.removeAttribute('io-tooltip');
    }
    if (this.trigger.getAttribute('io-tooltip-placement') === this.placement) {
      this.trigger.removeAttribute('io-tooltip-placement');
    }
    this.trigger = undefined;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
