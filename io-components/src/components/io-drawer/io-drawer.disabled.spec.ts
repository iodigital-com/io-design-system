import { describe, it, expect, vi } from 'vitest';

import { IoDrawer } from './io-drawer';

/**
 * io-drawer — interaction-restriction tests
 *
 * io-drawer has no `disabled` prop. The mechanism for restricting user-triggered
 * close interactions is the `closeOnBackdrop` boolean prop (default: true).
 *
 * When `closeOnBackdrop` is false the backdrop-click handler becomes a no-op,
 * meaning the user cannot close the drawer by clicking outside the panel. The
 * close button and ESC key remain active (native <dialog> behaviour).
 *
 * This file also documents that `show()` and `close()` methods are idempotent
 * (no-op when already in the target state), which prevents unintended open/close
 * cycles when called programmatically.
 */
describe('io-drawer — interaction restrictions', () => {
  // ── closeOnBackdrop = false ───────────────────────────────────────────────

  describe('closeOnBackdrop prop', () => {
    it('defaults to true', () => {
      const drawer = new IoDrawer();
      expect((drawer as any).closeOnBackdrop).toBe(true);
    });

    it('can be set to false to prevent backdrop-click dismissal', () => {
      const drawer = new IoDrawer();
      (drawer as any).closeOnBackdrop = false;
      expect((drawer as any).closeOnBackdrop).toBe(false);
    });

    it('handleDialogClick does not set open to false when closeOnBackdrop is false', () => {
      // Arrange
      const drawer = new IoDrawer();
      (drawer as any).open = true;
      (drawer as any).closeOnBackdrop = false;

      const fakeEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, right: 400, top: 0, bottom: 600 }),
        },
        clientX: -10, // outside the rect — would normally trigger close
        clientY: -10,
      } as unknown as MouseEvent;

      // Act
      (drawer as any).handleDialogClick(fakeEvent);

      // Assert — open must remain true because closeOnBackdrop is disabled
      expect((drawer as any).open).toBe(true);
    });

    it('handleDialogClick closes the drawer when closeOnBackdrop is true and click is on the backdrop', () => {
      // Arrange
      const drawer = new IoDrawer();
      (drawer as any).open = true;
      (drawer as any).closeOnBackdrop = true;

      const fakeEvent = {
        currentTarget: {
          getBoundingClientRect: () => ({ left: 50, right: 350, top: 50, bottom: 550 }),
        },
        clientX: 10, // outside rect.left — backdrop area
        clientY: 300,
      } as unknown as MouseEvent;

      // Act
      (drawer as any).handleDialogClick(fakeEvent);

      // Assert
      expect((drawer as any).open).toBe(false);
    });
  });

  // ── Close button ─────────────────────────────────────────────────────────

  describe('close button handler', () => {
    it('handleCloseClick sets open to false regardless of closeOnBackdrop', () => {
      const drawer = new IoDrawer();
      (drawer as any).open = true;
      (drawer as any).closeOnBackdrop = false;

      (drawer as any).handleCloseClick();

      expect((drawer as any).open).toBe(false);
    });
  });

  // ── ESC / cancel handler ─────────────────────────────────────────────────

  describe('ESC key / cancel handler', () => {
    it('handleCancel prevents default and sets open to false', () => {
      const drawer = new IoDrawer();
      (drawer as any).open = true;

      const fakeEvent = { preventDefault: vi.fn() } as unknown as Event;
      (drawer as any).handleCancel(fakeEvent);

      expect(fakeEvent.preventDefault).toHaveBeenCalledOnce();
      expect((drawer as any).open).toBe(false);
    });
  });

  // ── show() / close() idempotency ──────────────────────────────────────────

  describe('show() and close() methods', () => {
    it('show() is a no-op when already open', async () => {
      const drawer = new IoDrawer();
      (drawer as any).open = true;

      await drawer.show();

      // Still open, no error thrown
      expect((drawer as any).open).toBe(true);
    });

    it('close() is a no-op when already closed', async () => {
      const drawer = new IoDrawer();
      (drawer as any).open = false;
      // Stub removeSwipeListeners to avoid shadowRoot access
      (drawer as any).removeSwipeListeners = vi.fn();

      await drawer.close();

      expect((drawer as any).open).toBe(false);
    });

    it('show() sets open to true when closed', async () => {
      const drawer = new IoDrawer();
      (drawer as any).open = false;

      await drawer.show();

      expect((drawer as any).open).toBe(true);
    });

    it('close() sets open to false when open', async () => {
      const drawer = new IoDrawer();
      (drawer as any).open = true;
      (drawer as any).removeSwipeListeners = vi.fn();

      await drawer.close();

      expect((drawer as any).open).toBe(false);
    });
  });

  // ── No disabled prop ─────────────────────────────────────────────────────

  describe('disabled prop (not present)', () => {
    it('has no disabled prop — interaction restriction is via closeOnBackdrop and programmatic API', () => {
      const drawer = new IoDrawer();
      // io-drawer intentionally has no `disabled` prop.
      // Confirm the property is undefined rather than false, so callers
      // don't accidentally rely on it.
      expect((drawer as any).disabled).toBeUndefined();
    });
  });
});
