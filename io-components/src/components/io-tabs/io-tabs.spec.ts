import { describe, it, expect, vi, beforeEach } from 'vitest';
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
    (component as any).change = { emit: vi.fn() };
  });

  it('has empty tabs by default', () => {
    expect(component.tabs).toEqual([]);
  });

  it('has empty activeTab by default', () => {
    expect(component.activeTab).toBe('');
  });

  it('has activeTabIndex=-1 by default', () => {
    expect(component.activeTabIndex).toBe(-1);
  });

  it('defaults activeTab to first enabled tab on load', () => {
    component.tabs = TABS;
    component.componentWillLoad();
    expect(component.activeTab).toBe('overview');
    expect(component.activeTabIndex).toBe(0);
  });

  it('preserves explicitly set activeTab on load', () => {
    component.tabs = TABS;
    component.activeTab = 'details';
    component.componentWillLoad();
    expect(component.activeTab).toBe('details');
    expect(component.activeTabIndex).toBe(1);
  });

  it('uses valid activeTabIndex to resolve activeTab on load', () => {
    component.tabs = TABS;
    component.activeTabIndex = 1;
    component.componentWillLoad();
    expect(component.activeTab).toBe('details');
    expect(component.activeTabIndex).toBe(1);
  });

  it('syncs activeTabIndex when activeTab changes after load', () => {
    component.tabs = TABS;
    component.componentWillLoad();

    component.activeTab = 'details';
    (component as any).onActiveTabChange('details');

    expect(component.activeTabIndex).toBe(1);
  });

  it('syncs activeTab when activeTabIndex changes after load', () => {
    component.tabs = TABS;
    component.componentWillLoad();

    component.activeTabIndex = 1;
    (component as any).onActiveTabIndexChange(1);

    expect(component.activeTab).toBe('details');
  });

  it('keeps activeTab empty when all tabs are disabled on load', () => {
    component.tabs = [
      { label: 'Disabled A', value: 'a', disabled: true },
      { label: 'Disabled B', value: 'b', disabled: true },
    ];

    component.componentWillLoad();

    expect(component.activeTab).toBe('');
    expect(component.activeTabIndex).toBe(-1);
  });

  it('enables delegatesFocus for the component shadow root', async () => {
    const builtComponent = await import('../../../dist-custom-elements/io-tabs.js');
    expect((builtComponent.IoTabs as { delegatesFocus?: boolean }).delegatesFocus).toBe(true);
  });
});
