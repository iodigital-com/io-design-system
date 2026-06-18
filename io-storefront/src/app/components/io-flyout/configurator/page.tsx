'use client';

import { flyoutStory, flyoutPropDefinitions } from '../io-flyout.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoFlyoutConfiguratorPage() {
  return (
    <Configurator
      tagName="io-flyout"
      story={flyoutStory}
      propDefinitions={flyoutPropDefinitions}
    />
  );
}
