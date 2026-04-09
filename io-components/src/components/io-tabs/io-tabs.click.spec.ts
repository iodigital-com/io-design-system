import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTabs } from './io-tabs';

describe('io-tabs - click handling', () => {
  let component: IoTabs;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Details', value: 'details' },
    ];
    component.activeTab = 'overview';
  });

  it('emits change and updates activeTab when a different tab is clicked', () => {
    (component as any).handleTabClick('details');

    expect(component.activeTab).toBe('details');
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith('details');
  });

  it('does not emit change when the same tab is clicked', () => {
    (component as any).handleTabClick('overview');

    expect(component.activeTab).toBe('overview');
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('emits once per distinct tab transition across sequential clicks', () => {
    (component as any).handleTabClick('details');
    (component as any).handleTabClick('details');
    (component as any).handleTabClick('overview');

    expect(component.activeTab).toBe('overview');
    expect(emitMock).toHaveBeenCalledTimes(2);
    expect(emitMock).toHaveBeenNthCalledWith(1, 'details');
    expect(emitMock).toHaveBeenNthCalledWith(2, 'overview');
  });
});
