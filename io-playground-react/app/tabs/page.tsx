'use client';

import { useState } from 'react';
import { IoTabs } from '@iodigital-com/components-react';

export default function TabsPage() {
  const [active, setActive] = useState(0);

  return (
    <main suppressHydrationWarning>
      <h1>io-tabs — Tab Switch Test</h1>
      <IoTabs
        onUpdate={(e: CustomEvent<{ activeTabIndex: number }>) =>
          setActive(e.detail?.activeTabIndex ?? 0)
        }
      >
        <button type="button">Tab One</button>
        <button type="button">Tab Two</button>
        <button type="button">Tab Three</button>
      </IoTabs>
      <div className="result" data-testid="result">Active tab: {active}</div>
    </main>
  );
}
