import { Component, Prop, Event, EventEmitter, Element, Host, h, Watch, State } from '@stencil/core';
import type { IoAccordionChangeDetail, IoAccordionHeadingTag, IoAccordionUpdateDetail } from './types';
import { getAccordionStyles } from './io-accordion-styles';

export interface IoAccordionItem {
  /** Visible trigger text */
  title: string;
  /** Panel body content */
  body: string;
  /** Whether this item is open initially */
  open?: boolean;
}

/**
 * io-accordion
 * =============
 * Collapsible sections with animated +/− icon and title indent animation.
 * Extracted from the "Our expertise" section of the iO Brand & Business page.
 *
 * By default only one panel can be open at a time (accordion behaviour).
 * Set `allow-multiple` to allow multiple open panels simultaneously.
 *
 * @example
 * <io-accordion></io-accordion>
 *
 * // Set items via property (framework usage):
 * accordionEl.items = [
 *   { title: 'Audits & research', body: 'Making targeted decisions...' },
 *   { title: 'Brand strategy', body: 'Ready to make your mark...' },
 * ];
 */
@Component({
  tag: 'io-accordion',
  shadow: { delegatesFocus: true },
})
export class IoAccordion {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Array of accordion items to render */
  @Prop({ mutable: false }) items: IoAccordionItem[] = [];

  /** Allow multiple panels open simultaneously */
  @Prop({ reflect: true }) allowMultiple = false;

  /** Open state for single-item slot mode (used when items is empty) */
  @Prop({ reflect: true, mutable: true }) open = false;

  /** Heading text for single-item slot mode */
  @Prop() heading = '';

  /** Semantic heading tag for single-item slot mode */
  @Prop({ attribute: 'heading-tag' }) headingTag: IoAccordionHeadingTag = 'h3';

  // ── Internal open-state map ───────────────────────────────────

  @State() private openStates: boolean[] = [];
  @State() private baseId = '';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a panel opens or closes */
  @Event() accordionChange!: EventEmitter<IoAccordionChangeDetail>;

  /** Fires when single-item slot mode is toggled */
  @Event() update!: EventEmitter<IoAccordionUpdateDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.baseId = this.el.id || `io-accordion-${Math.random().toString(36).slice(2, 10)}`;
    this.openStates = this.items.map(item => item.open ?? false);
  }

  @Watch('items')
  onItemsChange(items: IoAccordionItem[]) {
    this.openStates = items.map(item => item.open ?? false);
  }

  // ── Private ───────────────────────────────────────────────────

  private toggle(index: number) {
    const currentlyOpen = this.openStates[index];
    const next = [...this.openStates];

    if (!this.allowMultiple) {
      next.fill(false);
    }
    next[index] = !currentlyOpen;
    this.openStates = next;
    this.accordionChange.emit({ index, open: next[index] });
  }

  private toggleSingle = () => {
    this.open = !this.open;
    this.update.emit({ open: this.open });
  };

  private get isItemsMode() {
    return this.items.length > 0;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { items, openStates } = this;
    const isItemsMode = this.isItemsMode;
    const headingTag = this.headingTag as keyof HTMLElementTagNameMap;
    const HeadingTag = headingTag;

    return (
      <Host>
        <style>{getAccordionStyles()}</style>
        <div class="accordion" role={isItemsMode ? 'list' : undefined}>
          {isItemsMode
            ? items.map((item, index) => {
                const isOpen = openStates[index] ?? false;
                const itemClass = [
                  'accordion-item',
                  index === 0 ? 'accordion-item--first' : '',
                  isOpen ? 'accordion-item--open' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                const triggerId = `${this.baseId}-trigger-${index}`;
                const panelId = `${this.baseId}-panel-${index}`;

                return (
                  <div class={itemClass} role="listitem">
                    <button
                      id={triggerId}
                      class="accordion-trigger"
                      aria-expanded={String(isOpen)}
                      aria-controls={panelId}
                      onClick={() => this.toggle(index)}
                    >
                      <span class="accordion-title">{item.title}</span>
                      <span class="accordion-icon" aria-hidden="true" />
                    </button>
                    <div
                      id={panelId}
                      class="accordion-panel"
                      role="region"
                      aria-labelledby={triggerId}
                      inert={!isOpen || undefined}
                    >
                      <div class="accordion-panel-inner">
                        <p class="accordion-body">{item.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            : (() => {
                const isOpen = this.open;
                const itemClass = ['accordion-item', 'accordion-item--first', isOpen ? 'accordion-item--open' : '']
                  .filter(Boolean)
                  .join(' ');
                const triggerId = `${this.baseId}-trigger`;
                const panelId = `${this.baseId}-panel`;

                return (
                  <div class={itemClass}>
                    <HeadingTag class="accordion-title">
                      <button
                        id={triggerId}
                        class="accordion-trigger"
                        aria-expanded={String(isOpen)}
                        aria-controls={panelId}
                        onClick={this.toggleSingle}
                      >
                        <slot name="heading">{this.heading}</slot>
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
                );
              })()}
        </div>
      </Host>
    );
  }
}
