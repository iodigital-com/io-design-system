/**
 * io-tooltip — render branch + uncovered function coverage
 *
 * Targets the gaps not covered by the existing spec files:
 *   - getTrigger() — el with no children, el with non-HTMLElement first child,
 *     el with HTMLElement first child
 *   - backupTriggerAttributes() — idempotency guard (already has PREV attrs)
 *   - restoreTriggerAttributes() — hadTooltip=true vs =false branches,
 *     hadPlacement=true vs =false branches
 *   - clearTriggerAttributes() — early-return when trigger is undefined
 *   - syncTriggerAttributes() — no trigger, trigger unchanged, trigger swapped
 *   - MutationObserver wiring — componentDidLoad sets up observer correctly
 *   - disconnectedCallback() — disconnects observer and clears trigger
 *   - onContentChange() / onPlacementChange() @Watch handlers
 *   - render() — does not throw
 *
 * Line 78 in syncTriggerAttributes is the `if (this.trigger && this.trigger !== trigger)` branch —
 * tested by the "trigger swapped" scenario.
 * Line 131 in render() is just `<slot />` inside `<Host>` — tested by the no-throw check.
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { IoTooltip } from './io-tooltip';

// ── helpers ───────────────────────────────────────────────────────────────────

function makeTooltip() {
  const c = new IoTooltip();
  const host = document.createElement('io-tooltip');
  const trigger = document.createElement('button');
  host.appendChild(trigger);
  (c as any).el = host;
  return { c, host, trigger };
}

// ── getTrigger ────────────────────────────────────────────────────────────────

describe('io-tooltip — getTrigger()', () => {
  it('returns the first child element when it is an HTMLElement', () => {
    const { c, trigger } = makeTooltip();
    const result = (c as any).getTrigger();
    expect(result).toBe(trigger);
  });

  it('returns undefined when el has no children', () => {
    const c = new IoTooltip();
    const host = document.createElement('io-tooltip');
    (c as any).el = host;
    const result = (c as any).getTrigger();
    expect(result).toBeUndefined();
  });

  it('returns undefined when first child is not an HTMLElement (e.g. text node)', () => {
    const c = new IoTooltip();
    const host = document.createElement('io-tooltip');
    host.appendChild(document.createTextNode('plain text'));
    (c as any).el = host;
    // firstElementChild is null for text-only children
    const result = (c as any).getTrigger();
    expect(result).toBeUndefined();
  });
});

// ── backupTriggerAttributes ───────────────────────────────────────────────────

describe('io-tooltip — backupTriggerAttributes()', () => {
  it('records that no prior io-tooltip existed when trigger is fresh', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');

    (c as any).backupTriggerAttributes(trigger);

    expect(trigger.getAttribute('data-io-tooltip-prev-had')).toBe('0');
    expect(trigger.getAttribute('data-io-tooltip-prev-value')).toBe('');
  });

  it('records existing io-tooltip value when trigger already has io-tooltip', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('io-tooltip', 'Pre-existing tooltip');

    (c as any).backupTriggerAttributes(trigger);

    expect(trigger.getAttribute('data-io-tooltip-prev-had')).toBe('1');
    expect(trigger.getAttribute('data-io-tooltip-prev-value')).toBe('Pre-existing tooltip');
  });

  it('records existing io-tooltip-placement value when trigger already has it', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('io-tooltip-placement', 'right');

    (c as any).backupTriggerAttributes(trigger);

    expect(trigger.getAttribute('data-io-tooltip-placement-prev-had')).toBe('1');
    expect(trigger.getAttribute('data-io-tooltip-placement-prev-value')).toBe('right');
  });

  it('is idempotent — does not overwrite backup on second call', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('io-tooltip', 'Original');

    (c as any).backupTriggerAttributes(trigger);
    // Simulate the component having set its own attribute value
    trigger.setAttribute('io-tooltip', 'Mapped');
    // Second call must not overwrite the backup
    (c as any).backupTriggerAttributes(trigger);

    expect(trigger.getAttribute('data-io-tooltip-prev-value')).toBe('Original');
  });

  it('does not overwrite placement backup on second call', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('io-tooltip-placement', 'bottom');

    (c as any).backupTriggerAttributes(trigger);
    trigger.setAttribute('io-tooltip-placement', 'top');
    (c as any).backupTriggerAttributes(trigger);

    expect(trigger.getAttribute('data-io-tooltip-placement-prev-value')).toBe('bottom');
  });
});

// ── restoreTriggerAttributes ──────────────────────────────────────────────────

describe('io-tooltip — restoreTriggerAttributes()', () => {
  it('removes io-tooltip when original trigger did not have it', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    // Simulate backup: trigger had no io-tooltip
    trigger.setAttribute('data-io-tooltip-prev-had', '0');
    trigger.setAttribute('data-io-tooltip-prev-value', '');
    trigger.setAttribute('data-io-tooltip-placement-prev-had', '0');
    trigger.setAttribute('data-io-tooltip-placement-prev-value', '');
    trigger.setAttribute('io-tooltip', 'Mapped by component');
    trigger.setAttribute('io-tooltip-placement', 'top');

    (c as any).restoreTriggerAttributes(trigger);

    expect(trigger.hasAttribute('io-tooltip')).toBe(false);
    expect(trigger.hasAttribute('io-tooltip-placement')).toBe(false);
  });

  it('restores original io-tooltip value when trigger previously had one', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('data-io-tooltip-prev-had', '1');
    trigger.setAttribute('data-io-tooltip-prev-value', 'Restore me');
    trigger.setAttribute('data-io-tooltip-placement-prev-had', '0');
    trigger.setAttribute('data-io-tooltip-placement-prev-value', '');
    trigger.setAttribute('io-tooltip', 'Mapped by component');
    trigger.setAttribute('io-tooltip-placement', 'top');

    (c as any).restoreTriggerAttributes(trigger);

    expect(trigger.getAttribute('io-tooltip')).toBe('Restore me');
    expect(trigger.hasAttribute('io-tooltip-placement')).toBe(false);
  });

  it('restores original io-tooltip-placement when trigger previously had one', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('data-io-tooltip-prev-had', '0');
    trigger.setAttribute('data-io-tooltip-prev-value', '');
    trigger.setAttribute('data-io-tooltip-placement-prev-had', '1');
    trigger.setAttribute('data-io-tooltip-placement-prev-value', 'left');
    trigger.setAttribute('io-tooltip', 'X');
    trigger.setAttribute('io-tooltip-placement', 'top');

    (c as any).restoreTriggerAttributes(trigger);

    expect(trigger.hasAttribute('io-tooltip')).toBe(false);
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('left');
  });

  it('removes all backup sentinel attributes after restoring', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    trigger.setAttribute('data-io-tooltip-prev-had', '0');
    trigger.setAttribute('data-io-tooltip-prev-value', '');
    trigger.setAttribute('data-io-tooltip-placement-prev-had', '0');
    trigger.setAttribute('data-io-tooltip-placement-prev-value', '');

    (c as any).restoreTriggerAttributes(trigger);

    expect(trigger.hasAttribute('data-io-tooltip-prev-had')).toBe(false);
    expect(trigger.hasAttribute('data-io-tooltip-prev-value')).toBe(false);
    expect(trigger.hasAttribute('data-io-tooltip-placement-prev-had')).toBe(false);
    expect(trigger.hasAttribute('data-io-tooltip-placement-prev-value')).toBe(false);
  });
});

// ── clearTriggerAttributes ────────────────────────────────────────────────────

describe('io-tooltip — clearTriggerAttributes()', () => {
  it('is a no-op when trigger is undefined (early return)', () => {
    const c = new IoTooltip();
    const host = document.createElement('io-tooltip');
    (c as any).el = host;
    // trigger is not set
    expect(() => (c as any).clearTriggerAttributes()).not.toThrow();
    expect((c as any).trigger).toBeUndefined();
  });

  it('restores trigger attributes and clears internal reference', () => {
    const { c } = makeTooltip();
    const trigger = document.createElement('button');
    // Set up a fully backed-up trigger
    trigger.setAttribute('data-io-tooltip-prev-had', '1');
    trigger.setAttribute('data-io-tooltip-prev-value', 'Original');
    trigger.setAttribute('data-io-tooltip-placement-prev-had', '1');
    trigger.setAttribute('data-io-tooltip-placement-prev-value', 'bottom');
    trigger.setAttribute('io-tooltip', 'Mapped');
    trigger.setAttribute('io-tooltip-placement', 'top');
    (c as any).trigger = trigger;

    (c as any).clearTriggerAttributes();

    expect((c as any).trigger).toBeUndefined();
    expect(trigger.getAttribute('io-tooltip')).toBe('Original');
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('bottom');
  });
});

// ── syncTriggerAttributes ─────────────────────────────────────────────────────

describe('io-tooltip — syncTriggerAttributes()', () => {
  it('does nothing when el has no children', () => {
    const c = new IoTooltip();
    const host = document.createElement('io-tooltip');
    (c as any).el = host;
    c.content = 'Hello';

    expect(() => (c as any).syncTriggerAttributes()).not.toThrow();
    expect((c as any).trigger).toBeUndefined();
  });

  it('sets io-tooltip and io-tooltip-placement on first-child trigger', () => {
    const { c, trigger } = makeTooltip();
    c.content = 'My tip';
    c.placement = 'right';

    (c as any).syncTriggerAttributes();

    expect(trigger.getAttribute('io-tooltip')).toBe('My tip');
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('right');
  });

  it('stores the trigger reference on first sync', () => {
    const { c, trigger } = makeTooltip();
    c.content = 'X';

    (c as any).syncTriggerAttributes();

    expect((c as any).trigger).toBe(trigger);
  });

  it('does not call clearTriggerAttributes when trigger is the same element', () => {
    const { c } = makeTooltip();
    c.content = 'A';

    (c as any).syncTriggerAttributes(); // sets this.trigger
    const clearSpy = vi.spyOn(c as any, 'clearTriggerAttributes');
    (c as any).syncTriggerAttributes(); // same trigger — must NOT call clear

    expect(clearSpy).not.toHaveBeenCalled();
  });

  it('calls clearTriggerAttributes (line 78) when trigger element changes', () => {
    const { c, host } = makeTooltip();
    c.content = 'A';

    (c as any).syncTriggerAttributes(); // stores first trigger
    const clearSpy = vi.spyOn(c as any, 'clearTriggerAttributes');

    // Replace first child with a new element
    const newTrigger = document.createElement('a');
    host.innerHTML = '';
    host.appendChild(newTrigger);

    (c as any).syncTriggerAttributes(); // different trigger → must call clear

    expect(clearSpy).toHaveBeenCalledOnce();
    expect((c as any).trigger).toBe(newTrigger);
    expect(newTrigger.getAttribute('io-tooltip')).toBe('A');
  });

  it('updates attributes on re-sync when content changes', () => {
    const { c, trigger } = makeTooltip();
    c.content = 'First';
    c.placement = 'top';
    (c as any).syncTriggerAttributes();

    c.content = 'Second';
    (c as any).syncTriggerAttributes();

    expect(trigger.getAttribute('io-tooltip')).toBe('Second');
  });
});

// ── @Watch handlers ───────────────────────────────────────────────────────────

describe('io-tooltip — @Watch handler delegation', () => {
  it('onContentChange() calls syncTriggerAttributes', () => {
    const { c, trigger } = makeTooltip();
    (c as any).syncTriggerAttributes(); // prime trigger reference
    const syncSpy = vi.spyOn(c as any, 'syncTriggerAttributes');

    c.content = 'Updated content';
    (c as any).onContentChange();

    expect(syncSpy).toHaveBeenCalledOnce();
  });

  it('onPlacementChange() calls syncTriggerAttributes', () => {
    const { c } = makeTooltip();
    (c as any).syncTriggerAttributes();
    const syncSpy = vi.spyOn(c as any, 'syncTriggerAttributes');

    c.placement = 'bottom';
    (c as any).onPlacementChange();

    expect(syncSpy).toHaveBeenCalledOnce();
  });
});

// ── componentDidLoad — MutationObserver wiring ────────────────────────────────

describe('io-tooltip — componentDidLoad() MutationObserver', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let capturedCallback: MutationCallback | undefined;
  let OriginalMutationObserver: typeof MutationObserver;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    capturedCallback = undefined;

    OriginalMutationObserver = global.MutationObserver;

    // Must use a regular function (not arrow) so it can be used as a constructor.
    const observe = observeMock;
    const disconnect = disconnectMock;
    function FakeMutationObserver(cb: MutationCallback) {
      capturedCallback = cb;
      return { observe, disconnect };
    }
    global.MutationObserver = FakeMutationObserver as unknown as typeof MutationObserver;
  });

  afterEach(() => {
    global.MutationObserver = OriginalMutationObserver;
    vi.restoreAllMocks();
  });

  it('creates a MutationObserver with childList: true on componentDidLoad', () => {
    const { c, host } = makeTooltip();
    c.componentDidLoad();

    expect(observeMock).toHaveBeenCalledWith(host, { childList: true });
  });

  it('MutationObserver callback re-syncs trigger attributes', () => {
    const { c, trigger } = makeTooltip();
    c.content = 'CB test';
    c.componentDidLoad();

    // Manually invoke captured callback to simulate DOM mutation
    if (capturedCallback) {
      capturedCallback([] as unknown as MutationRecord[], (c as any).observer);
    }

    expect(trigger.getAttribute('io-tooltip')).toBe('CB test');
  });

  it('disconnectedCallback disconnects the observer', () => {
    const { c } = makeTooltip();
    c.componentDidLoad();

    c.disconnectedCallback();

    expect(disconnectMock).toHaveBeenCalledOnce();
    expect((c as any).observer).toBeUndefined();
  });

  it('disconnectedCallback clears trigger reference', () => {
    const { c } = makeTooltip();
    c.componentDidLoad();
    // trigger should be set from componentDidLoad → syncTriggerAttributes
    expect((c as any).trigger).toBeDefined();

    c.disconnectedCallback();

    expect((c as any).trigger).toBeUndefined();
  });
});

// ── disconnectedCallback — no observer edge case ──────────────────────────────

describe('io-tooltip — disconnectedCallback() without observer', () => {
  it('does not throw when disconnected before componentDidLoad', () => {
    const { c } = makeTooltip();
    // observer is not set — simulate early disconnect
    expect(() => c.disconnectedCallback()).not.toThrow();
  });
});

// ── render() ─────────────────────────────────────────────────────────────────

describe('io-tooltip — render()', () => {
  it('does not throw with default props', () => {
    const { c } = makeTooltip();
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw with non-empty content and non-default placement', () => {
    const { c } = makeTooltip();
    c.content = 'Tooltip text here';
    c.placement = 'bottom';
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when el has no children', () => {
    const c = new IoTooltip();
    const host = document.createElement('io-tooltip');
    (c as any).el = host;
    expect(() => c.render()).not.toThrow();
  });

  it.each([
    'top', 'bottom', 'left', 'right',
    'top-start', 'top-end', 'bottom-start', 'bottom-end',
  ] as const)('render does not throw for placement=%s', (placement) => {
    const { c } = makeTooltip();
    c.placement = placement;
    expect(() => c.render()).not.toThrow();
  });
});

// ── full lifecycle integration ────────────────────────────────────────────────

describe('io-tooltip — full lifecycle integration', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let OriginalMutationObserver: typeof MutationObserver;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    OriginalMutationObserver = global.MutationObserver;

    const observe = observeMock;
    const disconnect = disconnectMock;
    function FakeMutationObserver(_cb: MutationCallback) {
      return { observe, disconnect };
    }
    global.MutationObserver = FakeMutationObserver as unknown as typeof MutationObserver;
  });

  afterEach(() => {
    global.MutationObserver = OriginalMutationObserver;
    vi.restoreAllMocks();
  });

  it('full mount → prop change → unmount sequence leaves trigger clean', () => {
    const { c, trigger } = makeTooltip();

    c.content = 'Initial';
    c.placement = 'top';
    c.componentDidLoad();

    expect(trigger.getAttribute('io-tooltip')).toBe('Initial');

    c.content = 'Updated';
    (c as any).onContentChange();
    expect(trigger.getAttribute('io-tooltip')).toBe('Updated');

    c.disconnectedCallback();
    expect(trigger.hasAttribute('io-tooltip')).toBe(false);
    expect((c as any).trigger).toBeUndefined();
  });

  it('restores pre-existing attributes on disconnection', () => {
    const c = new IoTooltip();
    const host = document.createElement('io-tooltip');
    const trigger = document.createElement('button');
    trigger.setAttribute('io-tooltip', 'Existing');
    trigger.setAttribute('io-tooltip-placement', 'left');
    host.appendChild(trigger);
    (c as any).el = host;

    c.content = 'Override';
    c.placement = 'right';
    c.componentDidLoad();

    expect(trigger.getAttribute('io-tooltip')).toBe('Override');
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('right');

    c.disconnectedCallback();

    expect(trigger.getAttribute('io-tooltip')).toBe('Existing');
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('left');
  });
});
