'use client';

import { iconStory, iconPropDefinitions } from '../io-icon.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoIconConfiguratorPage() {
  return (
    <Configurator
      tagName="io-icon"
      story={iconStory}
      propDefinitions={iconPropDefinitions}
    />
  );
}
