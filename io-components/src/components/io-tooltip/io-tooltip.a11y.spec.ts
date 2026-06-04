import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-tooltip
 *
 * Tests the native HTML patterns underpinning io-tooltip. The component is a
 * shadow: false compatibility wrapper that writes `io-tooltip` and
 * `io-tooltip-placement` attributes onto its first child trigger element.
 * The actual tooltip popup is rendered globally via the attribute API.
 * Tests here verify the tooltip role pattern and the trigger element's
 * aria-describedby association.
 * Full component-level auditing against the Shadow DOM requires the
 * Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tooltip — a11y (ARIA patterns)', () => {
  it('button trigger with aria-describedby pointing to tooltip has no axe violations', async () => {
    const container = document.createElement('div');

    const trigger = document.createElement('button');
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-describedby', 'tooltip-1');
    trigger.textContent = 'More info';

    const tooltip = document.createElement('div');
    tooltip.setAttribute('role', 'tooltip');
    tooltip.id = 'tooltip-1';
    tooltip.textContent = 'Tooltip content';

    container.appendChild(trigger);
    container.appendChild(tooltip);

    await renderAndCheckA11y(container);
  });

  it('icon-only trigger with aria-label and tooltip description has no axe violations', async () => {
    const container = document.createElement('div');

    const trigger = document.createElement('button');
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-label', 'Help');
    trigger.setAttribute('aria-describedby', 'tooltip-2');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    trigger.appendChild(svg);

    const tooltip = document.createElement('div');
    tooltip.setAttribute('role', 'tooltip');
    tooltip.id = 'tooltip-2';
    tooltip.textContent = 'This field is required for submission';

    container.appendChild(trigger);
    container.appendChild(tooltip);

    await renderAndCheckA11y(container);
  });

  it('link trigger with tooltip has no axe violations', async () => {
    const container = document.createElement('div');

    const trigger = document.createElement('a');
    trigger.href = '#';
    trigger.setAttribute('aria-describedby', 'tooltip-3');
    trigger.textContent = 'Terms and conditions';

    const tooltip = document.createElement('div');
    tooltip.setAttribute('role', 'tooltip');
    tooltip.id = 'tooltip-3';
    tooltip.textContent = 'Opens terms page in current tab';

    container.appendChild(trigger);
    container.appendChild(tooltip);

    await renderAndCheckA11y(container);
  });
});
