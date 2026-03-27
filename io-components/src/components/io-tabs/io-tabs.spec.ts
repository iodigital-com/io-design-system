import { describe, it, expect, vi } from 'vitest';
import { IoTabs } from './io-tabs';

const TABS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'Settings', value: 'settings', disabled: true },
];

describe('io-tabs — default props', () => {
  let component: IoTabs;

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    (component as any).ioChange = { emit: vi.fn() };
  });

  it('has empty tabs by default', () => {
    expect(component.tabs).toEqual([]);
  });

  it('has empty activeTab by default', () => {
    expect(component.activeTab).toBe('');
  });

  it('defaults activeTab to first enabled tab on load', () => {
    component.tabs = TABS;
    component.componentWillLoad();
    expect(component.activeTab).toBe('overview');
  });

  it('preserves explicitly set activeTab on load', () => {
    component.tabs = TABS;
    component.activeTab = 'details';
    component.componentWillLoad();
    expect(component.activeTab).toBe('details');
  });
});
