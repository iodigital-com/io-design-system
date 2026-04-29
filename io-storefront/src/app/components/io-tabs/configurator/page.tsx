'use client';

import { tabsStory, tabsPropDefinitions } from '../io-tabs.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTabsConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tabs"
      story={tabsStory}
      propDefinitions={tabsPropDefinitions}
    />
  );
}
