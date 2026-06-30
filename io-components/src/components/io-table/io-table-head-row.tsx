import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import type { IoTableHeadRowSelectAllDetail, IoTableSelectionState } from './types';

/**
 * io-table-head-row
 * ==================
 * Renders a <tr> inside io-table-head, with an optional select-all checkbox.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-head-row selectable selection-state="some">
 *   <io-table-head-cell>Name</io-table-head-cell>
 * </io-table-head-row>
 */
@Component({
  tag: 'io-table-head-row',
  shadow: false,
})
export class IoTableHeadRow {
  @Element() el!: HTMLElement;

  /** Renders the select-all checkbox header cell. */
  @Prop() selectable: boolean = false;

  /**
   * Tri-state selection state of the select-all checkbox.
   * `'none'` — no rows selected (unchecked).
   * `'some'` — some rows selected (indeterminate).
   * `'all'`  — all rows selected (checked).
   *
   * When provided, this prop drives both `checked` and `indeterminate`.
   * If omitted, fall back to `selectAllChecked` / `selectAllIndeterminate`.
   */
  @Prop() selectionState: IoTableSelectionState | undefined;

  /**
   * Controlled checked state of the select-all checkbox.
   * @deprecated Prefer `selectionState` for clearer tri-state semantics.
   */
  @Prop() selectAllChecked: boolean = false;

  /**
   * Renders the checkbox in an indeterminate state when true and selectAllChecked is false.
   * @deprecated Prefer `selectionState` for clearer tri-state semantics.
   */
  @Prop() selectAllIndeterminate: boolean = false;

  /** Emitted when the select-all checkbox changes. */
  @Event() selectAll!: EventEmitter<IoTableHeadRowSelectAllDetail>;

  private get isChecked(): boolean {
    if (this.selectionState !== undefined) return this.selectionState === 'all';
    return this.selectAllChecked;
  }

  private get isIndeterminate(): boolean {
    if (this.selectionState !== undefined) return this.selectionState === 'some';
    return this.selectAllIndeterminate && !this.selectAllChecked;
  }

  componentDidRender() {
    if (!this.selectable) return;
    const cb = this.el.querySelector<HTMLInputElement>('.th--checkbox input[type="checkbox"]');
    if (cb) {
      cb.indeterminate = this.isIndeterminate;
    }
  }

  private handleSelectAll = (ev: Event): void => {
    const checked = (ev.target as HTMLInputElement).checked;
    this.selectAll.emit({ checked });
  };

  render() {
    const { selectable } = this;

    return (
      <Host>
        <tr>
          {selectable && (
            <th scope="col" class="th--checkbox">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={this.isChecked}
                onChange={this.handleSelectAll}
              />
            </th>
          )}
          <slot />
        </tr>
      </Host>
    );
  }
}
