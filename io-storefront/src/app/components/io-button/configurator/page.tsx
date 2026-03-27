'use client';

import { Configurator } from '@/components/playground/Configurator';
import { buttonStory, buttonPropDefinitions } from '../io-button.stories';

export default function IoButtonConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button"
      story={buttonStory}
      propDefinitions={buttonPropDefinitions}
    />
  );
}
