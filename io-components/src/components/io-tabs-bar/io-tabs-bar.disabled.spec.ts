import { describe, it, expect, vi } from 'vitest';
import { IoTabsBar } from './io-tabs-bar';

/**
 * io-tabs-bar — disabled tab tests
 *
 * io-tabs-bar has no component-level `disabled` prop. Individual tabs are
 * disabled via the standard HTML `disabled` attribute on the slotted <button>
 * children. The component enforces these rules:
 *
 * 1. A disabled tab does not emit the `update` event when clicked.
 * 2. A disabled tab has aria-selected="false" regardless of activeTabIndex.
 * 3. A disabled tab has tabindex="-1" so it is not reachable via Tab.
 * 4. Keyboard navigation (Arrow keys, Home, End) skips disabled tabs.
 * 5. normalizeActiveTabIndex skips a disabled tab and falls back to the
 *    first enabled tab, so activeTabIndex can never point to a disabled button.
 */
describe('io-tabs-bar — disabled tab behaviour', () => {
  /** Helper: create a minimal <button> stub (jsdom-compatible) */
  function makeButton(disabled = false): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    if (disabled) {
      btn.disabled = true;
    }
    return btn;
  }

  /** Wire component internals the same way syncFromSlot() would after mount */
  function setupTabsBar(buttons: HTMLButtonElement[]): IoTabsBar {
    const bar = new IoTabsBar();
    (bar as any).buttons = buttons;
    (bar as any).clickHandlers = new Map();
    (bar as any).keyHandlers = new Map();
    return bar;
  }

  // ── Disabled tab does not emit on click ──────────────────────────────────

  describe('click on a disabled tab', () => {
    it('does not emit the update event', () => {
      // Arrange
      const enabledBtn = makeButton(false);
      const disabledBtn = makeButton(true);
      const bar = setupTabsBar([enabledBtn, disabledBtn]);
      (bar as any).activeTabIndex = 0;
      (bar as any).update = { emit: vi.fn() };

      // Act — click the disabled tab (index 1)
      (bar as any).handleTabClick(1);

      // Assert
      expect((bar as any).update.emit).not.toHaveBeenCalled();
    });

    it('does not change activeTabIndex', () => {
      // Arrange
      const enabledBtn = makeButton(false);
      const disabledBtn = makeButton(true);
      const bar = setupTabsBar([enabledBtn, disabledBtn]);
      (bar as any).activeTabIndex = 0;
      (bar as any).update = { emit: vi.fn() };

      // Act
      (bar as any).handleTabClick(1);

      // Assert
      expect((bar as any).activeTabIndex).toBe(0);
    });
  });

  // ── ARIA attributes on disabled tabs ────────────────────────────────────

  describe('applyAriaToButtons — disabled tab ARIA', () => {
    it('sets aria-selected="false" on a disabled tab even if it matches activeTabIndex', () => {
      // Arrange
      const disabledBtn = makeButton(true);
      const enabledBtn = makeButton(false);
      const bar = setupTabsBar([disabledBtn, enabledBtn]);

      // Act — treat index 0 as "active" but it is disabled
      (bar as any).applyAriaToButtons([disabledBtn, enabledBtn], 0);

      // Assert — disabled tab must never be aria-selected
      expect(disabledBtn.getAttribute('aria-selected')).toBe('false');
    });

    it('sets tabindex="-1" on a disabled tab', () => {
      // Arrange
      const disabledBtn = makeButton(true);
      const bar = setupTabsBar([disabledBtn]);

      // Act
      (bar as any).applyAriaToButtons([disabledBtn], 0);

      // Assert
      expect(disabledBtn.getAttribute('tabindex')).toBe('-1');
    });

    it('sets role="tab" on a disabled tab', () => {
      // Arrange
      const disabledBtn = makeButton(true);
      const bar = setupTabsBar([disabledBtn]);

      // Act
      (bar as any).applyAriaToButtons([disabledBtn], 0);

      // Assert
      expect(disabledBtn.getAttribute('role')).toBe('tab');
    });

    it('sets aria-selected="true" on enabled active tab', () => {
      // Arrange
      const enabledBtn = makeButton(false);
      const bar = setupTabsBar([enabledBtn]);

      // Act
      (bar as any).applyAriaToButtons([enabledBtn], 0);

      // Assert
      expect(enabledBtn.getAttribute('aria-selected')).toBe('true');
    });
  });

  // ── Keyboard navigation skips disabled tabs ──────────────────────────────

  describe('getEnabledButtons — disabled tabs excluded from keyboard navigation', () => {
    it('excludes disabled buttons from the enabled list', () => {
      // Arrange
      const btn0 = makeButton(false);
      const btn1 = makeButton(true);  // disabled
      const btn2 = makeButton(false);
      const bar = setupTabsBar([btn0, btn1, btn2]);

      // Act
      const enabled: Array<{ btn: HTMLButtonElement; index: number }> = (bar as any).getEnabledButtons();

      // Assert — only btn0 (index 0) and btn2 (index 2) are returned
      expect(enabled).toHaveLength(2);
      expect(enabled[0].index).toBe(0);
      expect(enabled[1].index).toBe(2);
    });

    it('ArrowRight skips the disabled tab in the middle', () => {
      // Arrange
      const btn0 = makeButton(false);
      const btn1 = makeButton(true);  // disabled — should be skipped
      const btn2 = makeButton(false);
      btn2.focus = vi.fn();           // stub focus() to avoid jsdom issues

      const bar = setupTabsBar([btn0, btn1, btn2]);
      (bar as any).activeTabIndex = 0;

      const ev = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });

      // Act — press ArrowRight from btn0 (index 0)
      (bar as any).handleKeyDown(ev, 0);

      // Assert — focus jumps directly to btn2, skipping disabled btn1
      expect(btn2.focus).toHaveBeenCalledOnce();
    });
  });

  // ── normalizeActiveTabIndex skips disabled tabs ───────────────────────────

  describe('handleTabClick — ignores click on out-of-range or undefined index', () => {
    it('does nothing when index is out of bounds', () => {
      // Arrange
      const btn = makeButton(false);
      const bar = setupTabsBar([btn]);
      (bar as any).activeTabIndex = 0;
      (bar as any).update = { emit: vi.fn() };

      // Act
      (bar as any).handleTabClick(99);

      // Assert
      expect((bar as any).update.emit).not.toHaveBeenCalled();
    });

    it('does not emit if the clicked tab is already the active tab', () => {
      // Arrange
      const btn = makeButton(false);
      const bar = setupTabsBar([btn]);
      (bar as any).activeTabIndex = 0;
      (bar as any).update = { emit: vi.fn() };

      // Act — click the already-active tab
      (bar as any).handleTabClick(0);

      // Assert — no-op, no duplicate events
      expect((bar as any).update.emit).not.toHaveBeenCalled();
    });
  });

  // ── All tabs disabled edge case ──────────────────────────────────────────

  describe('all tabs disabled', () => {
    it('handleKeyDown returns early when there are no enabled buttons', () => {
      // Arrange
      const btn0 = makeButton(true);
      const btn1 = makeButton(true);
      const bar = setupTabsBar([btn0, btn1]);

      const ev = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

      // Act — should not throw
      expect(() => (bar as any).handleKeyDown(ev, 0)).not.toThrow();

      // Assert — no navigation attempted
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });
});
