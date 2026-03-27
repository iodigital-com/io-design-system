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

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    emitMock = vi.fn();
    (component as any).ioChange = { emit: emitMock };
    component.tabs = TABS;
    component.activeTab = 'overview';
  });

  it('emits ioChange with new tab value when tab changes', () => {
    (component as any).handleTabClick('details');
    expect(emitMock).toHaveBeenCalledWith('details');
  });

  it('updates activeTab when tab changes', () => {
    (component as any).handleTabClick('details');
    expect(component.activeTab).toBe('details');
  });

  it('does not emit ioChange when clicking already active tab', () => {
    (component as any).handleTabClick('overview');
    expect(emitMock).not.toHaveBeenCalled();
  });
});
