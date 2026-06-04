'use client';

import { useState } from 'react';
import { IoTabs } from '@iodigital-com/components-react';

export default function TabsPage() {
  const [active, setActive] = useState(0);

  return (
    <main suppressHydrationWarning>
      <h1>io-tabs — Tab Switch Test</h1>
      <IoTabs
        onUpdate={(e: CustomEvent<{ index: number }>) => setActive(e.detail?.index ?? 0)}
      >
        <span slot="label">Tab One</span>
        <span slot="label">Tab Two</span>
        <span slot="label">Tab Three</span>
        <div>Content for Tab One</div>
        <div>Content for Tab Two</div>
        <div>Content for Tab Three</div>
      </IoTabs>
      <div className="result" data-testid="result">Active tab: {active}</div>
    </main>
  );
}
