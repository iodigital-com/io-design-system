import { describe, it, expect, vi } from 'vitest';
import { IoTabs } from './io-tabs';

const TABS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'Disabled', value: 'disabled', disabled: true },
];

describe('io-tabs — change handling', () => {
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
    component.tabs = TABS;
    component.activeTab = 'overview';
    component.activeTabIndex = 0;
  });

  it('emits change with new tab value when tab changes', () => {
    (component as any).handleTabClick('details', 1);
    expect(emitMock).toHaveBeenCalledWith('details');
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTab: 'details', activeTabIndex: 1 });
  });

  it('updates activeTab when tab changes', () => {
    (component as any).handleTabClick('details', 1);
    expect(component.activeTab).toBe('details');
    expect(component.activeTabIndex).toBe(1);
  });

  it('does not emit change when clicking already active tab', () => {
    (component as any).handleTabClick('overview', 0);
    expect(emitMock).not.toHaveBeenCalled();
    expect(updateEmitMock).not.toHaveBeenCalled();
  });
});
