import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';
import type { IoAccordionHeadingTag, IoAccordionUpdateDetail } from './types';
import { getAccordionStyles } from './io-accordion-styles';

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

  private baseId = '';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when accordion open state is toggled */
  @Event() update!: EventEmitter<IoAccordionUpdateDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.baseId = this.el.id || `io-accordion-${Math.random().toString(36).slice(2, 10)}`;
  }

  private toggleSingle = () => {
    this.open = !this.open;
    this.update.emit({ open: this.open });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const headingTag = this.headingTag as keyof HTMLElementTagNameMap;
    const HeadingTag = headingTag;
    const isOpen = this.open;
    const itemClass = ['accordion-item', 'accordion-item--first', isOpen ? 'accordion-item--open' : '']
      .filter(Boolean)
      .join(' ');
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
