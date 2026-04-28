import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTabs } from './io-tabs';

describe('io-tabs - click handling', () => {
  let component: IoTabs;
  let emitMock: ReturnType<typeof vi.fn>;
  let updateEmitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    emitMock = vi.fn();
    updateEmitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    (component as any).update = { emit: updateEmitMock };
    component.tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Details', value: 'details' },
    ];
    component.activeTab = 'overview';
    component.activeTabIndex = 0;
  });

  it('emits change and updates activeTab when a different tab is clicked', () => {
    (component as any).handleTabClick('details', 1);

    expect(component.activeTab).toBe('details');
    expect(component.activeTabIndex).toBe(1);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith('details');
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTab: 'details', activeTabIndex: 1 });
  });

  it('does not emit change when the same tab is clicked', () => {
    (component as any).handleTabClick('overview', 0);

    expect(component.activeTab).toBe('overview');
    expect(emitMock).not.toHaveBeenCalled();
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('emits once per distinct tab transition across sequential clicks', () => {
    (component as any).handleTabClick('details', 1);
    (component as any).handleTabClick('details', 1);
    (component as any).handleTabClick('overview', 0);

    expect(component.activeTab).toBe('overview');
    expect(component.activeTabIndex).toBe(0);
    expect(emitMock).toHaveBeenCalledTimes(2);
    expect(emitMock).toHaveBeenNthCalledWith(1, 'details');
    expect(emitMock).toHaveBeenNthCalledWith(2, 'overview');
    expect(updateEmitMock).toHaveBeenCalledTimes(2);
  });
});
