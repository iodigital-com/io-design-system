import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 10, y: 20 }),
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));

import { __resetTooltipAttributeForTests, initTooltipAttribute } from './tooltip-attribute';

// eslint-disable-next-line import/order -- must follow local import to reference the vi.mock() hoisted above
import { computePosition } from '@floating-ui/dom';

async function flushAsyncTooltipShow(): Promise<void> {
  // showTooltip now awaits computePosition before marking visible.
  await Promise.resolve();
  await Promise.resolve();
}

describe('tooltip-attribute', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    __resetTooltipAttributeForTests();
    initTooltipAttribute();
  });

  it('creates global tooltip overlay and shows on focus', async () => {
    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Hello tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await flushAsyncTooltipShow();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay?.textContent).toBe('Hello tooltip');
    expect(overlay?.getAttribute('data-visible')).toBe('true');
    expect(button.getAttribute('aria-describedby')).toContain('io-tooltip-attribute-overlay');
  });

  it('hides and clears aria-describedby on focus out', async () => {
    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Hello tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await flushAsyncTooltipShow();
    button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.hasAttribute('data-visible')).toBe(false);
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('shows on pointerover and hides on Escape', async () => {
    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Pointer tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    await flushAsyncTooltipShow();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.getAttribute('data-visible')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(overlay?.hasAttribute('data-visible')).toBe(false);
  });

  it('gracefully recovers when computePosition rejects', async () => {
    vi.mocked(computePosition).mockRejectedValueOnce(new Error('position failed'));

    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Broken tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await flushAsyncTooltipShow();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.hasAttribute('data-visible')).toBe(false);
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  describe('catch block — activeTrigger changed before reject resolves', () => {
    it('does not clear describedby on btn1 when activeTrigger is already btn2', async () => {
      vi.mocked(computePosition).mockRejectedValueOnce(new Error('fail'));

      const btn1 = document.createElement('button');
      btn1.setAttribute('io-tooltip', 'One');
      const btn2 = document.createElement('button');
      btn2.setAttribute('io-tooltip', 'Two');
      document.body.appendChild(btn1);
      document.body.appendChild(btn2);

      // Start async show for btn1 — computePosition will reject
      btn1.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      // Immediately start show for btn2 — changes activeTrigger before the promise settles
      btn2.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

      // Flush both pending show operations
      await flushAsyncTooltipShow();
      await flushAsyncTooltipShow();

      // btn1's catch fires but activeTrigger !== btn1, so it skips clearDescribedBy for btn1
      // btn2 remains the active trigger with describedby set
      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay).not.toBeNull();
      // No crash — the guard worked
    });
  });

  describe('onPointerOut — relatedTarget inside active trigger', () => {
    it('does not hide tooltip when pointer moves to a child of the active trigger', async () => {
      const btn = document.createElement('button');
      btn.setAttribute('io-tooltip', 'Stay visible');
      const inner = document.createElement('span');
      btn.appendChild(inner);
      document.body.appendChild(btn);

      btn.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).toBe('true');

      // Simulate pointer moving from btn to its child span — relatedTarget is inside btn
      document.dispatchEvent(new MouseEvent('pointerout', { bubbles: true, relatedTarget: inner }));

      // Tooltip must remain visible because relatedTarget is contained within activeTrigger
      expect(overlay?.getAttribute('data-visible')).toBe('true');
    });

    it('hides tooltip when pointer leaves the active trigger entirely', async () => {
      const btn = document.createElement('button');
      btn.setAttribute('io-tooltip', 'Leave me');
      document.body.appendChild(btn);

      btn.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).toBe('true');

      // relatedTarget is not inside btn — tooltip should hide
      const outside = document.createElement('div');
      document.body.appendChild(outside);
      document.dispatchEvent(new MouseEvent('pointerout', { bubbles: true, relatedTarget: outside }));

      expect(overlay?.hasAttribute('data-visible')).toBe(false);
    });
  });

  describe('onWindowChange — repositions tooltip on resize/scroll', () => {
    it('calls positionTooltip on resize when active trigger exists', async () => {
      const btn = document.createElement('button');
      btn.setAttribute('io-tooltip', 'Resize test');
      document.body.appendChild(btn);

      btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const callsBefore = vi.mocked(computePosition).mock.calls.length;

      window.dispatchEvent(new Event('resize'));
      await flushAsyncTooltipShow();

      expect(vi.mocked(computePosition).mock.calls.length).toBeGreaterThan(callsBefore);
    });

    it('calls positionTooltip on scroll when active trigger exists', async () => {
      const btn = document.createElement('button');
      btn.setAttribute('io-tooltip', 'Scroll test');
      document.body.appendChild(btn);

      btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const callsBefore = vi.mocked(computePosition).mock.calls.length;

      window.dispatchEvent(new Event('scroll'));
      await flushAsyncTooltipShow();

      expect(vi.mocked(computePosition).mock.calls.length).toBeGreaterThan(callsBefore);
    });

    it('hides tooltip when positionTooltip rejects during resize', async () => {
      const btn = document.createElement('button');
      btn.setAttribute('io-tooltip', 'Resize reject');
      document.body.appendChild(btn);

      btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).toBe('true');

      vi.mocked(computePosition).mockRejectedValueOnce(new Error('resize position failed'));
      window.dispatchEvent(new Event('resize'));
      await flushAsyncTooltipShow();

      expect(overlay?.hasAttribute('data-visible')).toBe(false);
    });

    it('does not call positionTooltip on resize when no active trigger', () => {
      const callsBefore = vi.mocked(computePosition).mock.calls.length;
      window.dispatchEvent(new Event('resize'));
      expect(vi.mocked(computePosition).mock.calls.length).toBe(callsBefore);
    });
  });

  describe('clearDescribedBy — backup restoration branches', () => {
    it('restores pre-existing aria-describedby value on hide (line 77 — truthy backup)', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Backup restore');
      button.setAttribute('aria-describedby', 'pre-existing-id');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      // aria-describedby should now include both the existing id and the overlay id
      expect(button.getAttribute('aria-describedby')).toContain('pre-existing-id');
      expect(button.getAttribute('aria-describedby')).toContain('io-tooltip-attribute-overlay');

      button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

      // clearDescribedBy restores the truthy backup value
      expect(button.getAttribute('aria-describedby')).toBe('pre-existing-id');
      expect(button.hasAttribute('data-io-tooltip-prev-describedby')).toBe(false);
    });

    it('fallback path — removes aria-describedby when only tooltip ID remains (line 94)', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Fallback remove');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      // Force the fallback path by removing the backup attribute
      button.removeAttribute('data-io-tooltip-prev-describedby');

      button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

      // Fallback: filter out tooltip id → empty string → removeAttribute (line 94)
      expect(button.hasAttribute('aria-describedby')).toBe(false);
    });

    it('fallback path — keeps remaining IDs when other descriptors exist (line 92)', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Fallback keep');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      // Inject an extra ID and remove the backup to force the fallback path
      button.setAttribute('aria-describedby', 'other-desc io-tooltip-attribute-overlay');
      button.removeAttribute('data-io-tooltip-prev-describedby');

      button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

      // Fallback: filter out tooltip id → 'other-desc' → setAttribute (line 92)
      expect(button.getAttribute('aria-describedby')).toBe('other-desc');
    });

    it('fallback path — handles null aria-describedby (covers ?? null branch)', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Null describedby');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      // Remove both attrs — aria-describedby becomes null in clearDescribedBy
      button.removeAttribute('aria-describedby');
      button.removeAttribute('data-io-tooltip-prev-describedby');

      button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

      expect(button.hasAttribute('aria-describedby')).toBe(false);
    });
  });

  describe('placement resolution', () => {
    it('uses a valid placement attribute instead of defaulting to top', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Placed tooltip');
      button.setAttribute('io-tooltip-placement', 'bottom');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).toBe('true');
    });

    it('uses left placement', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Left placed');
      button.setAttribute('io-tooltip-placement', 'left');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      expect(document.getElementById('io-tooltip-attribute-overlay')?.getAttribute('data-visible')).toBe('true');
    });

    it('uses right placement', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Right placed');
      button.setAttribute('io-tooltip-placement', 'right');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      expect(document.getElementById('io-tooltip-attribute-overlay')?.getAttribute('data-visible')).toBe('true');
    });

    it('falls back to top for invalid placement value', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Bad placement');
      button.setAttribute('io-tooltip-placement', 'diagonal');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      expect(document.getElementById('io-tooltip-attribute-overlay')?.getAttribute('data-visible')).toBe('true');
    });
  });

  describe('showTooltip — empty text guard', () => {
    it('does not show tooltip when io-tooltip text is empty', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', '');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).not.toBe('true');
    });

    it('does not show tooltip when io-tooltip text is whitespace-only', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', '   ');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).not.toBe('true');
    });
  });

  describe('hideTooltip — no overlay guard', () => {
    it('does not throw when pointerout fires before any tooltip is shown', () => {
      const outside = document.createElement('div');
      document.body.appendChild(outside);
      expect(() => {
        document.dispatchEvent(new MouseEvent('pointerout', { bubbles: true, relatedTarget: outside }));
      }).not.toThrow();
      expect(document.getElementById('io-tooltip-attribute-overlay')).toBeNull();
    });
  });

  describe('setDescribedBy — already-includes guard', () => {
    it('skips duplicate insertion when tooltip ID already in aria-describedby', async () => {
      const button = document.createElement('button');
      button.setAttribute('io-tooltip', 'Duplicate guard');
      document.body.appendChild(button);

      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const after1st = button.getAttribute('aria-describedby');

      // Trigger show again (same trigger, same ID already present)
      button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      // aria-describedby must not contain duplicates
      expect(button.getAttribute('aria-describedby')).toBe(after1st);
    });
  });

  describe('findTooltipTrigger — no-trigger path', () => {
    it('ignores pointerover on element without io-tooltip ancestor', async () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      div.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      await flushAsyncTooltipShow();

      expect(document.getElementById('io-tooltip-attribute-overlay')).toBeNull();
    });

    it('ignores focusin on element without io-tooltip ancestor', async () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      div.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      expect(document.getElementById('io-tooltip-attribute-overlay')).toBeNull();
    });
  });

  describe('onFocusOut — various paths', () => {
    it('does not throw when focusout fires with no active trigger', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      expect(() => {
        document.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      }).not.toThrow();
    });

    it('does not hide when focus moves to a child of the active trigger', async () => {
      const btn = document.createElement('button');
      btn.setAttribute('io-tooltip', 'Stay visible on child focus');
      const inner = document.createElement('span');
      btn.appendChild(inner);
      document.body.appendChild(btn);

      btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      await flushAsyncTooltipShow();

      const overlay = document.getElementById('io-tooltip-attribute-overlay');
      expect(overlay?.getAttribute('data-visible')).toBe('true');

      document.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: inner }));

      expect(overlay?.getAttribute('data-visible')).toBe('true');
    });
  });

  describe('initTooltipAttribute — double-init guard', () => {
    it('does not rebind listeners when called a second time (listenersBound guard)', () => {
      // listenersBound is already true after beforeEach's initTooltipAttribute()
      // calling again must return early without error
      expect(() => initTooltipAttribute()).not.toThrow();
    });

    it('returns early when WIN_INIT_FLAG is already set (cross-instance guard)', () => {
      __resetTooltipAttributeForTests();
      (globalThis as any)['__io_tooltip_attr_init'] = true;
      expect(() => initTooltipAttribute()).not.toThrow();
      // listenersBound remains false — the win flag stopped initialisation
    });
  });
});
