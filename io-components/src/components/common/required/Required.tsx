import { FunctionalComponent, h } from '@stencil/core';

/**
 * Required asterisk functional component.
 *
 * Renders `" *"` inside a `<span>` with `aria-hidden="true"` so screen
 * readers do not announce the asterisk — the `required` constraint is
 * already conveyed via `aria-required` on the associated form control.
 *
 * Use this in every form component instead of an inline span to ensure
 * consistent styling and a single place to update the required indicator.
 *
 * @example
 * // Inside a component render():
 * {required && <Required />}
 *
 * // The rendered output:
 * <span class="io-required" aria-hidden="true"> *</span>
 */
export const Required: FunctionalComponent = () => (
  <span class="io-required" aria-hidden="true">
    {' *'}
  </span>
);
