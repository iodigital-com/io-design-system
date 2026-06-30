'use client';

import { buttonPureStory, buttonPurePropDefinitions } from '../io-button-pure.stories';
import { Configurator } from '@/components/playground/Configurator';

export default function IoButtonPureConfiguratorPage() {
  return (
    <Configurator
      tagName="io-button-pure"
      story={buttonPureStory}
      propDefinitions={buttonPurePropDefinitions}
    />
  );
}
