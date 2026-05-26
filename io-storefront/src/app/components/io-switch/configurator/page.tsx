'use client';

import { switchStory, switchPropDefinitions } from '../io-switch.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoSwitchConfiguratorPage() {
  return (
    <Configurator
      tagName="io-switch"
      story={switchStory}
      propDefinitions={switchPropDefinitions}
    />
  );
}
