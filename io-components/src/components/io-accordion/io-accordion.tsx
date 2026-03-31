import { Component, Prop, Event, EventEmitter, Element, Host, h, Watch, State } from '@stencil/core';
import type { IoAccordionChangeDetail } from './types';
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

  // ── Internal open-state map ───────────────────────────────────

  @State() private openStates: boolean[] = [];

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a panel opens or closes */
  @Event() accordionChange!: EventEmitter<IoAccordionChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
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

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { items, openStates } = this;

    return (
      <Host>
        <style>{getAccordionStyles()}</style>
        <div class="accordion" role="list">
          {items.map((item, index) => {
            const isOpen = openStates[index] ?? false;
            const itemClass = [
              'accordion-item',
              index === 0 ? 'accordion-item--first' : '',
              isOpen ? 'accordion-item--open' : '',
            ]
              .filter(Boolean)
              .join(' ');
            const triggerId = `io-accordion-trigger-${index}`;
            const panelId = `io-accordion-panel-${index}`;

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
                >
                  <div class="accordion-panel-inner">
                    <p class="accordion-body">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
