'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tabsStory, tabsPropDefinitions } from '../io-tabs.stories';

export default function IoTabsConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tabs"
      story={tabsStory}
      propDefinitions={tabsPropDefinitions}
    />
  );
}
