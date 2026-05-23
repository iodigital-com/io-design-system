import { Component, Prop, State, Watch, Host, h } from '@stencil/core';

import { getBreadcrumbStyles } from './io-breadcrumb-styles';
import { parseItems, getVisibleItems } from './io-breadcrumb-utils';

import type { IoBreadcrumbSeparator, IoBreadcrumbItem } from './types';

/**
 * io-breadcrumb
 * =============
 * Breadcrumb navigation for hierarchical orientation.
 * Accepts items as a JSON string. The last item is the current page.
 *
 * @example
 * <io-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Services","href":"/services"},{"label":"Digital Strategy"}]'></io-breadcrumb>
 */
@Component({
  tag: 'io-breadcrumb',
  shadow: true,
})
export class IoBreadcrumb {
  /** JSON string of IoBreadcrumbItem[]. Last item is current page (no href). */
  @Prop() items = '[]';

  /** Separator style between breadcrumb items. */
  @Prop({ reflect: true }) separator: IoBreadcrumbSeparator = 'chevron';

  /** Maximum visible items before collapsing middle items. */
  @Prop() maxVisible: number | undefined;

  @State() expanded = false;

  @Watch('items')
  onItemsChange() {
    this.expanded = false;
  }

  private handleExpand = () => {
    this.expanded = true;
  };

  private renderSeparator() {
    if (this.separator === 'slash') {
      return (
        <span class="breadcrumb-separator" aria-hidden="true">
          /
        </span>
      );
    }
    return (
      <span class="breadcrumb-separator" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    );
  }

  private renderCollapsedItems(visible: IoBreadcrumbItem[]) {
    const [first, last] = visible;
    return [
      <li key="first">
        {first.href ? <a href={first.href}>{first.label}</a> : <span>{first.label}</span>}
      </li>,
      <li key="expand">
        {this.renderSeparator()}
        <button class="breadcrumb-expand" aria-label="Show full breadcrumb path" onClick={this.handleExpand}>
          &hellip;
        </button>
      </li>,
      <li key="last">
        {this.renderSeparator()}
        <span class="breadcrumb-current" aria-current="page">
          {last.label}
        </span>
      </li>,
    ];
  }

  private renderFullItems(parsedItems: IoBreadcrumbItem[]) {
    const lastIndex = parsedItems.length - 1;
    return parsedItems.map((item, i) => {
      const isCurrent = i === lastIndex;
      return (
        <li key={i}>
          {i > 0 && this.renderSeparator()}
          {isCurrent ? (
            <span class="breadcrumb-current" aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
        </li>
      );
    });
  }

  render() {
    const parsedItems = parseItems(this.items);
    const { visible, hasCollapsed } = getVisibleItems(parsedItems, this.maxVisible, this.expanded);

    const listItems = hasCollapsed
      ? this.renderCollapsedItems(visible)
      : this.renderFullItems(parsedItems);

    return (
      <Host>
        <style>{getBreadcrumbStyles()}</style>
        <nav aria-label="Breadcrumb">
          <ol>{listItems}</ol>
        </nav>
      </Host>
    );
  }
}
