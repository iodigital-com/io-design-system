'use client';

import { drawerStory, drawerPropDefinitions } from '../io-drawer.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoDrawerConfiguratorPage() {
  return (
    <Configurator
      tagName="io-drawer"
      story={drawerStory}
      propDefinitions={drawerPropDefinitions}
    />
  );
}
