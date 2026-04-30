'use client';

import { buttonGroupStory, buttonGroupPropDefinitions } from '../io-button-group.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoButtonGroupConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button-group"
      story={buttonGroupStory}
      propDefinitions={buttonGroupPropDefinitions}
    />
  );
}
