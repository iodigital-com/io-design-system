'use client';

import { tabPanelStory, tabPanelPropDefinitions } from '../io-tab-panel.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTabPanelConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tab-panel"
      story={tabPanelStory}
      propDefinitions={tabPanelPropDefinitions}
    />
  );
}
