import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTabsBar } from './io-tabs-bar';

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  btn.focus = vi.fn();
  return btn;
}

function makeKeyEvent(key: string): KeyboardEvent & { preventDefault: ReturnType<typeof vi.fn> } {
  const ev = new KeyboardEvent('keydown', { key, bubbles: true });
  const preventDefaultMock = vi.fn();
  Object.defineProperty(ev, 'preventDefault', { value: preventDefaultMock, writable: true });
  return ev as KeyboardEvent & { preventDefault: ReturnType<typeof vi.fn> };
}

describe('io-tabs-bar — keyboard navigation', () => {
  let component: IoTabsBar;
  let updateEmitMock: ReturnType<typeof vi.fn>;
  let btn0: HTMLButtonElement;
  let btn1: HTMLButtonElement;
  let btn2: HTMLButtonElement;

  beforeEach(() => {
    btn0 = makeButton('Overview');
    btn1 = makeButton('Details');
    btn2 = makeButton('Settings');

    component = new IoTabsBar();
    (component as any).el = document.createElement('io-tabs-bar');
    updateEmitMock = vi.fn();
    (component as any).update = { emit: updateEmitMock };
    (component as any).buttons = [btn0, btn1, btn2];
    component.activeTabIndex = 0;
  });

  describe('Enter / Space — activation', () => {
    it('Enter on a non-active tab calls handleTabClick and emits update', () => {
      const ev = makeKeyEvent('Enter');
      (component as any).handleKeyDown(ev, 1);

      expect(updateEmitMock).toHaveBeenCalledOnce();
      expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 1 });
    });

    it('Space on a non-active tab calls handleTabClick and emits update', () => {
      const ev = makeKeyEvent(' ');
      (component as any).handleKeyDown(ev, 2);

      expect(updateEmitMock).toHaveBeenCalledOnce();
      expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 2 });
    });

    it('Enter calls preventDefault', () => {
      const ev = makeKeyEvent('Enter');
      (component as any).handleKeyDown(ev, 1);

      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('Space calls preventDefault', () => {
      const ev = makeKeyEvent(' ');
      (component as any).handleKeyDown(ev, 1);

      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('Enter on the already-active tab does not emit update', () => {
      component.activeTabIndex = 1;
      const ev = makeKeyEvent('Enter');
      (component as any).handleKeyDown(ev, 1);

      expect(updateEmitMock).not.toHaveBeenCalled();
    });
  });

  describe('ArrowRight — forward navigation', () => {
    it('moves focus to the next enabled button', () => {
      const ev = makeKeyEvent('ArrowRight');
      (component as any).handleKeyDown(ev, 0);

      expect(btn1.focus).toHaveBeenCalled();
    });

    it('wraps focus from the last button to the first', () => {
      const ev = makeKeyEvent('ArrowRight');
      (component as any).handleKeyDown(ev, 2);

      expect(btn0.focus).toHaveBeenCalled();
    });

    it('skips disabled buttons when moving right', () => {
      btn1.disabled = true;
      const ev = makeKeyEvent('ArrowRight');
      (component as any).handleKeyDown(ev, 0);

      expect(btn2.focus).toHaveBeenCalled();
      expect(btn1.focus).not.toHaveBeenCalled();
    });

    it('calls preventDefault', () => {
      const ev = makeKeyEvent('ArrowRight');
      (component as any).handleKeyDown(ev, 0);

      expect(ev.preventDefault).toHaveBeenCalled();
    });
  });

  describe('ArrowLeft — backward navigation', () => {
    it('moves focus to the previous enabled button', () => {
      const ev = makeKeyEvent('ArrowLeft');
      (component as any).handleKeyDown(ev, 2);

      expect(btn1.focus).toHaveBeenCalled();
    });

    it('wraps focus from the first button to the last', () => {
      const ev = makeKeyEvent('ArrowLeft');
      (component as any).handleKeyDown(ev, 0);

      expect(btn2.focus).toHaveBeenCalled();
    });

    it('skips disabled buttons when moving left', () => {
      btn1.disabled = true;
      const ev = makeKeyEvent('ArrowLeft');
      (component as any).handleKeyDown(ev, 2);

      expect(btn0.focus).toHaveBeenCalled();
      expect(btn1.focus).not.toHaveBeenCalled();
    });

    it('calls preventDefault', () => {
      const ev = makeKeyEvent('ArrowLeft');
      (component as any).handleKeyDown(ev, 2);

      expect(ev.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Home — jump to first enabled', () => {
    it('focuses the first enabled button regardless of current position', () => {
      const ev = makeKeyEvent('Home');
      (component as any).handleKeyDown(ev, 2);

      expect(btn0.focus).toHaveBeenCalled();
    });

    it('calls preventDefault', () => {
      const ev = makeKeyEvent('Home');
      (component as any).handleKeyDown(ev, 2);

      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('skips disabled first button and focuses second', () => {
      btn0.disabled = true;
      const ev = makeKeyEvent('Home');
      (component as any).handleKeyDown(ev, 2);

      expect(btn1.focus).toHaveBeenCalled();
      expect(btn0.focus).not.toHaveBeenCalled();
    });
  });

  describe('End — jump to last enabled', () => {
    it('focuses the last enabled button regardless of current position', () => {
      const ev = makeKeyEvent('End');
      (component as any).handleKeyDown(ev, 0);

      expect(btn2.focus).toHaveBeenCalled();
    });

    it('calls preventDefault', () => {
      const ev = makeKeyEvent('End');
      (component as any).handleKeyDown(ev, 0);

      expect(ev.preventDefault).toHaveBeenCalled();
    });

    it('skips disabled last button and focuses second-to-last', () => {
      btn2.disabled = true;
      const ev = makeKeyEvent('End');
      (component as any).handleKeyDown(ev, 0);

      expect(btn1.focus).toHaveBeenCalled();
      expect(btn2.focus).not.toHaveBeenCalled();
    });
  });

  describe('Disabled button has focus (currentEnabledIndex < 0)', () => {
    beforeEach(() => {
      btn1.disabled = true;
      (component as any).buttons = [btn0, btn1, btn2];
    });

    it('ArrowRight from a disabled button falls back to first enabled', () => {
      const ev = makeKeyEvent('ArrowRight');
      (component as any).handleKeyDown(ev, 1);

      expect(btn0.focus).toHaveBeenCalled();
    });

    it('Home from a disabled button falls back to first enabled', () => {
      const ev = makeKeyEvent('Home');
      (component as any).handleKeyDown(ev, 1);

      expect(btn0.focus).toHaveBeenCalled();
    });

    it('ArrowLeft from a disabled button falls back to last enabled', () => {
      const ev = makeKeyEvent('ArrowLeft');
      (component as any).handleKeyDown(ev, 1);

      expect(btn2.focus).toHaveBeenCalled();
    });

    it('End from a disabled button falls back to last enabled', () => {
      const ev = makeKeyEvent('End');
      (component as any).handleKeyDown(ev, 1);

      expect(btn2.focus).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('does nothing when buttons array is empty', () => {
      (component as any).buttons = [];
      const ev = makeKeyEvent('ArrowRight');

      expect(() => (component as any).handleKeyDown(ev, 0)).not.toThrow();
      expect(ev.preventDefault).not.toHaveBeenCalled();
    });

    it('does nothing when all buttons are disabled', () => {
      btn0.disabled = true;
      btn1.disabled = true;
      btn2.disabled = true;
      const ev = makeKeyEvent('ArrowRight');

      expect(() => (component as any).handleKeyDown(ev, 0)).not.toThrow();
      expect(ev.preventDefault).not.toHaveBeenCalled();
    });

    it('unrecognised key does not call preventDefault or focus any button', () => {
      const ev = makeKeyEvent('Tab');
      (component as any).handleKeyDown(ev, 0);

      expect(ev.preventDefault).not.toHaveBeenCalled();
      expect(btn0.focus).not.toHaveBeenCalled();
      expect(btn1.focus).not.toHaveBeenCalled();
      expect(btn2.focus).not.toHaveBeenCalled();
    });
  });
});
