'use client';

import { tabsBarStory, tabsBarPropDefinitions } from '../io-tabs-bar.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoTabsBarConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tabs-bar"
      story={tabsBarStory}
      propDefinitions={tabsBarPropDefinitions}
    />
  );
}
